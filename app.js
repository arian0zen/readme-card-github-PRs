const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const allStats = require("./utils/statistics");
const svgTemplate = require("./utils/svg/template");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(express.static("public"));

const basicSVGboilerPlate = svgTemplate.svgBoilerPlate();


app.get("/getStats/:username", async (req, res)=>{
  const userName = req.params.username;
  let userDetails = await allStats.getUserDetails(userName);
  let allPRs = await allStats.getPRs(userName);
  let allIssues = await allStats.getIssues(userName);
  let getDP_svg = await svgTemplate.getDP(userDetails.avatar_url);
  let statsObject = {
    name: userDetails.name,
    username: userDetails.login,
    totalPRMerged: allPRs.merged_PRs.length,
    totalPRcreated: allPRs.totalPRs,
    totalIssueCreated: allIssues.totalIssues,
    totalIssueClosed: allIssues.closed_issues.length,
    mostPopularProject: allPRs.mostPopularRepo.full_name,
    mostPopularProjectStart: allPRs.mostPopularRepoStars
  }

  let getStats_svg = await svgTemplate.svgStats(statsObject);
  let getAnimation_svg = await svgTemplate.getAnimation();
  let howManyMoretext = allPRs.merged_PRs.length - 11;
  if(howManyMoretext < 0){
    howManyMoretext = 0;
  }
  let getHowManyMorePRs_svg = await svgTemplate.howManyMoreText(howManyMoretext);
  let getContributedCircle_svg = '';
  let iteration_no = 0;
  let array_mergedRepoDetails = allPRs.allRepo_array;
  Array.from(array_mergedRepoDetails).forEach((repo)=>{
    let oneRepo_style = svgTemplate.style_contributionCircle(repo.owner.avatar_url, iteration_no, iteration_no);
    getContributedCircle_svg += oneRepo_style;
    iteration_no++;
  })
  let getStyle_svg = await svgTemplate.style_mainSVG();

  let completeCard_svg = basicSVGboilerPlate + getDP_svg + getStats_svg + getContributedCircle_svg + getHowManyMorePRs_svg + getAnimation_svg + getStyle_svg; 
  res.set('Content-Type', 'image/svg+xml');
  res.send(completeCard_svg);

});
  
  



const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log("listening on port 80");
  });


