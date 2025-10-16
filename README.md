# GitHub User Creation Date Fetcher (Bootstrap + GitHub Pages)

A small, modern static website that exposes a Bootstrap-based page to fetch a GitHub username and display the account creation date in UTC (YYYY-MM-DD UTC). The page supports an optional ?token= query parameter to authenticate requests to the GitHub API and increase rate limits when needed.

## Project summary
- Lightweight, dependency-free (aside from Bootstrap CDN) static site ready for GitHub Pages.
- Clean separation of concerns with HTML, CSS, and JavaScript in a small set of files.
- Serverless in nature – performs client-side fetches directly to the GitHub REST API.

## Files included
- index.html: The homepage with a Bootstrap layout and the form that fetches data.
- assets/css/styles.css: Minimal styling to improve aesthetics and readability.
- assets/js/main.js: Core logic to resolve the dynamic form id, extract the username, read an optional token from the URL, call the GitHub API, and render the creation date as YYYY-MM-DD UTC in #github-created-at.
- README.md: This file.

## How to deploy on GitHub Pages
1. Create a new repository on GitHub. You can choose a user site (username.github.io) or a project site (username.github.io/repo).
   - For a user site, the repository name must be username.github.io and you can serve from the repository root.
   - For a project site, the repository name can be anything and you enable Pages to serve from the main (or gh-pages) branch.
2. Push the repository contents (index.html, assets/, README.md, etc.) to your chosen repository.
3. In GitHub, open Settings > Pages.
   - Source: Main branch (root) for a project site, or your preferred branch/folder as needed.
   - Save and wait a few moments for GitHub to publish the site.
4. Visit the published URL (e.g., https://<your-username>.github.io/<repo>/).

Optional: If you want to increase GitHub API rate limits, provide a personal access token via a query parameter: ?token=YOUR_TOKEN
- Example: https://<your-username>.github.io/<repo>/?token=ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
- The token is sent as an Authorization: token <token> header to the API call.

## How to use
- Enter any GitHub username (e.g., octocat) in the input field and click Fetch User.
- The page will call the GitHub REST API and display the account creation date in UTC, formatted as YYYY-MM-DD UTC, inside the badge labeled Created at.
- If a token is provided, requests will be authenticated to improve rate limits.

## Key code/files and their purpose
- index.html: Structure, Bootstrap layout, and the placeholder form with id github-user-PLACEHOLDER. The script renames it to a seed-based id at runtime to ensure uniqueness.
- assets/css/styles.css: Visual styling for a clean, modern look that remains responsive across devices.
- assets/js/main.js: Logic to:
  - Generate a seed-based dynamic form id (github-user-<seed>).
  - Read the user input and the optional ?token= query parameter.
  - Fetch data from https://api.github.com/users/{username} with optional Authorization header.
  - Display the creation date as YYYY-MM-DD UTC in #github-created-at.
- README.md: Documentation, setup, usage, and licensing.

## License
MIT

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
