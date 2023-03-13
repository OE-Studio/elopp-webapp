import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../../../assets/icons/loader";
import { Pagination } from "../../../components/PAGINATION";
import { fetchAllTransactions } from "../../../features/transactionsSlice";

const TableData=({transaction})=>{
    const initials = transaction.userDetails.name.split(" ")
    return (
        <tr className="border-y text-sm">
            <td className="py-4 px-4 align-top py-4">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#F2F4F7] text-[#475467] font-medium flex items-center justify-center">
                        {initials[0]?.charAt(0)} {initials[1]?.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-medium">{transaction.userDetails.name}</p>
                        <p className="text-xs">{transaction.trackingId}</p>
                    </div>
                </div>
            </td>
            <td className="text-left align-top py-4">
                <div>{transaction.userDetails.email}</div>
            </td>
            <td className="text-left align-top py-4 px-4">
                <div>{transaction.userDetails.phoneNumber}</div>
            </td>
            <td className="text-left align-top py-4 px-4">
                <div>{transaction.userDetails.state}</div>
            </td>
            <td className="text-left align-top py-4 px-4">
                <div className="flex items-center justify-start break-words">
                    {transaction.userDetails.address} &nbsp;
                    {transaction.userDetails.city} &nbsp;
                    {transaction.userDetails.landmark} &nbsp;
                </div>
            </td>
            <td className="py-4 px-4 align-top py-4">
                <ul>
                    {transaction.order.map(o=>{
                        return <li className="list-disc list-inside list-item break-words">
                            {o.ItemProp.name}&nbsp; | &nbsp;
                            {o.size}&nbsp;  | &nbsp;
                            {o.quantity}&nbsp;
                        </li>
                    })}
                </ul>
            </td>
            <td className="text-right px-4 align-top py-4">
               &#8358;{transaction.totalPrice.toLocaleString()}
            </td>
        </tr>
    )
}

export const TransactionsTable =()=>{
    const {loadingTransactions, allTransactions} = useSelector(state=>state.transactions)
    const [pageSize, setPageSize] = useState(10)

    const dispatch = useDispatch()
    const {currentPage, totalPage} = useSelector(state=>state.transactions)

    const changePage = (limit, currPage) =>{
        setPageSize(limit)
        dispatch(fetchAllTransactions({
            limit:limit,
            page:currPage
        }))

        window.scrollTo({
            top:0
        })
    }
    
    return (
        <div className="mt-11 border border-[#EAECF0] border-collapse">
            <table className="w-full">
                <thead>
                    <tr className="bg-[#F9FAFB]">
                        <th className="py-4 text-left px-4">Name</th>
                        <th className="text-left px-4">Email</th>
                        <th className="text-left px-4">Phone number</th>
                        <th className="text-left px-4">State</th>
                        <th className="text-left px-4">Address</th>
                        <th className="text-left px-4">Order</th>
                        <th className="text-right px-4">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {loadingTransactions 
                        ? <tr>
                            <td className="w-full flex items-center justify-center">
                                <Loader/>
                            </td>
                        </tr>
                        : allTransactions.length === 0 
                        ? <div>
                            There are no transactions
                        </div> 
                        : <>
                            {allTransactions.map(transaction=>{
                                return (
                                    <>
                                        <TableData transaction={transaction}/>
                                    </>
                                )
                            })}
                            <tr>
                                <Pagination onChange={changePage} total={totalPage} currentPage={currentPage} pageSize={pageSize}/>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
        </div>
    )
}