module.exports = {
  layout: "handout-draft.njk",
  permalink: (data) => (data.site.noIndexDeploy ? `/handout-drafts/${data.slug}/index.html` : false),
  noIndex: true,
  eleventyExcludeFromCollections: true,
};
