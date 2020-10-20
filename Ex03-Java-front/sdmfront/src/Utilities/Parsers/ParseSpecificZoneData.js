const parseDataItemsAndStores = (storesData, itemsData) => {
    const arrayOfStores = []
    Object.keys(storesData.data.map).forEach(key => {
        arrayOfStores.push({
            ...storesData.data.map[key].map,
            itemsStoreSell: Object.values(storesData.data.map[key].map.itemsStoreSell.map).map(el => el.map)
        })
    })

    const arrayOfItems = Object.values(itemsData.data.items)

    return {
        stores: arrayOfStores,
        items: arrayOfItems
    }
}

export default parseDataItemsAndStores