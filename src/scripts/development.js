const express = require("express");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const app = express();

app.get("/", (req, res) => {
  let baseData = fs.readFileSync(
    path.join(__dirname, "../data/base.json"),
    "utf-8"
  );
  baseData = JSON.parse(baseData);
  const template = fs.readFileSync(
    path.join(__dirname, "../templates/template.ejs"),
    "utf-8"
  );
  const rendered = ejs.render(template, baseData);
  res.send(rendered);
});

app.listen(3000, () => {
  console.log("⚡ server started - http://localhost:3000");
});
