import React from "react";

export const Header = ({title, text}) =>{
    return (
        <div className="text-left md:text-center mt-9 lg:mt-8">
            <h1 className="text-3xl lg:text-6xl font-semibold grotesk">{title}</h1>
            <p className="mt-4 xl:mt-6 w-full lg:w-[600px] text-center mx-auto block">{text}</p>
        </div>
    )
}