module.exports = function(eleventyConfig) {
  // Copy the wp-content folder from the exported WordPress site
  eleventyConfig.addPassthroughCopy('wp-content')

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
