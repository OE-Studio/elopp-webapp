import React, {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../endpoint";
import coffeti from '../../assets/images/coffeti.png'
import { DownloadIcon } from "../../assets/icons/download";
import { CopyIcon } from "../../assets/icons/copy";
import { CloseIcon } from "../../assets/icons/close";
import { Loader } from "../../assets/icons/loader";
import { Invoice } from "../../components/INVOICE";
import { Link } from "react-router-dom";


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
                }, 2000)
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
