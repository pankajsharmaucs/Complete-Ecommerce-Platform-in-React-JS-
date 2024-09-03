import React, { useEffect, useState } from 'react'
import PreLoader from '../../../components/preloader/PreLoader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SuperAdmin_AddSlider = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const navigate = useNavigate();
    var api_base_url = import.meta.env.VITE_API_BASE_URL;

    // ============State====================
    const [loading, SetLoading] = useState(true);
    const [Msg, setMsg] = useState(true);
    const [ErrorMsg, setErrorMsg] = useState('');

    const [sliderName, setsliderName] = useState('');

    const [Img1, setImg1] = useState('');
    const [Img2, setImg2] = useState('');
    const [Img3, setImg3] = useState('');
    const [Img4, setImg4] = useState('');
    const [Img5, setImg5] = useState('');

    const [Link1, setLink1] = useState('');
    const [Link2, setLink2] = useState('');
    const [Link3, setLink3] = useState('');
    const [Link4, setLink4] = useState('');
    const [Link5, setLink5] = useState('');

    const [file1, setfile1] = useState(null);
    const [file2, setfile2] = useState(null);
    const [file3, setfile3] = useState(null);
    const [file4, setfile4] = useState(null);
    const [file5, setfile5] = useState(null);

    const selectFile = (img, file) => {
        const imageUrl = URL.createObjectURL(file);
        if (img === 'img1') {
            setImg1(imageUrl);
            setfile1(file)
        }
        else if (img === 'img2') {
            setImg2(imageUrl);
            setfile2(file)
        }
        else if (img === 'img3') {
            setImg3(imageUrl);
            setfile3(file)
        }
        else if (img === 'img4') {
            setImg4(imageUrl);
            setfile4(file)
        }
        else if (img === 'img5') {
            setImg5(imageUrl);
            setfile5(file)
        }
    }


    useEffect(() => {

        SetLoading(false);

    }, [])


    async function addSlider() {
        setErrorMsg('');
        setMsg("");
        
        try {
            if (sliderName == "" || file1 == "" || Link1 == "" || file2 == "" || Link2 == "" || file3 == "" || Link3 == "") {
                setErrorMsg("Please fill slider name and atleast 3 slider data"); return;
            }

            // console.log(sliderName+file1+Link1+file2+Link2+file3+Link3);return
            SetLoading(true)

            const user_id = localStorage.getItem('superUserId');
            const token = localStorage.getItem('superToken');


            let dataList = {
                type: "add",
                user_id: user_id,
                token: token,
                slider_name: sliderName,
                img1: file1,
                img2: file2,
                img3: file3,
                img4: file4,
                img5: file5,
                link1: Link1,
                link2: Link2,
                link3: Link3,
                link4: Link4,
                link5: Link5,
            }

            let url = import.meta.env.VITE_API_ADMIN_ADD_UPDATE_SLIDER;
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
                setMsg("Slider Added");
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
                        <h3 className='col-12 text-center'>Add Slider</h3>

                        <div className=''>
                            <div className='form-group col-md-4 mb-md-4 mb-2  '>
                                <label htmlFor="">Title</label>
                                <input type="text" defaultValue={sliderName}
                                    onChange={(e) => setsliderName(e.target.value)}
                                    className='form-control' />
                            </div>
                        </div>

                        <div className='form-group col-md-4  py-2 mb-md-4 mb-2 '>
                            <div className='border p-2'>
                                <label htmlFor="">Image 1</label>
                                {
                                    Img1 &&
                                    <div className='p-3 imagebox'>
                                        <img src={`${Img1}`} alt="" width={"100%"} />
                                    </div>
                                }

                                <input type="file" onChange={(e) => selectFile('img1', e.target.files[0])} className='form-control' />
                                <label htmlFor="">Link 1</label>
                                <input type="text" defaultValue={Link1} onChange={(e) => setLink1(e.target.value)} className='form-control f13' />
                            </div>
                        </div>

                        <div className='form-group col-md-4  py-2 mb-md-4 mb-2 '>
                            <div className='border p-2'>
                                <label htmlFor="">Image 2</label>
                                {
                                    Img2 &&
                                    <div className='p-3 imagebox'>
                                        <img src={`${Img2}`} alt="" width={"100%"} />
                                    </div>
                                }
                                <input type="file" onChange={(e) => selectFile('img2', e.target.files[0])} className='form-control' />
                                <label htmlFor="">Link 2</label>
                                <input type="text" defaultValue={Link2} onChange={(e) => setLink2(e.target.value)} className='form-control f13' />
                            </div>
                        </div>

                        <div className='form-group col-md-4  py-2 mb-md-4 mb-2 '>
                            <div className='border p-2'>
                                <label htmlFor="">Image 3</label>
                                {
                                    Img3 &&
                                    <div className='p-3 imagebox'>
                                        <img src={`${Img3}`} alt="" width={"100%"} />
                                    </div>
                                }
                                <input type="file" onChange={(e) => selectFile('img3', e.target.files[0])} className='form-control' />
                                <label htmlFor="">Link 3</label>
                                <input type="text" defaultValue={Link3} onChange={(e) => setLink3(e.target.value)} className='form-control f13' />
                            </div>
                        </div>

                        <div className='form-group col-md-4  py-2 mb-md-4 mb-2 '>
                            <div className='border p-2'>
                                <label htmlFor="">Image 4</label>
                                {
                                    Img4 &&
                                    <div className='p-3 imagebox'>
                                        <img src={`${Img4}`} alt="" width={"100%"} />
                                    </div>
                                }
                                <input type="file" onChange={(e) => selectFile('img4', e.target.files[0])} className='form-control' />
                                <label htmlFor="">Link 4</label>
                                <input type="text" defaultValue={Link4} onChange={(e) => setLink4(e.target.value)} className='form-control f13' />
                            </div>
                        </div>

                        <div className='form-group col-md-4  py-2 mb-md-4 mb-2 '>
                            <div className='border p-2'>
                                <label htmlFor="">Image 5</label>
                                {
                                    Img5 &&
                                    <div className='p-3 imagebox'>
                                        <img src={`${Img5}`} alt="" width={"100%"} />
                                    </div>
                                }
                                <input type="file" onChange={(e) => selectFile('img5', e.target.files[0])} className='form-control' />
                                <label htmlFor="">Link 5</label>
                                <input type="text" defaultValue={Link5} onChange={(e) => setLink5(e.target.value)} className='form-control f13' />
                            </div>
                        </div>

                    <div className='col-12 my-3 text-center '>
                        <button className='btn btn-success' onClick={() => { addSlider() }} >Add Now</button>
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

export default SuperAdmin_AddSlider