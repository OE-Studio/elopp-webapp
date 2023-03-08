import React, {useEffect, useState} from "react";
import PlaceholderLegendInput from "../../../components/INPUTS/placeholderLegendInput";
import { useSelector } from "react-redux";
import { ArrowRight } from "../../../assets/icons/arrowRight";
import { updateUserDetails } from "../../../features/cartSlice";
import { useDispatch } from "react-redux";
import { changeCurrentStep } from "../../../features/cartSlice";
import axios from 'axios'
import { ArrowDown } from "../../../assets/icons/arrowDown";
import {Loader} from '../../../assets/icons/loader'
import { useNavigate } from "react-router-dom";

export const CheckoutForm = () =>{
    const navigate = useNavigate()
    const {cart, userDetails} = useSelector(state=>state.cart)
    const [totalAmount, setTotalAmount] = useState(0)
    const [formUserDetails, setFormUserDetails] = useState(userDetails)
    const [states, setStates] = useState([])
    const [regions, setRegions] = useState([])

    const [loadingState, setLoadingState] = useState(false)
    const [loadingRegion, setLoadingRegion] = useState(false)
    const [disableButton, setDisableButton] = useState(true)

    useEffect(()=>{
        let total = 0
        cart.map(c=>{
            let productTotal = c.price * c.quantity
            total+=productTotal
            return false
        })
        setTotalAmount(total)
    }, [cart])

    const fetchStates = async() =>{
        setLoadingState(true)
        try{
            let response = await axios.get("https://locus.fkkas.com/api/states")
            let data = await response.data
            
            if(data?.data){
                setStates(data.data)
            }
            setLoadingState(false)
        }
        catch(err){
            setLoadingState(false)
        }
    }

    const fetchRegions = async(city)=>{
        setLoadingRegion(true)
        try{
            let response = await axios.get(`https://locus.fkkas.com/api/regions/${city}`)
            let data = await response.data
            
            if(data?.data){
                setRegions(data.data)
            }

            setLoadingRegion(false)
        }
        catch(err){
            setLoadingRegion(false)
        }
    }

    useEffect(()=>{
        fetchStates()
    },[])

    const userDetailsHandler = (e) =>{
        setFormUserDetails(prev=>{
            return ({...prev, [e.target.name]:e.target.value})
        })

        if(e.target.name === "state"){
            fetchRegions(e.target.value)
        }
    }

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(updateUserDetails({
            ...formUserDetails, landmark:formUserDetails.landmark || "empty"
        }))

        let cheker = Object.keys(formUserDetails).filter(detail=>{
            if(detail === "landmark") {
                return false
            }
            else if(detail === "email"){
                if(!formUserDetails[detail].includes("@")){
                    return true
                }
                else {
                    return false
                }
                
            }
            else return formUserDetails[detail] === ""
        })

        if(cheker.length > 0 || cart.length === 0) {
            setDisableButton(true)
        }
        else setDisableButton(false)
    }, [formUserDetails, dispatch, cart.length])

    const nextStep = () =>{
        window.scrollTo({
            top:0
        })
        
        dispatch(changeCurrentStep("details"))
    }

    return (
        <div className="">
            <form>
                <div className="text-3xl font-bold lg:text-sm lg:font-medium">Complete checkout</div>

                <div className="bg-[#F9F9F9] p-6 mt-2">
                    <div className="space-y-2 bg-white p-4">
                        <p className="text-xs text-[#898989]">Subtotal</p>
                        <p className="text-2xl">&#8358; {totalAmount.toLocaleString()}</p>
                        <p className="text-[10px] text-[#898989]">No delivery fee added</p>
                    </div>

                    <p className="text-xs text-[#898989] mt-4">User Information</p>
                    <div className="divide-y divide-[#DFDFDF] border-b border-b-[#DFDFDF]">
                        <PlaceholderLegendInput value={formUserDetails.name} disabled={cart.length === 0} onChange={userDetailsHandler} name="name" placeholder="Name"/>
                        <PlaceholderLegendInput value={formUserDetails.email} disabled={cart.length === 0} onChange={userDetailsHandler} name="email" placeholder="Email" type="email"/>
                        <PlaceholderLegendInput value={formUserDetails.phoneNumber} disabled={cart.length === 0} type="number" onChange={userDetailsHandler} name="phoneNumber" placeholder="Phone number"/>

                        <div className="w-full relative">
                            <select defaultValue={formUserDetails.state} disabled={cart.length === 0} name="state" onChange={userDetailsHandler} className="size-select border-none bg-transparent focus:outline-none w-full h-16 text-base md:text-sm disabled:text-[#898989]">
                                <option value="">Select State</option>

                                {states && states.length > 0 && states.map(s=>{
                                    return <option value={s.alias}>{s.name}</option>
                                })}
                            </select>

                            <div className="absolute top-1/2 right-1 -translate-y-1/2 inline-block pointer-events-none">
                                {loadingState ? <Loader/> :<ArrowDown/>}
                            </div>
                        </div>

                        <div className="w-full relative">
                            <select defaultValue={formUserDetails.city} disabled={!formUserDetails.state || cart.length === 0} name="city" onChange={userDetailsHandler} value={formUserDetails.city} className="size-select border-none bg-transparent focus:outline-none w-full h-16 text-base md:text-sm disabled:text-[#898989]">
                                <option value="">Select Region</option>

                                {regions && regions.length > 0 && regions.map(r=>{
                                    return <option value={r.name}>{r.name}</option>
                                })}
                            </select>

                            <div className="absolute top-1/2 right-1 -translate-y-1/2 inline-block pointer-events-none">
                                {loadingRegion ? <Loader/> :<ArrowDown/>}
                            </div>
                        </div>

                        <PlaceholderLegendInput value={formUserDetails.address} disabled={cart.length === 0} onChange={userDetailsHandler} name="address" placeholder="Address"/>
                        <PlaceholderLegendInput value={formUserDetails.landmark} disabled={cart.length === 0} onChange={userDetailsHandler} placeholder="Landmark" name="landmark"/>
                    </div>

                    <div className="flex justify-end">
                        <button disabled={disableButton} onClick={nextStep} className="bg-black items-center gap-2 text-white h-9 px-3 rounded-full mt-4 hidden lg:inline-flex disabled:bg-[#878585] disabled:cursor-not-allowed">
                            Continue <ArrowRight/>
                        </button>

                        <button onClick={()=>navigate("/order-confirmation")} disabled={disableButton}  className="bg-black inline-flex items-center justify-between text-white h-14 px-3 rounded-full mt-4 w-full lg:hidden disabled:bg-[#878585] disabled:cursor-not-allowed">
                            Continue <ArrowRight/>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}