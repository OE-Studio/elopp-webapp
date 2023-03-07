import React, {useState, useEffect} from "react";
import elupe from '../../assets/images/elupe.svg'
import './countdown.css'

export const Countdown =() =>{
    let [number, setNumber] = useState(74)


    useEffect(()=>{
        let timer

        let elem = document.querySelector(".loading-bar")

        let no = 0

        let multiple = 50


        timer = setInterval(()=>{
            if(no < 300) {
                no++
                elem.style.left = `${((no/300) * 100) - 100}%`

                if(no === multiple) {
                    multiple = multiple + 50
                    setNumber(prev=>prev+1)
                }
            }
        }, 10)

        return ()=>clearInterval(timer)
    }, [])

    return (
        <div className="min-h-screen w-full flex items-end justify-center overflow-x-hidden pb-8">

            <div className="inline-block new-container mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
                    <div className="text-6xl font-bold leading-none grotesk">Elluu P!</div>

                    <div className="text-[280px] xl:text-[500px] font-bold relative leading-none inline-flex items-center justify-center mt-24 md:mt-80 lg:mt-0 pointer-events-none md:w-[400px] lg:w-[610px] mx-auto grotesk">
                        {number}

                        <div className="absolute -top-16 lg:top-0 left-0 -translate-x-3/4  lg:-translate-x-1/2 inline-block">
                            <img className="block rolling" src={elupe} alt="logo"/>
                        </div>
                    </div>
                </div>

                <div className="w-full flex items-center gap-4 mt-9">
                    <div>loading</div>
                    <div className="bg-[#F4F4F4] h-px w-full relative overflow-hidden">
                        <div className="absolute  bg-black h-full w-full top-0 loading-bar"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}