const express = require("express");

const render = require("./core");

const app = express();

app.get("/", (req, res) => {
  const rendered = render();
  res.send(rendered);
});

app.listen(3000, () => {
  console.log("⚡ server started - http://localhost:3000");
});
