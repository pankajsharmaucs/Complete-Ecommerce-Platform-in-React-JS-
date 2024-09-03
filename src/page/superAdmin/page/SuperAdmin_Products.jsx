import React, { useEffect, useState } from 'react'
import List1 from '../../../components/List.jsx/List1';
import PreLoader from '../../../components/preloader/PreLoader';
import { Link } from 'react-router-dom';



const SuperAdmin_Products = () => {

    const [loading, SetLoading] = useState(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cat_id = urlParams.get('cat_id')
    const cat_name = urlParams.get('cat_name')

    const [productList, setproductList] = useState();

    // =====products List====
    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let url = import.meta.env.VITE_API_USER_GET_PRODUCT_BY_CAT_ID;
        fetch(url + cat_id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.msg == 'success') {
                    setproductList(result.pro_detail)
                }
            })
            .catch((error) => console.error(error));

        SetLoading(false)

    }, [])


    return (
        <>
            {
                loading ?
                    <PreLoader />
                    :

                    <section className='categoryItems my-3'>
                        <div className="container">

                            <div className="categoryBox jac flex-wrap">
                                <section className='container-fluid p-0'>
                                    <div className="container ">
                                        <div className="row p-2 bg-white">
                                            <div className='col-12 mb-3 jbc'>
                                                <h3 className='text-capitalize'> {cat_name}
                                                    <Link to={`../editCat?cat_id=${cat_id}&cat_name=${cat_name}`} >
                                                        <i className='fa fa-edit text-dark ms-2' ></i>
                                                    </Link>
                                                </h3>
                                                <Link to={`../addProduct?cat_id=${cat_id}&cat_name=${cat_name}`} >
                                                    <button className='btn btn-sm btn-success' >Add Product</button>
                                                </Link>
                                            </div>
                                            <table className='col-12 text-center table tabled-bordered table-stripped'>
                                                <thead>
                                                    <tr>
                                                        <th>Sn.</th>
                                                        <th>Title</th>
                                                        <th>Qty</th>
                                                        <th>Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                  {
                                                        productList ?
                                                            productList.map((productData, index) => {
                                                                return (
                                                                    <List1 key={index} data={productData} cat_id={cat_id} cat_name={cat_name} />
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

export default SuperAdmin_Products