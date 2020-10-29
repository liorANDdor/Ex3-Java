import React from 'react';
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

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>

        </React.Fragment>
    );
}



export default function CollapsibleTable(props) {
    const { rows } = props
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        {Object.keys(props.columns).map(el => {
                            return <TableCell align="left">{props.columns[el].header}</TableCell>

                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((el, index) => (
                        <TableRow key={el.name}>
                            {Object.keys(el).map(key => {
                                return <TableCell align="left">{props.columns[key].RenderMethod ? props.columns[key].RenderMethod(el, index) : el[key]}</TableCell>
                            })}
                        </TableRow>,
                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={props.tables[index].isopen} timeout="auto" unmountOnExit>
                                    <Box margin={1}>
                                        {props.tables[index].table}
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
