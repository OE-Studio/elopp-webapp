import React, {useState} from "react";
import { useSelector } from "react-redux";
import { DeleteIcon } from "../../../assets/icons/delete";
import { updateSingleItem, deleteCartItem } from "../../../features/cartSlice";
import { useDispatch } from "react-redux";
import emptyCart from '../../../assets/images/emptyCart.png'
import { Trolley } from "../../../assets/icons/troley";
import { Link } from "react-router-dom";
import { ArrowRight } from "../../../assets/icons/arrowRight";
import { DarkMinus } from "../../../assets/icons/darkMinus";
import { DarkPlus } from "../../../assets/icons/darkPlus";
import { ArrowDown } from "../../../assets/icons/arrowDown";
import "./cart-components.css"

const Card = ({item})=>{
    const {name, price,id, quantity, size, selectedColour, description} = item

    const [newQuantity, setNewQuantity] = useState(quantity)
    const [newSize, setNewSize] = useState(size)

    const dispatch = useDispatch()

    const addOne = () =>{
        setNewQuantity(prev=>{
            dispatch(updateSingleItem({id,quantity:prev + 1}))
            return prev + 1
        })
        
    }

    const removeOne = () =>{
        if(newQuantity === 1) return false

        setNewQuantity(prev=>{
            dispatch(updateSingleItem({id,quantity:prev - 1}))
            return prev - 1
        })
    }

    const updateSize = (e) =>{
        setNewSize(e.target.value)
        dispatch(updateSingleItem({id,size:e.target.value}))
    }

    return (
        <div className="pt-6 xl:pt-8 flex-col items-center gap-8">
            <div className="flex items-start lg:items-center gap-8">
            <div className="flex items-center justify-center w-32 lg:w-64 h-32 lg:h-64">
                <div className="w-32 lg:w-64 h-32 lg:h-64" style={{backgroundImage:`url(${selectedColour.img.replace(" ", "")})`, backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
                </div>
            </div>
            <div className="w-full">
                {/* top */}
                <div className="flex justify-between items-start w-full">
                    <div className="block w-3/4">
                        <p className="text-lg">{name}</p>
                        <p className="xl:py-4 text-sm text-[#898989]">{description}</p>
                    </div>
                    <div className="text-lg hidden lg:inline-block">&#8358; {price.toLocaleString()}</div>
                </div>

                {/* bottom */}
                <div className="mt-20 space-y-4 hidden lg:block">
                    <div className="flex w-auto gap-4">
                        <div className="flex items-center text-[#898989] text-lg">Qty</div>
                        <div onClick={removeOne} className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#DFDFDF] light-hover">
                            <DarkMinus/>
                        </div>
                        <div className="flex items-center">{newQuantity || 0}</div>
                        <div onClick={addOne} className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#DFDFDF] light-hover">
                            <DarkPlus/>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="inline-flex items-center justify-start gap-4">
                            <label className="text-[#898989] text-lg">Size</label>

                            <div className="inline-flex relative">
                                <select onChange={updateSize} value={newSize} className="size-select border border-[#DFDFDF] rounded-full h-9 px-3">
                                    {"S,M,L,XL,XXL".split(",").map(s=>{
                                        return <option value={s}>{s}</option>
                                    })}
                                </select>

                                <div className="absolute top-1/2 right-2 -translate-y-1/2 inline-block pointer-events-none">
                                    <ArrowDown/>
                                </div>
                            </div>
                        </div>

                        <div className="w-9 h-9 soft-shadow flex items-center justify-center rounded-full bg-white cursor-pointer light-hover" onClick={()=>dispatch(deleteCartItem(id))}>
                            <DeleteIcon/>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* mobile */}
            <div className="lg:hidden">
                <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex w-auto gap-4">
                            <div onClick={removeOne} className="light-hover w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#DFDFDF]">
                                <DarkMinus/>
                            </div>
                            <div className="flex items-center">{newQuantity || 0}</div>
                            <div onClick={addOne} className="light-hover w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#DFDFDF]">
                                <DarkPlus/>
                            </div>
                        </div>

                        <div className="inline-flex relative">
                            <select onChange={updateSize} value={newSize} className="size-select border border-[#DFDFDF] rounded-full h-9 px-3">
                                {"S,M,L,XL,XXL".split(",").map(s=>{
                                    return <option value={s}>{s}</option>
                                })}
                            </select>

                            <div className="absolute top-1/2 right-2 -translate-y-1/2 inline-block pointer-events-none">
                                <ArrowDown/>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="w-9 h-9 soft-shadow flex items-center justify-center rounded-full bg-white" onClick={()=>dispatch(deleteCartItem(id))}>
                            <DeleteIcon/>
                        </div>

                        <div className="inline-block text-lg">&#8358; {price.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const CartItemCard = ()=>{
    const {cart} = useSelector(state=>state.cart)
    return (
        <div className="">
            {cart.length === 0 ? (
                <div className="w-full flex items-center justify-center h-96 bg-[#F9F9F9]">
                    <div className="inline-flex flex-col items-center justify-center">
                        <img src={emptyCart} alt="bag placeholder" className="w-16 h-16 mx-auto block"/>
                        <p className="mt-4 text-[#999999]">Your cart is currently empty</p>
                        <Link to="/" className="inline-flex items-center justify-center bg-white soft-shadow h-9 px-2 rounded-full mt-4 gap-2 mx-auto light-hover grotesk">
                            <Trolley/>
                            Go to store
                        </Link>
                    </div>
                </div>
            ): (
                <div className="divide-y divide-[#DFDFDF] space-y-6 xl:space-y-8">
                    {cart.map(c=>{
                        return <Card key={c.id} item={c}/>
                    })}
                </div>
            )}

            {<div className="flex items-center mt-4 lg:hidden fixed bottom-16 right-0 px-5 w-full">
                <Link to="/checkout" className="bg-black flex items-center justify-between text-white h-14 px-3 rounded-full dark-hover w-full z-[4000]">
                    Complete checkout <ArrowRight/>
                </Link>
            </div>}
        </div>
    )
}