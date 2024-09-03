import React, { useContext, useEffect, useState } from 'react'
import './payment.css';
// import Button1 from '../../components/button/Button1';
import MyContext from '../../useContext/MyContext';
import axios from 'axios';

const Payment = () => {

    const { myCartList } = useContext(MyContext);
    let user_id = localStorage.getItem('userId');
    let token = localStorage.getItem('token');


    const [cartList, setCartList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('other');

    const [loading, SetLoading] = useState(true);
    const [subtotal, setSubtotal] = useState(0);
    const [freeDelLimit, setFreeDelLimit] = useState(300);
    const [delCharge, setDelCharge] = useState(0);
    const [GrandTotal, setGrandTotal] = useState(0);


    const [razorpayDetail, setRazorpayDetail] = useState();

    const msg = 'Only 5 quantity allowed per product';

    const changePaymentOption = (option) => {
        setSelectedOption(option)
        if (option == 'cash') {
            setDelCharge(50)
        }else{
            setDelCharge(0)
        }
    }


    const create_order = (payment_id=null) => {
        if (user_id != '' && token != '' && cartList != '' ) {
            SetLoading(true);
            const addData = JSON.stringify({
                "user_id": user_id,
                "token": token,
                "order_type": selectedOption,
                "cartList": cartList,
                "payment_id":payment_id
            });


            try {
                let url = import.meta.env.VITE_API_USER_CREATE_ORDER;
                axios.post(url, addData).then((response) => {

                    if (response.data.msg == "success") {
                            window.open('/order_success','_self');
                            return;
                    } else {
                        SetLoading(false)
                        console.log(response.data.msg);
                        // setErrorMsg(response.data.msg); return;
                    }

                })
            } catch (error) {
                SetLoading(false)
                console.error('Order failed:', error);
            }

        } else {
            SetLoading(false)
            // setErrorMsg("Please fill all fields");
        }
    }

    const bookorder = async () => {
        if (selectedOption == 'cash') {
            create_order();
            return;
        }

        const options = {
            key: razorpayDetail.key,
            amount: razorpayDetail.amount,
            currency: razorpayDetail.currency,
            name: "Your Company Name",
            description: "Test Transaction",
            image: "https://your-logo-url.com",
            handler: function (response) {


                if(response.razorpay_payment_id !=''){
                    SetLoading(true)
                    let payment_id=response.razorpay_payment_id;
                    create_order(payment_id);
                    return;
                }

                // alert(`Payment ID: ${response.razorpay_payment_id}`);
                let api_data = {
                    payment_id: response.payment_id,
                    user_id: user_id,
                    token: token,
                }
                console.log(api_data);
            },
            prefill: {
                name: "Your Name",
                email: "your-email@example.com",
                contact: "9999999999"
            },
            notes: {
                address: "Your Address"
            },
            theme: {
                color: "#3399cc"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            console.log(response);
        });

        rzp1.open();

    };


    async function get_cartList() {
        if (localStorage.getItem('token')) {

            const myHeaders = {
                'Content-Type': 'application/json'
            };

            const requestData = {
                user_id: user_id,
                token: token
            };

            try {
                let url = import.meta.env.VITE_API_USER_CARTLIST;
                const response = await axios.post(url, requestData, { headers: myHeaders });

                if (response.data.msg === 'success') {
                    const cartItems = response.data.cart_item;

                    let newSubtotal = 0;
                    cartItems.forEach(item => {
                        newSubtotal += (parseInt(item.price) - parseInt(item.price * item.discount / 100))*item.qty;
                    });

                    setCartList(cartItems);
                    setSubtotal(newSubtotal);

                    let del_charge = delCharge;
                    if (newSubtotal >= freeDelLimit) {
                        setDelCharge(0);
                        del_charge = 0;
                    } else {
                        setDelCharge(50);
                        del_charge = 50;
                    }

                    let grand_total = parseInt(newSubtotal + del_charge);
                    // setGrandTotal(grand_total);

                    let payment_detail = {
                        key: "rzp_test_0dcG27OpJPoh8r",
                        amount: grand_total * 100,
                        currency: "INR",
                    }

                    setRazorpayDetail(payment_detail)
                    SetLoading(false);

                } else {
                    window.open('/cart','_self');
                    return;
                }
            } catch (error) {
                console.error('Error fetching cart list:', error);
            }
        }
    }

    useEffect(() => {
        get_cartList();
    }, [])

    return (
        <>
            <section className='container-fluid p-0'>
                <div className="container jcc">

                    <div className='col-md-8 col-12 p-md-5 p-2 price_summary_box '>
                        <div className=' '>
                            <h3 className='col-12 text-center p-3'>Select Payment Option</h3>

                            <div className='border-top  bg-white  rounded shadow mb-3 jbc p-3  cp' onClick={() => changePaymentOption('other')} >
                                <h6 className='fw-bold text-dark' >UPI/Debit/Credit Card</h6>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input inputPayment" id="radio1" name="paymentOptionRadio" value="other"
                                        checked={selectedOption == 'other'}
                                        onChange={() => changePaymentOption('other')}
                                    />
                                </div>
                            </div>

                            <div className='border-top  bg-white  rounded shadow mb-3 jbc p-3  cp' onClick={() => changePaymentOption('cash')} >
                                <h6 className='fw-bold text-dark' >Cash</h6>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input inputPayment" id="radio2" name="paymentOptionRadio" value="cash"
                                        checked={selectedOption == 'cash'}
                                        onChange={() => changePaymentOption('cash')}
                                    />
                                </div>
                            </div>



                            <div >

                                <div className='border-top jbc p-3  cp '  >
                                    <h6 className='text-dark' >Price </h6>
                                    <h6 className='text-dark' >₹{subtotal}</h6>
                                </div>

                                <div className='border-top jbc p-3  cp '  >
                                    <h6 className='text-dark' >Delivery</h6>
                                    {
                                        delCharge === 0
                                            ?
                                            <h6 className='text-success' >₹{delCharge} </h6>
                                            :
                                            <h6 className='text-danger' >+₹{delCharge}</h6>
                                    }
                                </div>

                                <div className='border-top jbc p-3  cp '  >
                                    <h6 className='text-dark fw-bold' >Total Amount </h6>
                                    <h6 className='text-dark fw-bold' >₹{subtotal + delCharge}</h6>
                                </div>

                            </div>


                            <div className='jbc mx-3 pt-2 pb-2   '>
                                <div className='buyNow btn btn8 my-3 py-2 w-100 fw-bold' onClick={() => bookorder()}    > Book Now</div>
                            </div>


                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Payment