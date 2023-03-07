import React from "react";
import {CallIcon} from '../../../../assets/icons/call'
import {LocationIcon} from '../../../../assets/icons/location'
import {SmileyIcon} from '../../../../assets/icons/smiley'
import { DownloadIcon } from '../../../../assets/icons/download'
import { trackstatus } from "../../../../utils";
import { MailIcon } from "../../../../assets/icons/mail";
// import { DownloadIcon } from "../../../../assets/icons/download";


export const OrderPane = ({order}) =>{
    const {userDetails} = order
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-14">
            {/* user details */}
            <div className="col-span-1">
                <div className="border border-[#DFDFDF] p-4 text-xs text-[#282828]">
                    <p className="text-[#898989]">User Information</p>

                    <hr className="my-3"/>

                    <div className="space-y-3">
                        <div className="flex items-center justify-start gap-2"><SmileyIcon/> {userDetails.name}</div>
                        <div className="flex items-center justify-start gap-2"><MailIcon/>{userDetails.email}</div>
                        <div className="flex items-center justify-start gap-2"><CallIcon/>{userDetails.phoneNumber}</div>
                        <div className="flex items-center justify-start gap-2"><LocationIcon/>{userDetails.address}</div>
                    </div>
                </div>

                <button className="w-full flex items-center justify-between mt-4 lg:mt-6 px-6 h-14 bg-black text-white rounded-full disabled:bg-gray-600 disabled:cursor-not-allowed">
                    Download Receipt
                    <DownloadIcon/>
                </button>
            </div>

            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-14">
                {/* items */}
                <div className="">
                    {order.order.map(o=>{
                        // let imgSrc = o.ItemProp.availableColors.filter(color=> color.color === order.color)

                        return (
                            <div className="flex items-start gap-4 py-6 border-y border-[#DFDFDF] border-collapse">
                                {/* <div className="flex items-center justify-center w-40 h-32">
                                    <div className="w-40 h-32" style={{backgroundImage:`url(${imgSrc.img.replace(" ", "")})`, backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
                                    </div>
                                </div> */}

                                <div>
                                    <p className="text-lg">{o.ItemProp.name}</p>
                                    <div className="mt-3">
                                        <div className="text-[#898989] text-sm">{o.ItemProp.description}</div>

                                        <div className="flex items-center gap-8 text-sm text-[#898989] mt-3">
                                            <p>Qty: {o.quantity}</p>
                                            <p>Size: {o.quantity || "nill"}</p>
                                        </div>

                                        <div className="mt-3">&#8358; {o.price}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* status */}
                <div className="w-full space-y-1">
                    {trackstatus.map((s)=>{
                        return (
                            <div className="gap-3 flex">
                                {/* green stuff */}
                                <div className="felx flex-col items-center justify-between">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${s.status === 'completed' ? 'border-[#74A54D]' : 'border-[#DFDFDF]'}`}>
                                        <div className={`w-3 h-3 rounded-full  ${s.status === 'completed' ? 'bg-[#B1D099]' : 'bg-[#DFDFDF]'}`}></div>
                                    </div>
                                    <div className={`w-px h-32 lg:h-28 mx-auto mt-1  ${s.status === 'completed' ? 'bg-[#74A54D]' : 'bg-[#DFDFDF]'}`}></div>
                                </div>

                                {/* Right side */}
                                <div className="pb-7">
                                    <p>{s.step}</p>
                                    <p className="text-[#898989] text-sm mt-1">{s.detail}</p>
                                    
                                    <div className="text-[#898989] text-sm mt-6 flex items-center gap-2 text-[8px]">
                                        <div className="rounded-full border border-[#AAAAAA] px-2 py-0.5">{s.status}</div>
                                        {/* <div>{s.date ? s.date : s.status}</div> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}