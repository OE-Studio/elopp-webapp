import React from "react";
import {CallIcon} from '../../../../assets/icons/call'
import {LocationIcon} from '../../../../assets/icons/location'
import {SmileyIcon} from '../../../../assets/icons/smiley'
import { DownloadIcon } from '../../../../assets/icons/download'
import { trackstatus } from "../../../../utils";
import { MailIcon } from "../../../../assets/icons/mail";
import { Invoice } from "../../../../components/INVOICE";


export const OrderPane = ({order}) =>{
    const {userDetails} = order

    const track = () =>{
        let elem = document.querySelector('.print')
        var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        WinPrint.document.write('<html><head><title></title>');
        WinPrint.document.write('</style>');
        WinPrint.document.write('</head>');
        WinPrint.document.write('<body>');
        WinPrint.document.write("<center>header</center>");
        WinPrint.document.write(elem.innerHTML);
        WinPrint.document.write('</body>');
        WinPrint.document.write('</html>');
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
    }

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

                <button onClick={track} className="w-full flex items-center justify-between mt-4 lg:mt-6 px-6 h-14 bg-black text-white rounded-full disabled:bg-gray-600 disabled:cursor-not-allowed">
                    Download Receipt
                    <DownloadIcon/>
                </button>
            </div>

            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-14">
                {/* items */}
                <div className="">
                    {order.order.map(o=>{
                        let imgSrc = o.ItemProp.availableColors.filter(color=> color.color === o.color)

                        return (
                            <div className="flex items-start gap-4 py-6 border-y border-[#DFDFDF] border-collapse">
                                <div className="flex items-center justify-center w-40 h-32">
                                    <div className="w-40 h-32" style={{backgroundImage:`url(${imgSrc[0].img.replace(" ", "")})`, backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm xl:text-lg">{o.ItemProp.name}</p>
                                    <div className="mt-3">
                                        <div className="text-[#898989] text-xs xl:text-sm">{o.ItemProp.description}</div>

                                        <div className="flex items-center gap-8 text-xs xl:text-sm text-[#898989] mt-3">
                                            <p>Qty: {o.quantity}</p>
                                            <p>Size: {o.quantity || "nill"}</p>
                                        </div>

                                        <div className="mt-3 text-sm xl:text-base">&#8358; {o.price}</div>
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
                                    <p className={s.status !== "completed" && "text-[#C0C0C0]"}>{s.step}</p>
                                    <p className={`${s.status === "completed" ? "text-[#898989]" : "text-[#C0C0C0]"}  text-sm mt-1`}>{s.detail}</p>
                                    
                                    <div className={`${s.status === "completed" ? "text-[#898989]" : "text-[#C0C0C0]"}  text-sm mt-6 flex items-center gap-2 text-[8px]`}>
                                        <div className="rounded-full border border-[#AAAAAA] px-2 py-0.5">{s.status}</div>
                                        {/* <div>{s.date ? s.date : s.status}</div> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="w-0 overflow-hidden h-0">
               {order && Object.keys(order).length > 0 ? <div className="w-screen min-h-screen flex items-center pt-12 print">
                    <Invoice order={order}/>
                </div> : ""}
            </div>
        </div>
    )
}