import React, {useEffect, useState} from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NAVBAR";
import { Footer } from "../components/FOOTER";
import { Countdown } from "../components/COUNTDOWN";

export const MainView = () =>{
    const [load, setLoad] = useState(false)

    useEffect(()=>{
        setLoad(false)
        setTimeout(()=>{
            setLoad(true)
        }, 3500)

        return(()=>false)
    }, [])

    return (
        <div className="">
            {load ? <div className="lg:pb-20">
                <NavBar/>

                <div className="new-container pb-12 lg:pb-12 min-h-screen">
                    <Outlet/>
                </div>

                <Footer/>
            </div> : (
                <Countdown/>
            )}
        </div>
    )
}