import React, { useEffect, useState } from "react";
import axios from '../../../../Utilities/Axios/Axios';

const ShowCustomerOrders = () => {
    const [orders,setOrders] = useState([])
    useEffect(()=>{
        axios.post('/SDM/getOrdersByUsername').then(res=>console.log(res))
    },[])
    

}

export default ShowCustomerOrders