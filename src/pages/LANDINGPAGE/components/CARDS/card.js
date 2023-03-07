import React, {useState} from "react";
import { PlusIcon } from "../../../../assets/icons/plus";
import { MinusIcon } from "../../../../assets/icons/minus";
import './card.css'

export const ItemCard = ({name, availableColours, price, onClick, onList}) =>{

    const [showText, setShowText] = useState(false)

    const handleShowText = () =>{
        setShowText(true)
    }

    const handleHideText = () =>{
        setShowText(false)
    }

    return (
        <div className="border border-[#F0F0F0] text-lg inline-block" onClick={onClick}>
            <div className="h-[270px] xl:h-[440px] w-full overflow-hidden">
                <div className="flex items-center justify-center h-[270px] xl:h-[440px] item zoom-bg"
                    style={{backgroundImage:`url(${availableColours[0].img.replace(" ", "")})`, backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center"}}
                >
                    
                </div>
            </div>

            <div className="bg-[#F9F9F9] p-6">
                <p>{name}</p>
                <div className="flex items-center justify-between mt-6">
                    <p className="inline-block py-2 px-3 soft-shadow rounded-full text-lg bg-white">&#8358; {price.toLocaleString()}</p>

                    <div onMouseEnter={handleShowText} onMouseLeave={handleHideText} className={`inline-flex px-4 h-[46px] rounded-full items-center justify-center gap-2 cursor-pointer text-white ${onList ? "bg-[#EB5757]" : "bg-[#333333]"}`}>
                        {onList ? <MinusIcon/> : <PlusIcon/>}

                        {showText && "View product"}
                    </div>
                </div>
            </div>
        </div>
    )
}