import React, { useEffect, useState } from "react";
import loadSellerOrdersService from '../../../../Utilities/Services/LoadSellerOrdersService'

const ShowSellerOrders = () => {

    const [orders, setOrders] = useState([])
    useEffect(() => {
        (async () => {
            let res = await loadSellerOrdersService()
            setOrders(res)
        })()
    },[])

    console.log(orders)
    return (
        JSON.stringify(orders)
    )

}

export default ShowSellerOrders