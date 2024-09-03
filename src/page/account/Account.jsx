import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PreLoader from '../../components/preloader/PreLoader';
import Back_Button from '../../components/button/Back_Button';
import Heading1 from '../../components/heading/Heading1';
import axios from 'axios';
import MyContext from '../../useContext/MyContext';

const Account = () => {

    const navigate = useNavigate();
    const { isLogin } = useContext(MyContext);
    const { myCartList } = useContext(MyContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Access individual query parameters
    const redirectTo = queryParams.get('redirectTo');
    const pro_id = queryParams.get('pro_id');
    const otpsec = 60;

    const [VerifyBox, SetVerifyBox] = useState(false);

    const [resendOTP, SetresendOTP] = useState(false);
    const [loading, SetLoading] = useState(false);

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

            let url = import.meta.env.VITE_API_USER_LOGIN_WITH_OTP;
            const response = await axios.post(url,
                {
                    email: Email,
                    type: "send"
                });

            // console.log(response); return;

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

            let url = import.meta.env.VITE_API_USER_LOGIN_WITH_OTP;
            const response = await axios.post(url,
                {
                    email: Email,
                    OTP: OTP,
                    type: "verify"
                });


            if (response.data.msg == "Expired") {
                setOTP("");
                setErrorMsg("OTP Expired, Resend OTP");
                SetresendOTP(true)
                SetLoading(false)
                return;
            }
            else if (response.data.msg == "success") {
                localStorage.setItem('userId', Email);
                localStorage.setItem('token', response.data.token);
                isLogin.setState(true)

                window.location.href = '/';
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

    return (
        <>
            {
                loading ?
                    <PreLoader />
                    :
                    <section className='LoginBox'>
                        <div className='container '>

                            {
                                VerifyBox ?
                                    <>
                                        <div className="row p-2 jcc py-5 ">
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
                                                            <input type="text" className='form-control' id="OTP" value={OTP}
                                                                onChange={(e) => setOTP(e.target.value)}
                                                                placeholder='Enter OTP here'
                                                                onKeyUp={handleKeyPress2}
                                                                autoFocus
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

                                        <div className="row p-2   jcc  py-5 flex-column" style={{ height: "100vh" }}>

                                            <div className='col-md-10 col-12 jcc flex-column'>

                                                <img className='my-3' src="/assets/menu/gift.png" alt="" style={{ width: "100px" }} />

                                                <h2 className='text-dark mb-4' >Welcome to magixs</h2>

                                                <div className='col-md-6 form-group mb-3 text-center'>
                                                    <input type="text" className='form-control' id="Email" value={Email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder='Email Address'
                                                        onKeyUp={handleKeyPress}
                                                        autoFocus
                                                    />
                                                </div>

                                                {errorMsg != '' ? <h6 className='text-danger text-center f13 my-3 animate__animated  animate__shakeX'>
                                                    {errorMsg}</h6> : <></>}
                                                <div className='col-md-6'>
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

export default Account