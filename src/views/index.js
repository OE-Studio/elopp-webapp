import React, {useEffect, useState} from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NAVBAR";
import { Footer } from "../components/FOOTER";
import { Countdown } from "../components/COUNTDOWN";
import { useLocation } from "react-router";

export const MainView = () =>{
    const [load, setLoad] = useState(false)
    const [showFooter, setShowFooter] = useState(true)

    const location = useLocation()

    useEffect(()=>{
        setLoad(false)
        setTimeout(()=>{
            setLoad(true)
        }, 3500)

        return(()=>false)
    }, [])

    useEffect(()=>{
        let trimmed = location.pathname.replace("/", "")
        if(trimmed === "cart" || trimmed === "checkout") {
            setShowFooter(false)
        }
        else {
            setShowFooter(true)
        }

        window.scrollTo({
            top:0
        })
    }, [location.pathname])

    return (
        <div className="">
            {load ? <div className="lg:pb-20">
                <NavBar/>

                <div className="new-container pb-12 lg:pb-12 min-h-screen">
                    <Outlet/>
                </div>

                {showFooter && <Footer/>}
            </div> : (
                <Countdown/>
            )}
        </div>
    )
}