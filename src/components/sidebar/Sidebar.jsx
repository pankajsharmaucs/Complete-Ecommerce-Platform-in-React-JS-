import React from 'react'
import "./sidebar.css"
import { SlHome, SlScreenTablet, SlGrid, SlList, SlPhone, SlInfo, SlLogout } from "react-icons/sl";

const Sidebar = ({setopenMenu}) => {
    return (
        <>
            <div className='sidebarMobileMenu '>
                <div className='row w-100 p-0'>
                    <div className='left-menu shadow animate__animated  animate__slideInLeft '>
                        <div className='col-12 username ps-4 jbc'>
                            <h2 className='text-secondary' >User Name</h2>
                        </div>
                        <Link className='link jsc' onClick={() => setopenMenu(false)} to="/">
                            <div className='me-3'> < SlHome /></div>
                            <div className='pt-1'>Home</div>
                        </Link>
                        <Link className='link  jsc' onClick={() => setopenMenu(false)} to="/dashboard">
                            <div className='me-3'> < SlScreenTablet /></div>
                            All Products
                        </Link>
                        <Link className='link  jsc' onClick={() => setopenMenu(false)} to="/dashboard">
                            <div className='me-3'> < SlGrid /></div>
                            Category
                        </Link>
                        <Link className='link  jsc' onClick={() => setopenMenu(false)} to="/dashboard">
                            <div className='me-3'> < SlList /></div>
                            Dashboard
                        </Link>
                        <Link className='link  jsc' onClick={() => setopenMenu(false)} to="/contact">
                            <div className='me-3'> < SlPhone /></div>
                            Contact Us
                        </Link>
                        <Link className='link  jsc' onClick={() => setopenMenu(false)} to="/about">
                            <div className='me-3'> < SlInfo /></div>
                            About Us
                        </Link>
                        <div className=' mobileLogoutBtn jsc' onClick={""}>
                            <div className='me-3'> < SlLogout /></div>
                            Logout
                        </div>
                    </div>
                    <div className='right-menu animate__animated  animate__slideInRight '
                        onClick={() => setopenMenu(false)}></div>
                </div>
            </div>
        </>
    )
}

export default Sidebar