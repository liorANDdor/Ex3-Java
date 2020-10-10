import React, { useEffect, useState } from 'react'
import { Route, withRouter } from "react-router-dom";
import axios from '../../Utilities/Axios/Axios'
const AllZones = props => {

    const [allzones, setAllZones] = useState([]);
    console.log(props)

    const loadZones = () => {
        axios.get('/SDM/getZones')
            .then(res => {
                console.log(res.data)
                setAllZones(res.data)
            })
            .catch(err => {
            })
    }

    useEffect(() => {
        loadZones()
        const interval = setInterval(() => {
            loadZones()
        }, 2000);
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <React.Fragment>

            <div style={{marginTop:'10px'}}>
                {Object.keys(allzones).map(key => {
                    return <div>
                        {allzones[key]}
                        <button onClick={event => props.history.push("/storeAreas/" + allzones[key])} >show</button>
                    </div>
                })}
            </div>
        </React.Fragment>
    )
}

export default withRouter(AllZones)