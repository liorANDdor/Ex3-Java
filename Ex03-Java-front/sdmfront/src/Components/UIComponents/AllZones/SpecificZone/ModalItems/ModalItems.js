import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const getModalStyle = () => {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    container: {
        background: 'inherit',
        width: '80%',
        marginLeft: '10%',
        marginTop: '2%',
        height: '360px',
    },
    paper: {
        background:'inherit',
        position: 'absolute',
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        padding: theme.spacing(2, 4, 3),
    },
}));

const ModalItems = props => {
    const [items, setItems] = useState([])
    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles()
  
    return (
        <div style={modalStyle} className={classes.paper}>
            {JSON.stringify(props.items)}
            {/* {items.length > 0 ?
                < TableContainer className={classes.container} component={Paper} >
                    <Table size='small' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {Object.keys(items[0].map).map(key => {
                                    let str
                                    str = key.replace(/([A-Z])/g, ' $1').trim()
                                    str = str.charAt(0).toUpperCase() + str.slice(1)
                                    return (<TableCell key={key} align="left" > {str}</TableCell>)
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(el => {
                                return (
                                    <TableRow >
                                        {Object.keys(el.map).map(key=>{
                                            return <TableCell align="left">{el.map[key]}</TableCell>
                                        })}
                                    </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer > : null} */}

        </div>
    )
}

export default ModalItems