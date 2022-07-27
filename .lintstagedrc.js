const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;
const buildPrettierCommand = (filenames) =>
  `prettier --no-error-on-unmatched-pattern --write ./**/${filenames} && tsc`;
const buildTsCommand = (filenames) => `tsc --noEmit`;

module.exports = {
  "*.{ts,tsx,js,jsx,scss,css,json}": [buildPrettierCommand],
  "*.{ts,tsx,js,jsx}": [buildEslintCommand],
  "*.{ts,tsx}": [buildTsCommand],
};
