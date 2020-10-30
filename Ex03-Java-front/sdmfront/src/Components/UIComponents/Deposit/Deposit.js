import React, { useEffect, useState } from 'react'

import axios from '../../../Utilities/Axios/Axios'
import TextField from "@material-ui/core/TextField";
import loadZones from "../../../Utilities/Services/LoadZonesServices";
import loadUsers from "../../../Utilities/Services/LoadUserService";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";




const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(2, 'auto'),
        minWidth: '25%'
    },
    locationInput: {
        width: '25%',
        margin: theme.spacing(2, 2, 4, 2),
    },
    LocationContainer: {
        justifyContent: 'space-between'
    }
}))

const Deposit = prop => {

    const [depositAmount, setdepositAmount] = useState();
    const [totalAmount, settotalAmount] = useState("Total Amound = 0");
    const classes = useStyle()


    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            //  checkTransaction();
        }, 2000);
        return () => {
            clearInterval(interval)
        }
    }, [])


    const handleChange = (event) => {

        const double = /^[0-9,.\b]+$/;
        if (double.test(event.target.value) || event.target.value == '') {
            setdepositAmount(event.target.value);
            console.log('fuck')
        } else {
        }

    }
    const data = {
        amountTransfered: depositAmount,
        transferType: "Deposit",
        date: selectedDate
    }
    const makeTransaction = () => {
        if (depositAmount !== 0) {
            const data = {
                amountTransfered: depositAmount,
                transferType: "Deposit",
                date: selectedDate
            }
            axios.post("/SDM/makeTransaction", data).then((res) => {
                settotalAmount(res.data);
            });
        }
    };



    return (<div className={classes.container}>

        <Button variant="contained"
            color="secondary"
            onClick={makeTransaction}>Deposit
            </Button>
        <TextField onChange={(event) => handleChange(event)} margin="normal" label="Amount To Deposit" variant="filled"
            value={depositAmount}
            autoFocus

        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className={classes.formControl}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>

    </div>)
}

export default Deposit