import {TRANSACTION_TYPE} from "../models/Transaction";
import {RecentTransactions} from "./RecentTransactions";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import {PaddedPieChart} from "./PaddedPieChart";
import {BarChart} from "@mui/x-charts";
import {useEffect, useState} from "react";


export default function Dashboard() {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path)
    }

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
                    transactions.push({ id: doc.id, ...doc.data() });
                });
                setHistory(transactions);
            })
            .catch((error) => {
                console.error("Error fetching documents: ", error);
            });
    }, []);

    console.log(history);

    const categoryToExpense = {}
    const categoryToIncome = {}
    const expenseData = []
    const incomeData = []
    let expensesSum = 0
    let incomesSum = 0

    history.forEach(transaction => {
        if (transaction.type === TRANSACTION_TYPE.EXPENSE) {
            categoryToExpense[transaction.category] = (categoryToExpense[transaction.category] ?? 0) + transaction.amount;
            expensesSum += transaction.amount
        } else {
            categoryToIncome[transaction.category] = (categoryToIncome[transaction.category] ?? 0) + transaction.amount;
            incomesSum += transaction.amount
        }
    })

    Object.keys(categoryToExpense).forEach(category => {
        expenseData.push({
            label: category,
            value: categoryToExpense[category],
            id: category
        })
    })

    Object.keys(categoryToIncome).forEach(category => {
        incomeData.push({
            label: category,
            value: categoryToIncome[category],
            id: category
        })
    })

    return <>
        <div>
            <h2 className="balance">
                Your current balance: {(incomesSum - expensesSum).toFixed(2)}
            </h2>
            <BarChart
                yAxis={[{
                    scaleType: 'band',
                    data: ['Earnings', 'Expenses'],
                    colorMap: {
                        type: 'ordinal',
                        colors: ['green', 'red'],
                    }
                }]}
                series={[{ data: [incomesSum, expensesSum] }]}
                height={250}
                layout="horizontal"
                barLabel="value"
                borderRadius={6}
            />
        </div>
        <h1 className="title">
            DASHBOARD
        </h1>
        <div className="charts card-container">
            <div className="chart">
                <h4>Income</h4>
                <PaddedPieChart data={incomeData}/>
                <button className="add-transaction" onClick={() => navigateTo('new-income')}>Add income</button>
            </div>
            <div className="chart">
                <h4>Expenses</h4>
                <PaddedPieChart data={expenseData}/>
                <button className="add-transaction" onClick={() => navigateTo('new-expense')}>Add expense</button>
            </div>
        </div>
        <div className="card-container">
            <RecentTransactions history={history.slice(0, 10)}/>
        </div>
    </>
}