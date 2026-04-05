module.exports = function (eleventyConfig) {
  const handoutPreviewRoot = "../../";

  // Passthrough copy — static assets
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/handouts");
  eleventyConfig.addPassthroughCopy("src/downloads");
  eleventyConfig.addPassthroughCopy("src/visuals");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/favicon.png");
  eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("src/og-image.png");

  eleventyConfig.addPassthroughCopy("src/sw.js");

  // Layouts directory alias
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("module", "module.njk");
  eleventyConfig.addLayoutAlias("tool", "tool.njk");

  eleventyConfig.addFilter("stripFirstH1", (html = "") =>
    html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, "")
  );

  eleventyConfig.addFilter("previewRelativeUrl", (value = "") => {
    if (!value || /^([a-z]+:)?\/\//i.test(value) || value.startsWith("#")) {
      return value;
    }

    if (value.startsWith("/")) {
      return `${handoutPreviewRoot}${value.slice(1)}`;
    }

    return value;
  });

  eleventyConfig.addFilter("previewRelativeHtml", (html = "") =>
    html.replace(/\b(href|src)="\/(?!\/)/g, `$1="${handoutPreviewRoot}`)
  );

  eleventyConfig.addFilter("formatSwissDate", (value = "") => {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }

    const date = new Date(`${value}T00:00:00`);

    return new Intl.DateTimeFormat("de-CH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
