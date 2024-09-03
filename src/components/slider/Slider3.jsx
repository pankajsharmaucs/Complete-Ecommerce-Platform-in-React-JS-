import React from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Slider1({ sliderList }) {


    return (
        <>
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

                {sliderList.map((product, i) => {
                    return (
                        <SwiperSlide key={i}>
                            <Link to={`${product.linkTo}`}><img src={product.image} style={{ width: "100%" }} /></Link>
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </>
    )
}

export default Slider1
