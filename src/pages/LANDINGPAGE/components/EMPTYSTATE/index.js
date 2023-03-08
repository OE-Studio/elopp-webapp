import React from "react";
import emptyCart from '../../../../assets/images/emptyCart.png'
import { SettingsList } from "../../../../assets/icons/settingsList";

export const EmptyState = ({onClick}) =>{
    return (
        <div className="w-full flex items-center justify-center h-96 bg-[#F9F9F9]">
            <div className="inline-flex flex-col items-center justify-center">
                <img src={emptyCart} alt="bag placeholder" className="w-16 h-16 mx-auto block"/>
                <p className="mt-4 text-[#999999]">You have switched off all item toggle, turn on to see merchs </p>

                <div onClick={onClick} className="inline-flex items-center justify-center bg-white soft-shadow h-9 px-2 rounded-full mt-4 gap-2 mx-auto cursor-pointer light-hover">
                    <SettingsList/>
                    Turn on all items
                </div>
            </div>
        </div>
    )
}