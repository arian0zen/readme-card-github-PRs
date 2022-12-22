const axios = require('axios');

async function getIssuesCreated(username) {
    var totalIssues = await axios
    .get(`https://api.github.com/search/issues?q=is:issue+author:${username}`)
      .catch(error => {
        return('There was an error!', error);
      });
      if(totalIssues.data == undefined){
        return totalIssues.errors;
      };
      let closed_issues = [];
      let open_issues = [];
      Array.from(totalIssues.data.items).forEach((issue) => {
        if(issue.state == 'closed'){
          closed_issues.push(issue)
        } else {
          open_issues.push(issue)
        }
      });

      let issues_object = {
        totalIssues: totalIssues.data.total_count,
        issues_array: totalIssues.data.items,
        closed_issues: closed_issues,
        open_issues: open_issues
      };
      return issues_object;
}


module.exports = getIssuesCreated;