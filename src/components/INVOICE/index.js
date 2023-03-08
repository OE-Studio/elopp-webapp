import React from "react";
import invoiceLogo from '../../assets/images/invoiceLogo.png'
import QRCode from "react-qr-code";
import aesthetic from '../../assets/images/elupAesthetic.png'

export const Invoice = ({order}) =>{
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
                            value={`https://store.oestudio.digital/tracking?id=${order.trackingId}`}
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