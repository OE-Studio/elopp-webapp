import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
// import { TransactionsCard } from "./components/cards";
import { fetchAllTransactions } from "../../features/transactionsSlice";
import { TransactionsTable } from "./components/table";

export const AllTransactions = () =>{
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchAllTransactions({page:1, limit:10}))
    })

    return (
        <div>
            <TransactionsTable/>
        </div>
    )
}