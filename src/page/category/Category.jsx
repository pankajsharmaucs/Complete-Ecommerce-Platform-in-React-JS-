import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card2 from '../../components/cards/Card2';
import Heading1 from '../../components/heading/Heading1';



const Category = () => {

    const { catName,cat_id } = useParams();
    const [productList, setproductList] = useState();

    // =====products List====
    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let url=import.meta.env.VITE_API_USER_GET_PRODUCT_BY_CAT_ID;
        fetch(url+cat_id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                if (result.msg == 'success') {
                    setproductList(result.pro_detail)
                }
            })
            .catch((error) => console.error(error));

    }, [])


    return (
        <>
            <section className='categoryItems my-3'>
                <div className="container">
                    <div className='row'>
                        <Heading1 title={catName} />
                    </div>

                    <div className="categoryBox jsc flex-wrap">
                        {
                            productList ?
                                productList.map((productData, index) => {
                                    return (
                                        <Card2 productData={productData} catName={catName} key={index} />
                                    )
                                })
                                : 
                                <>
                                <div className='col-12 jcc bg-white p-5'>
                                    <img src={'/assets/category/no-products-found.png'} alt="" style={{width:"150px"}} />
                                </div>
                                </>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Category