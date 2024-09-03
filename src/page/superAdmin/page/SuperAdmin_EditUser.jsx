import React, { useEffect, useState } from 'react'
import PreLoader from '../../../components/preloader/PreLoader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SuperAdmin_EditUser = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const user_id = urlParams.get('user_id')
    
    // ============State====================
    const [loading, SetLoading] = useState(true);
    const [Msg, setMsg] = useState(true);
    const [ErrorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();


    const [User_ID, setUser_ID] = useState(user_id);
    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Country, setCountry] = useState('');
    const [Active, setActive] = useState(null);

    useEffect(() => {

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: user_id })
            };
            
            let url = import.meta.env.VITE_API_USER_DATA_BY_USER_ID;
            fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                if (result.msg === 'success') {
                    SetLoading(false);
                    let productData = result.user_detail;
                    setEmail(productData.email);
                    setName(productData.name);
                    setMobile(productData.mobile);
                    setCountry(productData.country);
                    setActive(productData.active_status);
                    setUser_ID(user_id);
                } else {
                    navigate('/superAdmin');
                }
            })
            .catch((error) => console.error('Error:', error));

    }, [])


    const activeDeactiveUser=(event)=>{
        setActive(parseInt(event.target.value));
    }


    async function updateUser() {
        try {
            if(Email == "" || Name ==""  || Name ==""  || Name =="" ) { 
                setErrorMsg("Please fill All Fields "); return; 
            }

            SetLoading(true)

            const user_id=localStorage.getItem('superUserId');
            const token=localStorage.getItem('superToken');

            let dataList={
                    user_id: user_id,
                    token: token,
                    User_ID: User_ID,
                    Email: Email,
                    Name: Name,
                    Mobile: Mobile,
                    Country: Country,
                    Active: Active,
                }

                let url = import.meta.env.VITE_API_ADMIN_ADD_UPDATE_USER;
                const response = await axios.post(url,dataList,
                    {
                        headers: {
                        'Content-Type': 'multipart/form-data'
                        }
                    }
                );

            if (response.data.msg == "success") {
                const msg = response.data.msg;
                SetLoading(false)
                setMsg("User Updated");
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


    return (

        loading
            ?
            <PreLoader />
            :
            <section className='container-fluid p-0'>
                <div className="container p-3">
                    <div className="row p-md-3 p-2 bg-white">
                        <h3 className='col-12 text-center'>Edit Category</h3>
                        
                            


                            <div className='form-group col-md-4 mb-2 '>
                                <label htmlFor="">Email</label>
                                <input type="text" defaultValue={Email} 
                                onChange={(e)=>setEmail(e.target.value)}
                                className='form-control' />
                            </div>

                            <div className='form-group col-md-4 mb-2 '>
                                <label htmlFor="">Name</label>
                                <input type="text" defaultValue={Name} 
                                onChange={(e)=>setName(e.target.value)}
                                className='form-control' />
                            </div>


                            <div className='form-group col-md-4 mb-2 '>
                                <label htmlFor="">Mobile</label>
                                <input type="text" defaultValue={Mobile} 
                                onChange={(e)=>setMobile(e.target.value)}
                                className='form-control' />
                            </div>

                            <div className='form-group col-md-4 mb-2 '>
                                <label htmlFor="">Country</label>
                                <input type="text" defaultValue={Country} 
                                onChange={(e)=>setCountry(e.target.value)}
                                className='form-control' />
                            </div>


                            <div className='form-group col-md-4 mb-2 '>
                                <div className="form-check">
                                    <input className="form-check-input" onChange={(e)=>activeDeactiveUser(e)} value={1} type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                                        checked={Active === 1} 
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Active
                                    </label>
                                    </div>
                                    <div className="form-check">
                                    <input className="form-check-input" onChange={(e)=>activeDeactiveUser(e)} value={2} type="radio" name="flexRadioDefault" id="flexRadioDefault2" 
                                        checked={Active === 2} 
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Deactive
                                    </label>
                                </div>
                            </div>


                            <div className='col-12 my-3 text-center '>
                                <button className='btn btn-primary' onClick={()=>{ updateUser()}} >Update Now</button>
                            </div>

                            <div className='col-12 my-3 text-center '>
                                {
                                    ErrorMsg && <p className='text-danger fw-bold'>{ErrorMsg}</p>
                                }

                                {
                                    Msg && <p className='text-success fw-bold'>{Msg}</p>
                                }
                            </div>

                    </div>
                </div>
            </section>
    )
}

export default SuperAdmin_EditUser