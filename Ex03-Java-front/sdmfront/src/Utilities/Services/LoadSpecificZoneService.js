import axios from "../Axios/Axios";
import parseDataItemsAndStores from "../Modal/ParseSpecificZoneData";
const LoadSpecificZone = async (nameOfZone) => {
    try {
        let itemsData = await axios.post('SDM/getData', { zone: nameOfZone })
        let storesData = await axios.post('SDM/getStores', { zone: nameOfZone })
        let parsedDataItemsAndStores = parseDataItemsAndStores(storesData, itemsData)
        return parsedDataItemsAndStores
    }
    catch (err) {
        console.log(err)
        throw err
    }

}

export default LoadSpecificZone

