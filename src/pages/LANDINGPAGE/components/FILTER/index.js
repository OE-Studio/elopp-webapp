import React from "react";
import { FilterPanel } from "./components/filterPanel";

export const Filter = ()=>{
    return (
        <div className="w-full md:w-80 lg:w-64 lg:sticky lg:top-32 lg:left-0  h-auto">
            <FilterPanel/>
        </div>
    )
}