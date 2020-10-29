import React, { useState } from 'react'
import SimplRating from "../../../UIComponents/Rating/Rating"
import axios from "../../../../Utilities/Axios/Axios";

import CreatNewOrder from './CreateOrder'
import AddSales from './AddSales'

const FullOrderCreation = () => {

    const [wasOrdered, setWasOrdered] = useState(false)
    const [doneOrder, setDoneOrder] = useState({})
    const [orderId, setOrderId] = useState(null)
    const [isSentSales, setIsSentSales] = useState(false)

    const submitHandler = (order) => {
        console.log(order)
        
        setDoneOrder(order)
        axios.post("/SDM/makePurchase", order).then((res) => {

            if (res.data.map.wasAdded === true) {
                setWasOrdered(true)
                setOrderId(res.data.map.orderId);
                console.log(wasOrdered)
            }
        });
    }

    const addedSalesHandler = () => {
        setIsSentSales(true)
    }

    let toRender = null
    wasOrdered ?
        toRender = <AddSales isAddedSaleHandler order={doneOrder} addedSalesHandler={addedSalesHandler} />
        : toRender = <CreatNewOrder submitOrder={submitHandler} />
    if(isSentSales && wasOrdered) 
        toRender = <SimplRating zone={doneOrder.zone} orderId={orderId} />
        

    return toRender

}

export default FullOrderCreation