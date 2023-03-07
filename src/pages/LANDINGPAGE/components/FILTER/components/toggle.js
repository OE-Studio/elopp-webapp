import React from "react";
import Checkbox from "react-custom-checkbox";
import { CheckIcon } from "../../../../../assets/icons/check";

export const ToggleComp = ({label, onChange, checked}) =>{
    
    
    return (
        <div className="flex items-center justify-between py-2 w-full">
            <div className="text-base lg:text-sm">{label}</div>
            <div className="p-0 h-[22px]">

                <Checkbox
                    icon={<CheckIcon/>}
                    name="my-input"
                    checked={checked}
                    onChange={(value, event) => {
                        onChange(value, label)
                    }}
                    disabled={label === 'All items'}
                    borderColor="#282828"
                    style={{ cursor: "pointer", borderRadius:"0px", borderWidth:"1px" }}
                />
            </div>
        </div>
    )
}