import "./RecentTransactions.css"
import React from 'react';
import {CATEGORY_TO_ICON, TRANSACTION_TYPE} from "../models/Transaction";

function formatDate(date) {
    return date.toDate().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    })
}

export function RecentTransactions({history}) {
    return <>
        <h2>Recent transactions</h2>
        <ul>
            {history.map((transaction) => (
                <li key={transaction.id} className={transaction.type === TRANSACTION_TYPE.EXPENSE ? "history-element history-element-expense" : "history-element history-element-income"}>
                    <img className="category-icon" style={{ flexShrink: 0 }} src={CATEGORY_TO_ICON[transaction.category]}  alt="" />
                    <div className="transaction-details" style={{ flexGrow: 1 }}>
                        <div>
                            <div>{transaction.category}</div>
                            <div style={transaction.type === TRANSACTION_TYPE.EXPENSE ? {color: 'red'} : {color: 'green'}}>{transaction.amount.toFixed(2)} PLN</div>
                        </div>
                        <div className="transaction-date">{formatDate(transaction.date)}</div>
                    </div>
                </li>
            ))}
        </ul>
    </>
}