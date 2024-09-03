

import React, { useEffect, useState } from 'react'
import AccordionWithTable_2 from '../../../components/accordion/AccordionWithTable_2';
import PreLoader from '../../../components/preloader/PreLoader';
import axios from 'axios';

const SuperAdmin_Orders = () => {

  const [loading, SetLoading] = useState(true);

  const [NewOrderList, setNewOrderList] = useState([]);
  const [PackedOrderList, setPackedOrderList] = useState([]);
  const [ShippedOrderList, setShippedOrderList] = useState([]);
  const [outForDeliveryOrderList, setoutForDeliveryOrderList] = useState([]);
  const [DeliveredOrderList, setDeliveredOrderList] = useState([]);
  const [CancelledOrderList, setCancelledOrderList] = useState([]);
  const [ReturnOrderList, setReturnOrderList] = useState([]);

  function getOrderListByStatus(order_status) {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    let url = import.meta.env.VITE_API_USER_GET_ORDER_BY_STATUS + order_status;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.msg == 'success') {
          // console.log(result);
          if (order_status == 'New') {
            setNewOrderList(result.order_list);
          }
          if (order_status == 'Packed') {
            setPackedOrderList(result.order_list);
          }
          if (order_status == 'Shipped') {
            setShippedOrderList(result.order_list);
          }
          if (order_status == 'outForDelivery') {
            setoutForDeliveryOrderList(result.order_list);
          }
          if (order_status == 'Delivered') {
            setDeliveredOrderList(result.order_list);
          }
          if (order_status == 'Cancelled') {
            setCancelledOrderList(result.order_list);
          }
          if (order_status == 'Return') {
            setReturnOrderList(result.order_list);
          }
        }
      })
      .catch((error) => console.error(error));
  }

  function callOrderList() {
    getOrderListByStatus('New')
    getOrderListByStatus('Packed')
    getOrderListByStatus('Shipped')
    getOrderListByStatus('outForDelivery')
    getOrderListByStatus('Delivered')
    getOrderListByStatus('Cancelled')
    getOrderListByStatus('Return')
  }

  async function changeOrderStatus(e, order_id, USER_ID) {

    let status = e.target.value;

    try {
      if (status == "") {
        console.log('Empty order status'); return;
      }

      // SetLoading(true)

      const user_id = localStorage.getItem('superUserId');
      const token = localStorage.getItem('superToken');

      let dataList = {
        user_id: user_id,
        token: token,
        order_id: order_id,
        USER_ID: USER_ID,
        order_status: status,
      }

      let url = import.meta.env.VITE_API_ADMIN_UPDATE_ORDER_STATUS;
      const response = await axios.post(url, dataList,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.msg == "success") {
        const msg = response.data.msg;

        setNewOrderList(prev => prev.filter(order => order.order_id !== order_id));
        setPackedOrderList(prev => prev.filter(order => order.order_id !== order_id));
        setShippedOrderList(prev => prev.filter(order => order.order_id !== order_id));
        setoutForDeliveryOrderList(prev => prev.filter(order => order.order_id !== order_id));
        setDeliveredOrderList(prev => prev.filter(order => order.order_id !== order_id));
        setCancelledOrderList(prev => prev.filter(order => order.order_id !== order_id));
        setReturnOrderList(prev => prev.filter(order => order.order_id !== order_id));

        // Add order to new status list
        callOrderList()

        console.log(status);
        return;
      }
      else {
        setErrorMsg(response.data.msg);
        SetLoading(false)
        return;
      }
    } catch (error) {
      SetLoading(false)
      console.error('Login failed:', error);
    }
  }

  useEffect(() => {
    callOrderList()
    SetLoading(false);
  }, [])

  return (
    <>
      {
        loading
          ?
          <PreLoader />
          :
          <section className='container-fluid  my-3 px-5'>
            <div className="row">
              <AccordionWithTable_2 parentFunction1={changeOrderStatus} data={NewOrderList} title={"New"} />
              <AccordionWithTable_2 parentFunction1={changeOrderStatus} data={PackedOrderList} title={"Packed"} />
              <AccordionWithTable_2 parentFunction1={changeOrderStatus} data={ShippedOrderList} title={"Shipped"} />
              <AccordionWithTable_2 parentFunction1={changeOrderStatus} data={outForDeliveryOrderList} title={"outForDelivery"} />
              <AccordionWithTable_2 parentFunction1={changeOrderStatus} data={DeliveredOrderList} title={"Delivered"} />
              <AccordionWithTable_2 parentFunction1={changeOrderStatus} data={CancelledOrderList} title={"Cancelled"} />
              <AccordionWithTable_2 parentFunction1={changeOrderStatus} data={ReturnOrderList} title={"Return"} />
            </div>
          </section>
      }
    </>
  )
}

export default SuperAdmin_Orders