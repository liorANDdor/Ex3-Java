const { DeviceDataUsage } = require("material-ui/svg-icons")


const parseZonesData = (zonesData) =>{
    let arrayOfZones = []

    Object.keys(zonesData).forEach(key=>{
        arrayOfZones.push(zonesData[key].map)
    })

    return arrayOfZones
}

export default parseZonesData