import React, { useEffect, useState } from 'react'
import PreLoader from '../../../components/preloader/PreLoader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SuperAdmin_EditCat = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cat_id = urlParams.get('cat_id')
    
    var api_base_url = import.meta.env.VITE_API_BASE_URL;


    // ============State====================
    const [loading, SetLoading] = useState(true);
    const [Msg, setMsg] = useState(true);
    const [ErrorMsg, setErrorMsg] = useState('');
    const [productImageDir, setproductImageDir] = useState(`${api_base_url}/magixs/category/${cat_id}/`);
    const navigate = useNavigate();

    const [file1, setfile1] = useState(null);

    const [Title, setTitle] = useState('');
    const [Img1, setImg1] = useState('');

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let url = import.meta.env.VITE_API_USER_GET_CAT_BY_CAT_ID;
        fetch(url + cat_id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.msg == 'success') {
                    // console.log(result);
                    SetLoading(false);
                    let productData=result.cat_detail;
                    setTitle(productData.cat_name)
                    setImg1(productImageDir+productData.image)

                } else {
                    navigate('/superAdmin');
                }
            })
            .catch((error) => console.error(error));


    }, [])


    const selectFile=(img,file)=>{
            const imageUrl = URL.createObjectURL(file);
            if(img ==='img1'){
                setImg1(imageUrl);
                setfile1(file)
            }
    }


    async function updateCategory() {
        try {
            if(Title == "" || file1 =="" ) { 
                setErrorMsg("Please fill All Fields "); return; 
            }

            SetLoading(true)

            const user_id=localStorage.getItem('superUserId');
            const token=localStorage.getItem('superToken');

            let dataList={
                    user_id: user_id,
                    token: token,
                    cat_id: cat_id,
                    cat_name: Title,
                    image:file1,
                }

            let url = import.meta.env.VITE_API_ADMIN_ADD_UPDATE_CATEGORY;
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
                setMsg("Category Updated");
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
                            <label htmlFor="">Title</label>
                            <input type="text" defaultValue={Title} 
                            onChange={(e)=>setTitle(e.target.value)}
                            className='form-control' />
                        </div>

                        
                            <div className='form-group col-md-3  py-2 mb-2 '>
                                <div className='border p-2'>
                                    <label htmlFor="">Image 1</label>
                                    <div className='p-3 imagebox'>
                                        <img src={Img1} alt="" width={"100%"} />
                                    </div>
                                    <input type="file" 
                                    onChange={(e)=>selectFile('img1',e.target.files[0])}
                                    className='form-control' />
                                </div>
                            </div>

                          

                            <div className='col-12 my-3 text-center '>
                                <button className='btn btn-primary' onClick={()=>{ updateCategory()}} >Update Now</button>
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

export default SuperAdmin_EditCat