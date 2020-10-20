import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '../Table/Table'
import keyToLabel from '../../../Utilities/Parsers/ParseKeyToUpperCaseWithSpacesString'
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
        background: 'inherit',
        position: 'absolute',
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        padding: theme.spacing(2, 4, 3),
    },
}));

const ModalItems = props => {
    const modalStyle = getModalStyle();
    const classes = useStyles()

    let cols = {}
    if (props.items.length > 0) {
        Object.keys(props.items[0]).forEach(key => {
            cols = {
                ...cols,
                [key]: {
                    header: keyToLabel(key)
                }
            }
        })
    }

    return (
        <div style={modalStyle} className={classes.paper}>
            <Table data={props.items} columns={cols} container={classes.container}/>            

        </div>
    )
}

export default ModalItems