import React from "react";
import { ToggleComp } from "./toggle";

export const FilterPanel = () =>{
    return (
        <div className="w-full">
            <div className="w-full bg-[#F9F9F9] p-6">
                <ToggleComp label="All items" onChange={()=>{}}/>

                <hr/>
                
                <ToggleComp label="All items" onChange={()=>{}}/>
                <ToggleComp label="All items" onChange={()=>{}}/>
                <ToggleComp label="All items" onChange={()=>{}}/>
                <ToggleComp label="All items" onChange={()=>{}}/>
                <ToggleComp label="All items" onChange={()=>{}}/>
                <ToggleComp label="All items" onChange={()=>{}}/>
                <ToggleComp label="All items" onChange={()=>{}}/>
                <ToggleComp label="All items" onChange={()=>{}}/>
                <ToggleComp label="All items" onChange={()=>{}}/>
                <ToggleComp label="All items" onChange={()=>{}}/>
                <ToggleComp label="All items" onChange={()=>{}}/>
                <ToggleComp label="All items" onChange={()=>{}}/>
            </div>
        </div>
    )
}