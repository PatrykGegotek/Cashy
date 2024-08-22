import "./RecentTransactions.css"
import React, {useEffect, useState} from 'react';
import {CATEGORY_TO_ICON, TRANSACTION_TYPE} from "../models/Transaction";
import {collection, getDocs, orderBy, query, where} from "firebase/firestore";
import {db} from "../firebase";

function formatDate(date) {
    return date.toDate().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    })
}

export default function History() {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const now = new Date(); // Get the current date
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const transactionsRef = collection(db, "Transactions");
        const q = query(
            transactionsRef,
            where("date", ">", firstDayOfMonth),
            orderBy("date", "desc")
        );

        getDocs(q)
            .then((querySnapshot) => {
                const transactions = [];
                querySnapshot.forEach((doc) => {
                    transactions.push({ id: doc.id, ...doc.data(), date: formatDate(doc.data().date) });
                });
                const dayToTransaction = transactions.reduce((acc, transaction) => {
                    (acc[transaction.date] = acc[transaction.date] || []).push(transaction);
                    return acc;
                }, {});
                setHistory(dayToTransaction);
            })
            .catch((error) => {
                console.error("Error fetching documents: ", error);
            });
    }, []);

    return <>
        <div className="card-container">
            <h2>History</h2>
            <ul>
                {Object.entries(history).map(([date, transactions]) => (
                    <>
                        <div className="transaction-date date-title">{date}</div>
                        {transactions.map((transaction) => (
                            <li key={transaction.id}
                                className={transaction.type === TRANSACTION_TYPE.EXPENSE ? "history-element history-element-expense" : "history-element history-element-income"}>
                                <img className="category-icon" style={{flexShrink: 0}} src={CATEGORY_TO_ICON[transaction.category]}
                                     alt=""/>
                                <div className="transaction-details" style={{flexGrow: 1}}>
                                    <div>
                                        <div>{transaction.category}</div>
                                        <div
                                            style={transaction.type === TRANSACTION_TYPE.EXPENSE ? {color: 'red'} : {color: 'green'}}>{transaction.amount.toFixed(2)} PLN
                                        </div>
                                    </div>

                                </div>
                            </li>
                        ))}
                    </>
                )
            )}
        </ul>
    </div>
    </>
}