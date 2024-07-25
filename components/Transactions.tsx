import React from "react";
import { TransactionModel } from "./TransactionHandler";

interface TransactionsProps {
    transactions: TransactionModel[];
    transactionDeleted: (index: number) => void;
}

const Transactions: React.FC<TransactionsProps> = ({
    transactions,
    transactionDeleted,
}) => {
    return (
        <div>
            <h3>Transactions</h3>
            {transactions.length > 0 && (
                <div>
                    {transactions.map((transaction, index) => (
                        <div key={index} className="transactions-container">
                            <p
                                className={
                                    transaction.category === "Income"
                                        ? "plus"
                                        : "minus"
                                }
                            >
                                {transaction.category === "Income" ? "+" : "-"}
                            </p>
                            <p>{transaction.item}</p>
                            <p>{transaction.amount}</p>
                            <button
                                onClick={() => transactionDeleted(index)}
                                className="delete-btn"
                            >
                                Ｘ
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Transactions;
