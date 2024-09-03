import React, { useState } from 'react'
import "./accordion.css";
import Click_Button from '../button/Click_Button';
import InputText from '../form/InputText';

const Accordion3 = ({ to_parent_data, accordionData, title }) => {

    const [accordionBox, SetAccordioBox] = useState(false);

    const showAccordioBox = () => {
        accordionBox == true ? SetAccordioBox(false) : SetAccordioBox(true);
    }

    const child_data = (data) => {
        to_parent_data(data)
    }

    return (
        <>
            <div className='accordion3Box border rounded p-2 cp shadow-sm bg-white ' >
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

                {/* =============Form========== */}

                {accordionBox ?
                    <div className='row py-3'>

                        {accordionData.map((data, i) => {
                            return (
                                <div key={i} >
                                    <InputText key={i} p_input={child_data} inputClass={data.inputClass}
                                        labelText={data.labelText} placeholderText={data.placeholderText}
                                        data={data.inputField} />
                                </div>
                            )
                        })}


                        <div className='col-xl-4 col-lg-6 col-md-8 w-100'>
                            <Click_Button btnClassName={"btn2"} trigger={"saveAddress"} text={"Save"} />
                        </div>

                    </div>
                    :
                    <></>
                }

            </div>
        </>
    )
}

export default Accordion3