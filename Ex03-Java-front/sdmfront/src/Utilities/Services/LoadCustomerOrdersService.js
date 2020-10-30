
import axios from "../Axios/Axios";


const LoadOrders = async () => {
    let res = await axios.post("/SDM/getOrdersByUsername")
    const listOfOrders = []
    Object.keys(res.data).forEach(order => {
        const orderObj = { ...res.data[order].map }
        const items = { ...res.data[order].map.items.map }
        orderObj.items = []
        Object.keys(items).forEach(item => {
            orderObj['items'].push(items[item].map)
        })
        listOfOrders.push(orderObj)
    })
    return listOfOrders
}

export default LoadOrders