import React from 'react'
import "./button.css";
const arrowIcon="/assets/common/arrow.png";

const Back_Component = ({setShowSummary}) => {

  return (
    
        <>
            <div className='mt-2 cp backButton1Box'>
                <div className='col-xl-2 '  onClick={()=>{ setShowSummary(false)} } >
                <img src={arrowIcon} className='backButton1 me-2' alt="backBtn" />Back</div>
            </div>
        </>

      )
}

export default Back_Component