import React from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


function Slider1({ catList }) {
    var api_base_url = import.meta.env.VITE_API_BASE_URL + "/magixs/category/";
    return (
        <>
            <Swiper
                   
                    spaceBetween={3}
                    slidesPerView={5}

            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            >

                {catList.map((cat, i) => {
                    return (
                        <SwiperSlide key={i}>
                            {
                                cat.id === 1
                                    ?
                                    <Link to={`categories`} >
                                        <img src={`${api_base_url}${cat.cat_id}/${cat.image}`} style={{ width: "60px" }} />
                                    </Link>
                                    :
                                    <Link to={`${cat.linkTo}`} >
                                        <img src={`${api_base_url}${cat.cat_id}/${cat.image}`} style={{ width: "60px" }} />
                                    </Link>
                            }

                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </>
    )
}

export default Slider1
