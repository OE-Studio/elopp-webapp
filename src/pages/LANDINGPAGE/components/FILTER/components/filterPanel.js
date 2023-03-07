import React from "react";
import { ToggleComp } from "./toggle";
import { updateFilterList } from "../../../../../features/cartSlice";
import { useSelector, useDispatch } from "react-redux";

export const FilterPanel = () =>{
    const dispatch = useDispatch()
    let {filterList} = useSelector(state=>state.cart)

    const toggleFilter = (value, label) =>{
        // console.log(label)
        dispatch(updateFilterList(label))
    }


    return (
        <div className="w-full">
            <div className="w-full bg-[#F9F9F9] p-6">
                <ToggleComp checked={filterList.length === 10} label="All items"/>

                <hr/>

                <ToggleComp checked={filterList.find(item=>item === 'T-shirt')} label="T-shirt" onChange={toggleFilter}/>
                <ToggleComp checked={filterList.find(item=>item === 'Notepad')} label="Notepad" onChange={toggleFilter}/>
                <ToggleComp checked={filterList.find(item=>item === 'Hoodie')} label="Hoodie" onChange={toggleFilter}/>
                <ToggleComp checked={filterList.find(item=>item === 'Wrist band')} label="Wrist band" onChange={toggleFilter}/>
                <ToggleComp checked={filterList.find(item=>item === 'Stickers')} label="Stickers" onChange={toggleFilter}/>
                <ToggleComp checked={filterList.find(item=>item === 'Tote bag')} label="Tote bag" onChange={toggleFilter}/>
                <ToggleComp checked={filterList.find(item=>item === 'Sport bottle')} label="Sport bottle" onChange={toggleFilter}/>
                <ToggleComp checked={filterList.find(item=>item === 'Mug')} label="Mug" onChange={toggleFilter}/>
                <ToggleComp checked={filterList.find(item=>item === 'Cap')} label="Cap" onChange={toggleFilter}/>
                <ToggleComp checked={filterList.find(item=>item === 'Phone case')} label="Phone case" onChange={toggleFilter}/>
            </div>
        </div>
    )
}