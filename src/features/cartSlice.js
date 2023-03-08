import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { endpoints } from '../endpoint'

const initialState = {
    cart:JSON.parse(sessionStorage.getItem("cart") || "[]"),
    currentItem:{},
    showDetails:false,
    userDetails:JSON.parse(sessionStorage.getItem('userDetails') || '{"name":"", "email":"","phoneNumber":"", "state":"","city":"","address":"", "landmark":""}'
    ),
    currentStep:"checkout",
    loadingItems:false,
    allItems:[],
    loadingOrder:false,
    currentOrder:{},
    filterList:["T-shirt","Notepad","Hoodie","Wrist band","Stickers","Tote bag","Sport bottle","Mug","Cap","Phone case"],
    loadingSubmitOrder:false
}

export const submitOrder = createAsyncThunk(
    'submit order', 
    async(payload, thunkAPI)=>{
        try{
            let response = await axios.post(endpoints.checkout, payload)
            let data = await response.data

            if(data?.success) {
                window.location.href = data.message
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

export const fetchOrder = createAsyncThunk(
    'all orders',
    async(payload, thunkAPI)=>{
        try{
            let response = await axios.post(endpoints.trackOrder, {
                trackingId:payload
            })
            let data = await response.data

            if(data.success){
                return data.currentTransaction
            }
        }
        catch(err){

        }
    }
)


const cart = createSlice({
    name:"cart",
    initialState,
    reducers:{
        updateCart:(state, {payload})=>{
            if(Object.keys(payload).length > 0){
                state.cart = [...state.cart, payload] 
            }
            else {
                state.cart = []
            }

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
                if(c.id === payload.id) {
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
        },
        updateFilterList:(state, {payload})=>{

            if(state.filterList.find(arr=>arr === payload)){
                let filtered = state.filterList.filter(item=>{
                    return item !== payload
                })
                state.filterList = filtered
            }
            else {
                state.filterList = [...state.filterList, payload]
            }
        }
    },
    extraReducers:{
        [submitOrder.pending]:(state, {payload})=>{
            state.loadingSubmitOrder = true
        },
        [submitOrder.fulfilled]:(state, {payload})=>{
            state.loadingSubmitOrder = false
        },
        [submitOrder.rejected]:(state, {payload})=>{
            state.loadingSubmitOrder = false
        },

        // Fetch all items
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

        // Fetch orders
        [fetchOrder.pending]:(state, {payload})=>{
            state.loadingOrder = true
        },
        [fetchOrder.fulfilled]:(state, {payload})=>{
            state.loadingOrder = false
            state.currentOrder = payload
        },
        [fetchOrder.rejected]:(state, {payload})=>{
            state.loadingOrder = false
        },
    }
})

export const {updateCart, changeCurrentItem, updateSingleItem, deleteCartItem, updateUserDetails, changeCurrentStep, updateFilterList} = cart.actions

export default cart.reducer