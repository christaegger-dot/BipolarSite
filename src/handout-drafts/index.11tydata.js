module.exports = {
  permalink: (data) => (data.site.noIndexDeploy ? "/handout-drafts/index.html" : false),
  noIndex: true,
  eleventyExcludeFromCollections: true,
};
