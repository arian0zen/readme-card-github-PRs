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


app.get("/:username", async (req, res)=>{
  const userName = req.params.username;
  let userDetails = await allStats.getUserDetails(userName);
  let allPRs = await allStats.getPRs(userName);
  let allIssues = await allStats.getIssues(userName);
  let getDP_svg = await svgTemplate.getDP(userDetails.avatar_url);
  let statsObject = {
    name: userDetails.name,
    username: userDetails.login,
    totalPRMerged: allPRs.merged_PRs.length,
    totalPRCreated: allPRs.totalPRs,
    totalIssueCreated: allIssues.totalIssues,
    totalIssueClosed: allIssues.closedIssues.length,
    mostPopularProject: allPRs.mostPopularRepo.full_name,
  }
  let getStats_svg = await svgTemplate.getStats(statsObject);
  
  // res.send(getDP_svg);

});
  
  



const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log("listening on port 80");
  });


