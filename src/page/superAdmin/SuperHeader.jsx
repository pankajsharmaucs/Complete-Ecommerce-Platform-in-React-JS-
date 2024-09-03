import React, { useContext, useEffect, useState } from 'react'
import "./header.css"
import "./admin.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuBar from '/assets/common/menu7.png'
import closeIcon from '/assets/close.png'


import {
  SlHome, SlUser, SlBasket, SlGrid, SlSettings, SlLogin, SlList, SlPhone,
  SlInfo, SlLogout, SlFolder
} from "react-icons/sl";
import MyContext from '../../useContext/MyContext';
import Back_Button from '../../components/button/Back_Button';
import PreLoader from '../../components/preloader/PreLoader';

const SuperHeader = () => {

  const location = useLocation();

  const [ViewPreloader, setViewPreloader] = useState(true);
  const [openMenu, setopenMenu] = useState(0);
  const [searchShow, setSearchShow] = useState(0);
  const [userEmail, setuserEmail] = useState("")
  const navigate = useNavigate();
  const { isAdminLogin } = useContext(MyContext);


  const ShowSearchBox = () => {
    if (searchShow == 0) {
      setSearchShow(1);
    } else {
      setSearchShow(0);
    }
  }

  const userLogout = () => {
    localStorage.clear();
    isAdminLogin.setAdminState(false)
    setopenMenu(0)
    navigate('/superAdmin');
  }

  useEffect(() => {
    setopenMenu(0)
    setTimeout(() => { setViewPreloader(false) }, 300)

    isAdminLogin.AdminState ?
      setuserEmail(localStorage.getItem("superUserId"))
      : null

  }, [])

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
                      location.pathname == "/superAdmin" || location.pathname == "/superAdmin/"
                      || location.pathname == "/superAdmin/dashboard"
                        ?
                        <>
                          <Link to={'/'}>
                            <div className='icon' onClick={() => setopenMenu(1)} >
                              <SlHome className='text-primary ' />
                            </div>
                          </Link>
                        </>
                        :
                        <>
                          <Back_Button />
                        </>

                    }
                  </div>
                  <div className='icon' onClick={() => setopenMenu(1)} >
                    <img src={MenuBar} alt="bagIcon" className='icon cp' />
                  </div>
                </div>

              </div>
            }

            {
              openMenu == 1
                ?
                <div className='sidebarMobileMenu '>
                  <div className='row w-100 p-0'>
                    <div className='left-menu shadow animate__animated  animate__slideInLeft animate__faster'>

                      {
                        isAdminLogin.AdminState
                          ?
                          <>
                            <div className='col-12 username px-3 bg-primary text-white jbc'>
                              <div className='text-start'>
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
                                <h6 className='overflow-hidden f12 py-2' >Super Admin Login</h6>
                              </div>
                              <img onClick={() => setopenMenu(0)} style={{ width: "20px", filter: "invert(1)" }}
                                src={closeIcon} alt="bagIcon" className='icon cp' />
                            </div>

                            <Link className='link jsc' onClick={() => setopenMenu(0)} to="/">
                              <div className='me-3'> < SlHome /></div>
                              <div className='pt-1'>Home</div>
                            </Link>

                            <Link className='link  jsc' onClick={() => setopenMenu(0)} to="/superAdmin">
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

export default SuperHeader