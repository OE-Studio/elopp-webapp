import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
// import { TransactionsCard } from "./components/cards";
import { fetchAllTransactions } from "../../features/transactionsSlice";
import { TransactionsTable } from "./components/table";
import { TransactionsCard } from "./components/cards";

export const AllTransactions = () =>{
    const dispatch = useDispatch()

    const {numberOfStates, totalSaleAmount, totalTransactions} = useSelector(state=>state.transactions)

    useEffect(()=>{
        dispatch(fetchAllTransactions({page:1, limit:10}))
    }, [dispatch])

    return (
        <div className="pt-12">
            <div className="text-3xl font-semibold">Customers’ order</div>

            <div className="grid grid-cols-1 md:grid-cols-3 border border-[#E5ECF5] md:py-6 divide-y md:divide-y-0 md:divide-x divide-[#E5ECF5] mt-9 w-full lg:w-3/4">
                <TransactionsCard title="Total Orders" value={totalTransactions}/>
                <TransactionsCard title="Total value of Orders" value={`# ${totalSaleAmount.toLocaleString()}`}/>
                <TransactionsCard title="States" value={numberOfStates}/>
            </div>

            <TransactionsTable/>
        </div>
    )
}