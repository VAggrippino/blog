module.exports = function(eleventyConfig) {
  // Copy the wp-content folder from the exported WordPress site
  eleventyConfig.addPassthroughCopy('wp-content')

  // Add collections that allow groupings by year/month and year
  eleventyConfig.addCollection('contentByMonth', require('./_utils/collections/contentByDate').contentByMonth)
  eleventyConfig.addCollection('contentByYear', require('./_utils/collections/contentByDate').contentByYear)

  return {
    dir: {
      input: "_input",
      output: "_output",
      includes: "../_includes",
      layouts: "../_includes/layouts",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  }
}
