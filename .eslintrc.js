 
module.exports = {
  extends: [
     
    require.resolve('@vercel/style-guide/eslint/node'),
     
    require.resolve('@vercel/style-guide/eslint/browser'),
  ],
  plugins: ["html", "@html-eslint"],
  overrides: [
    {
      files: ["*.html", "*.hbs"],
      parser: "@html-eslint/parser",
      extends: ["plugin:@html-eslint/recommended"],
    },
  ],
  ignorePatterns: ["public"]
};