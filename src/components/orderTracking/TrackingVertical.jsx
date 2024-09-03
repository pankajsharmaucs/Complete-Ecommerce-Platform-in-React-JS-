import React, { useEffect, useState } from 'react'
import './tracking.css'
import axios from 'axios';

const TrackingVertical = (OrderId) => {
    const [allData, setAllData] = useState([])
 
    var api_base_url = import.meta.env.VITE_API_BASE_URL + "/magixs/products/";

   

    useEffect(() => {

        console.log(OrderId);

    }, [])

    return (
        <>
            {
                allData
                    ?
                    <section className="root">
                        <figure>
                            <img src={`${api_base_url}/${allData.cat_id}/${allData.product_id}/${allData.img1}`} alt="mainImage" />
                            <figcaption>
                                <h4>{allData.title}</h4>
                                <h2>₹ {allData.sell_price}</h2>
                            </figcaption>
                        </figure>
                        <div className="order-track">

                            <div className="order-track-step">
                                <div className="order-track-status">
                                    <span className={`order-track-status-dot ${OrderStatusCount === 1 ? "active-dot" : ""}`} />
                                    <span className={`order-track-status-line ${OrderStatusCount === 1 ? "active-line" : ""}`} />
                                </div>
                                <div className="order-track-text">
                                    <p className="order-track-text-stat">Order Placed</p>
                                    <span className="order-track-text-sub">21st November, 2019</span>
                                </div>
                            </div>

                            <div className="order-track-step">
                                <div className="order-track-status">
                                    {/* <span className="order-track-status-dot up-dot " /> */}
                                    <span className={`order-track-status-dot ${OrderStatusCount === 2 ? "active-dot" : ""}`} />
                                    <span className={`order-track-status-line ${OrderStatusCount === 2 ? "active-line" : ""}`} />
                                </div>
                                <div className="order-track-text">
                                    <p className="order-track-text-stat">Packed</p>
                                    <span className="order-track-text-sub">21st November, 2019</span>
                                </div>
                            </div>

                            <div className="order-track-step">
                                <div className="order-track-status">
                                    <span className={`order-track-status-dot ${OrderStatusCount === 3 ? "active-dot" : ""}`} />
                                    <span className={`order-track-status-line ${OrderStatusCount === 3 ? "active-line" : ""}`} />
                                </div>
                                <div className="order-track-text">
                                    <p className="order-track-text-stat">Shipped</p>
                                    <span className="order-track-text-sub">21st November, 2019</span>
                                </div>
                            </div>

                            <div className="order-track-step">
                                <div className="order-track-status">
                                    <span className={`order-track-status-dot ${OrderStatusCount === 4 ? "active-dot" : ""}`} />
                                    <span className={`order-track-status-line ${OrderStatusCount === 4 ? "active-line" : ""}`} />
                                </div>
                                <div className="order-track-text">
                                    <p className="order-track-text-stat">Out for Delivery</p>
                                    <span className="order-track-text-sub">21st November, 2019</span>
                                </div>
                            </div>

                            <div className="order-track-step">
                                <div className="order-track-status">
                                    <span className={`order-track-status-dot ${OrderStatusCount === 5 ? "active-dot" : ""}`} />
                                    <span className={`order-track-status-line ${OrderStatusCount === 5 ? "active-line" : ""}`} />
                                </div>
                                <div className="order-track-text">
                                    <p className="order-track-text-stat">Deliverd</p>
                                    <span className="order-track-text-sub">21st November, 2019</span>
                                </div>
                            </div>

                            {
                                OrderStatusCount === 6
                                    ?
                                    <div className="order-track-step">
                                        <div className="order-track-status">
                                            <span className={`order-track-status-dot ${OrderStatusCount === 6 ? "active-dot" : ""}`} />
                                            <span className={`order-track-status-line ${OrderStatusCount === 6 ? "active-line" : ""}`} />
                                        </div>
                                        <div className="order-track-text">
                                            <p className="order-track-text-stat">Return</p>
                                            <span className="order-track-text-sub">21st November, 2019</span>
                                        </div>
                                    </div>
                                    : null
                            }


                            {
                                OrderStatusCount === 7
                                    ?
                                    <div className="order-track-step">
                                        <div className="order-track-status">
                                            <span className={`order-track-status-dot ${OrderStatusCount === 7 ? "active-dot" : ""}`} />
                                            <span className={`order-track-status-line ${OrderStatusCount === 7 ? "active-line" : ""}`} />
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
                    : <><h1>Here</h1></>
            }
        </>
    )
}

export default TrackingVertical