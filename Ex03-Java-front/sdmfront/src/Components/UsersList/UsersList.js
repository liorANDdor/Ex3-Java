import React, { useEffect, useState } from 'react'
import axios from '../../Utilities/Axios/Axios'


const Users = props => {

    const [listOfUsers, setListOfUsers] = useState(null);


    let interval;
    interval = null;


    useEffect(() => {

        const interval = setInterval(()=>{
            axios.get('/SDM/getUsers')
                .then(res => {
                    setListOfUsers(res.data)
                })
                .catch(err => {

                })
        },2);

        axios.get('/SDM/getUsers')
            .then(res => {
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