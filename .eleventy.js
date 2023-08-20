const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const dayjs = require('dayjs')
const lodashChunk = require('lodash.chunk')
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

module.exports = function (eleventyConfig) {
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

    eleventyConfig.addShortcode('formatted_date', function (date) {
        return dayjs(date).format('Do MMMM YYYY - dddd')
    })

    // Don't support layouts without extensions
    eleventyConfig.setLayoutResolution(false)

    // Posts imported from WordPress had the "post" layout
    eleventyConfig.addLayoutAlias('post', 'post.njk')

    // Given a YYYY/MM, return a human-friendly month (e.g. January 2023)
    eleventyConfig.addFilter('plainEnglishMonth', (formatted_month) => {
        return dayjs(formatted_month).format('MMMM YYYY')
    })

    // Original version of this code can be found at
    // https://github.com/11ty/eleventy/issues/332#issuecomment-445236776
    eleventyConfig.addCollection('doublePagination', function(collection) {
        // Get unique list of tags
        // Iterate over all input items and add each items' tags to the set
        const tagSet = new Set()
        collection.getAllSorted().map( function(item) {
            if ( 'tags' in item.data ) {
                // If an item has only one tag set, item.data.tags may be a string instead of an array
                // Convert an item.data.tags string into an array or just use it if it's already an array
                const tags = typeof item.data.tags === 'string' ? [item.data.tags] : item.data.tags



                // Add the item's tags to the set if it has been published
                if ( item.data.published ) {
                    // Exclude the generic "post" tag
                    const filtered = tags.filter(tag => tag !== 'post')
                    filtered.forEach(tag => tagSet.add(tag))
                }
            }
        })

        // Get each item that matches the tag
        const pagination_size = 2
        const tagMap = []
        const tagArray = [...tagSet]

        tagArray.forEach((tag) => {
            const items = collection.getFilteredByTag(tag)
            const pages = lodashChunk(items, pagination_size)

            for ( let page = 0, max = pages.length; page < max; page++ ) {
                const data = pages[page]
                tagMap.push({ tag, page, data })
            }
        })

        return tagMap
    })

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
