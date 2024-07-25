import React from "react";
import { TransactionModel } from "./TransactionHandler";

interface AddTransactionProps {
    addTransaction: (newTransaction: TransactionModel) => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ addTransaction }) => {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const category = formData.get("category") as string;
        const item = formData.get("item") as string;
        const amount = parseFloat(formData.get("amount") as string);

        const newTransaction: TransactionModel = { category, item, amount };
        addTransaction(newTransaction);

        e.currentTarget.reset();
    };

    return (
        <>
            <h3>Add Transaction</h3>
            <form onSubmit={handleFormSubmit}>
                <div className="form-field-container">
                    <label htmlFor="category">Category：</label>
                    <select name="category" id="category" required>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
                <div className="form-field-container">
                    <label htmlFor="item">Item：</label>
                    <input type="text" name="item" id="item" />
                </div>
                <div className="form-field-container">
                    <label htmlFor="amount">Amount：</label>
                    <input type="number" name="amount" id="amount" />
                </div>
                <button className="add-btn" type="submit">
                    ADD
                </button>
            </form>
        </>
    );
};

export default AddTransaction;
