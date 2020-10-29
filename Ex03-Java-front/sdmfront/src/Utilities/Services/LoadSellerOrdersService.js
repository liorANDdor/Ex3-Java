import axios from "../Axios/Axios";


const LoadOrders = async () => {
    let res = await axios.post("/SDM/getStoresByUser")
    const listOfStoresOrders = []
    console.log(res.data)
    Object.keys(res.data).forEach(store => {
        const storeAndOrders = {}
        storeAndOrders['name'] = res.data[store].map.name
        storeAndOrders['orders'] = []
        Object.keys(res.data[store].map.orders.map).forEach((order, ind) => {
            storeAndOrders['orders'].push({ ...res.data[store].map.orders.map[order].map })
            const items = { ...res.data[store].map.orders.map[order].map.items.map }
            storeAndOrders['orders'][ind].items = []
            Object.keys(items).forEach(item => {
                storeAndOrders['orders'][ind]['items'].push(items[item].map)
            })

        })
        listOfStoresOrders.push(storeAndOrders)
    })
    return listOfStoresOrders
}

export default LoadOrders