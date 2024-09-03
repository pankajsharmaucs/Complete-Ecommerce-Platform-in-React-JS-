import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PreLoader from '../../components/preloader/PreLoader';
import Heading1 from '../../components/heading/Heading1';
import axios from 'axios';
import MyContext from '../../useContext/MyContext';

const SuperAccount = () => {

    const [loading, SetLoading] = useState(false);
    const otpinputRef = useRef(null)
    const navigate = useNavigate();
    const { isAdminLogin } = useContext(MyContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Access individual query parameters
    const redirectTo = queryParams.get('redirectTo');
    const pro_id = queryParams.get('pro_id');
    const otpsec = 60;

    const [VerifyBox, SetVerifyBox] = useState(false);

    const [resendOTP, SetresendOTP] = useState(false);

    const [OTP, setOTP] = useState('');
    const [OTPTry, setOTPTry] = useState(0);

    const [Email, setEmail] = useState('pspankajsharma222@gmail.com');
    const [Name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [ExpirySec, setExpirySec] = useState(otpsec);
    const [intervalId, setIntervalId] = useState(null);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Call your function here
            sendOTP();
        }
    };

    const handleKeyPress2 = (event) => {
        if (event.key === 'Enter') {
            // Call your function here
            verifyOTP();
        }
    };

    const otpTimer = () => {

        const id = setInterval(() => {
            if (ExpirySec <= 0) {
                clearInterval(intervalId);
            }
            setExpirySec((prevCount) => prevCount - 1);
        }, 1000);

        setIntervalId(id);
    }

    // Stop the counter
    const stopCounter = () => {
        clearInterval(intervalId);
        SetresendOTP(true);
    };

    const sendOTP = async () => {
        try {
            if (Email == "") { setErrorMsg("Please fill Email "); return; }
            SetLoading(true)


            let url = import.meta.env.VITE_API_ADMIN_LOGIN;
            const response = await axios.post(url,
                {
                    email: Email,
                    type: "send"
                });


                    if (response.data.msg == "sent") {
                        const msg = response.data.msg;
                        SetVerifyBox(true)
                        SetLoading(false)
                        otpTimer();
                        return;
                    }
                    else {
                        setErrorMsg(response.data.msg);
                        SetLoading(false)
                        return;
                    }
            } catch (error) {
                SetLoading(false)
                console.error('Login failed:', error);
            }
    }

    const verifyOTP = async () => {
        try {
            if (OTP == "") { setErrorMsg("Please fill OTP"); return; }
            if (OTPTry >= 3) {

                setErrorMsg("OTP Verify attemp exceed, send new OTP");
                setTimeout(() => {
                    SetVerifyBox(false);
                    setOTPTry(0);
                }, 1500)
                return;
            }
            let otptry = OTPTry + 1;
            setOTPTry(otptry)

            SetLoading(true)

            let url = import.meta.env.VITE_API_ADMIN_LOGIN;
            const response = await axios.post(url,
                {
                    email: Email,
                    OTP: OTP,
                    type: "verify"
                });

            console.log(response)

            if (response.data.msg == "Expired") {
                setOTP("");
                setErrorMsg("OTP Expired, Resend OTP");
                SetresendOTP(true)
                SetLoading(false)
                return;
            }
            else if (response.data.msg == "success") {
                localStorage.setItem('superUserId', Email);
                localStorage.setItem('superToken', response.data.token);
                isAdminLogin.setAdminState(true)
                navigate('/superAdmin/dashboard');
                return;
            } else {
                setErrorMsg(response.data.msg);
                SetLoading(false)
                return;
            }
        } catch (error) {
            console.error('Login failed:', error);
            SetLoading(false)
        }
    }

    const resendNewOTP = () => {
        SetresendOTP(false)
        setOTPTry(0)
        sendOTP()
    }

    const resetSignUp = () => {
        SetVerifyBox(false)
        SetresendOTP(false)
        setOTP('')
        setOTPTry(0)
        setExpirySec(otpsec);
    }

    useEffect(() => {
        if (ExpirySec <= 0) {
            stopCounter();
            setExpirySec(otpsec);
        }
    }, [ExpirySec])


    useEffect(() => {
        if (isAdminLogin.AdminState) {
            navigate('/superAdmin/dashboard');
            return;
        }
    }, [isAdminLogin]);


    return (
        <>
            {
                loading ?
                    <PreLoader />
                    :
                    <section className='LoginBox'>
                        <div className='container '>

                            {VerifyBox ?
                                <>
                                    <div className="row p-2 jcc ">
                                        <div className='row '>
                                            <Heading1 title={"Verify OTP"} />
                                            <p className='col-12 text-center' style={{ fontSize: "14px" }}>
                                                Please Check, OTP sent to your email at {Email}</p>
                                        </div>
                                        <div className='col-md-6 col-12 '>

                                            {errorMsg != '' ? <h6 className='text-danger text-center f13 my-3 animate__animated  animate__shakeX'>
                                                {errorMsg}</h6> : <></>}
                                            <input type="hidden" className='form-control ' id="Email" value={Email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                            <input type="hidden" className='form-control' id="Name" value={Name}
                                                onChange={(e) => setName(e.target.value)} />
                                            <input type="hidden" className='form-control' id="password" value={password}
                                                onChange={(e) => setPassword(e.target.value)} />

                                            {!resendOTP
                                                ?
                                                <>

                                                    <div className='form-group mb-2'>
                                                        <label htmlFor="OTP">OTP </label>
                                                        <input ref={otpinputRef} type="text" className='form-control' id="OTP" value={OTP}
                                                            onChange={(e) => setOTP(e.target.value)}
                                                            placeholder='Enter OTP here'
                                                            pattern="[0-9]{10}"
                                                            autoFocus
                                                            onKeyUp={handleKeyPress2}

                                                        />
                                                    </div>
                                                    <button onClick={verifyOTP} className='btn btn1 mb-2'>Verify OTP</button>

                                                </>
                                                :
                                                <button onClick={() => resendNewOTP()} className='btn btn4 '>Resend OTP</button>
                                            }

                                        </div>
                                        <div className='col-12 text-center my-2'>
                                            {
                                                resendOTP
                                                    ?
                                                    <>
                                                        <span style={{ fontSize: "12px", color: "#ff7676" }}>OTP Expired,Press Resend OTP button to sent it again.</span><br />
                                                    </>
                                                    :
                                                    <>
                                                        <span style={{ fontSize: "12px", color: "rgb(108, 107, 107)" }}>OTP will Expired in <b >{ExpirySec}</b> Seconds</span><br />
                                                    </>
                                            }

                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="row p-2 jcc py-5" >
                                        <img className='my-3' src="/assets/icons/profile.png" alt=""
                                            style={{ width: "100px" }} />
                                        <div className='col-md-12 col-12 jcc  flex-column'>
                                            <Heading1 title={"Admin Login"} />
                                            <div className='form-group col-md-6 col-12 mb-3 text-center'>
                                                <input type="text" className='form-control' id="Email" value={Email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder='Admin User ID'
                                                    autoFocus
                                                    onKeyUp={handleKeyPress}

                                                />
                                            </div>

                                            {errorMsg != '' ? <h6 className='text-danger text-center f13 my-3 animate__animated  animate__shakeX'>
                                                {errorMsg}</h6> : <></>}
                                            <div className='col-md-6 col-8'>
                                                <button onClick={sendOTP} type="submit" className='btn btn4'>Login with OTP</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }

                        </div>
                    </section >

            }
        </>
    )
}

export default SuperAccount