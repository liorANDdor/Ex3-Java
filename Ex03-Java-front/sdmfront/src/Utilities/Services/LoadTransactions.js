import axios from '../Axios/Axios'
import parseUserData from '../Modal/ParseUsersData'

const loadTransactions = async () => {
    try{
        let transactionsData = await axios.post('/SDM/getTransaction')

        console.log(transactionsData.data);
        console.log("try");
        return transactionsData.data;
    }
    catch(err){

        console.log("catch");
        console.log(err)
        throw err
    }
    
}

export default loadTransactions