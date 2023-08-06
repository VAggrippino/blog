const dayjs = require('dayjs')

// Get an array of unique dates from the given collection
function getDates( collection, format ) {
    // Use a Set so that the result only contains unique values
    const dates = new Set()

    // Add the posts' dates to the list of dates
    collection.getAll().forEach( (item) => {
        if ( 'date' in item.data &&
            item.data.tags &&
            item.data.tags.includes ( 'post' )
        ) {
            dates.add( dayjs(item.data.date).format(format) )
        }
    } )

    return Array.from(dates)
}

// Get a list of items with a provided date, sorted by the full date value
function getItemsByDate( collection, date, format ) {
    const filtered = collection.getAll().filter( (item) => {
        // If an item has only one tag, the `tags` property may be a string
        // instead of an array. 
        // If the tag list isn't already an array, convert it to one
        const tags = typeof item.data.tags === 'string' ? [item.data.tags] : item.data.tags

        // Only check dated items that are tagged "post"
        if ( tags && tags.includes('post') ) {
            const short_date = dayjs(item.page.date).format(format)

            // Include the item if its date matches the date argument
            return short_date === date
        }

        return false
    })

    const dated = filtered.map( (item) => {
        return item
    })

    const sorted = dated.sort((a, b) => b.date - a.date)

    // Sort the filtered collection by the items' full date value
    return sorted
}

function getContentByDateString(collection, format) {
    const dates = getDates(collection, format)
    const items = new Set()

    dates.forEach((date) => {
        items[date] = getItemsByDate(collection, date, format)
    })

    // Return an object indexed by date strings
    return { ...items }
}

// These exports will be used in the addCollection() call in .eleventy.js
exports.contentByMonth = (collection) => getContentByDateString(collection, 'YYYY/MM')
exports.contentByYear = (collection) => getContentByDateString(collection, 'YYYY')
