import React, { useEffect, useState } from 'react'
import axios from '../../Utilities/Axios/Axios'

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
        width: '40%',
        marginLeft: '30%',
        marginTop: '2%',
        height: '240px',
    }
});


const Users = props => {
    const classes = useStyles();
    const [listOfUsers, setListOfUsers] = useState({});
    
    const loadUsers = () => {
        axios.get('/SDM/getUsers')
            .then(res => {
                setListOfUsers(res.data)
            })
            .catch(err => {
            })
    }

    useEffect(() => {
        loadUsers()
        const interval = setInterval(() => {
            loadUsers()
        }, 2000);
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table size='small' aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(listOfUsers).map((key) => (
                        <TableRow key={listOfUsers[key].name}>
                            <TableCell align="left">{listOfUsers[key].name}</TableCell>
                            <TableCell align="left">{listOfUsers[key].id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Users
