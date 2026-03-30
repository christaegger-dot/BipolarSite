# Claude Code – Projektkonventionen

## Branch-Naming

Branch-Namen immer mit Timestamp enden lassen, um doppelte Namen zu vermeiden:

```
claude/<beschreibung>-$(date +%s)
```

Beispiel: `claude/fix-notfallkarte-1741553200`

GitHub erlaubt keine zweite PR vom selben Branch-Namen nach einem Merge.
Einzigartige Namen verhindern dieses Problem.
