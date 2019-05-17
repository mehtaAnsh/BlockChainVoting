import web3 from './web3';
import Election from './Build/Election.json';

export default address => {
    return new web3.eth.Contract(
        JSON.parse(Election.interface),
        address
    );  
};