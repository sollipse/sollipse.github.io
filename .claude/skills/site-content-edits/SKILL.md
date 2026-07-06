---
name: site-content-edits
description: Read before adding, replacing, or relocating any visible content (quotes, copy, sections) on this site — placement rules, full-page context, and how to verify a Pages deploy without false positives.
---

# Editing visible content on this site

## Map the whole page before placing anything

`index.html` is one page with named sections, in order:

- **HERO** — eyebrow (`BUILDER`), name, tagline + org line. No quotes here.
- **01 ABOUT** — lede copy + portrait
- **02 WORK** — timeline groups per org
- **03 PRINCIPLE** — a single big display `blockquote.quote` with `cite.quote-cite`.
  **This is the quote slot.** When the user talks about "the quote", "a hero
  quote", or "a quote like the current one," they mean THIS section — swap its
  contents in place; do not invent a new quote element elsewhere.
- **04 CONTACT** — email + links
- **footer** — copyright + audio credit

Before adding or moving content: Read all of `index.html` (~270 lines), and
grep for any name/phrase the user mentions (`grep -in 'shannon' index.html`).
If they reference something "in the same vein as X," X is almost certainly
already on the page — find it first; the request is probably a replacement.

Hard lesson (2026-07): the user asked for "hero quotes in the same vein as
Claude Shannon." The Shannon quote lived in 03 PRINCIPLE; a new quote got
added under the hero tagline instead, and the user saw no change where they
were looking. Cost three round trips to fix.

## Screenshot below the fold

The hero fills the first viewport. A screenshot of the top of the page proves
nothing about ABOUT/WORK/PRINCIPLE/CONTACT. When verifying content changes,
scroll to the touched section (`locator('#principle-h').scrollIntoViewIfNeeded()`
with `?still`) or capture a full-page screenshot.

## Verifying a GitHub Pages deploy

Prod is https://sollipse.github.io (no CNAME). After `git push`, the Pages
build takes ~30–90s, then edge/browser caches hold up to 10 min
(`cache-control: max-age=600`). Users may see stale content that long —
suggest a hard refresh before debugging.

When polling prod for a deploy, **test for the disappearance of the OLD
content, not the presence of the new string.** The old deploy may already
contain your new string somewhere else (that's how the false "deploy
confirmed" happened):

```bash
# good: old content gone
until ! curl -s "https://sollipse.github.io/?cb=$(date +%s)" | grep -qi 'OLD UNIQUE STRING'; do sleep 15; done
```

Also note: `grep -c` finding 0 matches exits 1 — don't read a background
task's "failed" status as a failed deploy; read the actual output.
