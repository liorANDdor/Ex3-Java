import React from 'react'
import TopNavbar from '../../Components/TopNavbar/TopNavbar'
import StoreArea from '../../Components/StoreArea/StoreArea'
import StoresList from '../../Components/StoresList/StoresList'
import { Route, Redirect, Switch } from 'react-router-dom'
import Zone from '../../Components/AllZones/SpecificZone/SpecificZone'
import Deposit from '../../Components/Deposit/Deposit'

const Main = (props) => {
    return (
        <div>
            <header>
                <TopNavbar />
            </header>
            <div>
                <Switch>
                    <Route exact path='/storeAreas' component={StoreArea} />
                    <Route to='storeAreas/:zone' component={Zone} />
                    <Route path='/storesAndItems' component={StoresList} />

                </Switch>
                <Redirect to='/storeAreas' />

            </div>

        </div>
    )
}

export default Main