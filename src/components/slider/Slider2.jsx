import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Slider2({ slider_id }) {

    const [sliderList, setsliderList] = useState([]);
    var api_base_url = import.meta.env.VITE_API_BASE_URL+"/magixs/slider/"+slider_id;

    const getSliderList = async (slider_id) => {

        let url = import.meta.env.VITE_API_USER_GET_SLIDER_BY_ID + `${slider_id}`;
        return axios.get(url)
            .then((response) => {
                if (response.data.msg === "success") {
                    // return response.data.slider_list;
                    setsliderList(response.data.slider_list)
                }
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
                throw error;
            });
    }

    useEffect(() => {

        getSliderList(slider_id)

    }, [])



    return (
        <>
            {
                sliderList.length
                    ?
                    <Swiper
                        spaceBetween={5}
                        slidesPerView={1}
                        loop={true}

                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}

                    >

                        {
                            sliderList[0].img1 ?
                                <SwiperSlide >
                                    <Link to={`${sliderList[0].link1}`}>
                                        <img src={`${api_base_url}/${sliderList[0].img1}`} style={{ width: "100%" }} />
                                    </Link>
                                </SwiperSlide>
                                : null
                        }

                        {
                            sliderList[0].img2 ?
                                <SwiperSlide >
                                    <Link to={`${sliderList[0].link2}`}>
                                        <img src={`${api_base_url}/${sliderList[0].img2}`} style={{ width: "100%" }} />
                                    </Link>
                                </SwiperSlide>
                                : null
                        }

                        {
                            sliderList[0].img3 ?
                                <SwiperSlide >
                                    <Link to={`${sliderList[0].link3}`}>
                                        <img src={`${api_base_url}/${sliderList[0].img3}`} style={{ width: "100%" }} />
                                    </Link>
                                </SwiperSlide>
                                : null
                        }

                        {
                            sliderList[0].img4 ?
                                <SwiperSlide >
                                    <Link to={`${sliderList[0].link4}`}>
                                        <img src={`${api_base_url}/${sliderList[0].img4}`} style={{ width: "100%" }} />
                                    </Link>
                                </SwiperSlide>
                                : null
                        }

                        {
                            sliderList[0].img5 ?
                                <SwiperSlide >
                                    <Link to={`${sliderList[0].link5}`}>
                                        <img src={`${api_base_url}/${sliderList[0].img5}`} style={{ width: "100%" }} />
                                    </Link>
                                </SwiperSlide>
                                : null
                        }

                    </Swiper>

                    :
                    null
            }
        </>

    )
}

export default Slider2
