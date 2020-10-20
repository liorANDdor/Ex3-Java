const keyToUpperCaseAndSpacesString = key => {
    let str
    if (key === 'storesWhoSellTheItem')
        str = 'Number Of Stores'
    else {
        str = key.replace(/([A-Z])/g, ' $1').trim()
        str = str.charAt(0).toUpperCase() + str.slice(1)
    }

    return str
}

export default keyToUpperCaseAndSpacesString