import React, {useContext, useState} from 'react'
import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import UserProfileContext from '../../../Utilities/Contexts/UserProfileContext/UserProfileContext'

import Button from "@material-ui/core/Button";
import LoadWebSocket from "../../../Utilities/Services/LoadWebSocket";
const customerActions = {
    createOrder: 'Create order',
    raitingOfStoreOwners: 'Raiting of store owners',
    ordersInfo: 'Orders infomartion'
}

const storeOwnerActions = {
    storeOrders: 'Store orders',
    showFeedback: 'Show feedback',
    openNewStore: 'Open new store',
    addItem: 'Add new item'
}

const TopNavBar = props => {

    const [btnColor, setBtnColor] = useState("white");
    const userProfileContext = useContext(UserProfileContext)
    let specificActions = userProfileContext.userType === 'Customer' ? customerActions : storeOwnerActions
    let label = userProfileContext.userType === 'Customer' ? 'Customer actions' : 'Store owner actions'
    const ws = new LoadWebSocket()
    ws.onmessage = evt => {
        // add the new message to state
        setBtnColor("secondary")
        console.log("DorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDorDor")
    };

    return (
        <Navbar style={{ background: 'inherit' }} variant="light">
            <Navbar.Brand href="#home">Super Market</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/storeAreas">Store Areas</Nav.Link>
                <Nav.Link as={Link} to="/account">account</Nav.Link>

                <NavDropdown title={label} id="collasible-nav-dropdown">
                    {Object.keys(specificActions).map(el => {
                        return (
                            <NavDropdown.Item key={el} as={Link} to={'/' + el}>{specificActions[el]}</NavDropdown.Item>
                        )
                    })}

                </NavDropdown>

            </Nav>

            <Button variant="contained" color={btnColor}>
                Notifications
            </Button>
        </Navbar>)
}
export default TopNavBar