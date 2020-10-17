import axios from "../Axios/Axios";
import parseDataItemsAndStores from "../Modal/ParseSpecificZoneData";
import React, {useContext, useState} from 'react'
class LoadWebSocket extends React.Component {
    constructor(props) {
        LoadWebSocket.userName=props;
        super();
        if(!LoadWebSocket.ws) {
            LoadWebSocket.ws = new WebSocket('ws://127.0.0.1:8080/SDM/saveSocket')

            LoadWebSocket.ws.onopen = () => {
                // on connecting, do nothing but log it to the console


                LoadWebSocket.ws.send("User:" + LoadWebSocket.userName)
                console.log("send1!!")
            }
            LoadWebSocket.isConnected=true;
        }
        return LoadWebSocket.ws;


    }

    static isConnected=false;
    static ws=null;
    static userName=""
    render() {
        return null;
    }

}
export default LoadWebSocket

