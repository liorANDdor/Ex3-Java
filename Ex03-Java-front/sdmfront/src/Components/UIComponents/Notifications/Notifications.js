import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '../Table/Table'
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    container: {
        background: 'inherit',
        width: '30%',
        marginLeft: '20%',
        marginTop: '2%',
        height: '200px',
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
