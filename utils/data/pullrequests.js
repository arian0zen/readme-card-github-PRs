const axios = require("axios");
const fetch = require("node-fetch");
require("dotenv").config();

async function getPullRequests(username) {
  let prTime = Date.now();
  var totalPRs = await axios
    .get(`https://api.github.com/search/issues?q=is:pr+author:${username}`)
    .catch((error) => {
      return "There was an error!", error;
    });
  if (totalPRs.data == undefined) {
    return totalPRs.errors;
  }

  let PRDetails = Date.now();
  let merged_PRs = [];
  let nonMerged_PRs = [];

  for (const PR of totalPRs.data.items) {
    if (PR.pull_request.merged_at != null) {
      merged_PRs.push(PR);
    } else {
      nonMerged_PRs.push(PR);
    }
  }
  let repoUrls = merged_PRs.map((PR) => {return PR.repository_url});

  return getRepoWithMostStars(repoUrls).then((repo) => {
    if (repo == undefined) {
      return;
    }
    let popular_repo_name = repo.repoWithMostStars.full_name;
    if (popular_repo_name.length > 22) {
      popular_repo_name = popular_repo_name.substring(0, 20) + "...";
    }
    let PR_obejct = {
      totalPRs: totalPRs.data.total_count,
      PRs_array: totalPRs.data.items,
      merged_PRs: merged_PRs,
      nonMerged_PRs: nonMerged_PRs,
      mostPopularRepo: repo.repoWithMostStars,
      mostPopular_repoName: popular_repo_name,
      mostPopularRepoStars: repo.repoWithMostStars.stargazers_count,
      allRepo_array: repo.allRepo_array,
    };
    return PR_obejct;
  });
}

//define a function to get the most popular repo

async function getRepoWithMostStars(repoUrls) {
  let repoDetails = Date.now();
  let mostStars = 0;
  let repoWithMostStars;
  let allRepo_array = [];
  const response = await Promise.all(
    repoUrls.map(async (url) => {
      return await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }).then((response) => response.json());
    })
  );
  allRepo_array = response;
  for (const repo of allRepo_array) {
    if (repo.stargazers_count >= mostStars) {
      mostStars = repo.stargazers_count;
      repoWithMostStars = repo;
    }
  }

  if (repoWithMostStars == undefined) {
    console.log("undefined");
    return;
  }
  let repos_object = {
    allRepo_array: allRepo_array,
    repoWithMostStars: repoWithMostStars,
  };
  return repos_object;
}

module.exports = getPullRequests;

