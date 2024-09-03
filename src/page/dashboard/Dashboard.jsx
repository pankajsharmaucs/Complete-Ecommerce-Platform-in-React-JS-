import React, { useEffect } from 'react'

import Heading1 from '../../components/heading/Heading1'
import { useNavigate } from 'react-router-dom';
import Card4 from '../../components/cards/Card4';

let delAddress = [
    {
        inputField: "S-444/10, 7th Floor", placeholder: "House No., Street, Sector / Block",
        inputClass: "add1", labelText: "Address line 1*"
    },

    {
        inputField: "Sector-30, Gurugram", placeholder: "Locality / Area",
        inputClass: "add2", labelText: "Address line 2*"
    },

    {
        inputField: "Near Star Mall", placeholder: "Name of City or Town",
        inputClass: "city", labelText: "City/Town*"
    },

    {
        inputField: "Haryana", placeholder: "State",
        inputClass: "State", labelText: "State"
    },
    {
        inputField: "211001", placeholder: "Pincode",
        inputClass: "Pincode", labelText: "Pincode"
    },

    {
        inputField: "Star mall", placeholder: "Landmark",
        inputClass: "Landmark", labelText: "Landmark"
    },

];


let profileInfo = [
    {
        inputField: "pankaj sharma", placeholder: "Full Name",
        inputClass: "fullName", labelText: "Full Name*"
    },

    {
        inputField: "8800787878", placeholder: "Only 10 Digit Allowed",
        inputClass: "Mobile", labelText: "Mobile Number*"
    },

    {
        inputField: "ps@gmail.com", placeholder: "Email Address",
        inputClass: "Email", labelText: "Email*"
    },

]


const Dashboard = () => {

    const navigate = useNavigate();
    let jcc = `justify-content-around align-items-center`

    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            navigate('/');
            return;
        }
    }, [])

    return (
        <>
            <section className='Section-wrapper' >
                <div className="container ">

                    <div className='row'>
                        <Heading1 title={"dashboard"} />
                    </div>

                    <div className={`row  mb-2 ${jcc}`}>
                        <div className='col-xl-3 col-md-4 col-sm-6 col-6 mb-3 '>
                            <Card4 url={"/orders"} img={"/assets/icons/orders.png"} title={"My Orders"} />
                        </div>

                        {/* <div className='col-xl-3 col-md-4 col-sm-6 col-6 mb-3 '>
                            <Card4 url={"/cart"} img={"/assets/icons/cart.png"} title={"Cart"} />
                        </div> */}

                        <div className='col-xl-3 col-md-4 col-sm-6 col-6 mb-3 '>
                            <Card4 url={"/settings"} img={"/assets/icons/settings.png"} title={"Settings"} />
                        </div>

                        {/* <div className='col-xl-3 col-md-4 col-sm-6 col-6 mb-3 '>
                            <Card4 url={"/offers"} img={"/assets/icons/offers.png"} title={"Offers"} />
                        </div> */}
                    </div>

                </div>
            </section>
        </>
    )
}

export default Dashboard