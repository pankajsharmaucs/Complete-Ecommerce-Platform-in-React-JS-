import React from 'react'
import './card1.css';

const ImageCard2 = ({imageUrl}) => {
    return (
        <>
            <div className='col-12 p-md-2 p-2' >
                <img src={imageUrl} className='w-100' alt="main product Image" />
            </div>
        </>
    )
}

export default ImageCard2