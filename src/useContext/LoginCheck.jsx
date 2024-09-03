import React, { useEffect, useState } from 'react'
import MyContext from './MyContext'
import axios from 'axios'; // Import axios


const LoginCheck = (props) => {
  const [State, setState] = useState(false);
  const [AdminState, setAdminState] = useState(false);
  const [myCart, setMycart] = useState([]);

  useEffect(() => {

    if (localStorage.getItem('token')) {
      let user_id = localStorage.getItem("userId");
      let token = localStorage.getItem("token");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "user_id": user_id,
        "token": token
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      let url = import.meta.env.VITE_API_USER_VALIDATE_LOGIN;
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result.msg);
          if (result.msg == 'success') {
            setState(true);
          } else {
            localStorage.clear();
            setState(false);
          }
        }
        )
        .catch((error) => console.error(error));

    } else if (localStorage.getItem('superToken')) {
      let user_id = localStorage.getItem("superUserId");
      let token = localStorage.getItem("superToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "user_id": user_id,
        "token": token
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      let url = import.meta.env.VITE_API_ADMIN_VALIDATE_LOGIN;
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.msg == 'success') {
            setAdminState(true);
            // console.log(result.msg);
          } else {
            localStorage.clear();
            setAdminState(false);
          }
        }
        )
        .catch((error) => console.error(error));
    }

    // ========Cart management=====
    if (localStorage.getItem('token')) {
      let user_id = localStorage.getItem('userId');
      let token = localStorage.getItem('token');

      const data = {
        user_id: user_id,
        token: token
      };

      const config = {
        method: 'post',
        url: import.meta.env.VITE_API_USER_CARTLIST,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      };

      axios(config)
        .then(function (response) {
          if (response.data.msg === 'success') {
            setMycart(response.data.cart_item);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }

  }, [])

  return (
    <MyContext.Provider value={{ isLogin: { State, setState }, isAdminLogin: { AdminState, setAdminState }, myCartList: { myCart, setMycart } }} >
      {props.children}
    </MyContext.Provider>
  )
}

export default LoginCheck