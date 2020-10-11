import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";

import axios from '../../../Utilities/Axios/Axios'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    container: {
        background: 'inherit',
        width: '80%',
        marginLeft: '10%',
        marginTop: '2%',
        height: '240px',
    }

});



const Zone = props => {
    const classes = useStyles()
    const [items, setItems] = useState([])
    useEffect(() => {
        axios.post('SDM/getData', { zone: props.location.pathname.split('/')[2] })
            .then(res => {
                console.log(res.data)
                setItems(Object.values(res.data.items))
            })
                
            .catch(err => console.log(err))

    }, [])

    return (
        items.length > 0 ?
            < TableContainer className={classes.container} component={Paper} >
                <Table size='small' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {Object.keys(items[0]).map(key => {
                                let str
                                if (key === 'storesWhoSellTheItem')
                                    str = 'Number Of Stores'
                                else {
                                    str = key.replace(/([A-Z])/g, ' $1').trim()
                                    str = str.charAt(0).toUpperCase() + str.slice(1)
                                }
                                return (<TableCell align="left" > {str}</TableCell>)
                            })}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(el => {
                            return (
                                <TableRow >
                                    {Object.keys(el).map(key => {
                                        return <TableCell align="left">{key === 'storesWhoSellTheItem' ? el[key].length : el[key]}</TableCell>
                                    })}
                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer > : null
    )
}

export default withRouter(Zone)