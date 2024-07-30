import React from "react";
import { TransactionModel } from "./TransactionHandler";

interface TransactionsProps {
    transactions: TransactionModel[];
    transactionDeleted: (id: string) => void;
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
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="transactions-container"
                        >
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
                                onClick={() =>
                                    transaction.id
                                        ? transactionDeleted(transaction.id)
                                        : console.error(
                                              "Unable to delete this item or the item does not exist"
                                          )
                                }
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
