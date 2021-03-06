import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '../Table/Table'

const useStyles = makeStyles((theme) => ({
    container: {
        background: 'inherit',
        width: '60%',
        marginLeft: '20%',
        marginTop: '2%',
        height: '240px',
    }
}));

const Users = props => {
    const classes = useStyles()
    let cols = {
        name: {
            header: 'Name',
        },
        role: {
            header: 'Role'
        }
    }
    return props.users.length > 0 ?
        <Table
            columns={cols}
            data={props.users.map(user => ({ name: user.name, role: user.isSeller===true? "Seller" : "Customer" }))}
            container={classes.container} />
        : null
}

export default Users
