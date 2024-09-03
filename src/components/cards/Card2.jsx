import React from 'react'
import { Link } from 'react-router-dom';
import "./card1.css"



const Card2 = ({ productData,catName }) => {

  var api_base_url = import.meta.env.VITE_API_BASE_URL+"/magixs/products/";

  return (
    <>
      <div className='text-center cardBox me-2 animate__animated animate__fadeIn' >
        <Link style={{ textDecoration: "none" }} to={`/${catName}/${productData.slug.replace(" ","-")}/${productData.product_id}`} className='innerBox'>
          <div className='card2  mb-3'>
            <div className='imageBox'>
              <img src={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img1}`} alt="" className='p-3' />
            </div>
            <div className='col-12 text-center my-2'>
              {/* <p className='mt-1'>{productData.name}</p> */}
              <h4 className='mt-0'>Report Category</h4>
              <div className='mb-2 jcc rating'>
                <i className="fa fa-star me-1 " ></i>
                <i className="fa fa-star me-1 " ></i>
                <i className="fa fa-star me-1 " ></i>
                <i className="fa fa-star me-1 " ></i>
                <i className="fa fa-star me-1 " ></i>
              </div>
              <h5 className='mt-1 mb-3'>₹130</h5>
              {/* <div className='col-12 text-center' >
                <button className='btn btn1 me-2 btn-sm mb-1 w-100' >Add to cart</button>
                <button className='btn btn2 btn-sm mb-1 w-100'>Buy</button>
              </div> */}

            </div>
          </div>
        </Link>
      </div>

    </>
  )
}

export default Card2