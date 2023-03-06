import React, { useEffect, useState} from "react";
import { Header } from "../../components/HEADER";
import { BaseInput } from "../../components/INPUTS/base_input";
import { ItemCard } from "./components/CARDS/card";
import { Filter } from "./components/FILTER";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrentItem } from "../../features/cartSlice";
import Drawer from "../../components/DRAWER";
import { ItemDetails } from "./components/DETAILS";
import { FunnelIcon } from "../../assets/icons/funnel";
import { CloseIcon } from "../../assets/icons/close";
import { fetchAllIItems } from "../../features/cartSlice";

const Popup = ({closeHandler,children}) =>{
    
    return (
        <div className="fixed h-screen w-screen p-5 bg-[#737373] bg-opacity-20 backdrop-blur-sm z-[3000] top-0 left-0">
            <div className="w-full h-full overflow-y-scroll flex items-center justify-center">
                {children}
            </div>

            <div onClick={closeHandler} className="w-9 h-9 bg-white soft-shadow rounded-full flex items-center justify-center absolute top-4 right-4 md:top-12 md:right-12">
                <CloseIcon/>
            </div>
        </div>
    )
}

export const LandingPage = () =>{
    const {cart, showDetails, loadingItems, allItems} = useSelector(state=>state.cart)

    const [showFilter, setShowFilter] = useState(false)

    const dispatch = useDispatch()

    const handleCurrentItem=(item)=>{
        dispatch(changeCurrentItem(item))
    }

    useEffect(()=>{
        dispatch(fetchAllIItems())
    }, [dispatch])

    return (
        <div>
            <Header title="Elluu P! Merchandise Centre" text="The Unstoppable Tide: How the People's Collective Effort Towards a New Nigeria Found Its Voice in the Chant of Voters' Count, Led by @StephenMuoka6, and Carries the Hopes and Dreams of Many."/>

            <div className="mt-5 lg:mt-8 2xl:mt-20 flex items-center justify-center gap-4">
                <BaseInput/>

                <div onClick={()=>setShowFilter(true)} className="w-9 h-9 rounded-full lg:hidden">
                    <div className="w-9 h-9 rounded-full border border-[#BEBEBE] flex items-center justify-center">
                        <FunnelIcon/>
                    </div>
                </div>
            </div>

            <div className="mt-6 lg:mt-12 xl:mt-20 flex gap-8">
                <div className="w-64 hidden lg:block">
                    <Filter/>
                </div>

                {loadingItems ? (
                    <div>Loading</div> 
                )
                    :
                    allItems.length === 0 
                    ?(
                        <div></div>
                    )
                    : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                            {allItems.map((i)=>{

                                let truthy = cart.find(c=>c.id === i.id)

                                return <ItemCard name={i.name} availableColours={i.availableColors} price={i.price} onList={truthy} onClick={()=>handleCurrentItem(i)}/>
                            })}
                        </div>
                    )
                }
            </div>

            <Drawer visible={showDetails}>
                <ItemDetails/>
            </Drawer>

            {showFilter && <Popup closeHandler={()=>setShowFilter(false)}>
                <Filter/>
            </Popup>}
        </div>
    )
}