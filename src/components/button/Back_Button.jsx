import React from 'react'
import { useNavigate  } from "react-router-dom";
import "./button.css";

const arrowIcon="/assets/common/arrow.png";

const Back_Button = () => {

    let navigate = useNavigate();

  return (
    
        <>
            <div className='mt-2 cp backButton1Box'>
                <div className='col-xl-2 ' onClick={()=>{  navigate(-1) }}  >
                <img src={arrowIcon} className='backButton1 me-2' alt="backBtn" /></div>
            </div>
        </>

      )
}

export default Back_Button