import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import TopNavbar from '../../Components/UIComponents/TopNavbar/TopNavbar'
import StoreArea from '../../Components/LogicalComponents/StoreArea/StoreArea'
import Zone from '../../Components/LogicalComponents/SpecificZone/SpecificZone'
import NewStore from "../../Components/LogicalComponents/NewStore/NewStore";
import CreateOrder from "../../Components/LogicalComponents/Orders/CreateOrder/CreateOrder";


const Main = (props) => {
    return (
        <div>
            <header>
                <TopNavbar websocket={props.websocket} />
            </header>
            <div>
                <Switch>
                    <Route exact path='/storeAreas' component={StoreArea} />
                    <Route  path='/createOrder' component={CreateOrder} />
                    <Route  path='/storeAreas/:zone' component={Zone} />
                    <Route  path='/openNewStore' component={NewStore} />
                </Switch>
                <Redirect to='/storeAreas' />

            </div>

        </div>
    )
}

export default Main