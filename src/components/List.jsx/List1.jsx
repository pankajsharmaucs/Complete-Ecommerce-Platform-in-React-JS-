import React from 'react'
import { Link } from 'react-router-dom';

const List1 = ({ data,cat_id }) => {
    // console.log(data);
    return (

        <tr className='border'>
            <td>1</td>
            <td>{data.title.substr(0, 34)}...</td>
            <td>{data.quantity}</td>
            <td>
                <Link to={`../editProduct?pro_id=${data.product_id}&cat_id=${cat_id}`}>
                    <button className='btn btn-sm btn-warning'>
                        Edit
                    </button>
                </Link>
            </td>
        </tr>

    )
}

export default List1