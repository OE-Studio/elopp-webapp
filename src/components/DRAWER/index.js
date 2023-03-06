import React from "react";



const Drawer = ({children, moreOption,showDetails, visible})=>{
    return (
        <>
            {visible && <div className="fixed w-screen h-screen top-0 left-0 flex bg-[#001428] bg-opacity-30 z-[2000]">
                <div className="hidden lg:w-1/2 lg:flex justify-center pt-28">
                    {showDetails && <div className="inline-flex w-full justify-center">
                            {moreOption}
                        </div>
                    }
                </div>

                <div className="w-full lg:w-1/2 bg-white h-full overflow-y-scroll">
                    <div className="w-full py-8 px-10">
                        {children}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Drawer