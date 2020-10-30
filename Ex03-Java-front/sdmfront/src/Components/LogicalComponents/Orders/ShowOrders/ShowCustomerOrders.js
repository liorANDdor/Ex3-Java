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


const ShowCustomerOrders = () => {
    const classes = useStyles()
    const [stores, setStores] = useState([])
    useEffect(() => {
        (async () => {

            let res = await axios.post("/SDM/getOrdersByUsername")
            console.log(res.data)
        })()

        //setStores(ordersDemo)
    }, [])

    return (null
    )

}
export default ShowCustomerOrders