const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;
const buildPrettierAndTypeCommand = (filenames) =>
  `prettier --no-error-on-unmatched-pattern --write ./**/${filenames} && tsc`;

module.exports = {
  "*.{ts,tsx,js,jsx,scss,css,json}": [buildPrettierAndTypeCommand],
  "*.{ts,tsx,js,jsx}": [buildEslintCommand],
};
