import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';



const MyTable = props => {
    const useStyles = makeStyles({
        container: {
            background: 'inherit',
            width: '40%',
            marginLeft: '30%',
            marginTop: '2%',
            height: '240px',
        }
    
    });
    const classes = useStyles()
    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table size='small' aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Object.keys(props.columns).map(el => {
                            return <TableCell align="left">{props.columns[el].header}</TableCell>

                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((el,index) => (
                        <TableRow key={el.name}>
                            {Object.keys(el).map(key => {
                                return <TableCell align="left">{props.columns[key].RenderMethod ? props.columns[key].RenderMethod(el,index) : el[key]}</TableCell>
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MyTable