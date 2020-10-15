

const parseZonesData = (zonesData) =>{
    let arrayOfZones = []

    Object.keys(zonesData).forEach(key=>{
        arrayOfZones.push(zonesData[key].map)
    })

    return arrayOfZones
}

export default parseZonesData