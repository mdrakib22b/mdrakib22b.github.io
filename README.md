# Md Rakib, tools for a fabrication shop

Portfolio site for the automation tools I've built as a project coordinator at a heat exchanger and pressure vessel fabricator in Edmonton.

Live at https://mdrakib22b.github.io

## What's here

The main page, `index.html`, is a portfolio you talk to, styled after the AI-chat portfolios made with Fastfolio. Visitors land on a question bar and five topics (Me, Projects, Skills, Lessons, Contact). Asking anything switches to a chat view that answers with a card (a project carousel, skill badges, a contact card and so on) and a short reply typed out word by word. There's no AI service behind it: every answer is written in the page, and typed questions are routed to the closest one by keywords, so it works on GitHub Pages, costs nothing and sends nothing anywhere. If nothing matches, it says so and offers suggestions.

Each answer has its own address, so links like `/#projects`, `/#contact` or `/#printer` open straight to it, and the browser's Back button steps through the conversation. Old section links (`#tools`, `#notes`, `#other`, `#toolbox`) still land on the matching answer.

`Md_Rakib_Resume.pdf` is linked from the top-left pill, the Contact card and the Resume answer. No build step, no framework, no backend. The only outside request is Google Fonts (Geist), and the page still works without it.

`ifc-drawing-packet-printer.html` is a standalone animated walkthrough of how the IFC Drawing packet printer is built, layer by layer with excerpts of its real code. It's linked from that project's card.

`document-follow-up-tracker.html` does the same for the Document follow-up tracker, linked the same way.

`page-transition.js` plays the transition between pages: a jagged marker scribble paints the screen, then a second one wipes it away to reveal the next page. Every page loads it with `<script src="page-transition.js"></script>` straight after `<body>`, so add that line to any new page. It skips links within a page, new-tab links and the PDF, and turns off when the visitor's system asks for reduced motion.

## Editing

Everything the page says lives at the top of the script in `index.html`:

- `SITE`: name, role, location, LinkedIn and resume links. Set `avatar` to an image path (a square memoji or photo) to replace the MR monogram.
- `PROJECTS`: one entry per project card, with its colour, headline number (`big` plus `stat`), stack, problem, steps, results and links, plus an optional `walkthrough` page. `keys` are the words that route a typed question to that project.
- `SKILLS` and `LESSONS`: the Skills and Lessons cards.
- `TOPICS`: the five topic buttons and the question each one asks. `MORE`: the questions in the "More" drawer.
- `ANSWERS`: every reply. Each has `keys` (words or phrases that point a typed question at it), a weight `w` (a specific tool beats a general topic), the `card` shown above it and the reply `text`. To teach the page a new question, add an entry here, then try a few phrasings of it.

To update the resume, replace `Md_Rakib_Resume.pdf` with a file of the same name. If the size changes much, update `SITE.resumeNote`.

## Deploying on GitHub Pages

1. Create a public repository named `mdrakib22b.github.io`.
2. Add `index.html` and this README to the root and push to `main`.
3. In the repository, open Settings, then Pages. Set the source to deploy from the `main` branch, root folder.
4. The site is live at https://mdrakib22b.github.io within a minute or two.

## Before every publish

Every name, job number and figure on the site is fictional. Keep it that way. Before pushing, search the file for employer, client and colleague names, real job numbers, internal paths and dollar values, and remove anything that turns up.
