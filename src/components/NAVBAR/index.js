import React from "react";
import logo from '../../assets/images/logo.png'
import { TruckIcon } from "../../assets/icons/truck";
import { BagIcon } from "../../assets/icons/bag";
import { BookIcon } from "../../assets/icons/book";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () =>{

    const {cart}  = useSelector(state=>state.cart)
    console.log(cart)

    return (
        <div className=" bg-[#F9F9F9] sticky top-0 left-0 z-[1000]">
            <div className="flex items-center justify-between h-16 xl:h-28 new-container">
                <Link to="/" className="inline-flex">
                    <img src={logo} alt="Obi logo" className="w-14 h-14 block"/>
                </Link>

                <div className="flex items-center gap-4">
                    <div className="inline-flex justify-center items-center gap-2 bg-white h-9 pl-3 pr-4 rounded-full soft-shadow">
                        <TruckIcon/>
                        Track order
                    </div>
                    <Link to="/cart" className="inline-flex justify-center items-center h-9 w-9 rounded-full bg-white soft-shadow relative">
                        <BagIcon/>

                        <div className="w-[14px] h-[14px] rounded-full bg-[#FF6A6A] text-white text-[10px] flex items-center justify-center absolute top-0 right-0">{cart.length}</div>
                    </Link>

                    <Link to="/essay" className="inline-flex justify-center items-center h-9 w-9 rounded-full bg-white soft-shadow relative">
                        <BookIcon/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar