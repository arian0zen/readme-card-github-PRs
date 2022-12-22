const axios = require('axios');

async function getPullRequests(username) {
    var openPRs = await axios
    .get(`https://api.github.com/search/issues?q=is:pr+author:${username}+is:open`)
      .catch(error => {
        console.error('There was an error!', error);
      });
      return openPRs.data.items;
}

module.exports = getPullRequests;