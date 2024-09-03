import React, { useEffect, useState } from 'react'
import PreLoader from '../../../components/preloader/PreLoader';
import axios from 'axios';

const SuperAdmin_AddCat = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    var api_base_url = import.meta.env.VITE_API_BASE_URL;


    // ============State====================
    const [loading, SetLoading] = useState(true);
    const [Msg, setMsg] = useState(true);
    const [ErrorMsg, setErrorMsg] = useState('');

    const [file1, setfile1] = useState(null);

    const [Title, setTitle] = useState('');
    const [Img1, setImg1] = useState('');

    useEffect(() => {
        SetLoading(false);
    }, [])


    const selectFile = (img, file) => {
        const imageUrl = URL.createObjectURL(file);
        if (img === 'img1') {
            setImg1(imageUrl);
            setfile1(file)
        }
        // console.log(file)
    }


    async function addCategory() {
        try {
            if (Title == "" || Img1 == "" ) {
                setErrorMsg("Please fill All Fields "); 
                setMsg('')
                return;
            }

            SetLoading(true)

            const user_id = localStorage.getItem('superUserId');
            const token = localStorage.getItem('superToken');

            let dataList = {
                user_id: user_id,
                token: token,
                cat_name: Title,
                image: file1,
                type: "add",
            }

            let url = import.meta.env.VITE_API_ADMIN_ADD_UPDATE_CATEGORY;
            const response = await axios.post(url, dataList,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.msg == "success") {
                const msg = response.data.msg;
                SetLoading(false)
                setMsg("Category Updated");
                setTitle('')
                setErrorMsg('')
                return;
            }
            else {
                setErrorMsg(response.data.msg);
                SetLoading(false)
                setMsg('')
                return;
            }
        } catch (error) {
            SetLoading(false)
            setMsg('')
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
                        <h3 className='col-12 text-center'>Add New Category</h3>

                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Title</label>
                            <input type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                className='form-control' />
                        </div>

                        <div className='form-group col-md-3  py-2 mb-2 '>
                            <div className='border p-2'>
                                <label htmlFor="">Cat Image</label>
                                {Img1 &&
                                    <div className='p-3 imagebox'>
                                        <img src={Img1} alt="" width={"100%"} />
                                    </div>
                                }
                                <input type="file"
                                    onChange={(e) => selectFile('img1', e.target.files[0])}
                                    className='form-control' />
                            </div>
                        </div>


                        <div className='col-12 my-3 text-center '>
                            <button className='btn btn-primary' onClick={() => { addCategory() }} >Add Now</button>
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

export default SuperAdmin_AddCat