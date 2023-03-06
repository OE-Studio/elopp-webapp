import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { endpoints } from '../endpoint'

const initialState = {
    cart:JSON.parse(sessionStorage.getItem("cart") || "[]"),
    currentItem:{},
    showDetails:false,
    userDetails:JSON.parse(sessionStorage.getItem('userDetails') || "{}"),
    currentStep:"checkout",
    loadingItems:false,
    allItems:[]
}

export const submitOrder = createAsyncThunk(
    'submit order', 
    async(payload, thunkAPI)=>{
        try{
            let response = await axios.post(endpoints.checkout, payload)
            let data = await response.data

            if(data?.success) {
                window.open(data.message, '_blank')
                return data.message
            }
        }
        catch(err){}
    }
)

export const fetchAllIItems = createAsyncThunk(
    'all items',
    async(payload, thunkAPI)=>{
        try{
            let response = await axios.get(endpoints.allItems)
            let data = await response.data

            if(data.success){
                return data.Items
            }
        }
        catch(err){}
    }
)

const cart = createSlice({
    name:"cart",
    initialState,
    reducers:{
        updateCart:(state, {payload})=>{
            state.cart = [...state.cart, payload]

            sessionStorage.setItem("cart", JSON.stringify(state.cart))
        },
        changeCurrentItem:(state, {payload})=>{
            if(payload && payload._id) {
                state.showDetails = true
                state.currentItem = payload
            }
            else {
                state.showDetails = false
                state.currentItem = {}
            }
            
        },
        deleteCartItem:(state, {payload})=>{
            if(cart.length === 0) return false

            if(state.cart.find(c=>c.id === payload)) {
                let filtered = state.cart.filter(c=>c.id !== payload)
                state.cart = filtered
                sessionStorage.setItem("cart", JSON.stringify(state.cart))
            }
        },
        updateSingleItem:(state, {payload})=>{
            let mapped = state.cart.map(c=>{
                if(c._id === payload._id) {
                    c={...c, ...payload}
                }
                return c
            })
            state.cart = mapped
            sessionStorage.setItem("cart", JSON.stringify(state.cart))
        },
        updateUserDetails:(state, {payload})=>{
            state.userDetails = payload
            sessionStorage.setItem('userDetails', JSON.stringify(payload))
        },
        changeCurrentStep:(state, {payload})=>{
            state.currentStep = payload
        }
    },
    extraReducers:{
        [submitOrder.pending]:(state, {payload})=>{

        },
        [submitOrder.fulfilled]:(state, {payload})=>{

        },
        [submitOrder.rejected]:(state, {payload})=>{

        },

        [fetchAllIItems.pending]:(state, {payload})=>{
            state.loadingItems = true
        },
        [fetchAllIItems.fulfilled]:(state, {payload})=>{
            state.loadingItems = false
            state.allItems = payload
        },
        [fetchAllIItems.rejected]:(state, {payload})=>{
            state.loadingItems = false
        },
    }
})

export const {updateCart, changeCurrentItem, updateSingleItem, deleteCartItem, updateUserDetails, changeCurrentStep} = cart.actions

export default cart.reducer