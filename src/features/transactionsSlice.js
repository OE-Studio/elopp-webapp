import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../endpoint";
import axios from "axios";

const initialState={
    allTransactions:[],
    loadingTransactions:false,
    totalPage:1,
    currentPage:1,
    totalTransactions:1,
    pageSize:1,
    stateCount:0,
    totalOrderPrice:0,
    numberOfStates:0,
    totalSaleAmount:0
}

export const fetchAllTransactions = createAsyncThunk(
    "fetch all transactions",
    async(payload, thunkAPI)=>{
        try{
            let response = await axios.get(endpoints.allTransactions + `?page=${payload.page}&limit=${payload.limit}`)
            let data = await response.data

            console.log(data)
            if(data.success){
                return data
            }
        }
        catch(err){
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const transactions = createSlice({
    name:"transactions",
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchAllTransactions.pending]:(state, payload)=>{
            state.loadingTransactions = true
        },
        [fetchAllTransactions.fulfilled]:(state, {payload})=>{
            state.allTransactions = payload.paidTransaction
            state.loadingTransactions = false
            state.totalPage = payload.totalPageCount
            state.currentPage = payload.currentPage
            state.totalTransactions = payload.totalSuccessfulTransaction
            state.numberOfStates = payload.stateCount
            state.totalSaleAmount = payload.totalOrderPrice
        },
        [fetchAllTransactions.rejected]:(state, payload)=>{
            state.loadingTransactions = false
        },
    }
})

export default transactions.reducer