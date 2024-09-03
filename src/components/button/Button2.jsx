import React from 'react'

const Button2 = ({btnClassName,mainFunction,text}) => {

    return (
        <>
            <button onClick={ ()=>mainFunction() } className={`btn ${btnClassName} my-3  w-100 fw-bold`} >
                { text }
            </button>
        </>
    )
}

export default Button2