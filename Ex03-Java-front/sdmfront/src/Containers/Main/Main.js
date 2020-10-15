import React from 'react'
import TopNavbar from '../../Components/UIComponents/TopNavbar/TopNavbar'
import StoreArea from '../../Components/LogicalComponents/StoreArea/StoreArea'
import StoresList from '../../Components/UIComponents/StoresList/StoresList'
import { Route, Redirect, Switch } from 'react-router-dom'
import Zone from '../../Components/UIComponents/AllZones/SpecificZone/SpecificZone'

const Main = (props) => {
    return (
        <div>
            <header>
                <TopNavbar />
            </header>
            <div>
                <Switch>
                    <Route exact path='/storeAreas' component={StoreArea} />
                    <Route  path='/storeAreas/:zone' component={Zone} />
                </Switch>
                <Redirect to='/storeAreas' />

            </div>

        </div>
    )
}

export default Main