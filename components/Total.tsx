import React from "react";

interface TotalProps {
    total: { income: number; expense: number };
}

const Total: React.FC<TotalProps> = ({ total }) => {
    return (
        <>
            <div className="total-container">
                <h3>Total</h3>
                <p>{total.income - total.expense}</p>
            </div>
        </>
    );
};

export default Total;
