import React, { useContext, useEffect, useState } from 'react'
import Card3 from '../../components/cards/Card3';
import Heading1 from '../../components/heading/Heading1';
import axios from 'axios';
import PreLoader from '../../components/preloader/PreLoader';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../useContext/MyContext';
import './dashboard.css'
import TrackingVertical from '../../components/orderTracking/TrackingVertical';

const MyOrders = () => {

  const navigate = useNavigate();
  let [orderList, setorderList] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [cancel_order_id, setcancel_order_id] = useState(null);
  const [selectedCancelReason, setSelectedCancelReason] = useState('');
  const [AllData, setAllData] = useState([]);
  const [OrderStatusCount, setOrderStatusCount] = useState(1)
  const [UpDot, setUpDot] = useState(2)

  var api_base_url = import.meta.env.VITE_API_BASE_URL + "/magixs/products/";

  const { isLogin } = useContext(MyContext);

  let jcc = `justify-content-center align-items-center`

  function select_cancel_Order(order_id) {
    setcancel_order_id(order_id);
  }

  const chooseCancelOption = (event) => {
    setSelectedCancelReason(event.target.value);
  };

  function cancelOrder() {
    console.log(cancel_order_id);
  }

  async function get_orderData(order_id) {
    if (localStorage.getItem('token')) {
      let user_id = localStorage.getItem('userId');

      const myHeaders = {
        'Content-Type': 'application/json'
      };

      const requestData = {
        user_id: user_id,
        order_id: order_id
      };

      try {
        let url = import.meta.env.VITE_API_USER_GET_ORDER_BY_ID;
        const response = await axios.post(url, requestData, { headers: myHeaders });

        if (response.data.msg === 'success') {

          // console.log(response.data.orderData[0]);
          setAllData(response.data.orderData[0]);

          let order_status = response.data.orderData[0].order_status;

          if (order_status === "New") {
            setOrderStatusCount(1);
            setUpDot(2)
          }
          else if (order_status === "Packed") {
            setOrderStatusCount(2);
            setUpDot(3)
          }
          else if (order_status === "Shipped") {
            setOrderStatusCount(3);
            setUpDot(4)
          }
          else if (order_status === "outForDelivery") {
            setOrderStatusCount(4);
            setUpDot(5)
          }
          else if (order_status === "Delivered") {
            setOrderStatusCount(5);
            setUpDot(6)
          }
          else if (order_status === "Cancelled") {
            setOrderStatusCount(6);
            setUpDot(7)
          }
          else if (order_status === "Return") {
            setOrderStatusCount(7);
            setUpDot(8)
          }

        } else {
          setAllData([]);
        }
      } catch (error) {
        console.error('Error fetching order list:', error);
      }
    }
  }

  function trackOrder(order_id) {
    get_orderData(order_id)
    get_orderData(order_id)
  }

  useEffect(() => {
    try {

      let pro_id = localStorage.getItem('pro_id');
      let userId = localStorage.getItem('userId');
      let token = localStorage.getItem('token');

      let productUrl = `https://magixs.online/api/get_all_order.php?user_id=${userId}&token=${token}&pro_id=${pro_id}`;
      axios.get(productUrl)
        .then((response) => {
          // console.log(response);
          if (response.data.msg == "success") {
            setorderList(response.data.allOrders)
          }
        });

    } catch (error) {
      SetLoading(false)
      console.error('Order failed:', error);
    }


    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  }, [])

  return (
    <>
      {
        loading ? <PreLoader msg={"Booking order, please wait..."} />
          :
          <section className='Section-wrapper' >
            <div className="container ">

              <div className='row'>
                <Heading1 title={"My Orders"} />
              </div>

              <div className={`row  mb-2 p-md-4 p-2 ${jcc}`}>
                {
                  orderList.map((item, i) => {
                    return (
                      <Card3 detail={item} select_cancel_Order={select_cancel_Order} trackOrder={trackOrder} pro_id={item.product_id} key={i} />
                    )
                  })
                }
              </div>
            </div>

            <div className='popupBox'>
              {/* cancel popup==== */}
              <div className="modal fade" id="cancelReason" tabIndex="-1" aria-labelledby="cancelReasonLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="cancelReasonLabel">Cancel My Order  </h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className='form-group col-12'>
                        <select value={selectedCancelReason} className='form-select py-3' onChange={chooseCancelOption} >
                          <option value="">Choose Reason</option>
                          <option value="c1">Delivery is delay</option>
                          <option value="c2">Getting low Price </option>
                          <option value="c3">Need other product</option>
                        </select>
                      </div>
                      <button type="button" onClick={() => cancelOrder()} className="btn btn5 w-100 mt-5 mb-2">Cancel Order</button>
                      <button type="button" className="btn btn-dark w-100  mb-2" data-bs-dismiss="modal">Close</button>
                    </div>
                    
                  </div>
                </div>
              </div>

              {/* Tracking popup==== */}
              <div className="modal fade" id="trackingDetail" tabIndex="-1" aria-labelledby="trackingDetailLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="trackingDetailLabel">Order Tracking   </h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <section className="root">
                        <figure>
                          <img src={`${api_base_url}/${AllData.cat_id}/${AllData.product_id}/${AllData.img1}`} alt="mainImage" />
                          <figcaption>
                            <h4>{AllData.title}</h4>
                            <h2>₹ {AllData.sell_price}</h2>
                          </figcaption>
                        </figure>
                        <div className="order-track">

                          <div className="order-track-step">
                            <div className="order-track-status">
                              <span className={`order-track-status-dot ${OrderStatusCount >= 1 ? "active-dot" : ""}`} />
                              <span className={`order-track-status-line ${OrderStatusCount >= 1 ? "active-line" : ""}`} />
                            </div>
                            <div className="order-track-text">
                              <p className="order-track-text-stat">Order Placed</p>
                              <span className="order-track-text-sub">21st November, 2019</span>
                            </div>
                          </div>

                          <div className="order-track-step">
                            <div className="order-track-status">
                              {/* <span className="order-track-status-dot up-dot " /> */}
                              <span className={`order-track-status-dot ${OrderStatusCount >= 2 ? "active-dot" : ""} ${UpDot == 2 ? "up-dot" : ""}`} />
                              <span className={`order-track-status-line ${OrderStatusCount >= 2 ? "active-line" : ""}`} />
                            </div>
                            <div className="order-track-text">
                              <p className="order-track-text-stat">Packed</p>
                              <span className="order-track-text-sub">21st November, 2019</span>
                            </div>
                          </div>

                          <div className="order-track-step">
                            <div className="order-track-status">
                              <span className={`order-track-status-dot ${OrderStatusCount >= 3 ? "active-dot" : ""} ${UpDot == 3 ? "up-dot" : ""} `} />
                              <span className={`order-track-status-line ${OrderStatusCount >= 3 ? "active-line" : ""}`} />
                            </div>
                            <div className="order-track-text">
                              <p className="order-track-text-stat">Shipped</p>
                              <span className="order-track-text-sub">21st November, 2019</span>
                            </div>
                          </div>

                          <div className="order-track-step">
                            <div className="order-track-status">
                              <span className={`order-track-status-dot ${OrderStatusCount >= 4 ? "active-dot" : ""} ${UpDot == 4 ? "up-dot" : ""}`} />
                              <span className={`order-track-status-line ${OrderStatusCount >= 4 ? "active-line" : ""}`} />
                            </div>
                            <div className="order-track-text">
                              <p className="order-track-text-stat">Out for Delivery</p>
                              <span className="order-track-text-sub">21st November, 2019</span>
                            </div>
                          </div>

                          <div className="order-track-step">
                            <div className="order-track-status">
                              <span className={`order-track-status-dot ${OrderStatusCount >= 5 ? "active-dot" : ""} ${UpDot == 5 ? "up-dot" : ""}`} />
                              <span className={`order-track-status-line ${OrderStatusCount >= 5 ? "active-line" : ""}`} />
                            </div>
                            <div className="order-track-text">
                              <p className="order-track-text-stat">Deliverd</p>
                              <span className="order-track-text-sub">21st November, 2019</span>
                            </div>
                          </div>

                          {
                            OrderStatusCount >= 6
                              ?
                              <div className="order-track-step">
                                <div className="order-track-status">
                                  <span className={`order-track-status-dot ${OrderStatusCount >= 6 ? "active-dot" : ""} ${UpDot == 6 ? "up-dot" : ""}`} />
                                  <span className={`order-track-status-line ${OrderStatusCount >= 6 ? "active-line" : ""}`} />
                                </div>
                                <div className="order-track-text">
                                  <p className="order-track-text-stat">Return</p>
                                  <span className="order-track-text-sub">21st November, 2019</span>
                                </div>
                              </div>
                              : null
                          }


                          {
                            OrderStatusCount >= 7
                              ?
                              <div className="order-track-step">
                                <div className="order-track-status">
                                  <span className={`order-track-status-dot ${OrderStatusCount >= 7 ? "active-dot" : ""} ${UpDot == 7 ? "up-dot" : ""}`} />
                                  <span className={`order-track-status-line ${OrderStatusCount >= 7 ? "active-line" : ""}`} />
                                </div>
                                <div className="order-track-text">
                                  <p className="order-track-text-stat">Canceled</p>
                                  <span className="order-track-text-sub">21st November, 2019</span>
                                </div>
                              </div>
                              : null
                          }

                        </div>
                      </section>
                    </div>

                    <div className="modal-footer jcc">
                       <button className='btn5' data-bs-dismiss="modal" aria-label="Close" >Close</button>                          
                    </div>

                  </div>
                </div>
              </div>

            </div>

          </section>

      }
    </>
  )
}

export default MyOrders