const axios = require('axios');
const fetch = require('node-fetch');
require('dotenv').config()

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
      let repoUrls = [];
      Array.from(totalPRs.data.items).forEach((PR) => {
        if(PR.pull_request.merged_at != null){
          merged_PRs.push(PR);
          repoUrls.push(PR.repository_url);
        }else{
          nonMerged_PRs.push(PR);
        };
      });
      

  return (getRepoWithMostStars(repoUrls).then((repo) => {
          let PR_obejct = {
          totalPRs: totalPRs.data.total_count,
          PRs_array: totalPRs.data.items,
          merged_PRs: merged_PRs,
          nonMerged_PRs: nonMerged_PRs,
          mostPopularRepo: repo.repoWithMostStars,
          mostPopularRepoStars: repo.repoWithMostStars.stargazers_count,
          allRepo_array: repo.allRepo_array,
         }
         return PR_obejct;
      }));
}

//define a function to get the most popular repo

async function getRepoWithMostStars(repoUrls) {
  let mostStars = 0;
  let repoWithMostStars;
  let allRepo_array = [];
  for (const repoUrl of repoUrls) {
    const response = await fetch((repoUrl),  {
      headers: { 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`}});
    const repo = await response.json();
    allRepo_array.push(repo);
    if (repo.stargazers_count >= mostStars) {
      mostStars = repo.stargazers_count;
      repoWithMostStars = repo;
    }
  }

  let repos_object = {
    allRepo_array: allRepo_array,
    repoWithMostStars: repoWithMostStars
  };

  return repos_object;
}

module.exports = getPullRequests;