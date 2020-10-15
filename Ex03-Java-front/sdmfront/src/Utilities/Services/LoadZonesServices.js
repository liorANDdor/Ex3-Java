import parseZonesData from '../Modal/ParseZonesData'
import axios from '../Axios/Axios'

const loadZones = async () => {
    try {
        let zonesData = await axios.get('/SDM/getZones')
        let parsedZonesData = parseZonesData(zonesData.data)
        return parsedZonesData
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

export default loadZones