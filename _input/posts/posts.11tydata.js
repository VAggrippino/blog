const dayjs = require('dayjs')

module.exports = () => ({
  "layout": "post.njk",
  "tags": ["post"],
  // Write output files without their own permalink to a path that includes the year and month
  "permalink": data => `/${dayjs(data.page.date).format('YYYY/MM')}/${data.page.fileSlug}/`,

  "eleventyComputed": {
    "eleventyExcludeFromCollections": data => !data.published,
  },
})
