import React, { useState } from 'react'
import './accordion.css'
import { Link } from 'react-router-dom';

const AccordionWithTable_1 = ({ data, title }) => {
    const [isOpen, SetIsOpen] = useState(false);
    const toggleAccordion = () => {
        isOpen ? SetIsOpen(false) : SetIsOpen(true)
    }
    return (
        <div className='accordionWithTable_1 pb-2 mb-2'>
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
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>IsActive</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    data.map((user, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i+1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.active_status == 1 ? "Active" : "Inactive"}</td>
                                                <td className='d-flex'>
                                                    <Link to={`../editUser?user_id=${user.user_id}`}>
                                                        <i className='fa fa-edit fa-lg me-3 pt-2' ></i>
                                                    </Link>                                                   
                                                </td>
                                            </tr>
                                        )
                                    })
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

export default AccordionWithTable_1