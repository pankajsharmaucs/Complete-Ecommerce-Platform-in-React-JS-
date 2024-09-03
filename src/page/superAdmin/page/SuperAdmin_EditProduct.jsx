import React, { useEffect, useState } from 'react'
import PreLoader from '../../../components/preloader/PreLoader';
import axios from 'axios';

const SuperAdmin_EditProduct = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pro_id = urlParams.get('pro_id')
    const cat_id = urlParams.get('cat_id')
    
    var api_base_url = import.meta.env.VITE_API_BASE_URL;


    // ============State====================
    const [loading, SetLoading] = useState(true);
    const [Msg, setMsg] = useState(true);
    const [ErrorMsg, setErrorMsg] = useState('');
    const [productImageDir, setproductImageDir] = useState(`${api_base_url}/magixs/products/${cat_id}/${pro_id}/`);
    
    const [file1, setfile1] = useState(null);
    const [file2, setfile2] = useState(null);
    const [file3, setfile3] = useState(null);
    const [file4, setfile4] = useState(null);
    const [file5, setfile5] = useState(null);

    const [Product_id, setProduct_id] = useState('');
    const [Title, setTitle] = useState('');
    const [Slug, setSlug] = useState('');
    const [Price, setPrice] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [Discount, setDiscount] = useState('');
    const [Description, setDescription] = useState('');
    const [Img1, setImg1] = useState('');
    const [Img2, setImg2] = useState('');
    const [Img3, setImg3] = useState('');
    const [Img4, setImg4] = useState('');
    const [Img5, setImg5] = useState('');

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let url = import.meta.env.VITE_API_USER_GET_PRODUCT_BY_PRO_ID;
        fetch(url + pro_id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.msg == 'success') {
                    // console.log(result);
                    SetLoading(false);
                    // setproductData(result.pro_detail)
                    
                    let productData=result.pro_detail;

                    setProduct_id(productData.product_id)
                    setTitle(productData.title)
                    setSlug(productData.slug)
                    setPrice(productData.price)
                    setQuantity(productData.quantity)
                    setDiscount(productData.discount)
                    setDescription(productData.description)
                    setImg1(productImageDir+productData.img1)
                    setImg2(productImageDir+productData.img2)
                    setImg3(productImageDir+productData.img3)
                    setImg4(productImageDir+productData.img4)
                    setImg5(productImageDir+productData.img5)

                } else {
                    navigate('/');
                }
            })
            .catch((error) => console.error(error));


    }, [])


    const selectFile=(image,file)=>{
            const imageUrl = URL.createObjectURL(file);
            if(image ==='img1'){
                setImg1(imageUrl);
                setfile1(file)
            }
            else if(image ==='img2'){
                setImg2(imageUrl);
                setfile2(file)
            }
            else if(image ==='img3'){
                setImg3(imageUrl);
                setfile3(file)
            }
            else if(image ==='img4'){
                setImg4(imageUrl);
                setfile4(file)
            }
            else if(image ==='img5'){
                setImg5(imageUrl);
                setfile5(file)
            }
            // console.log(file)
    }


    async function updateProduct() {
        try {
            if(Product_id == "" || Title =="" || Slug =="" || Quantity =="" || Price =="" || Discount =="" || Description =="") { 
                setErrorMsg("Please fill All Fields "); return; 
            }

            SetLoading(true)

            const user_id=localStorage.getItem('superUserId');
            const token=localStorage.getItem('superToken');

            let dataList={
                    user_id: user_id,
                    token: token,
                    cat_id: cat_id,
                    product_id: Product_id,
                    title: Title,
                    slug: Slug,
                    quantity: Quantity,
                    price:Price,
                    discount:Discount,
                    description:Description,    
                    image1:file1,
                    image2:file2,
                    image3:file3,
                    image4:file4,
                    image5:file5,
                }

            // console.log(file1)
            // return;

            let url = import.meta.env.VITE_API_ADMIN_ADD_UPDATE_PRODUCT;
            const response = await axios.post(url,dataList,
                {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                }
        
            );
            // console.log(response); 
            // return;

            if (response.data.msg == "success") {
                const msg = response.data.msg;
                SetLoading(false)
                setMsg("Product Updated");
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
                        <h3 className='col-12 text-center'>Edit Product</h3>
                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Title</label>
                            <input type="text" defaultValue={Title} 
                            onChange={(e)=>setTitle(e.target.value)}
                            className='form-control' />
                        </div>

                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Slug</label>
                            <input type="text" defaultValue={Slug} 
                            onChange={(e)=>setSlug(e.target.value)}
                            className='form-control' />
                        </div>

                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Qty</label>
                            <input type="text" defaultValue={Quantity} 
                            onChange={(e)=>setQuantity(e.target.value)}
                            className='form-control' />
                        </div>

                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Price</label>
                            <input type="text" defaultValue={Price} 
                            onChange={(e)=>setPrice(e.target.value)}
                            className='form-control' />
                        </div>

                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Discount</label>
                            <input type="text" defaultValue={Discount} 
                            onChange={(e)=>setDiscount(e.target.value)}
                            className='form-control' />
                        </div>

                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Description</label>
                            <textarea rows={5} 
                            onChange={(e)=>setDescription(e.target.value)}
                            className='form-control' defaultValue={Description} ></textarea>
                        </div>

                        <div className="row text-center">
                            <h3>Product Images</h3>
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

                            <div className='form-group col-md-3  py-2 mb-2 '>
                                <div className='border p-2'>
                                    <label htmlFor="">Image 2</label>
                                    <div className='p-3 imagebox'>
                                        <img src={Img2} alt="" width={"100%"} />
                                    </div>
                                    <input type="file" 
                                    onChange={(e)=>selectFile('img2',e.target.files[0])}
                                    className='form-control' />
                                </div>
                            </div>

                            <div className='form-group col-md-3  py-2 mb-2 '>
                                <div className='border p-2'>
                                    <label htmlFor="">Image 3</label>
                                    <div className='p-3 imagebox'>
                                        <img src={Img3} alt="" width={"100%"} />
                                    </div>
                                    <input type="file" 
                                    onChange={(e)=>selectFile('img3',e.target.files[0])}
                                    className='form-control' />
                                </div>
                            </div>

                            <div className='form-group col-md-3  py-2 mb-2 '>
                                <div className='border  p-2'>
                                    <label htmlFor="">Image 4</label>
                                    <div className='p-3 imagebox'>
                                        <img src={Img4} alt="" width={"100%"} />
                                    </div>
                                    <input type="file" 
                                    onChange={(e)=>selectFile('img4',e.target.files[0])}
                                    className='form-control' />
                                </div>
                            </div>

                            <div className='form-group col-md-3  py-2 mb-2 '>
                                <div className='border p-2'>
                                    <label htmlFor="">Image 5</label>
                                    <div className='p-3 imagebox'>
                                        <img src={Img5} alt="" width={"100%"} />
                                    </div>
                                    <input type="file" 
                                    onChange={(e)=>selectFile('img5',e.target.files[0])}
                                    className='form-control' />
                                </div>
                            </div>

                            <div className='col-12 my-3 text-center '>
                                <button className='btn btn-primary' onClick={()=>{ updateProduct()}} >Update Now</button>
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
                </div>
            </section>
    )
}

export default SuperAdmin_EditProduct