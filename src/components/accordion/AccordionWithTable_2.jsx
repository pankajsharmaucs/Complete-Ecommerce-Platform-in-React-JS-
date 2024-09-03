import React, { useEffect, useState } from 'react'
import './accordion.css'

const AccordionWithTable_2 = ({ data, title,parentFunction1 }) => {

    const [isOpen, SetIsOpen] = useState(false);

    const toggleAccordion = () => {
        isOpen ? SetIsOpen(false) : SetIsOpen(true)
    }


    const changeOrderStatus=(e, order_id,user_id)=>{
        parentFunction1(e, order_id,user_id);
        return;
    }

    useEffect(() => {
    }, [])

    return (

            <div className='accordionWithTable_1 pb-2 mb-3' id="accordionWithTable_2">
                <div className='accordionTab ' onClick={toggleAccordion}>
                    <div>{title}</div>
                    {
                        isOpen ?
                            <i className='fa fa-chevron-up' ></i>
                            :
                            <i className='fa fa-chevron-down' ></i>
                    }

                </div>
                {
                    isOpen ?
                        <div className='accordionTableList p-2 border rounded'>
                            <table className='table table-stripped '>
                                <thead>
                                    <tr>
                                        <th>Sno.</th>
                                        <th>User</th>
                                        <th>Product ID</th>
                                        <th>Pro Name</th>
                                        <th>Qty</th>
                                        <th>Order Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        data ?
                                        data.map((order, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{order.user_id}</td>
                                                        <td>{order.product_id}</td>
                                                        <td>{order.p_name}</td>
                                                        <td>{order.p_quantity}</td>
                                                        <td>{order.product_id}</td>
                                                        <td className='d-flex'>
                                                            <select value={order.order_status} name="" id="" 
                                                            onChange={(e) => changeOrderStatus(e, order.order_id, order.user_id)} 
                                                            className='form-select'>
                                                                <option value="">Select Status</option>
                                                                <option value="New">New</option>
                                                                <option value="Packed">Packed</option>
                                                                <option value="Shipped">Shipped</option>
                                                                <option value="outForDelivery">outForDelivery</option>
                                                                <option value="Delivered">Delivered</option>
                                                                <option value="Cancelled">Cancelled</option>
                                                                <option value="Return">Return</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <>
                                                <div className='col-12 text-center'>
                                                    <h4>No Order Found</h4>
                                                </div>
                                            </>
                                    }

                                </tbody>
                            </table>
                        </div>
                        :
                        null
                }

            </div>
    )
}

export default AccordionWithTable_2