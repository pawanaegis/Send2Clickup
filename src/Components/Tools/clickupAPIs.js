import axios from 'axios';
import config from "../../config/config";

let getToken = async(code) =>{
try {
    const response = await axios.post(
        `https://api.clickup.com/api/v2/oauth/token?client_id=${config.clickupClientId}&client_secret=${config.clickupSecret}&code=${code}`,
      );

      console.log(response.data.access_token);
      return response.data.access_token;
} catch (error) {
    return error;
 }
}

export {
    getToken
}