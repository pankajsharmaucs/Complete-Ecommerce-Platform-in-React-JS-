import React from 'react'

const Shipping = () => {

    let supportEmail="support@magixs.online"
    let company_name = "Magixs Store";

  return (
    <div>
        <p> Shipping policy</p>

<p>At {company_name}, we aim to provide efficient delivery services to our customers across India.</p>

<p>Delivery Timeframe</p>

<p>All items purchased from our store are shipped pan India and 
    typically delivered within 5-7 business days from the date of order placement.</p>

<p>Possible Delays</p>

<p>While we strive to ensure timely delivery, please understand that 
    occasional delays may occur due to unforeseen circumstances beyond our control.
     We appreciate your patience and understanding in such situations.</p>

<p>Contact Us</p>

<p>If you have any questions or require assistance regarding your order or delivery, 
    please don't hesitate to reach out to us at {supportEmail} Our dedicated customer
     support team is here to help.</p>
    </div>
  )
}

export default Shipping