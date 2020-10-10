import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";
import axios from '../../Utilities/Axios/Axios'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
    const [allzones, setAllZones] = useState([]);
    console.log(props)

    const loadZones = () => {
        axios.get('/SDM/getZones')
            .then(res => {
                console.log(res.data)
                setAllZones(res.data)
            })
            .catch(err => {
            })
    }

    useEffect(() => {
        loadZones()
        const interval = setInterval(() => {
            loadZones()
        }, 2000);
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (



        <React.Fragment>

            {Object.keys(allzones).map(key => {
                return <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} >
                            <Paper className={classes.paper}>Name: {allzones[key].map.name}</Paper>
                        </Grid>
                        <Grid item xs={6} onClick={event => props.history.push("/storeAreas/" + allzones[key].map.name)} >
                            <Paper className={classes.paper}>show (Click me)</Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <Paper className={classes.paper}>Items count: {allzones[key].map.itemsCount}</Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <Paper className={classes.paper}>Orders count: {allzones[key].map.orderCount}</Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <Paper className={classes.paper}>Stores count: {allzones[key].map.storesCount}</Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <Paper className={classes.paper}>averageOrderPrice: {allzones[key].map.averageOrderPrice}</Paper>
                        </Grid>

                    </Grid>

                </div>
            })}
        </React.Fragment>
    )
}

export default withRouter(AllZones)

