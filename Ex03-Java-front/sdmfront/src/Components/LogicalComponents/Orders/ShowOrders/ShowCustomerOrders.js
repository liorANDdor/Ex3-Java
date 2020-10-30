import React, { useEffect, useState } from "react";
import loadSellerOrdersService from '../../../../Utilities/Services/LoadSellerOrdersService'
import axios from "../../../../Utilities/Axios/Axios";
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
import LoadOrders from "../../../../Utilities/Services/LoadCustomerOrdersService";

const useStyles = makeStyles((theme) => ({
    container: {
        background: 'inherit',
        width: '80%',
        marginLeft: '10%',
        marginTop: '2%',
    }
}));


const ShowCustomerOrders = (props) => {
    const classes = useStyles()
    const [orders, setOrders] = useState([])
    useEffect(() => {
        (async () => {

            let res = await LoadOrders()
            console.log(res)
            setOrders(res)
        })()

        //setStores(ordersDemo)
    }, [])

    const [isOpen, setIsOpen] = useState({})


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

    const getData = orders => {
        const data = []
        orders.forEach(order => {
            const obj = {
                orderNumber: order.id,
                orderDate: order.date,
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
        <MyTable
            columns={cols}
            data={getData(orders)}
            container={classes.container} />
    )

}
export default ShowCustomerOrders