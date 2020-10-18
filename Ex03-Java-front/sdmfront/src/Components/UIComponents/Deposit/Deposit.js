import React, {useEffect, useState} from 'react'

import axios from '../../../Utilities/Axios/Axios'
import TextField from "@material-ui/core/TextField";
import loadZones from "../../../Utilities/Services/LoadZonesServices";
import loadUsers from "../../../Utilities/Services/LoadUserService";


const Deposit = prop => {

    const [depositAmount, setdepositAmount] = useState(0);
    const [totalAmount, settotalAmount] = useState("Total Amound = 0");




    useEffect(() => {
        makeTransaction()
        const interval = setInterval(async () => {
            makeTransaction()
        }, 2000);
        return () => {
            clearInterval(interval)
        }
    }, [])


    const handleChange = (event) => {
        setdepositAmount( event.target.value);
    }
    const data = {
        amountTransfered:depositAmount,
        transferType:"Deposit"
    }
    const makeTransaction = () => {
        const data = {
            amountTransfered:depositAmount,
            transferType:"Deposit"
        }
        axios.post("/SDM/makeTransaction", data).then((res) => {
            settotalAmount(res.data);
        });
    };

    const checkTransaction = () => {

        axios.post("/SDM/getTransaction", data).then((res) => {
        });
    };

    return (<div>

        <button onClick={makeTransaction}>Deposit</button>

        <button onClick={checkTransaction}>{totalAmount}</button>
    <TextField onChange={(event) => handleChange(event)} margin="normal" label="Amount To Deposit" variant="filled"

        autoFocus

    />

    </div>)
}

export default Deposit