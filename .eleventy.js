//ty petrapixel for the 11ty tutorial you da goat
const htmlmin = require("html-minifier-terser");

module.exports = function (eleventyConfig) {
  // This makes the eleventy command quieter (with less detail)
  eleventyConfig.setQuietMode(true);

  // This will stop the default behaviour of foo.html being turned into foo/index.html
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  //retain blog post filename
  eleventyConfig.addGlobalData("eleventyComputed", {
  permalink: (data) => {
    const path = data.page.inputPath;
    if (path.includes("blog/posts/")) {
      // Get the original filename from the input path
      const filename = path.split("/").pop();
      return `blog/posts/${filename}`;
    }
    return `${data.page.filePathStem}.html`;
  }
});

  // This will make Eleventy not use your .gitignore file to ignore files
  eleventyConfig.setUseGitIgnore(false);

  // This will copy this folder to the output without modifying it at all
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "js":"js" });
  eleventyConfig.addPassthroughCopy({ "style.css":"style.css" });

  // This defines which files will be copied
  eleventyConfig.setTemplateFormats(["html", "njk", "txt", "js", "css", "xml", "json"]);

//   //Minifier
//   eleventyConfig.addTransform("htmlmin", function (content) {
//     if ((this.page.outputPath || "").endsWith(".html")) {
//       let minified = htmlmin.minify(content, {
//         useShortDoctype: true,
//         removeComments: true,
//         collapseWhitespace: true,
//         minifyCSS: true,
//         minifyJS: true,
//       });
//       return minified;
//     }
//     return content;
//   });

  // This defines the input and output directories
  return {
    // This makes sure HTML files use Nunjucks
    htmlTemplateEngine: "njk",
    dir: {
      input: "content",
      output: "public",
    },
  };
};