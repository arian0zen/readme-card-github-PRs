const axios = require('axios');
require('dotenv').config()

axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;

async function getUser(username) {
    var userDetails = await axios
    .get(`https://api.github.com/users/${username}`)
      .catch(error => {
        return('There was an error!', error);
      });
      if(userDetails.data == undefined){
        return userDetails.message;
      };
      return userDetails.data;
}

module.exports = getUser;