const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(cors());

const port = 3005;

let move = "_AFTER";

function cpImg(srcd, image) {
  let src = "./" + srcd + "/" + image;
  let des = "./" + srcd + move + "/" + image;

  console.log(src);
  console.log(des);

  fs.rename(src, des, (err) => {
    console.log(err);
  });
}

app.use("/", express.static(__dirname));

app.get("/page", (req, res) => {
  res.sendFile(path.join(__dirname, "/page.html"));
});

app.get("/move/:src/:image", (req, res) => {
  console.log("request!");
  cpImg(req.params.src, req.params.image);
  res.send("done");
});

app.listen(port, () => {
  console.log(`image preprocess localhost:${port}/page`);
});
