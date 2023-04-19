const dayjs = require('dayjs')

module.exports = () => ({
  "layout": "post.njk",
  "tags": ["post"],
  "permalink": data => `/${dayjs(data.page.date).format('YYYY/MM')}/${data.page.fileSlug}/`,
})
