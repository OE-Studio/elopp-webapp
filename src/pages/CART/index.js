import React,{useEffect}  from 'react'
import { Header } from "../../components/HEADER";
import {CartItemCard} from './components/cartItemCard'
import {CheckoutForm} from './components/checkoutForm'
import {DetailsConfirmation} from './components/detailsConfirmation'
import {useSelector, useDispatch} from "react-redux"
import {changeCurrentStep} from '../../features/cartSlice'

export const Cart = () =>{
    const {currentStep} = useSelector(state=>state.cart)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(changeCurrentStep("checkout"))
    }, [dispatch])

    return (
        <div>
            <Header title="Check out" text="Delivery time may take 3-5 working days, depending on our delivery partners. However, you can track status of delivery after pre-order. "/>

            <div className="flex mt-10 xl:mt-20 lg:gap-8 xl:gap-20">
                <div className="w-full lg:w-3/4 ">
                    <CartItemCard/>
                </div>

                <div className="hidden lg:block lg:w-1/4">
                    {currentStep === "checkout" && <CheckoutForm/>}
                    {currentStep === "details" && <DetailsConfirmation/>}
                </div>
            </div>
        </div>
    )
}