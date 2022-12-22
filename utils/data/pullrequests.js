const axios = require('axios');

async function getPullRequests(username) {
    var totalPRs = await axios
    .get(`https://api.github.com/search/issues?q=is:pr+author:${username}`)
      .catch(error => {
        return ('There was an error!', error);
      });
      if(totalPRs.data == undefined){
        return totalPRs.errors;
      };
      let merged_PRs = [];
      let nonMerged_PRs = [];
      let mostPopularRepo = undefined;
      let mostPopularRepoStars = 0;
      Array.from(totalPRs.data.items).forEach((PR) => {
        if(PR.pull_request.merged_at != null){
          merged_PRs.push(PR);
        }else{
          nonMerged_PRs.push(PR);
        };
      });
      Array.from(merged_PRs).forEach(async (PR) => {
        var repoDetailsObject = await axios
        .get(PR.repository_url)
          .catch(error => {
            return ('There was an error!', error);
          });
          if(repoDetailsObject.data.stargazers_count > mostPopularRepoStars){
            mostPopularRepoStars = repoDetailsObject.data.stargazers_count;
            mostPopularRepo = repoDetailsObject.data;
          };
      });

      let PR_obejct = {
        totalPRs: totalPRs.data.total_count,
        PRs_array: totalPRs.data.items,
        merged_PRs: merged_PRs,
        nonMerged_PRs: nonMerged_PRs,
        mostPopularRepo: mostPopularRepo,
        mostPopularRepoStars: mostPopularRepoStars
       }
      return PR_obejct;
}

module.exports = getPullRequests;