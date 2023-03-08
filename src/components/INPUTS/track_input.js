import React from "react";
import { ArrowRight } from "../../assets/icons/arrowRight";
import { WhiteLoader } from "../../assets/icons/whiteLoader";

export const TrackInput = ({onClick, trackId, onChange,loading}) =>{
    return (
        <div className="flex flex-col md:flex-row md:items-center md:border md:border-[#BEBEBE] md:rounded-full w-full lg:w-[660px] h-auto md:h-[72px] mx-auto overflow-hidden pr-4 mt-10">
            <input value={trackId} onChange={onChange} placeholder="Enter Tracking ID" className="border border-[#C0C0C0] rounded-full md:rounded-none md:border-none outline-none w-full h-14 md:h-full pl-4"/>

            <button disabled={loading || !trackId} onClick={onClick} className="w-full md:w-auto flex md:inline-flex h-14 md:h-auto px-6 md:px-2 lg:px-4 py-2 items-center justify-between md:justify-center gap-2 bg-[#282828] text-[#F9F9F9] rounded-full mt-5 md:mt-0 cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed dark-hover">
                Track
                {loading ? <WhiteLoader/> : <ArrowRight/>}
            </button>
        </div>
    )
}