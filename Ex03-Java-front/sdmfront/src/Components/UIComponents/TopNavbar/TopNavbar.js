import React, {useContext, useState} from 'react'
import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Badge from "@material-ui/core/Badge";
import clone from "clone";
import MailIcon from "@material-ui/icons/Mail";
import UserProfileContext from '../../../Utilities/Contexts/UserProfileContext/UserProfileContext'
import LoadWebSocket from "../../../Utilities/Services/LoadWebSocket";
import TransactionsList from "../TransactionsList/TransactionsList";
import UsersList from "../UsersList/UsersList";
import Notifications from "../Notifications/Notifications";
const customerActions = {
    createOrder: 'Create order',
    ordersInfo: 'Orders infomartion'
}

const storeOwnerActions = {
    storeOrders: 'Store orders',
    showFeedback: 'Show feedback',
    openNewStore: 'Open new store',
    addItem: 'Add new item'
}

const TopNavBar = props => {
    const [isOpen, setOpen] = useState(false);
    const [numberOfAlerts, setNumberOfAlerts] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [show, setShow] = useState(false);
    const userProfileContext = useContext(UserProfileContext)
    let specificActions = userProfileContext.userType === 'Customer' ? customerActions : storeOwnerActions
    let label = userProfileContext.userType === 'Customer' ? 'Customer actions' : 'Store owner actions'
    const ws = new LoadWebSocket()
    ws.onmessage = evt => {
        // add the new message to state
        let newNotifications = clone(notifications);
        let newNumber = numberOfAlerts + 1;
        setNumberOfAlerts(newNumber)
        newNotifications.push(evt.data)
        setNotifications(newNotifications);
        console.log("got message" + notifications)
         };

    function showMessages() {

        let isOpenNow = !isOpen;
        setOpen(isOpenNow);
        console.log(isOpenNow)
        console.log(isOpenNow)
        if(isOpenNow){
            console.log(notifications)
        setNumberOfAlerts(0) ;
        setShow(true);
            }
        else{
            setNotifications([]);
            setShow(false);
        }
    }

    return (
<div>
        <Navbar style={{ background: 'inherit' }} variant="light">
            <Navbar.Brand href="#home">Super Market</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/storeAreas">Store Areas And Account    </Nav.Link>
                <NavDropdown title={label} id="collasible-nav-dropdown">
                    {Object.keys(specificActions).map(el => {
                        return (
                            <NavDropdown.Item key={el} as={Link} to={'/' + el}>{specificActions[el]}</NavDropdown.Item>
                        )
                    })}

                </NavDropdown>

            </Nav>
            {userProfileContext.userType === 'Customer' ? null :
                <Badge badgeContent={numberOfAlerts} color="secondary" >
                    <MailIcon onClick={showMessages}/>
                </Badge>

            }


        </Navbar>
    <Notifications isVisible={show} notifications={notifications} />
    </div>)
}
export default TopNavBar