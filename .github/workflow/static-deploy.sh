name: Deploy to GitHub Pages

on:
  push:
    branches:
      - dev

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install Dependencies
        run: npm install

      - name: Build Next.js App
        run: npm run build

      - name: Copy Files
        run: |
          mkdir -p ${{ github.workspace }}/gh-pages
          cp -R .next ${{ github.workspace }}/gh-pages

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./gh-pages

