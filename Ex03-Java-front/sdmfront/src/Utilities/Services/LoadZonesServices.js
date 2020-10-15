import parseZonesData from '../Modal/ParseZonesData'
import axios from '../Axios/Axios'

const loadZones = async () => {
    let zonesData = await axios.get('/SDM/getZones')
    let parsedZonesData = parseZonesData(zonesData.data)
    return parsedZonesData

}

export default loadZones