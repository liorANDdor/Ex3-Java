import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '../Table/Table'
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    container: {
        background: 'inherit',
        width: '60%',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '2%',
        height: '400px',
    }
}));

const Notifications = props => {
    const classes = useStyles()
    {console.log(props.notifications)}
    let cols = {
        Message : {
            header: 'Notifications',
        }
    }
    return   props.isVisible===true ?(

        <div>
        <Table

            columns={cols}
            data={props.notifications.map(message => ({  Message: message }))}
            container={classes.container} /> </div>
        ): null


}

export default Notifications
