# Md Rakib, tools for a fabrication shop

Portfolio site for the automation tools I've built as a project coordinator at a heat exchanger and pressure vessel fabricator in Edmonton.

Live at https://mdrakib22b.github.io

## What's here

One page, `index.html`, plus `Md_Rakib_Resume.pdf`, which the Resume menu in the header and the footer link to. No build step, no framework, no backend. The only outside request is Google Fonts, and the page still works without it.

The demos run in the browser on made-up data:

- **Drawing packet printer.** Four sample emails, including the cases it refuses or prints partially.
- **Document follow-up.** Move the review limits and the follow-up list and email drafts rebuild.
- **Overtime costing.** Toggle shifts and headcount and the approval email and client split update. Compare against the old spreadsheet's split.
- **Tube sample check.** A 10% sample on a tubesheet layout, plus a check that rejects locations that can't exist.

## Editing

Tool write-ups live in the `TOOLS` array at the top of the script in `index.html`. Each entry has a name, summary, status, stack, problem, what was built, steps, results and links. The filter chips are generated from the `stack` values.

To update the resume, replace `Md_Rakib_Resume.pdf` with a file of the same name. If the size changes much, update the "PDF, 285 KB" note in the Resume menu.

## Deploying on GitHub Pages

1. Create a public repository named `mdrakib22b.github.io`.
2. Add `index.html` and this README to the root and push to `main`.
3. In the repository, open Settings, then Pages. Set the source to deploy from the `main` branch, root folder.
4. The site is live at https://mdrakib22b.github.io within a minute or two.

## Before every publish

Every name, job number and figure in the demos is fictional. Keep it that way. Before pushing, search the file for employer, client and colleague names, real job numbers, internal paths and dollar values, and remove anything that turns up.
