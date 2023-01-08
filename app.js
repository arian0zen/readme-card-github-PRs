var convertapi = require("convertapi")("Gwsn7Uc9PO0srvNd");
const express = require("express");
const axios = require('axios');
const fetch = require('node-fetch');
const bodyParser = require("body-parser");
const app = express();
const allStats = require("./utils/statistics");
const svgTemplate = require("./utils/svg/template");


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(express.static("public"));

const basicSVGboilerPlate = svgTemplate.svgBoilerPlate();

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.get("/getstats/:username", async (req, res) => {
  const userName = req.params.username;
  let userDetails = await allStats.getUserDetails(userName);
  if(userDetails.code){
    res.json(userDetails.message);
    return;
  }

  let allPRs = await allStats.getPRs(userName);
  let allIssues = await allStats.getIssues(userName);
  let getDP_svg = await svgTemplate.getDP(userDetails.avatar_url);
  if(allPRs == null || allIssues == null){
    res.send("No data found");
    return;
  }

  let statsObject = {
    name: userDetails.name,
    username: userDetails.login,
    totalPRMerged: allPRs.merged_PRs.length,
    totalPRcreated: allPRs.totalPRs,
    totalIssueCreated: allIssues.totalIssues,
    totalIssueClosed: allIssues.closed_issues.length,
    mostPopularProject: allPRs.mostPopular_repoName,
    mostPopularProjectStart: allPRs.mostPopularRepoStars,
  };

  let getStats_svg = await svgTemplate.svgStats(statsObject);
  let getAnimation_svg = await svgTemplate.getAnimation();
  let howManyMoretext = allPRs.merged_PRs.length - 11;
  if (howManyMoretext < 0) {
    howManyMoretext = 0;
  }
  let getHowManyMorePRs_svg = await svgTemplate.howManyMoreText(
    howManyMoretext
  );
  let getContributedCircle_svg = "";
  let array_mergedRepoDetails = allPRs.allRepo_array;
  await Promise.all(array_mergedRepoDetails.map(async (repo, index) => {
    let oneRepo_style = await svgTemplate.style_contributionCircle(repo.owner.avatar_url, index, index);
    getContributedCircle_svg += oneRepo_style;
  }));
  let getStyle_svg = await svgTemplate.style_mainSVG();

  let completeCard_svg =
    basicSVGboilerPlate +
    getDP_svg +
    getStats_svg +
    getContributedCircle_svg +
    getHowManyMorePRs_svg +
    getAnimation_svg +
    getStyle_svg;
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(completeCard_svg);
});
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log("listening on port 80");
});
