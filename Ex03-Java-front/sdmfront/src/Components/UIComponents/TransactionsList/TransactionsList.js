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

const Transactions = props => {
    const classes = useStyles()
    let cols = {
        Date : {
            header: 'Date',
        },
        Action : {
            header: 'Action',
        },
        Transfered: {
            header: 'Before'
        },
        Before: {
            header: 'After'
        },
        Current: {
            header: 'Balance'
        }
    }
    return props.transactions.length > 0 ?
        <Table
            columns={cols}
            data={props.transactions.map(transaction => ({ Date: transaction.transactionDate, Action: transaction.transferType,
            Before: transaction.balanceBefore, Current: transaction.balanceAfter, Transfered: transaction.amountTransfered}))}
            container={classes.container} />
        : null
}

export default Transactions
