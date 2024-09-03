import React, { useEffect, useState } from 'react'
import Heading1 from '../../components/heading/Heading1';
import CatCard from '../../components/cards/CatCard';


const AllCategory = () => {

    const [catList, setcatList] = useState();

    //  ===category List=====
    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let url=import.meta.env.VITE_API_USER_GET_ALL_CAT;
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
    
    return (
        <>
            <section className='categoryItems my-3'>
                <div className="container">
                    <div className='row'>
                        <Heading1 title={"All Category"} />
                    </div>

                    <div className="categoryBox jac flex-wrap">

                        {
                            catList
                                ?
                                catList.map((catData, index) => {
                                    if(index > 0){
                                        return (
                                            <CatCard productData={catData} key={index} />
                                        )
                                    }
                                })
                                : null
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default AllCategory 