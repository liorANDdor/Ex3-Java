import React, { useEffect, useState } from 'react'
import axios from '../../../Utilities/Axios/Axios'


import Table from '../Table/Table'




const keyToUpperCaseAndSpacesString = key => {
    let str
    if (key === 'storesWhoSellTheItem')
        str = 'Number Of Stores'
    else {
        str = key.replace(/([A-Z])/g, ' $1').trim()
        str = str.charAt(0).toUpperCase() + str.slice(1)
    }

    return str
}


const Users = props => {
    console.log(props.users)

    let cols = {
        name: {
            header: 'Name',
        },
        id: {
            header: 'ID'
        }
    }
    return props.users.length > 0 ?
        <Table
            columns={cols}
            data={props.users.map(user => ({ name: user.name, id: user.id }))} 
            width='40%'/>
        : null
}

export default Users
