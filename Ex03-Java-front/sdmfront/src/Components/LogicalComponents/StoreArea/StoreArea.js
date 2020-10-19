import React, { useContext, useEffect, useMemo } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'
import { makeStyles } from '@material-ui/core/styles';

import UserProfileContext from '../../../Utilities/Contexts/UserProfileContext/UserProfileContext'

import UsersList from '../../UIComponents/UsersList/UsersList'
import Deposit from '../../UIComponents/Deposit/Deposit'
import LoadXml from '../../UIComponents/LoadXml/LoadXml'
import AllZones from '../../UIComponents/AllZones/AllZones'

import loadUsers from "../../../Utilities/Services/LoadUserService";
import loadZones from '../../../Utilities/Services/LoadZonesServices'
import loadTransactions from "../../../Utilities/Services/LoadTransactions";
import TransactionsList from "../../UIComponents/TransactionsList/TransactionsList";

const useStyle = makeStyles(theme => ({
    container: {
        marginTop: '2%'
    }
}))

const StoreArea = prop => {
    const userProfileContext = useContext(UserProfileContext)
    const classes = useStyle()

    const [users, setUsers] = useStateIfMounted([])
    const [transactions, setTransactions] = useStateIfMounted([])
    const [zones, setZones] = useStateIfMounted([])

    const loadData = async () => {
        const zonesData = await loadZones()
        const usersData = await loadUsers()
        const transactionsData = await loadTransactions();
        setZones(zonesData)
        setUsers(usersData)
        setTransactions(transactionsData)

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

            <TransactionsList transactions={transactions} />
            <UsersList users={users} />
            <AllZones zones={zones} />
        </div>
    )
}

export default StoreArea