import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import TopNavbar from '../../Components/UIComponents/TopNavbar/TopNavbar'
import StoreArea from '../../Components/LogicalComponents/StoreArea/StoreArea'
import Zone from '../../Components/LogicalComponents/SpecificZone/SpecificZone'
import NewStore from "../../Components/LogicalComponents/NewStore/NewStore";
import FullOrderCreation from "../../Components/LogicalComponents/Orders/CreateOrder/FullOrderCreation";
import NewItem from "../../Components/LogicalComponents/NewItem/NewItem";
import showFeedbacks from "../../Components/LogicalComponents/showFeedbacks/ShowFeedbacks";
import ShowSellerOrders from '../../Components/LogicalComponents/Orders/ShowOrders/ShowSellerOrders'


const Main = (props) => {
    return (
        <div>
            <header>
                <TopNavbar websocket={props.websocket} />
            </header>
            <div>
                <Switch>
                    <Route exact path='/storeAreas' component={StoreArea} />
                    <Route  path='/createOrder' component={FullOrderCreation} />
                    <Route  path='/storeOrders' component={ShowSellerOrders} />

                    <Route  path='/storeAreas/:zone' component={Zone} />
                    <Route  path='/openNewStore' component={NewStore} />
                    <Route  path='/addItem' component={NewItem} />
                    <Route  path='/showFeedback' component={showFeedbacks} />
                </Switch>
                <Redirect to='/storeAreas' />

            </div>

        </div>
    )
}

export default Main