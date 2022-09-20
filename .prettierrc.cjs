module.exports = {
  tabWidth: 2,
  semi: true,
  arrowParens: 'avoid',
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSameLine: true,
  importOrder: ['^node:', '<THIRD_PARTY_MODULES>', '^~', '^[./]'],
  importOrderSeparation: true,
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
};
