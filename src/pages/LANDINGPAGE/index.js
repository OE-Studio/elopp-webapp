import React, { useEffect, useState} from "react";
import { ItemCard } from "./components/CARDS/card";
import { Filter } from "./components/FILTER";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrentItem } from "../../features/cartSlice";
import Drawer from "../../components/DRAWER";
import { ItemDetails } from "./components/DETAILS";
import { FunnelIcon } from "../../assets/icons/funnel";
import { fetchAllIItems } from "../../features/cartSlice";
import { EmptyState } from "./components/EMPTYSTATE";
import aesthetics from '../../assets/images/elupAesthetic.png'
import { WhiteClose } from "../../assets/icons/whiteClose";
import { Link } from "react-router-dom";
import { Arrow45 } from "../../assets/icons/arrow45";
import { updateFilterList } from "../../features/cartSlice";
import useAnalyticsEventTracker from "../../useAnalyticsEventTracker";
import ReactGA from 'react-ga4'

const Popup = ({closeHandler,children}) =>{
    
    return (
        <div className="fixed h-screen w-screen p-5 bg-[#3e3e3e] bg-opacity-30 backdrop-blur-lg z-[3000] top-0 left-0 lg:hidden">
            <div className="w-full h-full overflow-y-scroll flex items-center justify-center relative">
                <div className="relative w-full md:w-auto h-auto inline-block mx-auto">
                    {children}

                    <div onClick={closeHandler} className="w-11 h-11 bg-black soft-shadow rounded-full flex items-center justify-center absolute -top-14 right-0 md:-right-6 dark-hover">
                        <WhiteClose/>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export const LandingPage = () =>{
    const gaEventTracker = useAnalyticsEventTracker('Landing page');

    ReactGA.event({
        category:"Visit page",
        action:"visit landing page",
        label:"visitor",
    })

    const {cart, showDetails, loadingItems, allItems, filterList} = useSelector(state=>state.cart)

    const [showFilter, setShowFilter] = useState(false)
    const [products, setProducts] = useState([])

    const dispatch = useDispatch()


    const handleCurrentItem=(item)=>{
        dispatch(changeCurrentItem(item))
    }

    useEffect(()=>{
        dispatch(fetchAllIItems())
        gaEventTracker('visiting')

        // eslint-disable-next-line
    }, [dispatch])

    useEffect(()=>{
        let filteredItems = allItems.filter(item=>{
            return filterList.find(list=>list === item.category)
        })
        setProducts(filteredItems)
    }, [filterList, allItems])

    const openTweeter = ()=> window.open("https://twitter.com/StephenMuoka6?s=20", "_blank")

    const toggleAllItems = () =>{
        dispatch(updateFilterList("all"))
    }

    return (
        <div>
            <div className="text-left md:text-center mt-9 lg:mt-8">
                <h1 className="text-3xl lg:text-6xl font-semibold grotesk text-left md:text-center">
                    Elluu P! Merchandise Centre
                </h1>
                <p className="mt-4 xl:mt-6 w-full lg:w-[600px] xl:w-3/4 2xl:w-1/2 grotesk text-left md:text-center mx-auto block">
                    The Unstoppable Tide: How the People's Collective Effort Towards a New Nigeria Found Its Voice in the Chant of Voters' Count, Led by <span className="cursor-pointer" onClick={openTweeter}>@StephenMuoka6</span>, and Carries the Hopes and Dreams of Many.
                </p>
            </div>

            <div className="flex items-center justify-start md:justify-center mt-5 2xl:mt-10">
                <Link to="/article" className=" inline-flex items-center justify-center border border-[#DFDFDF] rounded-full px-4 py-3 gap-3 light-hover">
                    Read our why
                    <Arrow45/>
                </Link>
            </div>
            

            <div className="mt-6 lg:mt-12 xl:mt-20 flex gap-8">
                <div className="w-64 hidden lg:block">
                    <Filter/>
                </div>

                {loadingItems ? (
                    <div className="h-96 w-full flex items-center justify-center">
                        <div className="inline-block rounded-full animate-spin">
                            <img src={aesthetics} alt="Elupee" className="block"/>
                        </div>
                    </div> 
                    )
                    :
                    products.length === 0 
                    ?(
                        <EmptyState onClick={toggleAllItems}/>
                    )
                    : (
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 w-full">
                            {products.map((i)=>{

                                let truthy = cart.find(c=>c.id === i.id)

                                return <ItemCard key={i.id} name={i.name} availableColours={i.availableColors} price={i.price} onList={truthy} onClick={()=>handleCurrentItem(i)}/>
                            })}
                        </div>
                    )
                }
            </div>

            <Drawer closeDrawer={()=>dispatch(changeCurrentItem())} visible={showDetails}>
                <ItemDetails/>
            </Drawer>

            {showFilter && <Popup closeHandler={()=>setShowFilter(false)}>
                <Filter/>
            </Popup>}

            <div onClick={()=>setShowFilter(true)} className="w-11 h-11 rounded-full lg:hidden fixed bottom-4 right-4 md:bottom-12 md:right-12 bg-black flex items-center justify-center">
                    <FunnelIcon/>
            </div>
        </div>
    )
}