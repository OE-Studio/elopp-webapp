import React, {useState, useEffect} from "react";

export const Pagination = ({onChange, currentPage, pageSize, total}) =>{
    const [showOptions, setShowOptions] = useState(false)

    const clickHandler = (e) =>{
        onChange(e.target.textContent, currentPage)
        setShowOptions(false)
    }

    useEffect(()=>{
        let elem =  document.querySelector('.pagination')
        window.addEventListener('click', (e)=>{
            if(!elem.contains(e.target)){
                setShowOptions(false)
            }
        })
    },[])

    const previous = () =>{
        if(currentPage > 1){
            onChange(pageSize, Number(currentPage) - 1)
            setShowOptions(false)
        }
    }

    const next = () =>{
        if(currentPage < total){
            onChange(pageSize, Number(currentPage) +  1)
            setShowOptions(false)
        }
    }

    return (
        <td colSpan={7} className="px-6">
            <div className="w-full flex items-center justify-between py-3">
                <div className="relative w-28 pagination">
                    <div className="w-full h-9 rounded-full border border-[#E5ECF5] soft-shadow flex items-center px-3 bg-[#FBFDFE] cursor-pointer" onClick={()=>setShowOptions(!showOptions)}>{pageSize || 10} entries</div>

                    {showOptions && <ul className="w-full absolute -top-52 left-0 bg-white px-3 divide-y soft-shadow rounded-lg">
                        <li onClick={clickHandler} className="w-full py-2 hover:bg-[#FBFDFE]">5</li>
                        <li onClick={clickHandler} className="w-full py-2 hover:bg-[#FBFDFE]">10</li>
                        <li onClick={clickHandler} className="w-full py-2 hover:bg-[#FBFDFE]">20</li>
                        <li onClick={clickHandler} className="w-full py-2 hover:bg-[#FBFDFE]">30</li>
                        <li onClick={clickHandler} className="w-full py-2 hover:bg-[#FBFDFE]">40</li>
                        <li onClick={clickHandler} className="w-full py-2 hover:bg-[#FBFDFE]">50</li>
                    </ul>}
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-[#64748B]">
                        {currentPage} / {total}
                    </div>

                    <div className={`border border-[#E5ECF5] rounded-full py-2 px-3 font-semibold text-xs ${currentPage > 1 ? "cursor-pointer" : "cursor-not-allowed"}`} onClick={previous}>Previous</div>

                    <div className={`border border-[#E5ECF5] rounded-full py-2 px-3 font-semibold text-xs ${currentPage < total ? "cursor-pointer" : "cursor-not-allowed"}`} onClick={next}>Next</div>
                </div>
            </div>
        </td>
    )
}