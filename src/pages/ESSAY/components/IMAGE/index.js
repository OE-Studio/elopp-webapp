import React from "react";
import video from '../../../../assets/videos/big-obi.mp4'

export const Photo = () =>{
    const openTweeter = () =>{
        window.open("https://twitter.com/StephenMuoka6?s=20", "_blank")
    }
    return (
        <div className="lg:sticky top-32 left-0">
            <div className="w-full lg:w-72 xl:w-96 flex items-center justify-center">
                <video src={video} width="380" height="500" controls/>
            </div>

            <p className="text-xs text-[#898989] mt-3">
                Video credit <span className="cursor-pointer" onClick={openTweeter}>@StephenMuoka6</span> on twitter
            </p>
        </div>
    )
}