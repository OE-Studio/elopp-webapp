import React from "react";

export const Header = ({title, text}) =>{
    return (
        <div className="text-left md:text-center mt-9 lg:mt-8">
            <h1 className="text-3xl lg:text-6xl font-semibold grotesk text-left md:text-center">{title}</h1>
            <p className="mt-4 xl:mt-6 w-full lg:w-[600px] xl:w-3/4 2xl:w-1/2 text-left md:text-center mx-auto block">{text}</p>
        </div>
    )
}