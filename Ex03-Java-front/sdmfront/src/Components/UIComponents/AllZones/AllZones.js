import React from 'react'
import { withRouter } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'columns',
        justifyContent: 'space-around',
        background: 'inherit',
        width: '80%',
        marginLeft: '10%',
        marginTopL: '2%'

    },
    card: {
        minWidth: '25%',
        background: 'inherit',
        marginTop:'2%'
    },
    btn: {
        width: '100%',

    }

}));


const AllZones = props => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            {props.zones.map(zone => {
                return <Card className={classes.card}>
                    <CardActionArea>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Name: {zone.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <ul>
                                    <li>Items count: {zone.itemsCount}</li>
                                    <li>Orders count: {zone.orderCount}</li>
                                    <li>Stores count: {zone.storesCount}</li>
                                    <li>Average order price: {zone.averageOrderPrice}</li>

                                </ul>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button
                            className={classes.btn}
                            onClick={() => props.history.push("/storeAreas/" + zone.name)}
                            variant="contained"
                            color="secondary">
                            View
                        </Button>
                    </CardActions>
                </Card>
            })}


        </div>
    )
}

export default withRouter(AllZones)



