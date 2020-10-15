import axios from '../Axios/Axios'
import parseUserData from '../Modal/ParseUsersData'

const loadUsers = async () => {
    let userdata = await axios.get('/SDM/getUsers')
    let parsedUserData = parseUserData(userdata.data)
    return parsedUserData;
}

export default loadUsers