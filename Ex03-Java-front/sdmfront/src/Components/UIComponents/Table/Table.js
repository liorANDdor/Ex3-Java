import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const MyTable = props => {
    
    return (
        <TableContainer className={props.container} component={Paper}>
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