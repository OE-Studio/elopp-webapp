import React, {useEffect, useState} from "react";
import { Outlet } from "react-router";
import DashboardNavBar from "../components/DASHBOARD_NAVBAR";
import { Countdown } from "../components/COUNTDOWN";
import { useLocation } from "react-router";

export const AdminView = () =>{
    const [load, setLoad] = useState(false)

    const location = useLocation()

    useEffect(()=>{
        setLoad(false)
        setTimeout(()=>{
            setLoad(true)
        }, 3500)

        return(()=>false)
    }, [])

    useEffect(()=>{

        window.scrollTo({
            top:0
        })
    }, [location.pathname])

    return (
        <div className="">
            {load ? <div className="lg:pb-4">
                <DashboardNavBar/>

                <div className="new-container pb-12 lg:pb-12 min-h-screen">
                    <Outlet/>
                </div>
            </div> : (
                <Countdown/>
            )}
        </div>
    )
}