const dayjs = require('dayjs')

// Make an array of unique dates from the collection
function getDates(collection, format) {
  // Use a Set so that the result only contains unique values
  const dates = new Set()

  collection.getAll().forEach((item) => {
    // If the item has a date and it's tagged "post" add its date to the set
    if ( "date" in item.data ) {
      if (item.data.tags && item.data.tags.includes('post')) {
        dates.add(dayjs(item.data.date).format(format))
      }     
    }
  })

  return Array.from(dates)
}

// Get a list of items with a provided date, sorted by the full date value
function getItemsByDate(collection, date, format){
  const filtered = collection.getAll().filter((item) => {
    // If the tag list isn't already an array, convert it to one
    const tags = (typeof item.data.tags === 'string') ? [item.data.tags] : item.data.tags

    // Only check dated items with tagged "post"
    if (tags && tags.includes('post')) {
      /* This was in the source tutorial I was following, but I think every item has a date */
      // if (!item.data.date) return false

      const short_date = dayjs(item.page.date).format(format)

      // Include the item if its date matches the provided date
      return (short_date === date)
    }

    return false
  })

  const dated = filtered.map((item) => {
    return item
  })

  const sorted = dated.sort((a, b) => b.date - a.date)

  // Sort the filtered collection by the items' full date value
  return sorted
}

const contentByDateString = (collection, format) => {
  const dates = getDates(collection, format)
  const items = new Set()

  dates.forEach((date) => {
    items[date] = getItemsByDate(collection, date, format)
  })

  // Return an object indexed by date strings
  return {...items}
}


// These exports will be used in the addCollection() call in .eleventy.js
exports.contentByMonth = collection => contentByDateString(collection, "YYYY/MM")
exports.contentByYear = collection => contentByDateString(collection, "YYYY")