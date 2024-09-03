import React, { useState } from 'react'
import "./accordion.css";
import Card3 from '../cards/Card3';

const Accordion2 = ({ accordionData, title }) => {

    const [accordionBox, SetAccordioBox] = useState(false);

    const showAccordioBox = () => {
        accordionBox == true ? SetAccordioBox(false) : SetAccordioBox(true);
    }


    return (
        <>
            <div className='accordion2Box border rounded p-2 cp shadow-sm bg-white '>
                <div className='col-12 d-flex jbc us-none spec-dropdown'
                    onClick={() => showAccordioBox()}
                >
                    <h6 className='pt-2'>{title}</h6>
                    {accordionBox ?
                        <i className='fa fa-chevron-up'></i>
                        :
                        <i className='fa fa-chevron-down'></i>
                    }
                </div>
                {accordionBox ?
                    <div className='pt-3'>
                        {
                            accordionData.map((item, i) => {
                                return (
                                    <Card3 detail={item} />
                                )
                            })
                        }
                    </div>
                    :
                    <></>
                }

            </div>
        </>
    )
}

export default Accordion2