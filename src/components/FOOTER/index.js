import React from "react";
import { DownloadIcon } from "../../assets/icons/download";
import { TweeterIcon } from "../../assets/icons/tweeter";
import {InstagramIcon} from '../../assets/icons/instagram'
import { FilledMailIcon } from "../../assets/icons/filledMail";

export const Footer = () =>{
    const year = new Date().getFullYear()
    return (
        <div className="flex justify-center lg:justify-between items-center flex-wrap lg:flex-nowrap space-y-7 lg:space-y-0 mx-auto bg-[#F9F9F9] py-6 lg:py-3 lg:fixed bottom-0 w-screen xl:px-8 text-sm">
            <div className="hidden lg:inline-block items-center justify-start h-full">&copy;{year}</div>

            <div className="inline-flex flex-wrap md:flex-nowrap justify-center items-center space-y-7 md:space-y-0 lg:mt-0 lg:gap-4 xl:gap-5">
                <div className="inline-flex items-center">Reach out to us for enquieries</div>

                <div className="inline-flex items-center justify-center bg-white soft-shadow py-2 px-3 rounded-full gap-2"><FilledMailIcon/> Ogunsleye123@gmail.com</div>

                <div className="inline-flex gap-4 items-center">
                    <div>Or online</div> 
                    <div className="inline-flex items-center justify-center bg-white soft-shadow py-2 px-3 rounded-full gap-2">
                        <TweeterIcon/>
                        <InstagramIcon/>
                        Leyeconnect
                    </div>
                </div>
            </div>

            <div className="inline-flex flex-wrap justify-center space-y-7 lg:space-y-0">
                <div className="inline-flex items-center justify-center bg-white soft-shadow py-2 px-3 rounded-full gap-2">
                    <DownloadIcon/> Download Brand/source file
                </div>

                <div className="w-full lg:hidden flex items-center justify-center">&copy; {year}</div>
            </div>
        </div>
    )
}