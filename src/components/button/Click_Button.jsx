import React from 'react'
import { useNavigate } from 'react-router-dom'

const Click_Button = ({btnClassName,trigger,text}) => {
    const navigate=useNavigate();
    
    const mainFunction=()=>{
        if(trigger=="Logout"){
            localStorage.removeItem('token');
            window.location.href = '/';
            return;
        }
    }


    return (
        <>
            <button onClick={ ()=>mainFunction() } className={`btn ${btnClassName} my-3 py-2 w-100 fw-bold`} >
                { text }
            </button>
        </>
    )
}

export default Click_Button