import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles';

import UsersList from '../UsersList/UsersList'
import Deposit from '../Deposit/Deposit'
import LoadXml from '../LoadXml/LoadXml'
import AllZones from '../AllZones/AllZones'
import UserProfileContext from '../UserProfileContext/UserProfileContext'

const useStyle = makeStyles(theme => ({
    container: {
        marginTop: '2%'
    }
}))

const StoreArea = prop => {
    const userProfileContext = useContext(UserProfileContext)
    const classes = useStyle()
    return (
        <div className={classes.container}>
            {userProfileContext.userType === 'Shop Owner' ? <LoadXml /> : <Deposit /> }
            <UsersList />
            <AllZones />
        </div>
    )
}

export default StoreArea