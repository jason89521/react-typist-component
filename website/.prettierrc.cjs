module.exports = {
  ...require('../.prettierrc.cjs'),
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
};
