import React from "react";
import './index.css'



const Drawer = ({children, moreOption,showDetails, visible, closeDrawer})=>{

    return (
        <>
            {visible && <div className="fixed w-screen h-screen top-0 left-0 flex bg-[#001428] bg-opacity-30 z-[2000]">
                <div onClick={closeDrawer} className="lg:w-1/2 lg:flex justify-center pt-28 h-screen">
                    
                </div>

                <div className="w-full lg:w-1/2 bg-white h-full relative slide-left overflow-y-scroll bar">
                    <div className="w-full py-8 px-10 ">
                        {children}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Drawer