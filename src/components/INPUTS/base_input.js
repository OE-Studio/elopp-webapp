import React from "react";
import { SearchIcon } from "../../assets/icons/search";

export const BaseInput = () =>{
    return (
        <div className="flex items-center border border-[#BEBEBE] rounded-full w-full lg:w-[660px] h-10 lg:h-16 mx-auto overflow-hidden">
            <div className="inline-flex px-2 lg:px-4">
                <SearchIcon/>
            </div>

            <input placeholder="Search merchandise here" className="border-none outline-none w-full h-full"/>
        </div>
    )
}