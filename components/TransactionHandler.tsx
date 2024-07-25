"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AddTransaction from "./AddTransaction";
import Transactions from "./Transactions";
import Total from "./Total";

export interface TransactionModel {
    category: string;
    item: string;
    amount: number;
}

const TransactionHandler: React.FC = () => {
    const [transactions, setTransactions] = useState<TransactionModel[]>([]);
    const [total, setTotal] = useState({ income: 0, expense: 0 });

    const addTransaction = (newTransaction: TransactionModel) => {
        setTransactions((prevTransactions) => [
            ...prevTransactions,
            newTransaction,
        ]);

        const newTotal = { ...total };
        if (newTransaction.category === "Income") {
            newTotal.income += newTransaction.amount;
        } else if (newTransaction.category === "Expense") {
            newTotal.expense += newTransaction.amount;
        }
        setTotal(newTotal);
    };

    const deleteTransaction = (index: number) => {
        const transactionDeleted = transactions[index];
        const updatedTransactions = transactions.filter((_, i) => i !== index);
        setTransactions(updatedTransactions);

        const newTotal = { ...total };
        if (transactionDeleted.category === "Income") {
            newTotal.income -= transactionDeleted.amount;
        } else if (transactionDeleted.category === "Expense") {
            newTotal.expense -= transactionDeleted.amount;
        }
        setTotal(newTotal);
    };

    const router = useRouter();
    const handleRedirect = () => {
        router.push("/");
    };

    return (
        <>
            <AddTransaction addTransaction={addTransaction} />
            <Transactions
                transactions={transactions}
                transactionDeleted={deleteTransaction}
            />
            <Total total={total} />
            <button onClick={handleRedirect} className="home-btn">
                HOME
            </button>
        </>
    );
};

export default TransactionHandler;
