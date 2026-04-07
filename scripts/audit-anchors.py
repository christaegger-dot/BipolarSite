#!/usr/bin/env python3
"""
Audit-Script: Tote Anker und defekte interne Links.

Prüft alle href="...#anker"-Links im Build-Output (_site/) gegen die
tatsächlich existierenden id-Attribute auf der jeweiligen Zielseite.

Verwendung:
  npx @11ty/eleventy && python3 scripts/audit-anchors.py

Exit-Code:
  0 = keine Fehler
  1 = mindestens ein toter Anker gefunden
"""

import re
import glob
import sys

BUILD_DIR = "_site"

html_files = glob.glob(f"{BUILD_DIR}/**/*.html", recursive=True)

if not html_files:
    print(f"⚠️  Keine HTML-Dateien in {BUILD_DIR}/ gefunden. Wurde `npm run build` ausgeführt?")
    sys.exit(1)

# Alle IDs pro Seite sammeln
page_ids = {}
for fp in html_files:
    content = open(fp).read()
    ids = set(re.findall(r'\bid=["\']([^"\']+)["\']', content))
    url = fp.replace(BUILD_DIR, "").replace("index.html", "")
    if not url.endswith("/"):
        url += "/"
    page_ids[url] = ids

# Alle Anker-Links prüfen
broken = []
total = 0

for fp in html_files:
    content = open(fp).read()
    source_url = fp.replace(BUILD_DIR, "").replace("index.html", "")
    if not source_url.endswith("/"):
        source_url += "/"
    links = re.findall(r'href=["\']([^"\']+#[^"\']+)["\']', content)

    for link in links:
        if link.startswith(("http", "mailto", "tel")):
            continue
        total += 1
        path, anchor = link.split("#", 1)
        target = path if path.startswith("/") else source_url + path
        if not target.endswith("/"):
            target += "/"
        target_ids = page_ids.get(target)
        if target_ids is None or anchor not in target_ids:
            broken.append((source_url, link, anchor, target, sorted(target_ids or [])[:8]))

print(f"Geprüft: {total} Anker-Links auf {len(html_files)} Seiten")

if not broken:
    print("✅ Keine toten Anker")
    sys.exit(0)

print(f"❌ {len(broken)} Fehler\n")
for src, link, anchor, target, avail in broken:
    print(f"  {src} → {link}")
    print(f"     #{anchor} nicht auf {target}")
    if avail:
        print(f"     Verfügbare IDs: {', '.join(avail[:5])}")
    print()

sys.exit(1)
