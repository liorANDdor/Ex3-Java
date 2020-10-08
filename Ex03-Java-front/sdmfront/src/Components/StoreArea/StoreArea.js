import React from 'react'
import UsersList from '../UsersList/UsersList'
import LoadXml from '../LoadXml/LoadXml'

const StoreArea = prop =>{
return(
    <React.Fragment>
        <UsersList/>
        <LoadXml/>
    </React.Fragment>

)
}

export default StoreArea