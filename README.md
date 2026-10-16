# Md Rakib, tools for a fabrication shop

Portfolio site for the automation tools I've built as a project coordinator at a heat exchanger and pressure vessel fabricator in Edmonton.

Live at https://mdrakib22b.github.io

## What's here

The main page, `index.html`, plus `Md_Rakib_Resume.pdf`, which the Resume menu in the header and the footer link to. No build step, no framework, no backend. The only outside request is Google Fonts, and the page still works without it.

`ifc-drawing-packet-printer.html` is a standalone animated walkthrough of how the IFC Drawing packet printer is built, layer by layer with excerpts of its real code. It's linked from the IFC Drawing packet printer's entry in the tools list, under How it works.

`document-follow-up-tracker.html` does the same for the Document follow-up tracker, linked the same way.

## Editing

Tool write-ups live in the `TOOLS` array at the top of the script in `index.html`. Each entry has a name, a one-line summary, a `stat` (the headline number shown on the collapsed row), the stack, the problem, steps, results and links, plus an optional `walkthrough` page shown under the steps. Keep each field short: the collapsed rows are what most visitors read.

To update the resume, replace `Md_Rakib_Resume.pdf` with a file of the same name. If the size changes much, update the "PDF, 285 KB" note in the Resume menu.

## Deploying on GitHub Pages

1. Create a public repository named `mdrakib22b.github.io`.
2. Add `index.html` and this README to the root and push to `main`.
3. In the repository, open Settings, then Pages. Set the source to deploy from the `main` branch, root folder.
4. The site is live at https://mdrakib22b.github.io within a minute or two.

## Before every publish

Every name, job number and figure on the site is fictional. Keep it that way. Before pushing, search the file for employer, client and colleague names, real job numbers, internal paths and dollar values, and remove anything that turns up.
