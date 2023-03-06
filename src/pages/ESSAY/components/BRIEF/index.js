import React from "react";
import {Trolley} from '../../../../assets/icons/troley'
import { Link } from "react-router-dom";

export const Brief = () =>{
    return (
        <div className="sticky top-32 left-0">
            <p>In this brief</p>

            <p className="mt-5 text-[#4D4D4D]">We explain how the Collective Efforts of Nigerians Manifested in the Chant of Voters' Count Led by @StephenMuoka6 for the presidential election held on the 25th of February 2023 Carries with It the Hopes and Dreams of a Nation."</p>

            <Link to="/" className="text-base mt-5 border border-[#5B5B5B] rounded-full inline-flex items-center gap-2 px-4 py-2">
                <Trolley/>
                Go to store
            </Link>
        </div>
    )
}