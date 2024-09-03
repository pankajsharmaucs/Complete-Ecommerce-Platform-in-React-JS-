import React, { useContext, useEffect, useState } from 'react'
import Heading1 from '../../components/heading/Heading1'
import './cart.css';
import Button1 from '../../components/button/Button1';
import MyContext from '../../useContext/MyContext';
import PreLoader from '../../components/preloader/PreLoader';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {

  const { myCartList } = useContext(MyContext);
  let user_id = localStorage.getItem('userId');
  let token = localStorage.getItem('token');

  const [loading, SetLoading] = useState(true);

  const [cartList, setCartList] = useState([]);
  const [ErrorMsg, setErrorMsg] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [freeDelLimit, setFreeDelLimit] = useState(300);
  const [delCharge, setDelCharge] = useState(50);

  const msg = 'Only 5 quantity allowed per product';

  const updateCartQty = (status, qty, pro_id) => {

    qty = parseInt(qty);

    if (status === 'minus') {
      if (qty <= 0) { return; }
      qty = qty - 1;
    }
    if (status === 'plus') {
      if (qty === 5) {
        setErrorMsg(msg);
        return;
      }
      qty = qty + 1;
    }

    setErrorMsg('');
    SetLoading(true)

    let user_id = localStorage.getItem("userId");
    let token = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "user_id": user_id,
      "token": token,
      "pro_id": pro_id,
      "updated_qty": qty
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    let url = import.meta.env.VITE_API_USER_ADD_TO_CART;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {


        if (result.msg == 'success') {
          if (result.cart_item.length == 0) {
            myCartList.setMycart([])
          }
          setCartList(result.cart_item);
          get_cartList()
          SetLoading(false)

        }
        else if (result.msg == 'quantity_limit_reached') {
          setErrorMsg(msg);
          SetLoading(false)
        }
        else {
          setErrorMsg('Something Went Wrong');
          SetLoading(false)
        }
      }
      ).catch((error) => {
        SetLoading(false)
      });

  }

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
            newSubtotal += (parseInt(item.price) - parseInt(item.price * item.discount / 100)) * item.qty;
          });

          setCartList(cartItems);
          setSubtotal(newSubtotal);

          if (newSubtotal >= freeDelLimit) {
            setDelCharge(0);
          } else {
            setDelCharge(50);
          }

          SetLoading(false);

        } else {
          SetLoading(false);
          setCartList([]);
        }
      } catch (error) {
        console.error('Error fetching cart list:', error);
      }
    }
  }

  useEffect(() => {
    get_cartList();

    SetLoading(false)

  }, [])

  return (
    <>
      {
        loading ? <PreLoader />
          :
          <section className='container-fluid p-0'>
            <div className="container">
              <div className='row'>
                <Heading1 title={"Cart"} />
              </div>

              <div className='row '>
                <div className="col-md-8 col-12 px-md-5 px-2 ">
                  {
                    cartList.map((item, i) => {
                      return (

                        <div key={i} className="col-12 p-md-3 p-2 mb-3 ">
                          <div className='carBox flex-wrap'>

                            <div className='col-sm-3 col-4  p-2'>
                              <img src={`${item.img1}`} alt="" width={"100%"} />
                            </div>

                            <div className='col-sm-8 col-8 p-2 '>
                              <h5>{item.pro_name}</h5>
                              <div><strike className="f13" >₹{item.price}</strike> <span className='text-success f18' >₹{item.price - parseInt(item.price * item.discount / 100)}</span></div>
                              <div className='mb-1'><span className='text-primary f13' >Discount {item.discount}%</span></div>

                              <div className='my-2 f13  text-secondary '  >₹{item.price - parseInt(item.price * item.discount / 100)}{` x ${item.qty}`} :&nbsp;
                                <span className='text-success'>₹{`${(item.price - parseInt(item.price * item.discount / 100)) * item.qty}`}</span></div>

                              <div className="col-12  ">
                                <div className='QuantityBox  jsc'>
                                  <div className='option jcc' onClick={() => updateCartQty('minus', `${item.qty}`, `${item.pro_id}`)} >-</div>
                                  <input className='qtyInput' type="text"  defaultValue={`${item.qty}`} readOnly />
                                  <div className='option jcc' onClick={() => updateCartQty('plus', `${item.qty}`, `${item.pro_id}`)} >+</div>
                                </div>
                              </div>

                            </div>

                          </div>
                        </div>
                      )
                    })
                  }

                  {
                    ErrorMsg
                      ?
                      <div className='col-12 text-center text-danger py-3' >{ErrorMsg}</div>
                      :
                      null
                  }

                </div>


                {myCartList.myCart.length
                  ?
                  <div className='col-md-4 col-12 p-md-3 p-2 price_summary_box'>
                    <div className='bg-white shadow-sm'>
                      <h3 className='col-12 text-center p-2'>Price Summary</h3>

                      <div className='border-top jbc px-3 py-2'>
                        <h6>Item total</h6>
                        <h6>₹{subtotal}</h6>
                      </div>

                      <div className='border-top jbc px-3 py-2'>
                        <h6 className='text-danger' >Delivery Charge</h6>
                        <h6 className='text-danger' >+₹{delCharge}</h6>
                      </div>


                      <div className='border-top jbc px-3 pt-2 pb-2 grandTotal'>
                        <h5 className='fw-bold' >Grand Total</h5>
                        <h5 className='fw-bold' >₹{subtotal + delCharge}</h5>
                      </div>

                      <div className='jbc mx-3 pt-2 pb-2 ' >
                        <Link className="buyNow btn btn8 my-3 py-2 w-100 fw-bold" to={`/address`}>Checkout</Link>
                      </div>

                    </div>
                  </div>
                  :
                  <>
                    <div className='col-12 p-md-3 p-2 price_summary_box jcc'>
                      <div className='bg-white shadow-sm col-md-5'>
                        <div className='text-center  mx-3 pt-2 pb-2 '>
                          <img src="/assets/emptyCart.png" width={"100px"} alt="" />
                          <Button1 text="Continue Shopping" linkTo={`/`} />
                        </div>
                      </div>
                    </div>
                  </>
                }


              </div>

            </div>
          </section>
      }
    </>
  )
}

export default Cart