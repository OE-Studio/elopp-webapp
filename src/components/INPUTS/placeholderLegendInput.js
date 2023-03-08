import React, {useRef, useEffect, useState} from 'react'

export default function PlaceholderLegendInput({placeholder, onChange, name, type, value, disabled}) {
    const inputRef = useRef(null)
    const title = useRef(null)
    let spanRef = useRef(null)

    const [showError, setShowError] = useState(false)

    const focus = () =>{
        inputRef.current.focus()
    }

    const movePlaceholder = () =>{
        title.current.classList.remove("top-6")
        title.current.classList.add("top-2")
    }

    const checkInput = (e) =>{
        if(!e.target.value) {
            title.current.classList.remove("top-2")
            title.current.classList.add("top-6")
            if(e.target.name !== "landmark"){
                setShowError(true)
            }
            
            // contRef.classList.add("border", "border-[#EA596E]")
        }
        else {
            setShowError(false)
            // contRef.classList.remove("border", "border-[#EA596E]")

            if(type  &&  type=== "email" && value){
                if(value  && spanRef && !value.includes("@")) {
                    setShowError(true)
                    spanRef.textContent = "Please enter a valid email"
                }
            }
            else {
                setShowError(false)
                spanRef.textContent = ""
            }
        }
    }

    useEffect(()=>{
        if(type  &&  type=== "email" && value){
            if(value  && spanRef && !value.includes("@")) {
                setShowError(true)
                spanRef.textContent = "Please enter a valid email"
            }
        }
    }, [value, type])


  return (
    <div className='bg-neutral_100 h-16 relative flex items-end' onClick={focus} >
        <p ref={title} className='absolute top-6 my-auto transition-all text-text_100 text-xs text-[#898989]'>
            {placeholder} 
            {" "} {showError && <span className='text-[#EA596E]' ref={el=>spanRef=el}>This field is required</span>}
        </p>
        <input disabled={disabled} required onChange={onChange} value={value} name={name} type={type} onBlur={checkInput} onFocus={movePlaceholder} ref={inputRef} className='w-full bg-transparent h-10 outline-none text-sm'/>
    </div>
  )
}
