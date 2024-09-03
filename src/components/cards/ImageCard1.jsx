import React from 'react';
import './card1.css';

const ImageCard1 = ({imageUrl}) => {
    return (
        <>
            <div className='mainImageBox '>
                <img src={imageUrl} style={{width:"100%"}} alt="main product Image" />
            </div>
        </>
    )
}

export default ImageCard1