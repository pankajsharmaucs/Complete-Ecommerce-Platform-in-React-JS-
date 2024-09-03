import React, { useEffect, useState } from 'react'
import CatCard2 from '../../../components/cards/CatCard2';
import { Link } from 'react-router-dom';



const SuperAdmin_Cat = () => {

    const [catList, setcatList] = useState();

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
                    console.log(result);
                    setcatList(result.all_cat)
                }
            })
            .catch((error) => console.error(error));

    }, [])

    return (
        <section className='categoryItems my-3'>
            <div className="container">
                <div className='col-12 mb-3 jbc'>
                    <h3 className='text-capitalize'>All Category</h3>
                    <Link to={`../addCat`} >
                        <button className='btn btn-sm btn-success' >Add Category</button>
                    </Link>
                </div>
                <div className="categoryBox jac flex-wrap">

                    {
                        catList
                            ?
                            catList.map((catData, index) => {
                                // if (index > 0) {
                                    return (
                                        <CatCard2 data={catData} key={index} />
                                    )
                                // }
                            })
                            : null
                    }
                </div>
            </div>
        </section>
    )
}

export default SuperAdmin_Cat