import React, { useEffect, useState } from 'react'
import "./card1.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
var api_base_url = import.meta.env.VITE_API_BASE_URL + "/magixs/products/";

const Card3 = ({ detail, pro_id, select_cancel_Order, trackOrder }) => {

  const [img1, setImg1] = useState(null);
  const [title, setTitle] = useState(null);
  const [Cat_id, setCat_id] = useState(null);
  const [Pro_id, setPro_id] = useState(null);
  const [catName, setCatName] = useState(null);

  useEffect(() => {

    const getProductData = async (pro_id) => {

      let url = import.meta.env.VITE_API_USER_GET_PRODUCT_BY_PRO_ID + `${pro_id}`;
      return axios.get(url)
        .then((response) => {
          if (response.data.msg === "success") {
            return response.data.pro_detail;
          }
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
          throw error;
        });
    }

    getProductData(pro_id)
      .then((product) => {
        // console.log(product);
        setImg1(product.img1);
        setTitle(product.slug.replace(/ /g, '-'));
        setCatName(product.cat_name);
        setCat_id(product.cat_id)
        setPro_id(product.product_id)
      })
      .catch((error) => {

      });

    // console.log(detail);

  }, [])

  return (
    <>
      <div className='card3  jac flex-wrap p-md-3 p-2'>

        <div className="col-md-2 col-4 text-center mb-3">
          <div className=''>
            <Link to={`/${catName}/${title}/${pro_id}`} style={{ textDecoration: "none" }}>
              <img src={`${api_base_url}/${Cat_id}/${Pro_id}/${img1}`} alt="" className='p-3' style={{ width: "100%" }} />
            </Link>
          </div>
        </div>

        <div className='col-md-8 col-12  mb-3'>
          <div className="col-12 text-md-end text-center mb-3">
            <h2 style={{ color: "#3b5550" }} > {detail.p_name} </h2>
          </div>
        </div>


        {/* =======Tracking=================== */}
        <div className="col-12 col-md-12 hh-grayBox  ">
          <div className="row justify-content-between">
            <div className={`order-tracking   ${detail.order_status == "New" || detail.order_status == "Shipped" ? "completed" : ""}  `} >
              <span className="is-complete"></span>
              <p>Ordered<br /><span>{detail.order_date}</span></p>
            </div>
            <div className={`order-tracking   ${detail.order_status == "Shipped" || detail.order_status == "Delivered" ? "completed" : ""}  `} >
              <span className="is-complete"></span>
              <p>Shipped<br /><span>{detail.order_date}</span></p>
            </div>
            <div className={`order-tracking   ${detail.order_status == "Delivered" ? "completed" : ""}  `} >
              <span className="is-complete"></span>
              <p>Delivered<br /><span>23 June 28</span></p>
            </div>
          </div>
        </div>

        <div className='col-12  d-flex justify-content-md-end justify-content-center'>
        <div className='col-md-3 col-5 me-3'>
            <button className='btn btn5 f12 ' onClick={() => select_cancel_Order(detail.order_id)}
              data-bs-toggle="modal" data-bs-target="#cancelReason" ><i className='fa fa-close'></i> Cancel order</button>
          </div>

          <div className='col-md-3 col-5 me-3'>
            <button className='btn btn4 f12 ' onClick={() => trackOrder(detail.order_id)}
              data-bs-toggle="modal" data-bs-target="#trackingDetail" ><i className='fa fa-truck'></i> Track order</button>
          </div>
        </div>


      </div>
    </>
  )
}

export default Card3