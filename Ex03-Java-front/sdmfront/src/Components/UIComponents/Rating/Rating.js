import React, {useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';
import clone from "clone";
import axios from "../../../Utilities/Axios/Axios";
import {withRouter} from "react-router-dom"


const SimpleRating=(props)=> {


    const [disable, isDisabled] = React.useState({});
    const [rateMessage, setRateMessage] = React.useState({});
    const [rateNumber, setRateNumber] = React.useState({});


    const handleChange = (event, key) => {
        console.log(rateNumber)
        setRateMessage({...rateMessage,[key]:event.target.value});
    };


    function sendRating(rateNumber, rateMessage, index, storeName) {
        axios.post('SDM/addFeedbacks', { rate:{nubmer:rateNumber[index], message:rateMessage[index] }, zone:props.zone, orderId:props.orderId, store:storeName })
        isDisabled({...disable,[index]:true});

    }

    const finishOrder=()=>{
        props.history.push("/storeAreas");
    }
    const handleChangeRating =(x, newValue, value) => {
        setRateNumber({...rateNumber,[value]:newValue});
    }

    return (
        <div>

            {<Typography component="h1" variant="h5">
                Your order is on it's way!
                Press here to rate the order
                <br></br>
            </Typography>
}
            {Object.keys(props.storesList).map((key, index) => {
                return (
                    <div>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">-- Rate { props.storesList[key]} --</Typography>

                        <Rating
                            name={index}

                            value={rateNumber[index]?? 0}

                            onChange={(x, newValue )=>handleChangeRating(x, newValue, index)}
                        />
                    </Box>
                <TextField lable="Free Text" value={rateMessage[index]} onChange={x=>handleChange(x, index)}/>
                        <button disabled={disable[index]} onClick={x=>sendRating(rateNumber, rateMessage, index ,props.storesList[key] )}>RATE NOW</button>
                    </div>
                );
            })}
            <button onClick={finishOrder}>Back</button>
        </div>
    );
}

export default withRouter(SimpleRating)
