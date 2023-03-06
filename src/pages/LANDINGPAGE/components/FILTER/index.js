import React from "react";
import { FilterPanel } from "./components/filterPanel";

export const Filter = ()=>{
    return (
        <div className="w-full md:w-80 lg:w-64 lg:sticky lg:top-32 lg:left-0">
            <p className="text-2xl lg:text-base font-medium lg:font-normal">Filter merch</p>

            <div className="mt-2 w-full">
                <FilterPanel/>
            </div>
        </div>
    )
}