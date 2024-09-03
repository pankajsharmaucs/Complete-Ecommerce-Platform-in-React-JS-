import React, { useEffect, useState } from 'react'
import List1 from '../../../components/List.jsx/List1';
import PreLoader from '../../../components/preloader/PreLoader';
import { Link } from 'react-router-dom';
import List2 from '../../../components/List.jsx/List2';
import axios from 'axios';



const SuperAdmin_Website = () => {

    const [loading, SetLoading] = useState(true);
    const queryString = window.location.search;
    const [sliderList, setsliderList] = useState([]);


    const getSliderList = async (slider_id) => {

        let url = import.meta.env.VITE_API_USER_GET_SLIDER_BY_ID + `${slider_id}`;
        return axios.get(url)
            .then((response) => {
                if (response.data.msg === "success") {
                    return response.data.slider_list;
                }
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
                throw error;
            });
    }

    // =====products List====
    useEffect(() => {

        // =====All===slider==list===
        getSliderList('all').then((result) => {
            setsliderList(result)
            // console.log(result);
        })

        SetLoading(false)

    }, [])


    return (
        <>
            {
                loading ?
                    <PreLoader />
                    :

                    <section className='categoryItems my-3 '>
                        <div className="container">

                            <div className="categoryBox jac flex-wrap">
                                <section className='container-fluid p-0'>
                                    <div className="container ">
                                        <div className="row p-2 bg-white">
                                            <div className='col-12 mb-3 jbc'>
                                                <h3 className='text-capitalize'> Slider List

                                                </h3>
                                                <Link to={`../addSlider`} >
                                                    <button className='btn4 f13 fw-normal' >Add Slider</button>
                                                </Link>
                                            </div>
                                            <table className='col-12 text-center table tabled-bordered table-stripped'>
                                                <thead>
                                                    <tr>
                                                        <th>Sn.</th>
                                                        <th>Slider_id</th>
                                                        <th>Name</th>
                                                        <th>Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        sliderList ?
                                                            sliderList.map((sliderData, index) => {
                                                                return (
                                                                    <List2 key={index} data={sliderData}  />
                                                                )
                                                            })
                                                            : null
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>
                    </section>
            }
        </>
    )
}

export default SuperAdmin_Website