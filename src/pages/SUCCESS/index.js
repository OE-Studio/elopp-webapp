import React, {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../endpoint";
import coffeti from '../../assets/images/coffeti.png'
import { DownloadIcon } from "../../assets/icons/download";
import { CopyIcon } from "../../assets/icons/copy";
import { CloseIcon } from "../../assets/icons/close";
import invoiceLogo from '../../assets/images/invoiceLogo.png'
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import aesthetic from '../../assets/images/elupAesthetic.png'
import { Loader } from "../../assets/icons/loader";


export const SuccessPage = ()=>{
    const [searchParams] = useSearchParams();
    const [trackingCode, setTrackingCode] = useState("")
    const [loadingDownload, setLoadingDownload] = useState(false)
    const [loadingId, setLoadingId] = useState(false)

    const [showCopied, setShowCopied] = useState(false)

    const [order, setOrder] = useState({})

    useEffect(()=>{
        let reference = searchParams.get('reference')
        const myAbortController = new AbortController();

        const confirmPayment = async()=>{
            setLoadingId(true)
            try{
                let response = await axios.post(endpoints.confirmPayment, {reference}, { signal: myAbortController.signal })
                let data = await response.data

               if(data.success) {
                    setTrackingCode(data.trackingId)
                    sessionStorage.clear()
               }
               setLoadingId(false)
            }
            catch(err){
                setLoadingId(false)
            }
        }

        confirmPayment()

        return (()=>myAbortController.abort())
        // eslint-disable-next-line
    }, [])

    const copyToClipboard = () =>{
        navigator.clipboard.writeText(trackingCode)
        .then(()=>{
            setShowCopied(true)

            setTimeout(()=>{
                setShowCopied(false)
            }, 2000)
        })
        .catch((err)=>{
            console.log(err)
        })   
    }

    const track = async() =>{
        setLoadingDownload(true)

        try{
            let response = await axios.post(endpoints.trackOrder, {
                trackingId:trackingCode
            })
            let data = await response.data

            if(data.success){
                setOrder(data.currentTransaction)

                setTimeout(()=>{
                    setLoadingDownload(false)
                    let elem = document.querySelector('.print')
                    var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
                    WinPrint.document.write(elem.innerHTML);
                    WinPrint.document.close();
                    WinPrint.focus();
                    WinPrint.print();
                }, 3000)
            }
        }
        catch(err){
            setLoadingDownload(false)
        }
    }

    return (
        <div className="flex items-center justify-center py-12">
            <div className="inline-block mx-auto bg-[#F9F9F9] w-full md:w-80 p-6 relative">
                <img src={coffeti} alt="Celebration" className="w-20 h-20 rounded-full mx-auto"/>

                <p className="mt-6 font-bold text-2xl text-center">Payment Successful</p>

                <p className="text-sm mt-6 text-center">
                Thank you for being a part of this movement towards a more transparent, socially responsible, and accountable society.
                </p>

                <div className="flex items-center justify-between p-2 border border-[#DFDFDF] mt-6">
                    <div className="inline-block">
                        <p className="text-[#8D8D8D] text-xs">Tracking code:</p>
                        <p className="track_id mt-0.5">{trackingCode}</p>
                    </div>

                    <div onClick={copyToClipboard} className="inline-flex items-center justify-center relative">
                        {loadingId ? <Loader/> : <CopyIcon/>}

                        {showCopied && <div className="absolute -left-full -top-10 text-[#446F22] bg-[#F4F8F1] rounded-full py-1 px-2 text-sm border border-[#446F22]">
                            Copied
                        </div>}
                    </div>
                </div>

                <button disabled={loadingDownload} onClick={track} className="w-full flex items-center justify-between mt-6 px-6 h-14 bg-black text-white rounded-full disabled:bg-gray-600 disabled:cursor-not-allowed dark-hover">
                    Download Receipt
                    {loadingDownload ? <Loader/> : <DownloadIcon/>}
                </button>

                <Link to="/" className="w-9 h-9 rounded-full bg-white soft-shadow absolute -top-10 -right-10 flex items-center justify-center light-hover">
                    <CloseIcon/>
                </Link>
            </div>

            <div className="w-0 overflow-hidden h-0">
               {order && Object.keys(order).length > 0 ? <div className="w-screen min-h-screen flex items-center pt-12 print">
                    <Invoice order={order}/>
                </div> : ""}
            </div>
        </div>
    )
}

const Invoice = ({order}) =>{
    const {userDetails} = order
    return (
        <div className="" style={{width:"100vw", minHeight:"calc(100vh-30px)", display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center", fontFamily:"'Inter', sans-serif"}}>
            <div style={{width:"100%"}}>
            {/* header */}
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
                <div style={{display:"inline-block"}}>
                    <img style={{height:"68px", width:"68px"}} src={invoiceLogo} alt="logo"/>
                    <p style={{marginTop:"8px", fontSize:"12px"}}>Payment for Order purchase</p>
                    <p style={{marginTop:"8px", fontWeight:"bold"}}>#{order.totalPrice}</p>
                    <p style={{marginTop:"8px", fontSize:"10px", color:"#898989"}}>Generated on:{order.createdAt}</p>
                </div>

                <div style={{display:"inline-block"}}>
                    <p style={{fontSize:"10px", color:"#8D8D8D"}}>Tracking code</p>
                    <p style={{marginTop:"4px"}}>{order.trackingId}</p>

                    <div style={{width:"80px",height:"80px", padding:"16px", border:"1px solid #DFDFDF"}}>
                        <QRCode 
                            value={`http://localhost:3000/tracking?id=${order.trackingId}`}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        />
                    </div>
                </div>
            </div>

            <hr style={{margin:"16px 0px"}}/>

            <div style={{fontSize:"10px"}}>
                <p style={{color:"#898989"}}>Customer</p>

                <div style={{marginTop:"12px"}}>
                    <p>{userDetails.name}</p>
                    <p>{userDetails.phoneNumber}</p>
                    <p>{userDetails.email}</p>
                    <p>{userDetails.address}</p>
                    <p>{userDetails.state}</p>
                </div>
            </div>

            <hr style={{margin:"16px 0px"}}/>

            <div style={{width:"100%"}}>
                <table style={{width:"100%"}}>
                    <thead className="">
                        <tr style={{color:"#475467", fontSize:"10px"}}>
                            <th style={{fontSize:"10px", color:"#475467", padding:"8px 8px", textAlign:"left", borderBottom:"1px solid #EAECF0"}}>S/n</th>
                            <th style={{fontSize:"10px", color:"#475467", padding:"8px 8px", textAlign:"left", borderBottom:"1px solid #EAECF0"}}>Product Item</th>
                            <th style={{fontSize:"10px", color:"#475467", padding:"8px 8px", textAlign:"left", borderBottom:"1px solid #EAECF0"}}>Qt</th>
                            <th style={{fontSize:"10px", color:"#475467", padding:"8px 8px", textAlign:"right", borderBottom:"1px solid #EAECF0"}}>Unit Price</th>
                            <th style={{fontSize:"10px", color:"#475467", padding:"8px 8px", textAlign:"right", borderBottom:"1px solid #EAECF0"}}>Subtotal</th>
                        </tr>
                    </thead>

                    <tbody>
                        {order.order.map((o, index)=>{
                            let bg =  (index + 1) % 2 === 0  ? "#FFFFFF" : "#F9FAFB"
                            return (
                                <tr>
                                    <td style={{color:"#475467", padding:"8px 8px", borderBottom:"1px solid #EAECF0", borderCollapse:"collapse", backgroundColor:bg}}>
                                        {index + 1}
                                    </td>
                                    <td style={{color:"#475467", padding:"8px 8px", borderBottom:"1px solid #EAECF0", borderCollapse:"collapse", backgroundColor:bg}}>
                                        {o.ItemProp.name}
                                    </td>
                                    <td style={{color:"#475467", padding:"8px 8px", borderBottom:"1px solid #EAECF0", borderCollapse:"collapse", backgroundColor:bg}}>
                                        {o.quantity}
                                    </td>
                                    <td style={{color:"#475467", padding:"8px 8px", borderBottom:"1px solid #EAECF0", borderCollapse:"collapse", textAlign:"right", backgroundColor:bg}}>
                                        &#8358; {o.price}.00
                                    </td>
                                    <td style={{color:"#475467", padding:"8px 8px", borderBottom:"1px solid #EAECF0", borderCollapse:"collapse", textAlign:"right", backgroundColor:bg}}>&#8358; {o.price * o.quantity}.00</td>
                                </tr>
                            )
                        })}

                        <tr>
                            <td></td>    
                            <td></td>    
                            <td></td>    
                            <td style={{color:"#475467", padding:"8px 8px", borderBottom:"1px solid #EAECF0", borderCollapse:"collapse", fontWeight:"bold", position:"relative", textAlign:"right"}}>
                                <img src={aesthetic} style={{height:"73px", width:"73px", position:"absolute", top:"0px", left:"0px", transform:"translateX(-50%)"}} alt="banner"/>
                                Total
                            </td>    
                            <td style={{color:"#475467", padding:"8px 8px", borderBottom:"1px solid #EAECF0", borderCollapse:"collapse", fontWeight:"bold", textAlign:"right"}}>&#8358; {order.totalPrice}.00</td>   
                        </tr>

                    </tbody>
                </table>
            </div>
            </div>

            <div style={{borderTop:"1px solid #898989", paddingTop:"12px", fontSize:"10px", paddingBottom:"16px", width:"100%", marginTop:"80px"}}>
                <p style={{color:"#898989"}}>Delivery time may take 3-5 working days, depending on our delivery partners. However, you can track status of delivery after pre-order.  </p>

                <p style={{color:"#282828", marginTop:"12px", fontFamily:"'Familjen Grotesk', sans-serif"}}>Reach out to us for enquiries Ogunsleye123@gmail.com Or on twitter @Leyeconnect</p>
            </div>
        </div>
    )
}