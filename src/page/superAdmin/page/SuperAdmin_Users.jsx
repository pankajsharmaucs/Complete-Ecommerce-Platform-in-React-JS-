import React, { useEffect, useState } from 'react'
import AccordionWithTable_1 from '../../../components/accordion/AccordionWithTable_1'



const SuperAdmin_Users = () => {

        const [userList,setUserList]=useState([]);

        useEffect(()=>{

            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            let url = import.meta.env.VITE_API_USER_GET_ALL_USER;
            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.msg == 'success') {
                        console.log(result);
                        setUserList(result.all_users)
                }
            })
            .catch((error) => console.error(error));


  },[])

  return (
    <>
      <section className='container-fluid  my-3'>
        <div className="container">
          <div className="row">
            <AccordionWithTable_1 data={userList} title={"Clients"} />
          </div>
        </div>
      </section>
    </>
  )
}

export default SuperAdmin_Users