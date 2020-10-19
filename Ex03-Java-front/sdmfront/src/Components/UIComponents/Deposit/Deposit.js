import React, {useEffect, useState} from 'react'

import axios from '../../../Utilities/Axios/Axios'
import TextField from "@material-ui/core/TextField";
import loadZones from "../../../Utilities/Services/LoadZonesServices";
import loadUsers from "../../../Utilities/Services/LoadUserService";


const Deposit = prop => {

    const [depositAmount, setdepositAmount] = useState();
    const [totalAmount, settotalAmount] = useState("Total Amound = 0");




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
        if (double.test(event.target.value) || event.target.value=='') {
                setdepositAmount(event.target.value);
                console.log('fuck')
            } else {
            }

    }
    const data = {
        amountTransfered:depositAmount,
        transferType:"Deposit"
    }
    const makeTransaction = () => {
        if (depositAmount !== 0) {
            const data = {
                amountTransfered: depositAmount,
                transferType: "Deposit"
            }
            axios.post("/SDM/makeTransaction", data).then((res) => {
                settotalAmount(res.data);
            });
        }
    };



    return (<div>

        <button onClick={makeTransaction}>Deposit</button>
    <TextField onChange={(event) => handleChange(event)} margin="normal" label="Amount To Deposit" variant="filled"
        value={depositAmount}
        autoFocus

    />

    </div>)
}

export default Deposit