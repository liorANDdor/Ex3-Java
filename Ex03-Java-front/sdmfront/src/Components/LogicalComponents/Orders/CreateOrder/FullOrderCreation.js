import React, { useState } from 'react'
import SimplRating from "../../../UIComponents/Rating/Rating"
import axios from "../../../../Utilities/Axios/Axios";

import CreatNewOrder from './CreateOrder'
import AddSales from './AddSales'

const FullOrderCreation = () => {

    const [wasOrdered, setWasOrdered] = useState(false)
    const [error, setError] = useState("")
    const [stores, setStores] = useState([{}])
    const [doneOrder, setDoneOrder] = useState({})
    const [orderId, setOrderId] = useState(null)
    const [isSentSales, setIsSentSales] = useState(false)

    const refreshPage =() =>{
        setWasOrdered(false)
        setDoneOrder({})
        setOrderId(null)
        setIsSentSales(false)


    }
    const submitHandler = (order) => {
        
        setDoneOrder(order)
        axios.post("/SDM/makePurchase", order).then((res) => {

            if (res.data.map.wasAdded === true) {
                setWasOrdered(true)
                setStores(res.data.map.stores.map)
                setOrderId(res.data.map.orderId);
                console.log(wasOrdered)
            }
            else{
                setError(res.data.map.error)

            }
        });
    }

    const addedSalesHandler = () => {
        setIsSentSales(true)
    }
    {console.log(stores)}
    let toRender = null
    wasOrdered ?
        toRender = <SimplRating zone={doneOrder.zone} orderId={orderId} restartPage={refreshPage} storesList={stores}/>
        : toRender = <CreatNewOrder submitOrder={submitHandler} error={error} />


        

    return toRender

}


export default FullOrderCreation