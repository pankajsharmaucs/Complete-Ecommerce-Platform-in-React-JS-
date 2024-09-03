import React, { useEffect, useState } from 'react'
import './footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {

    const [IsLogined, setIsLogined] = useState(false);
    const [SelectedIcon, setSelectedIcon] = useState(1);

    const border_bottom = `MenuList_border_bottom mb-3`;

    const currentPath = window.location.pathname;
   
    // / cart  categories orders dashboard

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogined(true)    
        }

        if(currentPath === '/'){  setSelectedIcon(1)}
        else if(currentPath =='/cart'){  setSelectedIcon(2)}
        else if(currentPath =='/categories'){  setSelectedIcon(3)}
        else if(currentPath =='/orders'){  setSelectedIcon(4)}
        else if(currentPath =='/dashboard'){  setSelectedIcon(5)}

    },[])

    return (
        <div className='d-md-none d-block ' style={{ marginTop: "100px" }}>
            <div className=" footerMenu jac p-0 ">

                <Link to={`/`}>
                    <div className={`MenuList ${SelectedIcon === 1 ? border_bottom : ''}`} onClick={() => setSelectedIcon(1)} >
                        <img src="/assets/menu/home.png" alt="" className='mb-2' />
                    </div>
                </Link>

                <Link to={`/cart`}>
                    <div className={`MenuList ${SelectedIcon === 2 ? border_bottom : ''}`} onClick={() => setSelectedIcon(2)} >
                        <img src="/assets/menu/cart.png" alt="" className='mb-2' />
                    </div>
                </Link>

                <Link to={`/categories`}>
                    <div className={`MenuList ${SelectedIcon === 3 ? border_bottom : ''}`} onClick={() => setSelectedIcon(3)} >
                        <img src="/assets/menu/categories.png" alt="" className='mb-2' />
                    </div>
                </Link>


                {
                    IsLogined
                        ?
                        <>
                            <Link to={`/orders`}>
                                <div className={`MenuList ${SelectedIcon === 4 ? border_bottom : ''}`} onClick={() => setSelectedIcon(4)} >
                                    <img src="/assets/menu/orders.png" alt="" className='mb-2' />
                                </div>
                            </Link>
                            <Link to={`/dashboard`}>
                                <div className={`MenuList ${SelectedIcon === 5 ? border_bottom : ''}`} onClick={() => setSelectedIcon(5)} >
                                    <img src="/assets/menu/user.png" alt="" className='mb-2' />
                                </div>
                            </Link>
                        </>

                        :
                        <Link to={`/login`}>
                            <div className={`MenuList ${SelectedIcon === 5 ? border_bottom : ''}`} onClick={() => setSelectedIcon(5)} >
                                <img src="/assets/menu/user.png" alt="" className='mb-2' />
                            </div>
                        </Link>
                }

            </div>
        </div>
    )
}

export default Footer