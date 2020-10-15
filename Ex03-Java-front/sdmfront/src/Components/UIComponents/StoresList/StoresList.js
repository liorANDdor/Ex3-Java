import React, { useEffect, useState } from 'react'
import axios from '../../../Utilities/Axios/Axios'
const Users = props => {

    const [listOfStores, setListOfStores] = useState(null);

    useEffect(() => {

        

        axios.get('/SDM/getStores')
            .then(res => {
                let arr = []
                console.log(res.data)
           
                console.log(arr)

                setListOfStores(res.data)
            })
            .catch(err => {

            })
    }, [])
    

    return (
        listOfStores ?
            <div>
                {Object.keys(listOfStores).map(key => {
                    return (
                        <div>
                            {listOfStores[key].id +"        " + listOfStores[key].name}
                        </div>
                        

                    )
                })}
            </div> :
            <div>
                nothing to render
            </div>
    )


}

export default Users