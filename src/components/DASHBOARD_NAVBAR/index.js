import React from "react";
import logo from '../../assets/images/logo.png'
import { Link } from "react-router-dom";
import { AdminLine } from "../../assets/icons/adminLine";

const DashboardNavBar = () =>{

    return (
        <div className=" bg-[#F9F9F9] sticky top-0 left-0 z-[1000]">
            <div className="flex items-center justify-between h-16 xl:h-28 new-container">
                <Link to="/" className="inline-flex">
                    <img src={logo} alt="Obi logo" className="w-14 h-14 block"/>
                </Link>

                
                <Link to="/tracker" className="inline-flex justify-center items-center gap-2 bg-white h-9 pl-3 pr-4 rounded-full soft-shadow cursor-pointer light-hover grotesk">
                    <AdminLine/>
                    Admin
                </Link>
            </div>
        </div>
    )
}


export default DashboardNavBar