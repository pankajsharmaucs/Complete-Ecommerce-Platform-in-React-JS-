import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PreLoader from '../../components/preloader/PreLoader';
import Accordion from '../../components/accordion/Accordion';
import Button1 from '../../components/button/Button1';
import Button3 from '../../components/button/Button3';
import ImageCard1 from '../../components/cards/ImageCard1';
import Back_Button from '../../components/button/Back_Button';
import MyContext from '../../useContext/MyContext';
import './product.css';
import ImageCard2 from '../../components/cards/ImageCard2';
const ainmate_fadeIn = "animate__animated animate__fadeIn animate__faster";
import Slider3 from '../../components/slider/Slider3';
import axios from 'axios';

const Product = () => {

    const navigate = useNavigate();

    const { isLogin } = useContext(MyContext);
    const { myCartList } = useContext(MyContext);
    const { cat_name, product_name, pro_id } = useParams();

    // ============State====================
    const [inCart, SetInCart] = useState(false);
    const [isAddedInCart, SetisAddedInCart] = useState(false);
    const [loading, SetLoading] = useState(true);
    const [productData, setproductData] = useState([]);
    const [MainImage, setMainImage] = useState(null);
    const [sliderList, setsliderList] = useState([]);
    const [ZoomSlider, setZoomSlider] = useState(false);

    var api_base_url = import.meta.env.VITE_API_BASE_URL + "/magixs/products/";

    // ============Functions=====================

    const handlesetMainImage = (img) => {
        let url = `${api_base_url}${productData.cat_id}/${productData.product_id}/${img}`;
        setMainImage(url)
    }

    const showAddCartPopUp = () => {

        SetisAddedInCart(true);
        setTimeout(() => {
            SetisAddedInCart(false);
        }, 2000)
    }

    function addToCart() {
        if (localStorage.getItem('token')) {

            let user_id = localStorage.getItem("userId");
            let token = localStorage.getItem("token");
            let title = productData.title;
            let imgLink = `${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img1}`;

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "user_id": user_id,
                "token": token,
                "pro_id": pro_id,
                "pro_name": title,
                "img1": imgLink,
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };


            let url = import.meta.env.VITE_API_USER_ADD_TO_CART;
            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    // console.log(result.cart_item);
                    if (result.msg == 'success') {
                        SetInCart(true);
                        myCartList.setMycart(result.cart_item)
                        showAddCartPopUp()
                        return;
                    } else {
                        SetInCart(false);
                    }
                }
                ).catch((error) => {
                    SetInCart(false);
                });

        }
    }


    const get_product_cart_status = () => {
        if (localStorage.getItem('token')) {
            let user_id = localStorage.getItem("userId");
            let token = localStorage.getItem("token");

            const url = import.meta.env.VITE_API_USER_GET_CART_BY_PRO_ID;
            const headers = {
                'Content-Type': 'application/json'
            };

            const data = {
                user_id: user_id,
                token: token,
                pro_id: pro_id
            };

            axios.post(url, data, { headers })
                .then(response => {
                    if (response.data.msg === 'success') {
                        SetInCart(true);
                    } else {
                        SetInCart(false);
                    }
                })
                .catch(error => {
                    console.error('Error fetching cart status:', error);
                });
        }
    };

    useEffect(() => {

        get_product_cart_status();

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const fetchData = async () => {
            const url = `${import.meta.env.VITE_API_USER_GET_PRODUCT_BY_PRO_ID}${pro_id}`;

            try {
                const response = await axios.get(url, requestOptions);
                const result = response.data;

                if (result.msg === 'success') {
                    setproductData(result.pro_detail);

                    // Construct sliderList
                    var api_base_url = import.meta.env.VITE_API_BASE_URL + "/magixs/products/";
                    const newSliderList = [
                        { id: 1, image: `${api_base_url}${result.pro_detail.cat_id}/${result.pro_detail.product_id}/${result.pro_detail.img1}`, linkTo: "" },
                        { id: 2, image: `${api_base_url}${result.pro_detail.cat_id}/${result.pro_detail.product_id}/${result.pro_detail.img2}`, linkTo: "" },
                        { id: 3, image: `${api_base_url}${result.pro_detail.cat_id}/${result.pro_detail.product_id}/${result.pro_detail.img3}`, linkTo: "" },
                        { id: 4, image: `${api_base_url}${result.pro_detail.cat_id}/${result.pro_detail.product_id}/${result.pro_detail.img4}`, linkTo: "" },
                        { id: 5, image: `${api_base_url}${result.pro_detail.cat_id}/${result.pro_detail.product_id}/${result.pro_detail.img5}`, linkTo: "" },
                    ];
                    let url = `${api_base_url}${result.pro_detail.cat_id}/${result.pro_detail.product_id}/${result.pro_detail.img1}`;
                    setMainImage(url)
                    
                    setsliderList(newSliderList);

                    get_product_cart_status();
                    SetLoading(false);
                } else {
                    SetLoading(false);

                }
            } catch (error) {
                SetLoading(false);
            }
        };

        fetchData();


    }, [])


    return (
        <>
            {
                loading ? <PreLoader />
                    :
                    <section className={ainmate_fadeIn + ' productDetailPage  '} >
                        <div className="container  bg-white my-2">
                            <div className="row py-md-2  p-0">
                                <div className='col-xl-5 col-lg-5 col-md-5 col-sm-12 p-2'>
                                    <nav aria-label="breadcrumb" className='p-1'>
                                        <ol className="breadcrumb ">
                                            <li className="breadcrumb-item"><Link style={{ color: "black" }} to={"/"}>Home</Link></li>
                                            <li className="breadcrumb-item"><Link style={{ color: "black" }} to={`/category/${cat_name}/${productData.cat_id}`}>{cat_name}</Link></li>
                                        </ol>
                                    </nav>




                                    <div className='row' style={{ padding: "1%" }}>

                                        <div className="col-12 cp p-md-5 p-3" onClick={() => setZoomSlider(true)}>
                                            <ImageCard2 imageUrl={MainImage} />
                                        </div>

                                        <div className="row jcc otherImageBox">
                                            <div className=" cp  jcc p-2" style={{ width: "60px", height: "70px", border: "1px solid #ccc", margin: "4px", overflow: "hidden" }}
                                                onClick={() => handlesetMainImage(productData.img1)} >
                                                <ImageCard1 imageUrl={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img1}`} />
                                            </div>
                                            <div className=" cp  jcc p-2" style={{ width: "60px", height: "70px", border: "1px solid #ccc", margin: "4px", overflow: "hidden" }}
                                                onClick={() => handlesetMainImage(productData.img2)} >
                                                <ImageCard1 imageUrl={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img2}`} />
                                            </div>
                                            <div className=" cp jcc p-2" style={{ width: "60px", height: "70px", border: "1px solid #ccc", margin: "4px", overflow: "hidden" }}
                                                onClick={() => handlesetMainImage(productData.img3)}>
                                                <ImageCard1 imageUrl={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img3}`} />
                                            </div>
                                            <div className=" cp jcc p-2" style={{ width: "60px", height: "70px", border: "1px solid #ccc", margin: "4px", overflow: "hidden" }}
                                                onClick={() => handlesetMainImage(productData.img4)}>
                                                <ImageCard1 imageUrl={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img4}`} />
                                            </div>
                                            <div className=" cp jcc p-2" style={{ width: "60px", height: "70px", border: "1px solid #ccc", margin: "4px", overflow: "hidden" }}
                                                onClick={() => handlesetMainImage(productData.img5)}>
                                                <ImageCard1 imageUrl={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img5}`} />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 p-3 '>
                                    <div className="row py-md-3 py-0 pt-md-2 pt-3">
                                        <div className='col-12 '>

                                            <h4 className='productTitle'>{productData.title}</h4>
                                            <h6>
                                                <span className='text-success f20 me-1'>&#8377; {productData.price}</span>
                                                <span className='text-danger f13'><strike>&#8377; {productData.price}</strike></span>
                                            </h6>

                                            <div className='col-12 warrantyBox'>
                                                <h6 className='mt-2 f13 '><i className="fa fa-check me-2" aria-hidden="true">
                                                </i>Free Delivery </h6>

                                                <h6 className='mt-2 f13 '><i className="fa fa-check me-2" aria-hidden="true">
                                                </i>100% Return Policy </h6>

                                                <h6 className='mt-2 f13 '><i className="fa fa-check me-2" aria-hidden="true">
                                                </i>1 Year manufacturing Warranty </h6>
                                            </div>

                                            {
                                                inCart
                                                    ?
                                                    <Button1 text={`View Cart`} linkTo={'/cart'} />
                                                    :
                                                    <div className='' onClick={() => addToCart()} >
                                                        <Button3 text={`Add to Cart`} />
                                                    </div>
                                            }


                                        </div>
                                    </div>
                                </div>

                                {/* ========Product===decription========= */}
                                <div className='col-xl-12 text-md-start my-2 p-4 ProductDescription'>
                                    <h3>Product Description</h3>
                                    <p className='f13' >{productData.description}</p>

                                    <div className='row'>
                                        <h3>Product Images</h3>
                                        <div className="col-md-4 col-6   p-2">
                                            <div className='otherImages jcc'>
                                                <ImageCard1 imageUrl={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img1}`} />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-6 p-2 ">
                                            <div className='otherImages jcc'>
                                                <ImageCard1 imageUrl={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img2}`} />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-6 p-2 ">
                                            <div className='otherImages jcc'>
                                                <ImageCard1 imageUrl={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img3}`} />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-6 p-2 ">
                                            <div className='otherImages jcc'>
                                                <ImageCard1 imageUrl={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img4}`} />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </section>
            }

            {
                ZoomSlider
                    ?
                    <section className='zoomSlider  my-md-2 my-0 animate__animated animate__fadeIn animate__faster '>
                        <div className='container bg-white   p-md-1 p-3 animate__animated animate__slideInUp animate__faster '>
                            <Slider3 sliderList={sliderList} />
                        </div>
                        <div class="col-md-4 text-center my-5" onClick={() => setZoomSlider(false)}>
                            <div className='btn1 px-2' >Back to product</div>
                        </div>
                    </section>
                    :
                    null
            }

            {
                isAddedInCart
                    ?
                    <div className='addToCartPop '>
                        <div className='bg-white py-2 border-light border-3 col-10 border jcc animate__animated  animate__bounceIn animate__faster shadow'>
                            <img src="/assets/icons/check.png" className='me-2' alt="" />
                            <h6 className='text-center pt-2'>
                                Added to cart Successfully
                            </h6>
                        </div>
                    </div>
                    :
                    null
            }


        </>
    )
}

export default Product