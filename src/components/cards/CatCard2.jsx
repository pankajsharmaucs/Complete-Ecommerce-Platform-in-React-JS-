import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./card1.css"



const CatCard2 = ({ data }) => {

  const [api_url, setApiUrl] = useState(import.meta.env.VITE_API_BASE_URL)
  return (
    <>
      <div className='text-center cardBox col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 
        animate__animated animate__fadeIn mb-md-3  p-3' >
        <Link style={{ textDecoration: "none" }}
          to={`/superAdmin/product?cat_id=${data.cat_id}&cat_name=${data.cat_name}`}
          className='innerBox'>
          <div className='card1 bg-white jcc flex-column mb-1 px-1'>
            <img src={`${api_url}/magixs/category/${data.cat_id}/${data.image}`} alt="" className='cardImage mb-3' />
            <h4>{data.cat_name}</h4>
          </div>
        </Link>
      </div>

    </>
  )
}

export default CatCard2