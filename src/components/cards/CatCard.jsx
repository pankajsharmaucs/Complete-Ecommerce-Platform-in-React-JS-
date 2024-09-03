import React from 'react'
import { Link } from 'react-router-dom';
import "./card1.css"



const CatCard = ({ productData }) => {

  var api_base_url = import.meta.env.VITE_API_BASE_URL + "/magixs/category/";

  // console.log(productData);

  return (
    <>
      <div className='text-center cardBox col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 
        animate__animated animate__fadeIn mb-md-3  p-3' >
        <Link style={{ textDecoration: "none" }}
          to={`${productData.linkTo}`}
          className='innerBox'>
          <div className='card1 bg-white jcc mb-1 '>
            <div>
              <img src={`${api_base_url}${productData.cat_id}/${productData.image}`} alt="" className='cardImage' />
              <h4>{productData.cat_name}</h4>
            </div>
          </div>
        </Link>
      </div>

    </>
  )
}

export default CatCard