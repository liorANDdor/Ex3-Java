import React, {useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';
import clone from "clone";
import axios from "../../../Utilities/Axios/Axios";



export default function SimpleRating(props) {



    const [value, setValue] = React.useState(2);

    const [rateMessage, setRateMessage] = React.useState("");
    const [rateNumber, setRateNumber] = React.useState(0);

    const ratingInput = {
        number: rateNumber,
        message: rateMessage
    };
    const [rating, setRating] = useState(ratingInput);
    const handleChange = (event, key) => {
        let newRating = clone(ratingInput);
        newRating.message = event.target.value;
        setRateMessage(event.target.value);
      setRating(newRating);
    };


    function sendRating() {
        axios.post('SDM/addFeedbacks', { rate:rating, zone:props.zone, orderId:props.orderId})
       props.restartPage();
    }

    return (
        <div>

            <Typography component="h1" variant="h5">
                Your order is on it's way!
                Press here to rate the order
                <br></br>

                <button onClick={sendRating}>RATE NOW</button>
            </Typography>


            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">-- Rate Order --</Typography>
                <Rating
                    name="simple-controlled"
                    value={rateNumber}
                    onChange={(event, newValue) => {

                            let newRating = clone(ratingInput);
                            newRating.number = newValue;
                            setRateNumber(newValue);
                            setRating(newRating);


                    }}
                />
            </Box>
            <TextField lable="Free Text" value={rateMessage} onChange={handleChange}/>

        </div>
    );
}
