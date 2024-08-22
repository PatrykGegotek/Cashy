import React from "react";
import {addDoc, collection, Timestamp} from "firebase/firestore";
import {CATEGORY, INC_CATEGORY, EXP_CATEGORY, TRANSACTION_TYPE} from "../models/Transaction";
import {useNavigate} from "react-router-dom";
import {db} from "../firebase";
import "./NewTransaction.css"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {EXP_CATEGORY_TO_ICON, INC_CATEGORY_TO_ICON} from "../models/Transaction";
import Form from 'react-bootstrap/Form';


export default function NewTransaction({isExpense}) {
    const [category, setCategory] = React.useState(isExpense ? CATEGORY.EATING_OUT : CATEGORY.SALARY);
    const [amount, setAmount] = React.useState(0);
    const navigate = useNavigate();
    const categoryToIcon = isExpense ? EXP_CATEGORY_TO_ICON : INC_CATEGORY_TO_ICON;

    async function handleAddTransaction() {
        const newTransaction = {
            category: category,
            amount: Number(amount),
            date: Timestamp.now(),
            type: isExpense ? TRANSACTION_TYPE.EXPENSE : TRANSACTION_TYPE.INCOME
        }
        await addDoc(collection(db, "Transactions"), newTransaction)
        // HISTORY.push(newIncome)
        navigate('/');
    }

    return <>
        <div className="display-flex card-container">
            <div>
                <label htmlFor="category">Choose category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {Object.values(isExpense ? EXP_CATEGORY : INC_CATEGORY).map((categoryName) => (
                        <option key={categoryName} value={categoryName}>{categoryName}</option>
                    ))}
                </select>
                <DropdownButton title="Choose category">
                    {Object.entries(categoryToIcon).map(([category, icon]) => (
                        <Dropdown.Item key={category} className="category-dropdown-item">
                            <div>{category}</div>
                            <img className="category-icon" src={icon} alt={category} />
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
                <Form.Select aria-label="Default select example">
                    {Object.entries(categoryToIcon).map(([category, icon]) => (
                        <option value={category} key={category} className="category-dropdown-item">
                            {/*<div>{category}</div>*/}
                            {/*<img className="category-icon" src={icon} alt={category} />*/}
                        </option>
                    ))}
                </Form.Select>
            </div>
            <div>
                <label htmlFor="amount">Enter the amount:</label>
                <input type="number" step="0.01" min="0" value={amount}
                       onChange={(e) => setAmount(e.target.value)}/>
            </div>
            <div>
                <button onClick={() => handleAddTransaction()}>Submit</button>
            </div>
        </div>
    </>
}