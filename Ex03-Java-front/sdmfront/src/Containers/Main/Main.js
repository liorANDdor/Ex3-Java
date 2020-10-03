import React from 'react'
import TopNavbar from '../../Components/TopNavbar/TopNavbar'
import Customer from '../Customer/Customer'
import ShopOwner from '../ShopOwner/ShopOwner'

const Main = (props) => {
    return (
        <div>
            <TopNavbar />
            {props.userKind === 'Customer' ? <Customer /> : <ShopOwner />}
        </div>
    )
}

export default Main