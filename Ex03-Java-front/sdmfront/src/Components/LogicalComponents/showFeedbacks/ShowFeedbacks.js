import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import axios from "../../../Utilities/Axios/Axios";
import Table from "../../UIComponents/Table/Table";


const useStyles = makeStyles((theme) => ({
    container: {
        background: 'inherit',
        width: '30%',
        marginLeft: '20%',
        marginTop: '2%',
        height: '200px',
    }
}));


const ShowFeedbacks = (props) => {
    const [feedbacks, setFeedbacks] = useState([]);

    const classes = useStyles()
    let cols = {
        Rate : {
            header: 'Rate',
        },
        Message : {
            header: 'Message',
        },
        Date : {
            header: 'Date',
        },
        Client : {
            header: 'Customer',
        }
    }


    const loadData = async () => {
        const newFeedbacks =  await axios.post('/SDM/getFeedbacks')

        console.log(newFeedbacks.data)
             setFeedbacks(newFeedbacks.data);
    }

    useEffect(() => {
        loadData()
        const interval = setInterval(async () => {
            loadData()
        }, 2000);
        return () => {
            clearInterval(interval)
        }
    }, [])


    return(
        <div>
            <Table
                columns={cols}
                    data={feedbacks.map(feedback => ({  Client:feedback.rating, Date: feedback.comment ,
                Rate: feedback.feedbackDate , Message:feedback.clientName}))}
                container={classes.container} /> </div>
)
};


export default withRouter(ShowFeedbacks)