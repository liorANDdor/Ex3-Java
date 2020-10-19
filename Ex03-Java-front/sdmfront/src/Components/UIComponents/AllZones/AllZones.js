import React from 'react'
import { withRouter } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        borderStyle: 'inset',
        padding: '12px',
        width: '70%',
        marginLeft: '15%',
        flexGrow: 1,
        background: 'inherit',
        marginTop: '20px',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        background: 'inherit',
        borderStyle: 'outset',


    },
}));


const AllZones = props => {
    const classes = useStyles()
    console.log(props.zones)
    return (
        <React.Fragment>

            {props.zones.map(zone => {
                return <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} >
                            <Paper className={classes.paper}>Name: {zone.name}</Paper>
                        </Grid>
                        <Grid item xs={6}  >

                            <Paper className={classes.paper}>

                                <Button variant="contained"
                                    color="secondary" onClick={() => props.history.push("/storeAreas/" + zone.name)}>show
                                    </Button>
                            </Paper>

                        </Grid>
                        <Grid item xs={3} >
                            <Paper className={classes.paper}>Items count: {zone.itemsCount}</Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <Paper className={classes.paper}>Orders count: {zone.orderCount}</Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <Paper className={classes.paper}>Stores count: {zone.storesCount}</Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <Paper className={classes.paper}>averageOrderPrice: {zone.averageOrderPrice}</Paper>
                        </Grid>

                    </Grid>

                </div>
            })}
        </React.Fragment>
    )
}

export default withRouter(AllZones)

