import React, { useState } from 'react'
import "./accordion.css";

const Accordion = ({ accordionData, title }) => {

    const [accordionBox, SetAccordioBox] = useState(false);

    const showAccordioBox = () => {
        accordionBox == true ? SetAccordioBox(false) : SetAccordioBox(true);
    }


    return (
        <>
            <div className='specificationBox border rounded p-2 cp shadow-sm bg-white '>
                <div className='col-12 d-flex jbc us-none spec-dropdown'
                    onClick={() => showAccordioBox()}>
                    <h6 className='pt-2'>{title}</h6>
                    {accordionBox ?
                        <i className='fa fa-chevron-up'></i>
                        :
                        <i className='fa fa-chevron-down'></i>
                    }
                </div>
                {accordionBox ?
                    <ul className='specList border-top pt-2 mt-2'>
                        {
                            Object.keys(accordionData).map((item, i) => (
                                <li key={i} >{Object.keys(accordionData)[i]} :&nbsp; { Object.values(accordionData)[i] }  </li>
                            ))
                        }
                    </ul>
                    :
                    <></>
                }

            </div>
        </>
    )
}

export default Accordion