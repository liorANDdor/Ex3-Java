import React from 'react'
import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const customerActions = {
    createOrder:'Create order',
    raitingOfStoreOwners:'Raiting of store owners',
    ordersInfo:'Orders infomartion'
}

const storeOwnerActions = {
    loadXML:'Load XML',
    storeOrders:'Store orders',
    showFeedback:'Show feedback',
    openNewStorw:'Open new store'
}

const TopNavBar = props => {
    let specificActions = props.userKind === 'Customer' ? customerActions : storeOwnerActions
    let label = props.userKind === 'Customer' ? 'Customer actions' : 'Store owner actions'
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/storeAreas">Store Areas</Nav.Link>
                <Nav.Link as={Link} to="/storesAndItems">storesAndItems</Nav.Link>
                <Nav.Link as={Link} to="/account">account</Nav.Link>

                <NavDropdown title={label} id="collasible-nav-dropdown">
                    {Object.keys(specificActions).map(el=>{
                        return(
                        <NavDropdown.Item as={Link} to={el}>{specificActions[el]}</NavDropdown.Item>
                        )
                    })}
                    
                </NavDropdown>
            </Nav>

        </Navbar>)
}
export default TopNavBar