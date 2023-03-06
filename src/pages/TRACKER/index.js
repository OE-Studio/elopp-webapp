import React from "react";
import { Header } from "../../components/HEADER";
import { TrackInput } from "../../components/INPUTS/track_input";

export const Tracker = () =>{
    return (
        <div>
            <Header title="Track delivery" text="Delivery time may take 3-5 working days, depending on our delivery partners. 
However, you can track status of delivery after pre-order.  "/>

            <TrackInput/>
        </div>
    )
}