import React, { useEffect, useState } from "react";
import loadSellerOrdersService from '../../../../Utilities/Services/LoadSellerOrdersService'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Modal from '@material-ui/core/Modal';

import Button from '@material-ui/core/Button';
import MyTable from '../../../UIComponents/Table/Table'
import ModalItems from '../../../UIComponents/ModalItems/ModalItems'

const ordersDemo = [{ "name": "Rami", "orders": [{ "date": "Jan 29, 2020 12:10:00 AM", "itemsPrice": 50, "shipmentPrice": 22.36, "customerLocation": { "x": 2, "y": 2 }, "itemsAmound": 1, "id": 1, "items": [{ "quantity": 5, "totalPrice": 50, "price": 10, "name": "Toilet Paper", "isFromDiscount": "No ", "id": 1 }], "customer": { "numberOfOrders": 2, "totalShipmentPrice": 302.06, "totalItemPrice": 546, "isSeller": false, "acount": { "transactions": [{ "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": 0, "balanceAfter": -50, "amountTransfered": 50 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -50, "balanceAfter": -53, "amountTransfered": 3 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -53, "balanceAfter": -103, "amountTransfered": 50 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -103, "balanceAfter": -106, "amountTransfered": 3 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -106, "balanceAfter": -546, "amountTransfered": 440 }], "balance": -546 }, "name": "ss", "location": { "x": 2, "y": 1 }, "id": 2, "orders": {} } }, { "date": "Jan 29, 2020 12:10:00 AM", "itemsPrice": 50, "shipmentPrice": 31.62, "customerLocation": { "x": 2, "y": 1 }, "itemsAmound": 1, "id": 2, "items": [{ "quantity": 5, "totalPrice": 50, "price": 10, "name": "Toilet Paper", "isFromDiscount": "No ", "id": 1 }], "customer": { "numberOfOrders": 2, "totalShipmentPrice": 302.06, "totalItemPrice": 546, "isSeller": false, "acount": { "transactions": [{ "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": 0, "balanceAfter": -50, "amountTransfered": 50 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -50, "balanceAfter": -53, "amountTransfered": 3 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -53, "balanceAfter": -103, "amountTransfered": 50 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -103, "balanceAfter": -106, "amountTransfered": 3 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -106, "balanceAfter": -546, "amountTransfered": 440 }], "balance": -546 }, "name": "ss", "location": { "x": 2, "y": 1 }, "id": 2, "orders": {} } }] }, { "name": "Hakol beshekel", "orders": [{ "date": "Jan 29, 2020 12:10:00 AM", "itemsPrice": 3, "shipmentPrice": 0, "customerLocation": { "x": 2, "y": 2 }, "itemsAmound": 1, "id": 1, "items": [{ "quantity": 3, "totalPrice": 3, "price": 1, "name": "Banana", "isFromDiscount": "No ", "id": 2 }], "customer": { "numberOfOrders": 2, "totalShipmentPrice": 302.06, "totalItemPrice": 546, "isSeller": false, "acount": { "transactions": [{ "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": 0, "balanceAfter": -50, "amountTransfered": 50 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -50, "balanceAfter": -53, "amountTransfered": 3 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -53, "balanceAfter": -103, "amountTransfered": 50 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -103, "balanceAfter": -106, "amountTransfered": 3 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -106, "balanceAfter": -546, "amountTransfered": 440 }], "balance": -546 }, "name": "ss", "location": { "x": 2, "y": 1 }, "id": 2, "orders": {} } }, { "date": "Jan 29, 2020 12:10:00 AM", "itemsPrice": 3, "shipmentPrice": 0, "customerLocation": { "x": 2, "y": 1 }, "itemsAmound": 1, "id": 2, "items": [{ "quantity": 3, "totalPrice": 3, "price": 1, "name": "Banana", "isFromDiscount": "No ", "id": 2 }], "customer": { "numberOfOrders": 2, "totalShipmentPrice": 302.06, "totalItemPrice": 546, "isSeller": false, "acount": { "transactions": [{ "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": 0, "balanceAfter": -50, "amountTransfered": 50 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -50, "balanceAfter": -53, "amountTransfered": 3 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -53, "balanceAfter": -103, "amountTransfered": 50 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -103, "balanceAfter": -106, "amountTransfered": 3 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -106, "balanceAfter": -546, "amountTransfered": 440 }], "balance": -546 }, "name": "ss", "location": { "x": 2, "y": 1 }, "id": 2, "orders": {} } }] }, { "name": "Menashe Hagadol", "orders": [{ "date": "Jan 29, 2020 12:10:00 AM", "itemsPrice": 440, "shipmentPrice": 248.08, "customerLocation": { "x": 2, "y": 1 }, "itemsAmound": 2, "id": 2, "items": [{ "quantity": 4, "totalPrice": 120, "price": 30, "name": "MIlki", "isFromDiscount": "No ", "id": 6 }, { "quantity": 8, "totalPrice": 320, "price": 40, "name": "Candle", "isFromDiscount": "No ", "id": 8 }], "customer": { "numberOfOrders": 2, "totalShipmentPrice": 302.06, "totalItemPrice": 546, "isSeller": false, "acount": { "transactions": [{ "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": 0, "balanceAfter": -50, "amountTransfered": 50 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -50, "balanceAfter": -53, "amountTransfered": 3 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -53, "balanceAfter": -103, "amountTransfered": 50 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -103, "balanceAfter": -106, "amountTransfered": 3 }, { "transferType": "Purchase", "transactionDate": "Jan 29, 2020 12:10:00 AM", "balanceBefore": -106, "balanceAfter": -546, "amountTransfered": 440 }], "balance": -546 }, "name": "ss", "location": { "x": 2, "y": 1 }, "id": 2, "orders": {} } }] }]

const useStyles = makeStyles((theme) => ({
    container: {
        background: 'inherit',
        width: '80%',
        marginLeft: '10%',
        marginTop: '2%',
    },
    inlineTable: {
        background: 'inherit',
    }
}));



const ShowSellerOrders = () => {
    const classes = useStyles()
    const [stores, setStores] = useState([])
    useEffect(() => {
        // (async () => {
        //     let res = await loadSellerOrdersService()
        //     setOrders(res)
        // })()

        setStores(ordersDemo)
    }, [])

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="right">Store name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stores.map(store =>
                        <Row store={store} />)}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

const Row = (props) => {
    const [isOpen, setIsOpen] = useState({})

    const { store } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleOpen = (index) => {
        setIsOpen({ ...isOpen, [index]: true })
    };

    const handleClose = (index) => {
        setIsOpen({ ...isOpen, [index]: false })
    };

    const cols = {
        orderNumber: {
            header: 'Order number'
        },
        orderDate: {
            header: 'Order date'
        },
        nameOfCustomer: {
            header: 'Costumer name'
        },
        customerLocation: {
            header: 'Customer location',
            RenderMethod: (el) => 'X: ' + el['customerLocation'].x + ' Y: ' + el['customerLocation'].y
        },
        itemsAmount: {
            header: 'Items amount'
        },
        totalPrice: {
            header: 'Total price'
        },
        shipmentPrice: {
            header: 'Shipment price'
        },
        itemsWasSold: {
            header: 'Items was sold',
            RenderMethod: (el, index) => (<div style={{ background: 'inherit' }}>
                <Button type="button"
                    variant="contained"
                    size='small'
                    color="secondary"
                    onClick={() => handleOpen(index)}>
                    View items
            </Button>
                <Modal
                    open={isOpen[index]}
                    onClose={() => handleClose(index)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <ModalItems items={el['itemsWasSold']} />
                </Modal>
            </div>)
        }
    }

    const getRowData = orders => {
        const data = []
        orders.forEach(order => {
            const obj = {
                orderNumber: order.id,
                orderDate: order.date,
                nameOfCustomer: order.customer.name,
                customerLocation: order.customerLocation,
                itemsAmount: order.itemsAmound,
                totalPrice: order.itemsPrice,
                shipmentPrice: order.shipmentPrice,
                itemsWasSold:order.items
            }
            data.push(obj)
        })
        console.log('orders', orders)
        return data
    }
    return (
        <React.Fragment>
            <TableRow >
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="right">{store.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Orders
                        </Typography>
                            <MyTable
                                columns={cols}
                                data={getRowData(store.orders)}
                                container={classes.inlineTable} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default ShowSellerOrders