const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const draftsDir = path.join(__dirname, "..", "handout-drafts");

const readDraftEntries = () =>
  fs
    .readdirSync(draftsDir)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const inputPath = path.join(draftsDir, filename);
      const { data } = matter(fs.readFileSync(inputPath, "utf8"));

      return {
        inputPath,
        url: data.slug ? `/handout-drafts/${data.slug}/` : null,
        data,
      };
    })
    .filter((draft) => draft.url && draft.data.slug)
    .sort((left, right) => {
      const leftDate = left.data.last_updated || "";
      const rightDate = right.data.last_updated || "";

      if (leftDate !== rightDate) {
        return leftDate.localeCompare(rightDate);
      }

      return (left.data.slug || "").localeCompare(right.data.slug || "");
    });

module.exports = readDraftEntries();
