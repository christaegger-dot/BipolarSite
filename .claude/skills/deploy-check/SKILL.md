---
name: deploy-check
description: Verify the site builds cleanly and check deployed version matches local. Use before or after deploying.
allowed-tools: Read, Bash(npm *), Bash(git *), WebFetch
---

# Deploy Check — BipolarSite

## Steps

1. Run `npm run build` and verify it completes without errors
2. Check `git status` for uncommitted changes
3. Check if local branch is ahead of remote main
4. If a URL is provided via $ARGUMENTS, fetch it and compare key markers against the local build to verify deployment is current

## What to compare
- Check the built `_site/index.html` for key structural markers (e.g., class names, section IDs)
- Compare against the live site if accessible
- Report: "deployed version matches local" or list specific differences
