import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";

import axios from '../../../Utilities/Axios/Axios'


const Zone = props => {
    const [items, setItems] = useState([])
    useEffect(() => {
        axios.get('/getData', { zone: props.location.pathname.split('/')[2] }).then(res=>console.log(res.data)).catch(err=>console.log(err))

    }, [])
    return (
        <div>
            {props.location.pathname.split('/')[2]}
        </div>
    )
}

export default withRouter(Zone)