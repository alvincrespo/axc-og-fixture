# axc-og-fixture

A small [Bridgetown](https://www.bridgetownrb.com/) blog that exists to test the
[`axc-og-cards`](https://github.com/alvincrespo/skills) skill end to end, without
pointing the tests at a real site. It builds and works as a normal site.

## What's in it

Nine posts plus one file with no title, chosen to cover the cases the skill has to handle:

| Post | Why it's there |
|---|---|
| `getting-started-with-static-site-generators`, `why-i-stopped-using-global-state`, `deploying-static-sites-with-github-actions`, `understanding-the-event-loop` | Ordinary posts |
| `debugging-connection-refused-in-docker` | Title with escaped quotes (`\"...\"`); it must not render with backslashes |
| `a-practical-guide-to-maintainable-tests` | A very long title, to check shrinking and wrapping |
| `notes-on-naming-things` | No category, so the card shows only the date |
| `understanding-the-event-loop` | A description that spans lines |
| `code-review-habits` | Front matter `slug:` differs from the file name |
| `a-post-with-a-custom-share-image` | Sets `image:`, so no generated card is wanted |
| `2025-02-01-untitled-notes` | No title in front matter, so the skill skips it |

Every post except the last two has a card in `src/images/og/` and a saved
illustration in `src/images/og/src/`, so tests can exercise skipping, `--regen`
and `--render-only` as well as fresh generation (after deleting the assets).

The saved illustrations are **synthetic placeholders** (`scripts/make-illustrations.mjs`),
not model output, so the fixture costs nothing to keep. The cards were rendered from
them by the skill with `--render-only --backfill`.

`og-cards.config.json` is the skill's config for this site. `fonts/` holds Geist
(SIL Open Font License, see `fonts/OFL.txt`). The spend ledger starts empty.

## Using it

```bash
# from a checkout of alvincrespo/skills
node scripts/e2e/axc-og-cards/run.mjs --run --repo /path/to/axc-og-fixture --cases free
```

Or run the site itself:

```bash
bundle install && npm install
bin/bridgetown start
```

## Changing the fixture

Keep the tests' assumptions true: at least four posts without an `image:`
override (the backfill cases keep the newest three or four), and the newest one
must have a card and a saved illustration. After adding a post, add a placeholder
illustration and render its card:

```bash
node scripts/make-illustrations.mjs <slug>
node path/to/skills/axc-og-cards/scripts/og-cards.mjs --render-only --backfill
```
