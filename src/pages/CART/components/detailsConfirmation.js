import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowRight } from "../../../assets/icons/arrowRight";
import { PencilIcon } from "../../../assets/icons/pencil";
import {MailIcon} from '../../../assets/icons/mail'
import {CallIcon} from '../../../assets/icons/call'
import {LocationIcon} from '../../../assets/icons/location'
import {SmileyIcon} from '../../../assets/icons/smiley'
import { submitOrder } from "../../../features/cartSlice";
import { Loader } from "../../../assets/icons/loader";

export const DetailsConfirmation = () =>{
    const {cart, userDetails, loadingSubmitOrder} = useSelector(state=>state.cart)
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(()=>{
        let total = 0
        cart.map(c=>{
            let productTotal = c.price * c.quantity
            total+=productTotal
            return false
        })
        setTotalAmount(total)
    }, [cart])

    const dispatch = useDispatch()

    const processPayment = (e) =>{
        e.preventDefault()

        let refinedCart = cart.map(cart=>{
            let obj = {}
            obj.itemId = cart.uuid
            obj.price = cart.price
            obj.color = cart.selectedColour.color
            obj.size = cart.size
            obj.quantity = cart.quantity

            return obj
        })

        let payload = {
            order:refinedCart,
            userDetails
        }

        dispatch(submitOrder(payload))
    }

    return (
        <div className="pt-12 lg:pt-0">
            {/* <form className=""> */}
                <div className="text-3xl font-bold lg:text-sm lg:font-medium">Complete checkout</div>

                <div className="bg-white lg:bg-[#F9F9F9] lg:p-6 mt-1">
                    <div className="space-y-2 bg-white p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs">User information</p>
                            <PencilIcon/>
                        </div>
                        <hr className="my-3"/>

                        <div className="space-y-3 text-xs text-[#282828] font-medium">
                            <div className="flex items-center justify-start gap-2"><SmileyIcon/> {userDetails.name}</div>
                            <div className="flex items-center justify-start gap-2"><MailIcon/>{userDetails.email}</div>
                            <div className="flex items-center justify-start gap-2"><CallIcon/>{userDetails.phoneNumber}</div>
                            <div className="flex items-center justify-start gap-2"><LocationIcon/>{userDetails.address}</div>
                        </div>
                    </div>

                    <div className=" bg-white p-4 mt-4 flex items-center justify-between">
                        <p>Total</p>
                        <p>&#8358; {totalAmount.toLocaleString()}</p>
                    </div>

                    <div className="bg-[#F9F9F9] p-6 lg:bg-white lg:p-0">
                    <p className="text-[10px] text-[#898989] lg:mt-4 font-medium">Delivery fee will be displayed on tracking page after 
                    product is printed and ready for dispatch.</p>

                    <p className="text-[10px] text-[#898989] mt-4 font-medium">Individuals willing to handle delivery personally can reach out to us.</p>
                    </div>

                    <div className="flex justify-end">
                        <button onClick={processPayment} disabled={loadingSubmitOrder} className="bg-black flex w-full lg:w-auto lg:inline-flex items-center justify-between lg:justify-center gap-2 text-white h-12 lg:h-9 px-3 rounded-full mt-4 disabled:cursor-progress">
                            Pay now 
                            {loadingSubmitOrder ? <Loader/> : <ArrowRight/>}
                        </button>
                    </div>
                </div>
            {/* </form> */}
        </div>
    )
}