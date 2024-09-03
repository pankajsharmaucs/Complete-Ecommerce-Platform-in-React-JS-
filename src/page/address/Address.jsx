import React, { useEffect, useState } from 'react'
import Heading1 from '../../components/heading/Heading1'
import Button1 from '../../components/button/Button1';
import axios from 'axios';

import './address.css'

const Address = () => {

    const [cartList, setCartList] = useState([]);
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState("");
    const [loading, SetLoading] = useState(true);

    const [pro_id, setpro_id] = useState(null);
    const [title, setTitle] = useState(null);

    const [Token, setToken] = useState(null);
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Mobile, setMobile] = useState("");
    const [Add1, setAdd1] = useState("");
    const [Add2, setAdd2] = useState("");
    const [Landmark, setLandmark] = useState("");
    const [City, setCity] = useState("");
    const [State, setState] = useState("");
    const [Pincode, setPincode] = useState("");

    const fromColStyle = 'form-group mb-2 col-md-6 col-12';

    const msg = 'Only 5 quantity allowed per product';

    const getInputData = (event) => {
        event.preventDefault();
        let key = event.target.name;
        if (key == "Email") { setEmail(event.target.value) }
        if (key == "Name") { setName(event.target.value) }
        if (key == "Mobile") { setMobile(event.target.value) }
        if (key == "Add1") { setAdd1(event.target.value) }
        if (key == "Add2") { setAdd2(event.target.value) }
        if (key == "Landmark") { setLandmark(event.target.value) }
        if (key == "City") { setCity(event.target.value) }
        if (key == "State") { setState(event.target.value) }
        if (key == "Pincode") { setPincode(event.target.value) }
    }

    useEffect(() => {

        if (localStorage.getItem("token")) {
            console.log(localStorage)
            setEmail(localStorage.getItem('userId'));
            setpro_id(localStorage.getItem('pro_id'));
            setToken(localStorage.getItem('token'));
            let email = localStorage.getItem('userId');
            let pro_id = localStorage.getItem('pro_id');

            try {

                let url = import.meta.env.VITE_API_USER_DATA_BY_USER_ID;
                axios.post(url, { user_id: email })
                    .then((response) => {
                        if (response.data.msg == "success") {
                            const userData = response.data.user_detail;
                            setName(userData.name)
                            setEmail(userData.email)
                            const userAdd = response.data.address;
                            setMobile(userAdd.contact)
                            setAdd1(userAdd.add1)
                            setAdd2(userAdd.add2)
                            setCity(userAdd.city)
                            setState(userAdd.state)
                            setLandmark(userAdd.landmark)
                            setPincode(userAdd.pincode)
                            if (userData.name != '' && userData.email != '' && userAdd.contact != ''
                                && userAdd.add1 != '' && userAdd.add2 != '' && userAdd.city != ''
                                && userAdd.state != '' && userAdd.landmark != '' && userAdd.pincode != '') {
                                // setShowSummary(true)
                            }
                        }
                    });

                let productUrl = import.meta.env.VITE_API_USER_GET_PRODUCT_BY_PRO_ID + pro_id;
                axios.get(productUrl)
                    .then((response) => {
                        console.log(response);
                        if (response.data.msg == "success") {
                            setproductData(response.data.pro_detail)
                            setTitle(response.data.pro_detail.title)
                        }
                    });


            } catch (error) {
                SetLoading(false)
                console.error('Order failed:', error);
            }
        } else {
            navigate(-1)
            return;
        }

        SetLoading(false)

    }, [])

    const saveUserData = () => {
        if (Email != '' && Name != '' && Mobile != '' && Add1 != '' && Add2 != '' && Landmark != '' && City != '' && State != '' && Pincode != '') {
            setErrorMsg("");
            const addData = JSON.stringify({
                "user_id": Email,
                "mobile": Mobile,
                "add1": Add1,
                "add2": Add2,
                "city": City,
                "state": State,
                "landmark": Landmark,
                "pincode": Pincode,
                "token": Token,
            });


            try {
                let url = import.meta.env.VITE_API_USER_SAVE_ADDRESS;
                axios.post(url, addData).then((response) => {
                    // console.log(response); return;
                    if (response.data.msg == "success") {
                            window.open('/payment','_self');
                            return;
                    } else {
                        SetLoading(false)
                        setErrorMsg(response.data.msg); return;
                    }
                })

            } catch (error) {
                SetLoading(false)
                console.error('Order failed:', error);
            }

        } else {
            setErrorMsg("Please fill all fields");
        }
    }

    return (
        <>
            <section className='container-fluid p-0'>
                <div className="container">
                    <div className="row jcc p-md-0 p-3" >
                        <div className="col-md-8 col-12 px-md-2 px-2 ">
                            <div className='row jcc  px-md-2 px-2 flex-column  '>
                                    <div className='col-12'>
                                        <Heading1 title={"Delivery Address"} />
                                    </div>
                                <div className='row bg-white p-md-2 p-3 rounded'>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">Full Name</label>
                                        <input type="text" defaultValue={Name}
                                            name='Name'
                                            readOnly
                                            className='form-control inputAddress' placeholder='Full Name' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" defaultValue={Email}
                                            name='Email'
                                            readOnly
                                            className='form-control inputAddress' placeholder='Email Address' />
                                    </div>


                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">Mobile</label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={Mobile}
                                            name='Mobile'
                                            className='form-control inputAddress' placeholder='Mobile No.' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">Street/house/Block</label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={Add1}
                                            name='Add1'
                                            className='form-control inputAddress' placeholder='Address line 1' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">Area/District</label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={Add2}
                                            name='Add2' className='form-control inputAddress' placeholder='Address line 2' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">Landmark </label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={Landmark}
                                            name='Landmark' className='form-control inputAddress' placeholder='Landmark' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">City/Town</label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={City}
                                            name='City'
                                            className='form-control inputAddress' placeholder='City/Town' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">State</label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={State}
                                            name='State'
                                            className='form-control inputAddress' placeholder='State' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">Pincode</label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={Pincode}
                                            name='Pincode'
                                            className='form-control inputAddress' placeholder='Pincode' />
                                    </div>

                                    {
                                        ErrorMsg != ''
                                            ?
                                            <p className='col-12 text-center text-danger'>{ErrorMsg}</p>
                                            :
                                            <></>
                                    }


                                    {
                                        SuccessMsg != ''
                                            ?
                                            <h6 className='col-12 mt-4 text-center text-success'>{SuccessMsg}</h6>
                                            :
                                            null
                                    }

                                    <div className={`form-group mb-2 col-12`} onClick={() => saveUserData()}>
                                        {/* <Button1 text={`Save & Continue`} /> */}
                                        <div class="buyNow btn btn8 my-3 py-2 w-100 fw-bold"> Save & Continue</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </div>



                </div>
            </section>
        </>
    )
}

export default Address