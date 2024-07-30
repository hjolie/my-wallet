"use client";
import { auth } from "@/utils/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddTransaction from "./AddTransaction";
import Transactions from "./Transactions";
import Total from "./Total";
import db from "@/utils/firestore";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    where,
} from "firebase/firestore/lite";

export interface TransactionModel {
    id?: string;
    category: string;
    item: string;
    amount: number;
    uid: string;
}

const TransactionHandler: React.FC = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState<string | null>(null);
    const [uid, setUid] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<TransactionModel[]>([]);
    const [total, setTotal] = useState({ income: 0, expense: 0 });
    const router = useRouter();

    const calculateTotal = (transactions: TransactionModel[]) => {
        const updatedTotal = transactions.reduce(
            (acc, transaction) => {
                if (transaction.category === "Income") {
                    acc.income += transaction.amount;
                } else if (transaction.category === "Expense") {
                    acc.expense += transaction.amount;
                }
                return acc;
            },
            { income: 0, expense: 0 }
        );

        setTotal(updatedTotal);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setAuthenticated(true);
                setEmail(user.email);
                setUid(user.uid);

                try {
                    const transactionsRef = collection(db, "transactions");
                    const queryDocs = query(
                        transactionsRef,
                        where("uid", "==", user.uid)
                    );
                    const querySnapshot = await getDocs(queryDocs);
                    const transactionsData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as TransactionModel[];

                    setTransactions(transactionsData);
                    calculateTotal(transactionsData);
                } catch (err) {
                    console.error("Error fetching transactions: ", err);
                }
            } else {
                setAuthenticated(false);
                router.replace("/");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (!authenticated) {
        return null;
    }

    if (loading) {
        return <h3>Loading...</h3>;
    }

    const addTransaction = async (newTransaction: TransactionModel) => {
        try {
            const newDoc = await addDoc(collection(db, "transactions"), {
                category: newTransaction.category,
                item: newTransaction.item,
                amount: newTransaction.amount,
                uid: uid,
            });

            setTransactions([
                ...transactions,
                { ...newTransaction, id: newDoc.id },
            ]);

            calculateTotal([
                ...transactions,
                { ...newTransaction, id: newDoc.id },
            ]);
        } catch (err) {
            console.error("Error adding transaction: ", err);
        }
    };

    const deleteTransaction = async (id: string) => {
        try {
            await deleteDoc(doc(db, "transactions", id));

            const updatedTransactions = transactions.filter(
                (transaction) => transaction.id !== id
            );

            setTransactions(updatedTransactions);
            calculateTotal(updatedTransactions);
        } catch (err) {
            console.error(`Error deleting transaction: ${id}`, err);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.replace("/");
        } catch (err) {
            console.error("Error signing out: ", err);
        }
    };

    const handleGoBackHome = () => {
        router.push("/");
    };

    return (
        <>
            <h3 className="accounting-title">
                {`You are signed in as `} <br /> {`" ${email} "`}
            </h3>
            <button onClick={handleSignOut} className="signout-btn">
                SIGN OUT
            </button>
            <AddTransaction addTransaction={addTransaction} />
            <Transactions
                transactions={transactions}
                transactionDeleted={deleteTransaction}
            />
            <Total total={total} />
            <button onClick={handleGoBackHome} className="home-btn">
                HOME
            </button>
        </>
    );
};

export default TransactionHandler;
