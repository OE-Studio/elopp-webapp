import React from "react";
import { Header } from "../../components/HEADER";
import { Brief } from "./components/BRIEF";
import { Passage } from "./components/PASSAGE";
import { Photo } from "./components/IMAGE";

export const Essay = () =>{
    return (
        <div>
            <Header title="Elluu P! The Unstoppable Tide: " text="The Unstoppable Tide: How the People's Collective Effort Towards a New Nigeria Found Its Voice in the Chant of Voters' Count, Led by @StephenMuoka6, and Carries the Hopes and Dreams of Many."/>

            <hr className="my-12"/>

            <div className="flex flex-col-reverse lg:flex-row gap-5 xl:gap-16">
                <div className="hidden lg:block">
                    <Brief/>
                </div>
                <div>
                    <Passage/>
                </div>

                <div>
                    <Photo/>
                </div>
            </div>
        </div>
    )
}