import React from 'react'

const InputText = ({ p_input, inputClass, labelText, placeholderText, data }) => {

    const changeInput = (event) => {
        p_input([inputClass,event.target.value])
    }

    return (
        <>
            <div className='form-group input1 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb-2'>
                <label htmlFor={inputClass}>{labelText}</label>
                <input type="text" name={inputClass}
                    defaultValue={data} className='form-control'
                    placeholder={placeholderText}
                    onKeyUp={changeInput}
                />
            </div>
        </>
    )
}

export default InputText