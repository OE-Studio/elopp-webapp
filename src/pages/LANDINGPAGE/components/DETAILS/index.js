import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusIcon } from "../../../../assets/icons/plus";
import { updateCart } from "../../../../features/cartSlice";
import { changeCurrentItem } from "../../../../features/cartSlice";
import { BagIcon } from "../../../../assets/icons/bag";
import { CloseIcon } from "../../../../assets/icons/close";
import { SuccessIcon } from "../../../../assets/icons/success";
import { DarkMinus } from "../../../../assets/icons/darkMinus";
import { DarkPlus } from "../../../../assets/icons/darkPlus";
import { useNavigate } from "react-router-dom";


export const ItemDetails = () =>{
    const {currentItem, cart} = useSelector(state=>state.cart)
    const [availableColour, setAvailableColour] = useState(currentItem.availableColors[0])
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("S")
    const [successful, setSuccessful] = useState(false)

    const dispatch = useDispatch()

    const addOne = () =>{
        setQuantity(prev=>prev + 1)
    }

    const removeOne = () =>{
        if(quantity === 1) return false

        setQuantity(prev=>prev-1)
    }

    const updateCartHandler = () =>{
        let id=Math.random().toString(36).slice(2)
        dispatch(updateCart({
            ...currentItem, 
            quantity:quantity,
            selectedColour:availableColour,
            id:id,
            size:size
        }))

        setQuantity(1)
        setSuccessful(true)
        setTimeout(()=>{
            setSuccessful(false)
        }, 2000)
    }

    const changeCurrentHandler = () =>{
        dispatch(changeCurrentItem())
    }

    const navigate = useNavigate()

    const handleCheckout = () =>{
        dispatch(changeCurrentItem())
        navigate("/cart")
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between sticky top-0 bg-white py-4">
                <div onClick={changeCurrentHandler} className="light-hover w-9 h-9 rounded-full flex items-center justify-center border border-[#DFDFDF]"><CloseIcon/></div>

                <div onClick={handleCheckout} className="inline-flex justify-center items-center h-9 w-9 rounded-full bg-white soft-shadow relative light-hover">
                    <BagIcon/>

                    {cart.length > 0 && <div className="w-[14px] h-[14px] rounded-full bg-[#FF6A6A] text-white text-[10px] flex items-center justify-center absolute top-0 right-0">{cart.length}</div>}
                </div>
            </div>

            <div className="mt-11">
                <p className="text-2xl grotesk">{currentItem.name}</p>
                <p className="text-sm mt-7">{currentItem.description}</p>
            </div>

            <hr className="my-4"/>

            <div className="w-full h-auto">
                <img src={availableColour.img.replace(" ", "")} className="w-full h-auto" alt="sselected item"/>
            </div>

            <div className="grid grid-cols-4 gap-5 mt-7">
                {currentItem.availableColors.map(c=>{
                    return (
                        <div key={c.color} className=" flex items-center justify-center" onClick={()=>setAvailableColour(c)}>
                            <img src={c.img.replace(" ", "")} className="w-full h-auto" alt="item colour"/>
                        </div>
                    )
                })}
            </div>

            <div className="mt-7">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <tr>
                            <td>Quantity</td>
                            <td className="flex items-center justify-end py-4">
                                <div className="inline-flex items-center justify-end">
                                    <div onClick={removeOne} className="w-9 h-9 rounded-full flex items-center justify-center border border-[#DFDFDF] bg-white light-hover cursor-pointer"><DarkMinus/></div>

                                    <div className="flex items-center px-4 pointer-events-none">{quantity}</div>

                                    <div onClick={addOne} className="w-9 h-9 rounded-full flex items-center justify-center  border border-[#DFDFDF] bg-white light-hover cursor-pointer"><DarkPlus/></div>
                                </div>
                            </td>
                        </tr>

                        {currentItem.availableSize.length > 0 && <tr>
                            <td>Size</td>
                            <td className="flex items-center justify-end py-4">
                                <div className="inline-flex items-center justify-end gap-2 lg:gap-4 text-sm lg:text-base">
                                    {currentItem.availableSize.map(s=>{
                                        return <div key={s} className={`px-2 lg:px-4 h-8 lg:h-9 rounded-full flex items-center justify-center border border-[#DFDFDF] cursor-pointer ${s === size ? "text-white bg-[#333333]" : "bg-white"}`} onClick={()=>setSize(s)}>{s}</div>
                                    })}
                                </div>
                            </td>
                        </tr>}

                        <tr>
                            <td className="grotesk">&#8358; {(currentItem.price * quantity).toLocaleString()}</td>
                            <td className="flex items-center justify-end py-4">
                                <button disabled={true} onClick={updateCartHandler} className={`dark-hover inline-flex items-center justify-center h-11 px-4 bg-[#333333] gap-2 text-white rounded-full cursor-pointer grotesk disabled:cursor-not-allowed disabled:bg-slate-400`}>
                                    <PlusIcon/> Add to cart
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex items-center justify-center h-10">
                    {successful && <div className="inline-flex items-center mx-auto text-[#446F22] bg-[#F4F8F1] py-3 px-4 rounded-full gap-2">
                        <SuccessIcon/>
                        Items added successfully
                    </div>}
                </div>
            </div>
        </div>
    )
}