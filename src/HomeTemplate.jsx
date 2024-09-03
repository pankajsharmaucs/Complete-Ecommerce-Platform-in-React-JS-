import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import PreLoader from './components/preloader/PreLoader';
import Footer from './components/footer/Footer'
import Account from './page/account/Account';

const HomeTemplate = () => {
  const [loading, SetLoading] = useState(true);
  const [isLogined, SetisLogined] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      SetLoading(false)
    }, 100);


    if (localStorage.getItem('token')) {
      SetisLogined(true)
    }

  }, [])

  return (
    <div>
      {
        loading
          ?
          <PreLoader />
          :
          <>
            {
              isLogined
                ?
                <>
                  <Header />
                  <Outlet />
                  <Footer />
                </>
                :
                <Account />           
            }
          </>
      }

    </div>
  )
}

export default HomeTemplate