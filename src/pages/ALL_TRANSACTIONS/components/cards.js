import React from "react";

export const TransactionsCard = ({title, value}) =>{
    return (
        <div className="md:px-6 py-6 md:py-0">
            <p className="text-sm text-[#6C747A]">{title}</p>
            <p className="mt-12 grotesk font-medium text-3xl">{value}</p>
        </div>
    )
}