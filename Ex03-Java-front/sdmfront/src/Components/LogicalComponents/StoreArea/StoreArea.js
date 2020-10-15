import React, { useContext, useState, useEffect, useRef } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'
import { makeStyles } from '@material-ui/core/styles';

import UserProfileContext from '../../../Utilities/Contexts/UserProfileContext/UserProfileContext'

import UsersList from '../../UIComponents/UsersList/UsersList'
import Deposit from '../../UIComponents/Deposit/Deposit'
import LoadXml from '../../UIComponents/LoadXml/LoadXml'
import AllZones from '../../UIComponents/AllZones/AllZones'

import loadUsers from "../../../Utilities/Services/LoadUserService";
import loadZones from '../../../Utilities/Services/LoadZonesServices'

const useStyle = makeStyles(theme => ({
    container: {
        marginTop: '2%'
    }
}))

const StoreArea = prop => {
    const userProfileContext = useContext(UserProfileContext)
    const classes = useStyle()

    const [users, setUsers] = useStateIfMounted([])
    const [zones, setZones] = useStateIfMounted([])

    const loadData = async () => {
        const zonesData = await loadZones()
        const usersData = await loadUsers()
        setZones(zonesData)
        setUsers(usersData)

    }

    useEffect(() => {
        loadData()
        const interval = setInterval(async () => {
            loadData()
        }, 2000);
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className={classes.container}>
            {userProfileContext.userType === 'Shop Owner' ? <LoadXml /> : <Deposit />}
            <UsersList users={users} />
            <AllZones zones={zones} />
        </div>
    )
}

export default StoreArea