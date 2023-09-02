// @ts-check
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const dayjs = require('dayjs')
const lodashChunk = require('lodash.chunk')
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

/**
 * Each item in the returned array identifies a tag in use and how many
 * published posts use that tag.
 * Posts with only the "post" tag will be counted in an "Uncategorized" tag.
 *
 * @returns {Array.<{tag: string, count: number}>}
 * @param {Object} collection
 */
function tags_used (collection) {
    const post_counts = { "Uncategorized": 0 }

    collection.getAllSorted().forEach(function (item) {
        if ('tags' in item.data) {
            /**
             * If an item has only one tag set, item.data.tags may be a string
             * instead of an array. Convert an item.data.tags string into an
             * array or just use it if it's already an array
             * @type {Array.<string>}
             */
            const tags = typeof item.data.tags === 'string' ? [item.data.tags] : item.data.tags

            // Add the item's tags to the set if it has been published
            if ('published' in item.data && item.data.published) {
                // If this item only has the "post" tag, count it in the
                // "Uncategorized" tag
                if (tags.length === 1 && tags[0] === 'post') {
                    post_counts["Uncategorized"] += 1
                } else {
                    // Exclude the generic "post" tag
                    const filtered = tags.filter(tag => tag !== 'post')
                    filtered.forEach((tag) => {
                        post_counts[tag] = post_counts[tag] ? post_counts[tag] + 1 : 1
                    })
                }
            }
        }
    })

    return Object.keys(post_counts).map((tag) => {
        return {
            "tag": tag,
            "count": post_counts[tag],
        }
    }).sort((a, b) => b.count - a.count)
}

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight)

    // Copy the wp-content folder from the exported WordPress site
    eleventyConfig.addPassthroughCopy('wp-content')

    // Copy the CSS
    eleventyConfig.addPassthroughCopy('css')

    // Add collections that allow groupings by year/month and year
    eleventyConfig.addCollection('contentByMonth', require('./_utils/collections/contentByDate').contentByMonth)
    eleventyConfig.addCollection('contentByYear', require('./_utils/collections/contentByDate').contentByYear)

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

    // Generates a collection from the tags_used function return value
    eleventyConfig.addCollection('tags_used', tags_used)

    /**
     * Generates a list of tag pages. Each item in the list identifies its tag,
     * page number relative to that tag, and collection item data (as an array
     * of items)
     */
    eleventyConfig.addCollection('paginated_tags', function(collection) {
        const pagination_size = 2
        const tag_pages = []
        const tags = tags_used(collection).map(tag_object => tag_object.tag)

        tags.forEach((tag) => {
            const items = collection.getFilteredByTag(tag).reverse()
            const published_items = items.filter(item => item.data.published)
            const page_chunks = lodashChunk(published_items, pagination_size)

            for ( let page = 0; page < page_chunks.length; page++ ) {
                const data = page_chunks[page]
                tag_pages.push({ tag, page, data })
            }
        })

        return tag_pages
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
