import React from 'react'
import TopNavbar from '../../Components/TopNavbar/TopNavbar'
import StoreArea from '../../Components/StoreArea/StoreArea'
//import UsersList from '../../Components/UsersList/UsersList'
import StoresList from '../../Components/StoresList/StoresList'
import { Route, Redirect } from 'react-router-dom'

const Main = (props) => {
    return (
        <div>
            <header>
                <TopNavbar userKind={props.userKind} />
            </header>
            <div>
                <Route path='/storeAreas' component={StoreArea} />
                <Route path='/storesAndItems' component={StoresList} />
                <Redirect to='/storeAreas' />

            </div>

        </div>
    )
}

export default Main