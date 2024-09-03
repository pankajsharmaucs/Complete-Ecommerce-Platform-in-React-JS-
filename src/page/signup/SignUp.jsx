import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PreLoader from '../../components/preloader/PreLoader';
import Back_Button from '../../components/button/Back_Button';
import Heading1 from '../../components/heading/Heading1';
import axios from 'axios';
import MyContext from '../../useContext/MyContext';

const SignUp = () => {

    const otpinputRef=useRef(null)
    const navigate = useNavigate();
    const { isLogin } = useContext(MyContext);

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

    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [ExpirySec, setExpirySec] = useState(otpsec);
    const [intervalId, setIntervalId] = useState(null);

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
        // SetVerifyBox(true)
        // SetLoading(false)
        // otpTimer();
        // otpinputRef.current.focus();
        // return;

        try {

            if (Name == "") { setErrorMsg("Please fill Name fields"); return; }
            if (Email == "") { setErrorMsg("Please fill Email "); return; }
            if (password == "") { setErrorMsg("Please fill Password"); return; }
            SetLoading(true)


            let url = import.meta.env.VITE_API_USER_SIGNUP;
            const response = await axios.post(url,
                {
                    email: Email,
                    password: password,
                    name: Name,
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
            if (response.data.msg == "already") {
                const msg = response.data.msg;
                setErrorMsg("User Already Exists, Please login");
                SetLoading(false)
                return;
            } else {
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

            let url = import.meta.env.VITE_API_USER_SIGNUP;
            const response = await axios.post(url,
                {
                    email: Email,
                    password: password,
                    name: Name,
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
                navigate('/dashboard');
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

    const resendNewOTP=()=>{
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

                            {VerifyBox ?
                                <>
                                    <div className='row '>
                                        <Heading1 title={"Verify OTP"} />
                                        <p className='col-12 text-center' style={{ fontSize: "14px" }}>
                                            Please Check, OTP sent to your email at {Email}</p>
                                    </div>
                                    <div className="row p-3 jcc ">
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
                                            <div onClick={() => resetSignUp()}
                                                className='text-success rounded-pill mt-4 text-decoration-underline cp'>SignUp</div>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='row'>
                                        <Back_Button />
                                        <Heading1 title={"SignUp"} />
                                    </div>
                                    <div className="row p-3 jcc">
                                        <div className='col-md-6 col-12 '>
                                            <div className='form-group mb-2'>
                                                <label htmlFor="Email">Email as User ID:</label>
                                                <input type="text" className='form-control' id="Email" value={Email}
                                                    onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className='form-group mb-2'>
                                                <label htmlFor="Name">Name:</label>
                                                <input type="Name" className='form-control' id="Name" value={Name}
                                                    onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className='form-group mb-2'>
                                                <label htmlFor="password">Password:</label>
                                                <input type="password" className='form-control' id="password" value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                            {errorMsg != '' ? <h6 className='text-danger text-center f13 my-3 animate__animated  animate__shakeX'>
                                                {errorMsg}</h6> : <></>}
                                            <button onClick={sendOTP} type="submit" className='btn btn4'>Sent OTP</button>
                                        </div>
                                        <div className='col-12 text-center my-3'>
                                            <span>Already have Account!</span><br />
                                            <Link to={'/login'}>
                                                <div className='text-primary rounded-pill mt-4 text-decoration-underline cp'>Login Now</div>
                                            </Link>
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

export default SignUp