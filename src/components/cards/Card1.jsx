import React from 'react'
import { Link } from 'react-router-dom';
import "./card1.css"



const Card1 = ({ productData }) => {

  var product_url = import.meta.env.VITE_API_BASE_URL+"/magixs/products/";
  // console.log(productData);
  return (
    <>
      <div className='text-center cardBox col-xl-2 col-lg-3 col-md-4 col-sm-6 col-4 
        animate__animated animate__fadeIn mb-md-3  p-3' >
        <Link style={{ textDecoration: "none" }} 
          to={`${productData.cat_name}/${(productData.slug).replace(' ','-')}/${productData.product_id}`} 
          className='innerBox'>
          <div className='card1 bg-white jcc mb-1 '>
            <img src={`${product_url}${productData.cat_id}/${productData.product_id}/${productData.img1}`} alt="" className='cardImage' />
          </div>
          {/* <h4>{productData.title}</h4> */}
        </Link>
      </div>

    </>
  )
}

export default Card1