# Pritish Ali — Portfolio

A React + Framer Motion portfolio with no build step. You don't need Node, npm or a terminal: edit a file, then redeploy the folder.

## Files

| File | What it is |
|---|---|
| `js/content.js` | **All the text on the site.** Edit this one to update your portfolio. |
| `css/styles.css` | Colours, fonts, spacing. The colour palette is at the top. |
| `js/app.js` | Layout, components and animations (React + Framer Motion). |
| `index.html` | Page shell, SEO title/description, library imports. |

## Common updates (all in `js/content.js`)

- **New project:** copy one `{ ... }` block in `projects`, paste it below, change the text. Add a `link` to show a "View project" button.
- **Paper accepted:** in `publications`, change `status: "review"` to `status: "published"` and add the `doi`.
- **New job:** add a block at the top of `experience`, give it `current: true`, and remove `current` from the old one.
- **Stop taking projects:** set `available: false` in `profile`.
- **CV download button:** put your PDF in this folder (e.g. `PritishAli_CV.pdf`) and set `cvFile: "PritishAli_CV.pdf"`.
- **Skills:** edit `skills`. They also feed the scrolling ticker.

Keep the quotes `"..."` and commas between items. If the page shows only a spinner after an edit, a quote or comma is usually missing.

## Preview on your computer

Opening `index.html` by double-clicking won't work, because browsers block modules from `file://`. Either:
- run `npx serve .` in this folder (needs Node), or
- in VS Code, install the **Live Server** extension and click "Go Live".

## Update the live site (auto-deploy)

This folder is connected to GitHub (`PritishAli/pritish-ali-portfolio`), and Vercel watches it. Every push to `main` updates https://pritish-ali.vercel.app in about 30 seconds.

First time on your computer (needs Git installed):

```
cd D:\CV
git clone https://github.com/PritishAli/pritish-ali-portfolio portfolio-git
```

Then, every time you change something:

```
cd D:\CV\portfolio-git
git add -A
git commit -m "Update projects"
git push
```

No Git? On github.com, open the repo, click a file (e.g. `js/content.js`), click the pencil icon, edit, and press **Commit changes**. That deploys too.

## Contact form

The form sends to your email through [FormSubmit](https://formsubmit.co) (free, no account needed). **The first submission sends you an activation email — click the link in it once**, and every inquiry after that arrives in your inbox. Change the address in `inquiry.formEmail`.

## What's on the page

- **Hero console:** a live demo window with four tabs (LLM assistant, vision system, web platform, forecast model). It cycles on its own until someone hovers over it. "Build this with me" scrolls to the form and pre-selects that project type. Edit the tab names and captions in `consoleTabs` in `content.js`.
- **Lighting:** slow-drifting aurora colour behind everything, a soft light that follows the cursor, and glass cards with gradient edges. Colours are the variables at the top of `styles.css`.
- **Motion (Framer Motion):** the name rises in letter by letter. Buttons pull slightly toward the cursor, and a gradient bar shows how far you've scrolled. The nav hides on scroll down and comes back on scroll up. Stats count up, cards get a spotlight on hover, projects open and close, and the experience timeline fills as you scroll.
- **Mobile:** single-column layout, a full-screen menu, full-width buttons, and the console sized for phones.
- All motion respects the visitor's "reduce motion" setting.
