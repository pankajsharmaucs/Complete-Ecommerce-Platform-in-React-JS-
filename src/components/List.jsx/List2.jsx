import React from 'react'
import { Link } from 'react-router-dom';

const List2 = ({ data }) => {
    // console.log(data);
    return (

        <tr className='border'>
            <td>1</td>
            <td>{data.slider_id}</td>
            <td>{data.slider_name}</td>
            <td>
                <Link to={`../editslider?slider_id=${data.slider_id}`}>
                    <button className='btn btn-sm btn-warning'>
                        Edit
                    </button>
                </Link>
            </td>
        </tr>

    )
}

export default List2