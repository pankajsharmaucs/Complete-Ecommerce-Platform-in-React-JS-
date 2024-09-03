import React from 'react'
import { Link } from 'react-router-dom'

const Button3 = ({linkTo,text}) => {
    return (
        <>
            <Link to={linkTo} className='btn btn7 my-3 py-2 w-100 fw-bold'>
                {text}
            </Link>
        </>
    )
}

export default Button3