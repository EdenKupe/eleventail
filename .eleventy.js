const { DateTime }  = require('luxon');
const util          = require('util');
const pluginSass = require("eleventy-plugin-sass");

module.exports = function(eleventyConfig) {

  //passing markdown options
  let markdownIt = require("markdown-it");
  let options = {
    breaks: true
  }

  eleventyConfig.setLibrary("md", markdownIt(options));

  // Layout aliases for convenience
  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('conf', 'layouts/conf.njk');

  // a debug utility
  eleventyConfig.addFilter('dump', obj => {
    return util.inspect(obj)
  });

  // Date helpers
  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('LLLL d, y');
  });
  eleventyConfig.addFilter('htmlDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('y-MM-dd');
  });

  // Grab excerpts and sections from a file
  eleventyConfig.addFilter("section", require("./src/utils/section.js") );

  // compress and combine js files
  eleventyConfig.addFilter("jsmin", require("./src/utils/minify-js.js") );

  // minify the html output when running in prod
  if (process.env.NODE_ENV == "production") {
    eleventyConfig.addTransform("htmlmin", require("./src/utils/minify-html.js") );
  }

  // Static assets to pass through
  eleventyConfig.addPassthroughCopy("./src/site/fonts");
  eleventyConfig.addPassthroughCopy("./src/site/images");
  eleventyConfig.addPassthroughCopy("./src/site/css");

  // add SASS plugin

  eleventyConfig.addPlugin(pluginSass);

  // creating a custom collection of all posts, sorted alphabetically

  eleventyConfig.addCollection("mainPages", function(collection) {
    return collection.getFilteredByGlob("src/site/pages/*.md").sort(function(a, b) {
      if (a.data.author && b.data.author) {  
        let nameA = a.data.author.toLowerCase();
        let nameB = b.data.author.toLowerCase();
        let firstA = nameA.charAt(0);
        let firstB = nameB.charAt(0);
        a.data.category = firstA;
        b.data.category = firstB;
        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
        
      }
    });
});

  return  {
    dir: {
      input: "src/site",
      includes: "_includes",
      output: "dist"
    },
    passthroughFileCopy: true,
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
  };

};
