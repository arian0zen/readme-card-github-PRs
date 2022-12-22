const axios = require('axios');

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