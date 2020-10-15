import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import TopNavbar from '../../Components/UIComponents/TopNavbar/TopNavbar'
import StoreArea from '../../Components/LogicalComponents/StoreArea/StoreArea'
import Zone from '../../Components/LogicalComponents/SpecificZone/SpecificZone'

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