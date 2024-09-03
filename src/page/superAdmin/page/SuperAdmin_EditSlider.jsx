import React, { useEffect, useState } from 'react'
import PreLoader from '../../../components/preloader/PreLoader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SuperAdmin_EditSlider = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const slider_id = urlParams.get('slider_id')
    const navigate = useNavigate();
    var api_base_url = import.meta.env.VITE_API_BASE_URL;

    // ============State====================
    const [loading, SetLoading] = useState(true);
    const [Msg, setMsg] = useState(true);
    const [ErrorMsg, setErrorMsg] = useState('');
    const [sliderImageDir, setsliderImageDir] = useState(`${api_base_url}/magixs/slider/${slider_id}/`);
    const [sliderList, setsliderList] = useState([]);

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

    const getSliderList = async (slider_id) => {

        let url = import.meta.env.VITE_API_USER_GET_SLIDER_BY_ID + `${slider_id}`;
        return axios.get(url)
            .then((response) => {
                if (response.data.msg === "success") {
                    setsliderList(response.data.slider_list)
                    setsliderName(response.data.slider_list[0].slider_name)
                    setImg1(sliderImageDir + response.data.slider_list[0].img1)
                    setImg2(sliderImageDir + response.data.slider_list[0].img2)
                    setImg3(sliderImageDir + response.data.slider_list[0].img3)
                    setImg4(sliderImageDir + response.data.slider_list[0].img4)
                    setImg5(sliderImageDir + response.data.slider_list[0].img5)

                    setLink1(response.data.slider_list[0].link1)
                    setLink2(response.data.slider_list[0].link2)
                    setLink3(response.data.slider_list[0].link3)
                    setLink4(response.data.slider_list[0].link4)
                    setLink5(response.data.slider_list[0].link5)

                }
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
                throw error;
            });
    }

    useEffect(() => {

        // =====slider==list===
        getSliderList(slider_id)

        SetLoading(false);

    }, [])


    async function updateSlider() {
        try {
            if (sliderName == "" || file1 == "") {
                setErrorMsg("Please fill All Fields "); return;
            }

            SetLoading(true)

            const user_id = localStorage.getItem('superUserId');
            const token = localStorage.getItem('superToken');


            let dataList = {
                user_id: user_id,
                token: token,
                slider_id: slider_id,
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
                setMsg("Slider Updated");
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

                    {
                        sliderList.length
                            ?
                            <div className="row p-md-3 p-2 bg-white">
                                <h3 className='col-12 text-center'>Edit Slider</h3>

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
                                        <div className='p-3 imagebox'>
                                            <img src={`${Img1}`} alt="" width={"100%"} />
                                        </div>
                                        <input type="file" onChange={(e) => selectFile('img1', e.target.files[0])} className='form-control' />

                                        <label htmlFor="">Link 1</label>
                                        <input type="text" defaultValue={Link1} onChange={(e) => setLink1(e.target.value)} className='form-control f13' />
                                    </div>
                                </div>

                                <div className='form-group col-md-4  py-2 mb-md-4 mb-2 '>
                                    <div className='border p-2'>
                                        <label htmlFor="">Image 2</label>
                                        <div className='p-3 imagebox'>
                                            <img src={`${Img2}`} alt="" width={"100%"} />
                                        </div>
                                        <input type="file" onChange={(e) => selectFile('img2', e.target.files[0])} className='form-control' />
                                        <label htmlFor="">Link 2</label>
                                        <input type="text" defaultValue={Link2} onChange={(e) => setLink2(e.target.value)} className='form-control f13' />
                                    </div>
                                </div>

                                <div className='form-group col-md-4  py-2 mb-md-4 mb-2 '>
                                    <div className='border p-2'>
                                        <label htmlFor="">Image 3</label>
                                        <div className='p-3 imagebox'>
                                            <img src={`${Img3}`} alt="" width={"100%"} />
                                        </div>
                                        <input type="file" onChange={(e) => selectFile('img3', e.target.files[0])} className='form-control' />
                                        <label htmlFor="">Link 3</label>
                                        <input type="text" defaultValue={Link3} onChange={(e) => setLink3(e.target.value)} className='form-control f13' />
                                    </div>
                                </div>

                                <div className='form-group col-md-4  py-2 mb-md-4 mb-2 '>
                                    <div className='border p-2'>
                                        <label htmlFor="">Image 4</label>
                                        <div className='p-3 imagebox'>
                                            <img src={`${Img4}`} alt="" width={"100%"} />
                                        </div>
                                        <input type="file" onChange={(e) => selectFile('img4', e.target.files[0])} className='form-control' />
                                        <label htmlFor="">Link 4</label>
                                        <input type="text" defaultValue={Link4} onChange={(e) => setLink4(e.target.value)} className='form-control f13' />
                                    </div>
                                </div>

                                <div className='form-group col-md-4  py-2 mb-md-4 mb-2 '>
                                    <div className='border p-2'>
                                        <label htmlFor="">Image 5</label>
                                        <div className='p-3 imagebox'>
                                            <img src={`${Img5}`} alt="" width={"100%"} />
                                        </div>
                                        <input type="file" onChange={(e) => selectFile('img5', e.target.files[0])} className='form-control' />
                                        <label htmlFor="">Link 5</label>
                                        <input type="text" defaultValue={Link5} onChange={(e) => setLink5(e.target.value)} className='form-control f13' />
                                    </div>
                                </div>

                            </div>
                            :
                            null
                    }



                    <div className='col-12 my-3 text-center '>
                        <button className='btn btn-primary' onClick={() => { updateSlider() }} >Update Now</button>
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
            </section>
    )
}

export default SuperAdmin_EditSlider