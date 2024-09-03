import React, { useContext, useEffect, useState } from 'react'
import "./header.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from '/assets/common/big_shop_logo.png'
import cartIcon from '/assets/cart.png'
import MenuBar from '/assets/common/menu7.png'
import closeIcon from '/assets/close.png'

import order from '/assets/icons/orders.png'
import order1 from '/assets/icons/order1.png'

import { SlHome, SlUser, SlBasket, SlGrid, SlSettings, SlLogin, SlList, SlPhone, SlInfo, SlLogout, SlFolder } from "react-icons/sl";
import MyContext from '../../useContext/MyContext';
import Back_Button from '../button/Back_Button';
import PreLoader from '../preloader/PreLoader';
import axios from 'axios';

const Header = () => {

  const location = useLocation();

  const [catItems, setcatItems] = useState([]);
  const [ViewPreloader, setViewPreloader] = useState(true);
  const [openMenu, setopenMenu] = useState(0);
  const [searchShow, setSearchShow] = useState(0);
  const [userEmail, setuserEmail] = useState("")
  const navigate = useNavigate();
  const { isLogin } = useContext(MyContext);
  const { myCartList } = useContext(MyContext);

  // console.log(myCartList.myCart.length);

  const ShowSearchBox = () => {
    if (searchShow == 0) {
      setSearchShow(1);
    } else {
      setSearchShow(0);
    }
  }

  const userLogout = () => {
    localStorage.removeItem('token');
    isLogin.setState(false)
    myCartList.setMycart([])
    setopenMenu(0)
    navigate('/login');

  }

  async function get_cartList() {
    if (localStorage.getItem('token')) {

      let user_id = localStorage.getItem('userId');
      let token = localStorage.getItem('token');

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

          myCartList.setMycart(cartItems)

        } else {
          myCartList.setMycart([])
        }
      } catch (error) {
        console.error('Error fetching cart list:', error);
      }
    }
  }

  useEffect(() => {

    get_cartList();


    setopenMenu(0)
    setTimeout(() => { setViewPreloader(false) }, 300)

    isLogin.State ?
      setuserEmail(localStorage.getItem("userId"))
      : "Login & SignUp"

    if (localStorage.getItem("userId")) {
        setuserEmail(localStorage.getItem("userId"))
      } else {
        setuserEmail("Login & SignUp")
    }


  }, [catItems])

  return (
    <>

      {
        ViewPreloader
          ?
          <PreLoader />
          :
          <>
            {searchShow == 1 ? (
              <div className='searchBoxTop animate__animated animate__slideInDown animate__faster'>
                <div className='col-lg-8 col-md-10 col-10'>
                  <div className='searchBox jcc'>
                    <input type="text" className='searchInput' />
                    <button className='searchBtn jcc'>
                      <img src="/assets/search.png" className='searchIcon' alt="SearchBtnIcon" />
                    </button>
                  </div>

                  <div className='search-dropdown'></div>

                </div>
                <img onClick={() => { ShowSearchBox(); }} src="/assets/close.png" className='searcCloseIcon cp' alt="searcCloseIcon" />
              </div>
            ) : (
              null
            )}


            {

              <div className='header'>
                <div className='dashboardtop jbc p-3 px-4'>

                  <div className='d-flex jsc'>
                    {
                      openMenu == 0
                        ?

                        location.pathname === '/' ? (
                          <div className='icon' onClick={() => setopenMenu(1)} >
                            <img src={MenuBar} alt="bagIcon" className='icon cp' />
                          </div>
                        ) : (
                          <Back_Button />
                        )

                        :
                        <div className='icon' onClick={() => setopenMenu(0)}>
                          <img src={closeIcon} alt="bagIcon" className='icon cp' />
                        </div>
                    }
                    <Link className='link ms-4' to="/" onClick={() => setopenMenu(0)} >
                      {/* <img src={Logo} alt="mianLogo" className='mainLogo cp' /> */}
                    </Link>
                  </div>

                  {
                    location.pathname === '/' ? (
                      <Link className='link ms-4' to="/cart" onClick={() => setopenMenu(0)} >
                        <img src={cartIcon} style={{ width: "25px" }} alt="bagIcon" className=' cp' />
                        <p className='bg-primary jcc' style={{ position: "absolute", width: "17px", height: "17px", top: "9px", right: "14px", fontSize: "12px", borderRadius: "42px" }}
                        >{myCartList.myCart.length}
                        </p>
                      </Link>
                    ) : (
                      <div className='d-flex '>
                        <div className='position-relative me-3'>
                          <Link className='link ms-4 ' to="/cart" onClick={() => setopenMenu(0)} >
                            <img src={cartIcon} style={{ width: "25px" }} alt="bagIcon" className=' cp' />
                            <p className='bg-primary jcc' style={{ position: "absolute", width: "17px", height: "17px", top: "-10px", right: "0px", fontSize: "12px", borderRadius: "42px" }}
                            >{myCartList.myCart.length}
                            </p>
                          </Link>
                        </div>
                        <div className='icon' onClick={() => setopenMenu(1)} >
                          <img src={MenuBar} alt="bagIcon" className='icon cp' />
                        </div>

                      </div>

                    )
                  }

                </div>
              </div>
            }

            {
              openMenu
                ?
                <div className='sidebarMobileMenu '>
                  <div className='row w-100 p-0'>
                    <div className='left-menu shadow animate__animated  animate__slideInLeft animate__faster'>

                      {
                        isLogin.State
                          ?
                          <>
                            <div className='col-12 username px-3 bg-primary text-white jbc'>
                              <div className='text-center'>
                                <SlUser />
                                <h6 className='overflow-hidden f12 py-2' >{userEmail}</h6>
                              </div>
                              <img onClick={() => setopenMenu(0)} style={{ width: "20px", filter: "invert(1)" }}
                                src={closeIcon} alt="bagIcon" className='icon cp' />
                            </div>

                            <Link className='link jsc' onClick={() => setopenMenu(0)} to="/">
                              <div className='me-3'> < SlHome /></div>
                              <div className='pt-1'>Home</div>
                            </Link>
                            <Link className='link  jsc' onClick={() => setopenMenu(0)} to="/dashboard">
                              <div className='me-3'> < SlList /></div>
                              Dashboard
                            </Link>
                            <Link className='link  jsc' onClick={() => setopenMenu(0)} to="/categories">
                              <div className='me-3'> < SlGrid /></div>
                              Category
                            </Link>
                            <Link className='link  jsc' onClick={() => setopenMenu(0)} to="/cart">
                              <div className='me-3'> <SlBasket /></div>
                              Cart
                            </Link>

                            <Link className='link  jsc' onClick={() => setopenMenu(0)} to="/orders">
                              <div className='me-3'> <img style={{ width: "14px" }} src={order1} /></div>
                              Orders
                            </Link>

                            <Link className='link  jsc' onClick={() => setopenMenu(0)} to="/settings">
                              <div className='me-3'> < SlSettings /></div>
                              Setting
                            </Link>

                            <Link className='link  jsc' onClick={() => setopenMenu(0)} to="/support">
                              <div className='me-3'> < SlPhone /></div>
                              Support
                            </Link>
                            <Link className='link  jsc' onClick={() => setopenMenu(0)} to="/about">
                              <div className='me-3'> < SlInfo /></div>
                              About Us
                            </Link>
                            <div className='link jsc cp' onClick={() => userLogout()}>
                              <div className='me-3'> < SlLogout /></div>
                              Logout
                            </div>
                          </>
                          :
                          <>

                            <div className='col-12 username px-3 bg-secondary text-white jbc'>
                              <div className='text-center'>
                                <SlUser />
                                <h6 className='overflow-hidden f12 py-2' >Login & SignUp</h6>
                              </div>
                              <img onClick={() => setopenMenu(0)} style={{ width: "20px", filter: "invert(1)" }}
                                src={closeIcon} alt="bagIcon" className='icon cp' />
                            </div>

                            <Link className='link jsc' onClick={() => setopenMenu(0)} to="/">
                              <div className='me-3'> < SlHome /></div>
                              <div className='pt-1'>Home</div>
                            </Link>
                            <Link className='link  jsc' onClick={() => setopenMenu(0)} to="/categories">
                              <div className='me-3'> < SlGrid /></div>
                              Category
                            </Link>

                            <Link className='link  jsc' onClick={() => setopenMenu(0)} to="/support">
                              <div className='me-3'> < SlPhone /></div>
                              Support
                            </Link>

                            <Link className='link  jsc' onClick={() => setopenMenu(0)} to="/login">
                              <div className='me-3'> < SlLogin /></div>
                              Login
                            </Link>

                          </>
                      }
                    </div>
                    <div className='right-menu animate__animated  animate__fadeIn '
                      onClick={() => setopenMenu(0)}></div>
                  </div>
                </div>
                :
                <> </>
            }

          </>
      }



    </>
  )
}

export default Header