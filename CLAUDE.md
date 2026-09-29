# CLAUDE.md

A small Bridgetown blog (Liquid templates, esbuild for the frontend).

## Commands

- `bin/bridgetown start`: dev server
- `bin/bridgetown build`: build to `output/`
- `npm run esbuild`: build the frontend assets

## Layout

- `src/_posts/`: posts (Markdown, `YYYY-MM-DD-title.md`, front matter with `title`, `category`, `date`, `description`)
- `src/_data/categories.yml`: category keys and display names
- `src/_components/head.liquid`: page title, description and social card tags. A post's share image is its front-matter `image:`, else its card in `src/images/og/` if listed in `src/_data/og_cards.yml`, else `og-default.jpg`.
- `src/images/og/`: generated social cards; `src/images/og/src/` holds the saved illustrations they're built from (kept out of the built site by `config.exclude`)
- `og-cards.config.json`: settings for the card generator (paths, fonts, brand, budget)
- `scripts/og-cards.ledger.json`: record of what card generation has cost
