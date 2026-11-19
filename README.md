# hampternom-docs

The setup guides for docs.hampternom.nl, built with VitePress. Styled to match hampternom.nl.

## Run it

```
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to docs/.vitepress/dist/
```

## Where things live

- `docs/getting-started`, `bots`, `panel`, `websites`, `help`: guides for hampternom customers.
- `docs/self-hosting`: guides for running your own VPS.
- The file path is the URL: `docs/bots/upload.md` is `/bots/upload`.
- `docs/index.md`: the home page with the guide cards.
- `docs/.vitepress/config.mts`: sidebar, top navigation and links.
- `docs/.vitepress/theme/custom.css`: colours, font and square corners.

To add a guide, create the `.md` file and add it to the sidebar in `config.mts`.
