import React, { useEffect, useState } from 'react'
import axios from '../../Utilities/Axios/Axios'
const Users = props => {

    const [listOfUsers, setListOfUsers] = useState(null);

    useEffect(() => {

        

        axios.get('/SDM/getUsers')
            .then(res => {
                let arr = []
                console.log(res.data)
           
                console.log(arr)

                setListOfUsers(res.data)
            })
            .catch(err => {

            })
    }, [])
    

    return (
        listOfUsers ?
            <div>
                {Object.keys(listOfUsers).map(user => {
                    return (
                        <div>
                            {listOfUsers[user].id +"        " +user}
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