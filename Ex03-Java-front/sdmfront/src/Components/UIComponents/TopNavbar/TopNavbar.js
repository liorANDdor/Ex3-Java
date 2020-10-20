import React, {useContext, useState} from 'react'
import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import UserProfileContext from '../../../Utilities/Contexts/UserProfileContext/UserProfileContext'
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
    const [numberOfAlerts, setNumberOfAlerts] = useState(0);
    const [messages, setMessages] = useState([]);
    const userProfileContext = useContext(UserProfileContext)
    let specificActions = userProfileContext.userType === 'Customer' ? customerActions : storeOwnerActions
    let label = userProfileContext.userType === 'Customer' ? 'Customer actions' : 'Store owner actions'
    const ws = new LoadWebSocket()
    ws.onmessage = evt => {
        // add the new message to state
        let newNumber = numberOfAlerts + 1;
        setNumberOfAlerts(newNumber);
         };

    function showMessages() {
        setNumberOfAlerts(0) ;
    }

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
            {userProfileContext.userType === 'Customer' ? null :
                <Badge badgeContent={numberOfAlerts} color="secondary" onClick={showMessages}>
                    <MailIcon/>

                </Badge>
            }
        </Navbar>)
}
export default TopNavBar