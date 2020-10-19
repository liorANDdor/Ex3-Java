import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '../Table/Table'
import Typography from "@material-ui/core/Typography";

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
            header: 'Transfer Type',
        },
        Transfered: {
            header: 'Amount Transfered'
        },
        Before: {
            header: 'Balance Before'
        },
        Current: {
            header: 'Current Balance'
        }
    }
    return   props.transactions.length>0 ?
        <div>
            <Typography component="h1" variant="h5">
               Your Current Balance is {props.balance}$
            </Typography>
        <Table
            columns={cols}
            data={props.transactions.map(transaction => ({ Date: transaction.transactionDate, Action: transaction.transferType,
            Before: transaction.amountTransfered , Current: transaction.balanceBefore, Transfered: transaction.balanceAfter }))}
            container={classes.container} /> </div>
        : <div>    <Typography component="h1" variant="h5">
            Your Current Balance is {props.balance}$
        </Typography></div>

}

export default Transactions
