import React, { useEffect, useState } from 'react'
import Heading1 from '../../components/heading/Heading1'
import "../payment/payment.css";
import Button1 from '../../components/button/Button1';
import Back_Button from '../../components/button/Back_Button';
import axios from 'axios'
import PreLoader from '../../components/preloader/PreLoader';

const Settings = () => {
    const [loading, SetLoading] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState("");
    const [successMsg, setsuccessMsg] = useState("");

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

    let jcc = `justify-content-around align-items-center`
    const fromColStyle = 'form-group mb-2 col-12';

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
            // console.log(localStorage)
            setEmail(localStorage.getItem('userId'));
            setToken(localStorage.getItem('token'));
            let email = localStorage.getItem('userId');

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
                        }
                    });

            } catch (error) {
                SetLoading(false)
                console.error('Order failed:', error);
            }
        }


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

            SetLoading(true)
            try {

                let url = import.meta.env.VITE_API_USER_SAVE_ADDRESS;
                axios.post(url, addData).then((response) => {
                    if (response.data.msg == "success") {
                        setTimeout(() => {
                            SetLoading(false)
                            setsuccessMsg("Updated Successfully")
                        }, 1000)
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
            {
                loading ? <PreLoader msg={"Updating wait..."} />
                    :
                    <section className='Section-wrapper' >
                        <div className="container ">

                            <div className='row'>
                                <Heading1 title={"Settings"} />
                            </div>

                            <div className='row jcc flex-column  my-4'>
                                <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 col-11 bg-white p-md-5 p-3 rounded'>
                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="Email">Email</label>
                                        <input type="text" defaultValue={Email}
                                            name='Email'
                                            readOnly
                                            className='form-control' placeholder='Email Address' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">Full Name</label>
                                        <input type="text" defaultValue={Name}
                                            onKeyUp={getInputData}
                                            name='Name'
                                            className='form-control' placeholder='Full Name' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">Mobile</label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={Mobile}
                                            name='Mobile'
                                            className='form-control' placeholder='Mobile No.' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">Street/house/Block</label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={Add1}
                                            name='Add1'
                                            className='form-control' placeholder='Address line 1' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">Area/District</label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={Add2}
                                            name='Add2' className='form-control' placeholder='Address line 2' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">Landmark </label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={Landmark}
                                            name='Landmark' className='form-control' placeholder='Landmark' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">City/Town</label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={City}
                                            name='City'
                                            className='form-control' placeholder='City/Town' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">State</label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={State}
                                            name='State'
                                            className='form-control' placeholder='State' />
                                    </div>

                                    <div className={`${fromColStyle}`}>
                                        <label htmlFor="email">Pincode</label>
                                        <input type="text" onKeyUp={getInputData} defaultValue={Pincode}
                                            name='Pincode'
                                            className='form-control' placeholder='Pincode' />
                                    </div>

                                    <div className={`${fromColStyle}`} onClick={() => saveUserData()}>
                                        <Button1 text={`Save & Continue`} />
                                    </div>

                                    {
                                        ErrorMsg != ''
                                            ?
                                            <p className='col-12 text-center text-danger'>{ErrorMsg}</p>
                                            :
                                            <></>
                                    }

                                    {
                                        successMsg != ''
                                            ?
                                            <p className='col-12 text-center fw-bold text-success'>{successMsg}</p>
                                            :
                                            <></>
                                    }

                                </div>
                            </div>

                        </div>
                    </section>
            }
        </>
    )
}

export default Settings