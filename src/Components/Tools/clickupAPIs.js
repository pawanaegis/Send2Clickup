import axios from 'axios';
import config from '../../config/config';

let getToken = async(code) =>{
    
try {
    let request = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://api.clickup.com/api/v2/oauth/token?client_id=${config.clickupClientId}&client_secret=${config.clickupSecret}&code=${code}`,
        headers: { }
      };
      
      axios.request(request)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        return response.data.access_token;
      })
} catch (error) {
    return error;
 }
}

export {
    getToken
}