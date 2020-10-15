import axios from '../Axios/Axios'
import parseUserData from '../Modal/ParseUsersData'

const loadUsers = async () => {
    try{
        let userdata = await axios.get('/SDM/getUsers')
        let parsedUserData = parseUserData(userdata.data)
        return parsedUserData;
    }
    catch(err){
        console.log(err)
        throw err
    }
    
}

export default loadUsers