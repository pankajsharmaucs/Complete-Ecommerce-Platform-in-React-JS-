import React, { useEffect, useState } from 'react'
import SuperHeader from "./page/superAdmin/SuperHeader"
import { Outlet } from 'react-router-dom'
import PreLoader from './components/preloader/PreLoader';

function SuperTemplate() {

  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      SetLoading(false)
    }, 100)
  }, [])


  return (
    <div>
      {
        loading
          ?
          <PreLoader />
          :
          <>
            <SuperHeader />
            <Outlet />
            {/* <Footer /> */}
          </>
      }
    </div>
  )
}

export default SuperTemplate