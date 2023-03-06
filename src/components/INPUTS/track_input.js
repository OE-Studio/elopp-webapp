import React from "react";
import { ArrowRight } from "../../assets/icons/arrowRight";

export const TrackInput = () =>{
    return (
        <div className="flex items-center border border-[#BEBEBE] rounded-full w-full lg:w-[660px] h-10 lg:h-[72px] mx-auto overflow-hidden pr-4 mt-10">
            <input placeholder="Search merchandise here" className="border-none outline-none w-full h-full pl-4"/>

            <div className="inline-flex px-2 lg:px-4 py-2 items-center gap-2 bg-[#282828] text-[#F9F9F9] rounded-full">
                Track
                <ArrowRight/>
            </div>
        </div>
    )
}