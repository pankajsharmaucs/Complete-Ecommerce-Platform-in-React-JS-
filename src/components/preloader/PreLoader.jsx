import React from 'react'
import "./preLoader.css"
import preLoaderImage from "/assets/preloader3.gif"
import companyLogo from "/assets/common/company_logo.png"

const PreLoader = ({ msg }) => {
  return (
    <div className='preLoaderBox'>
      <div className='col-12 text-center'>
        <img style={{ width: "120px" }} src={preLoaderImage} alt="preloader image" />
        <h6 className='text-secondary'>{msg}</h6>
      </div>
    </div>
  )
}

export default PreLoader