const Image = require("@11ty/eleventy-img");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

module.exports = function (eleventyConfig) {
  const handoutPreviewRoot = "../../";
  const gitDateCache = new Map();

  const resolveInputPath = (inputPath = "") => {
    if (!inputPath) return null;
    return path.isAbsolute(inputPath)
      ? inputPath
      : path.resolve(process.cwd(), inputPath.replace(/^\.\//, ""));
  };

  const readPageLastModified = (inputPath = "", fallback = "") => {
    const resolvedPath = resolveInputPath(inputPath);
    if (!resolvedPath) return fallback;
    if (gitDateCache.has(resolvedPath)) return gitDateCache.get(resolvedPath);

    let value = fallback;

    try {
      const relativePath = path.relative(process.cwd(), resolvedPath);
      const gitDate = execFileSync("git", ["log", "-1", "--format=%cs", "--", relativePath], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      if (gitDate) value = gitDate;
    } catch {}

    if ((!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) && fs.existsSync(resolvedPath)) {
      value = fs.statSync(resolvedPath).mtime.toISOString().slice(0, 10);
    }

    gitDateCache.set(resolvedPath, value);
    return value;
  };

  // P3 Audit: Bild-Optimierung — WebP/AVIF + responsive srcset
  // Nunjucks-Shortcode für alle Bilder: generiert <picture> mit AVIF, WebP und JPEG
  // Hero-Verwendung:  {% heroImage "/visuals/bild.webp", "Alt-Text", "eager", "high" %}
  // Modul-Verwendung: {% heroImage "/visuals/bild.webp", "Alt-Text", "lazy", "", "(max-width: 860px) 100vw, 600px" %}
  eleventyConfig.addNunjucksAsyncShortcode("heroImage", async function (src, alt, loading = "lazy", fetchpriority = "", sizes = "(max-width: 860px) 100vw, 50vw") {
    if (!src) return "";
    const inputPath = path.join("src", src);
    const options = {
      widths: [400, 800, 1200, null],
      formats: ["avif", "webp", "jpeg"],
      outputDir: "./_site/img/",
      urlPath: "/img/",
      svgShortCircuit: true,
      sharpAvifOptions: { quality: 65 },
      sharpWebpOptions: { quality: 80 },
      sharpJpegOptions: { quality: 82, progressive: true },
    };
    const metadata = await Image(inputPath, options);
    const attrs = {
      alt: alt || "",
      sizes: sizes,
      loading: loading,
      decoding: "async",
    };
    if (fetchpriority) attrs.fetchpriority = fetchpriority;
    return Image.generateHTML(metadata, attrs, { whitespaceMode: "inline" });
  });

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
  eleventyConfig.addPassthroughCopy("src/icon-192.png");
  eleventyConfig.addPassthroughCopy("src/icon-512.png");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/og-image.png");

  // Layouts directory alias
  eleventyConfig.addLayoutAlias("base", "base.njk");

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

  eleventyConfig.addFilter("pageLastModified", (inputPath = "", fallback = "") =>
    readPageLastModified(inputPath, fallback)
  );

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
