import React from 'react'
import TopNavbar from '../../Components/TopNavbar/TopNavbar'
import Customer from '../Customer/Customer'
import ShopOwner from '../ShopOwner/ShopOwner'
import { Route } from 'react-router-dom'

const Main = (props) => {
    return (
        <div>
            <header>
                <TopNavbar userKind={props.userKind} />
            </header>
            <div>
                <Route path='/customer' component={Customer} />
                <Route path='/shop' component={ShopOwner} />

            </div>

        </div>
    )
}

export default Main