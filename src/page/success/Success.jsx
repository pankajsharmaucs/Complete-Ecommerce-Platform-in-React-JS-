import React from 'react'
import Button1 from '../../components/button/Button1'
import orderPlacedImg from '/assets/orderPlaced.gif'
import { useNavigate } from 'react-router-dom'

const Success = () => {

    const navigate = useNavigate();

    return (
        <>
            <section>
                <div className='container'>
                    <div className='row jcc p-4'>
                        <div className='col-12 text-center my-5 p-4' style={{ background: "#e1f4e5" }}>
                            <img src={orderPlacedImg} alt="order confirmed" className='orderPlacedImg w-100' />
                            <h2 className='mb-3'>Order Successfully Booked</h2>
                            <div className='' onClick={() => navigate("/orders")} >
                                <div className='btn4 p-3 cp mb-3 '>My Orders</div>
                            </div>

                            <div className='' onClick={() => navigate("/")} >
                                <div className='btn1 p-3 cp mb-3 '>Continue shopping</div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Success