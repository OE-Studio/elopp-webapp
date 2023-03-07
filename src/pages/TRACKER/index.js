import React, {useState, useEffect} from "react";
import { Header } from "../../components/HEADER";
import { TrackInput } from "../../components/INPUTS/track_input";
import { useSearchParams } from "react-router-dom";
import { fetchOrder } from "../../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { OrderPane } from "./components/PANE";

export const Tracker = () =>{
    const [searchParams] = useSearchParams();
    const [trackId, setTrackId] = useState("")

    const {currentOrder, loadingOrder} = useSelector(state=>state.cart)

    const dispatch = useDispatch()

    useEffect(()=>{
        let id = searchParams.get("id")

        if(id){
            setTrackId(id)
            dispatch(fetchOrder(id))
        }

        // eslint-disable-next-line
    }, [])

    const searchOrder = async() =>{
        dispatch(fetchOrder(trackId))
    }

    return (
        <div>
            <Header title="Track delivery" text="Delivery time may take 3-5 working days, depending on our delivery partners. 
            However, you can track status of delivery after pre-order."/>

            <TrackInput trackId={trackId} onChange={(e)=>setTrackId(e.target.value)} onClick={searchOrder} loading={loadingOrder}/>

            <div className="mt-9">
                {currentOrder && Object.keys(currentOrder).length > 0 && <OrderPane order={currentOrder}/>}
            </div>
        </div>
    )
}