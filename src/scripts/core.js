const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const renderMd = require("./markdown");

const loadData = () => {
  const data = fs.readFileSync(
    path.join(__dirname, "../data/base.json"),
    "utf-8"
  );
  return JSON.parse(data);
};

const loadContent = () => {
  const data = fs.readFileSync(
    path.join(__dirname, "../data/content.json"),
    "utf-8"
  );
  return JSON.parse(data);
};

const renderSection = (section) => {
  const template = fs.readFileSync(
    path.join(__dirname, `../templates/components/${section.component}.ejs`),
    "utf-8"
  );

  // simple text
  if (section.data.text) {
    section.data.text = renderMd.parseInline(section.data.text);
  }

  return ejs.render(template, section.data);
};

module.exports = () => {
  const data = loadData();
  const content = loadContent();

  const sections = content.sections.map((section) => renderSection(section));

  const template = fs.readFileSync(
    path.join(__dirname, "../templates/template.ejs"),
    "utf-8"
  );

  return ejs.render(template, { ...data, sections });
};
