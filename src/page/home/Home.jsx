import React, { useContext, useEffect, useState } from 'react'
import Card1 from '../../components/cards/Card1'
import Card2 from '../../components/cards/Card2';
import Slider1 from '../../components/slider/Slider1';
import Slider2 from '../../components/slider/Slider2';
import Account from '../account/Account';
import MyContext from '../../useContext/MyContext';
import PreLoader from '../../components/preloader/PreLoader';
import axios from 'axios';


const Home = () => {

  const { isLogin } = useContext(MyContext);
  const [loading, SetLoading] = useState(true);

  const [catList, setcatList] = useState();
  const [latestProduct, setlatestProduct] = useState([]);
  const [Supplement, setSupplement] = useState([]);


  //  ===category List=====
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    let url = import.meta.env.VITE_API_USER_GET_ALL_CAT;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.msg == 'success') {
          // console.log(result);
          setcatList(result.all_cat)
        }
      })
      .catch((error) => console.error(error));



  }, [])

  // ===latest===products====
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      url: import.meta.env.VITE_API_USER_GET_PRODUCT_SECION_LATEST,
    };

    axios(requestOptions)
      .then((response) => {
        const result = response.data;
        if (result.msg === 'success') {
          setlatestProduct(result.pro_list);
        }
      })
      .catch((error) => console.error(error));
  }, []);


  

   // ===Category wise===products====
   useEffect(() => {

    function get_product_cat_id(cat_id){
      const requestOptions = {
        method: "GET",
        url: import.meta.env.VITE_API_USER_GET_PRODUCT_BY_CAT_ID+cat_id,
      };
  
      axios(requestOptions)
        .then((response) => {
          const result = response.data;
          // console.log(result);
          if (result.msg === 'success') {
            setSupplement(result.pro_detail);
          }
        })
        .catch((error) => console.error(error));
    }

    get_product_cat_id(67051716470996);

  }, []);


  const loginPopUpCss = {
    width: "100%", height: "100vh", background: "#fff",
    position: "fixed", top: "0", left: 0, zIndex: 9999999999999,
  }

  const innerFormBox = {
    width: "100%", height: "100%", position: "absolute",
    top: "80px", left: 0, borderRadius: "20px", background: "#fff"
  }

  const bgUrl = "https://img.freepik.com/free-vector/gradient-glassmorphism-horizontal-banner_23-2149440109.jpg";

  useEffect(() => {
    setTimeout(() => {
      SetLoading(false)
    }, 1000)
  }, [])


  return (
    <>

      <div className='animate__animated animate__fadeIn '>

        {/* ========Category==list==== */}
        <div className='container-fluid p-0 bg-white animated__animate animate_fadeIn'>
          <div className='container py-2'>
            {
              catList ?
                <Slider1 catList={catList} />
                : null
            }
          </div>
        </div>

        {/* ========Offers Slide==== */}
        <section className='categorySection  my-md-2 my-2 '>
          <div className='container-fluid bg-white   p-md-1 p-0'>
            <Slider2 slider_id={`slider_2321719314769`} />
          </div>
        </section>

        {/* ========Latest Section==== */}
        <section className='categorySection  my-md-2 my-2  '>
          <div className='container-fluid bg-white   p-3'>

            <div className="row">
              <div className='col-12 '><h4 className='text-uppercase text1'>Latest</h4></div>
            </div>

            <div className='categoryBox jsc flex-wrap'>
              {
                latestProduct ?
                  latestProduct.map((data, index) => {
                    return (
                      <Card1 productData={data} key={index} />
                    )
                  })
                  : null
              }
            </div>
          </div>
        </section>


        {/* ========Trending Section==== */}
        <section className='categorySection  my-md-2 my-0 '>
          <div className='container-fluid bg-white   p-3'>

            <div className="row">
              <div className='col-12 '><h4 className='text-uppercase text1'>Trending</h4></div>
            </div>

            <div className='categoryBox jsc flex-wrap'>
              {
                latestProduct ?
                  latestProduct.map((data, index) => {
                    return (
                      <Card1 catData={data} productData={data} key={index} />
                    )
                  })
                  : null
              }
            </div>
          </div>
        </section>



         {/* ========Category wise product==== */}
         <section className='categorySection  my-md-2 my-2  '>
          <div className='container-fluid bg-white   p-3'>

            <div className="row">
              <div className='col-12 '><h4 className='text-uppercase text1'>Supplement</h4></div>
            </div>

            <div className='categoryBox jsc flex-wrap'>
              {
                Supplement ?
                  Supplement.map((data, index) => {
                    return (
                      <Card1 productData={data} key={index} />
                    )
                  })
                  : null
              }
            </div>
          </div>
        </section>

      </div>
      


    </>
  )
}

export default Home