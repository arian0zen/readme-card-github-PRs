const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const getPRs = require("./utils/data/pullrequests");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", async (req, res)=>{
  console.log(await getPRs("arian0zen"));
  res.send("Hello World")
});
  
  



const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log("listening on port 80");
  });


