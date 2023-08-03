const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const dayjs = require('dayjs')
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)

  // Copy the wp-content folder from the exported WordPress site
  eleventyConfig.addPassthroughCopy('wp-content')

    // Copy the CSS
    eleventyConfig.addPassthroughCopy('css')

  // Add collections that allow groupings by year/month and year
  eleventyConfig.addCollection('contentByMonth', require('./_utils/collections/contentByDate').contentByMonth)
  eleventyConfig.addCollection('contentByYear', require('./_utils/collections/contentByDate').contentByYear)

  // Return the collections in use excluding those used for special grouping
  eleventyConfig.addFilter('regular_tags', (tags) => {
    const excluded = [
      'all',
      'post',
      'contentByMonth',
      'contentByYear',
    ]

    return tags.filter((tag) => !excluded.includes(tag))
  })

  // Keys filter from https://github.com/11ty/eleventy/issues/927#issuecomment-585539708
  eleventyConfig.addFilter('keys', obj => Object.keys(obj))

  eleventyConfig.addShortcode('formatted_date', function(date) {
    return dayjs(date).format('Do MMMM YYYY - dddd')
  })

  eleventyConfig.setLayoutResolution(false)

  return {
    dir: {
      input: "_input",
      output: "_output",
      includes: "../_includes",
      layouts: "../_includes/layouts",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  }
}
