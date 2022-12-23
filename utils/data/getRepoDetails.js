const axios = require('axios');
require('dotenv').config()

axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;

async function getRepoDetails(repoLink) {
    var repository = await axios
    .get(`${repoLink}`)
      .catch(error => {
        return('There was an error!', error);
      });
      let repoDetailsObject = {
        name: repository.data.name,
        full_name: repository.data.full_name,
        owner_id: repository.data.owner.id,
        owner_name: repository.data.owner.login,
        owner_dp: repository.data.owner.avatar_url,

      }
      return repoDetailsObject;
}

module.exports = getRepoDetails;