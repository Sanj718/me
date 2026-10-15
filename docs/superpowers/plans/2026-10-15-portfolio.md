# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio for Sanjar Sobirjonov using only Polaris 2.0 RC web components, deployable to GitHub Pages at `sanjar.dev`.

**Architecture:** Static `index.html` holds all content as real markup (works without JS). A small classic-script `app.js` adds project search/tag filtering and a light/dark toggle. `style.css` holds minimal overrides. No build step; opens directly via `file://`.

**Tech Stack:** HTML, vanilla JS (classic script), Polaris web components `polaris-2.0-rc.js`.

**Spec:** `docs/superpowers/specs/2026-10-15-portfolio-design.md`

## Global Constraints

- Polaris script URL is exactly `https://cdn.shopify.com/shopifycloud/polaris-2.0-rc.js`, referenced in exactly one place (`index.html` head).
- No App Bridge script, no `shopify-api-key` meta tag.
- No framework, no build step, no ES modules, no `fetch` of local files (must work on `file://`).
- Polaris components and tokens only; `style.css` is overrides only (page background, column width).
- Files: `index.html`, `app.js`, `style.css`, `CNAME` (`sanjar.dev`), `.nojekyll`.
- Light/dark defaults to the system setting.
- Never invent biography facts. Anything not sourced from the user or GitHub carries a `<!-- REVIEW -->` comment.
- Every outward-facing step (push, enabling Pages, touching the old repo, DNS) requires explicit user confirmation.

## Review Focus

- JS disabled or `app.js` fails: all projects, the experience table and contact links remain visible and readable.
- Search matching nothing: an empty-state message is shown, not a blank grid.
- Search + tag filter combined: both must apply (AND), and clearing either restores results.
- Narrow phone width (~375px): no horizontal scroll; project cards stack to one column.
- Modal opened by keyboard: focus moves into it, Esc closes it, focus returns to the card.

---

### Task 1: Scaffold, header, status banner

**Files:**
- Create: `index.html`, `style.css`, `CNAME`, `.nojekyll`
- Modify: `docs/superpowers/specs/2026-10-15-portfolio-design.md` (content lives in HTML, not JS arrays)

**Interfaces:**
- Produces: element ids `#projects`, `#experience`, `#contact` as section anchors; `<script src="app.js">` at end of body; `<s-switch id="theme-toggle">` placeholder wired in Task 3.

- [ ] **Step 1: Create static support files**

```bash
cd /Users/sanjar/Documents/my-site
printf 'sanjar.dev\n' > CNAME
: > .nojekyll
```

- [ ] **Step 2: Create `style.css`**

```css
body {
  margin: 0;
  background: var(--p-color-bg, #f1f1f1);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}
main {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px 64px;
}
```

- [ ] **Step 3: Create `index.html` with header and banner**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sanjar Sobirjonov — Developer</title>
  <meta name="description" content="Sanjar Sobirjonov, Shopify / JS developer in Ottawa, Canada.">
  <link rel="stylesheet" href="style.css">
  <!-- Single place the Polaris version is set. Swap for polaris-2.js when 2.0 is stable. -->
  <script src="https://cdn.shopify.com/shopifycloud/polaris-2.0-rc.js"></script>
</head>
<body>
<main>
  <s-stack gap="large">

    <s-stack direction="inline" gap="base" alignItems="center" justifyContent="space-between">
      <s-stack direction="inline" gap="base" alignItems="center">
        <s-avatar initials="SS" size="large" alt="Sanjar Sobirjonov"></s-avatar>
        <s-stack gap="small-300">
          <s-heading>Sanjar Sobirjonov</s-heading>
          <s-text color="subdued">Shopify / JS developer</s-text>
        </s-stack>
      </s-stack>
      <s-switch id="theme-toggle" label="Dark mode"></s-switch>
    </s-stack>

    <s-stack direction="inline" gap="small">
      <s-badge>Ottawa, Canada</s-badge>
      <s-badge tone="success">Working at Polaris</s-badge>
    </s-stack>

    <s-banner heading="Currently building on Shopify" tone="info">
      <!-- REVIEW: replace with what you want to say right now -->
      Shopify apps, Functions and storefront tooling in TypeScript and JavaScript.
    </s-banner>

    <s-stack direction="inline" gap="small">
      <s-button href="#projects">Projects</s-button>
      <s-button href="#experience">Experience</s-button>
      <s-button href="#contact" variant="primary">Contact</s-button>
    </s-stack>

    <!-- Tasks 2 and 4 add #projects, #experience, #contact here -->

  </s-stack>
</main>
<script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 4: Create empty `app.js` so the page has no 404**

```js
// Filled in Task 3.
```

- [ ] **Step 5: Amend the spec**

In `docs/superpowers/specs/2026-10-15-portfolio-design.md`, replace the line
`app.js       # project/experience data arrays at top; filter + modal logic`
with
`app.js       # filter, search and theme-toggle logic only (content lives in index.html)`
and replace the Content paragraph sentence "All content lives in the data arrays in `app.js` so edits are trivial." with "All content lives as plain markup in `index.html` so it works without JS."

- [ ] **Step 6: Verify in browser**

Run: `open /Users/sanjar/Documents/my-site/index.html`
Expected: header with avatar, name, two badges, info banner, three buttons, styled by Polaris (not unstyled text). Console has no errors other than possibly a missing favicon. If any component renders unstyled, check its attribute names against the 2.0 RC docs and fix before continuing.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: scaffold page with header and status banner

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Projects grid and detail modals

**Files:**
- Modify: `index.html` (replace the `<!-- Tasks 2 and 4 ... -->` comment's projects part)

**Interfaces:**
- Consumes: `<main>` / `<s-stack gap="large">` from Task 1.
- Produces: each project card is `<s-clickable class="project" data-tags="space separated lowercase tags" data-title="lowercase title" commandFor="modal-<slug>" command="--show">`; the tag filter container is `<div id="tag-filters">` holding `<s-clickable-chip data-tag="<tag>">`; search input is `<s-search-field id="project-search">`; empty state is `<s-banner id="no-results" hidden>`. Task 3 relies on these exact names.

- [ ] **Step 1: Add the Projects section**

Insert in `index.html` where the comment sits, above the Task 4 placeholder:

```html
    <s-section id="projects" heading="Projects">
      <s-stack gap="base">

        <s-search-field id="project-search" label="Search projects" labelAccessibilityVisibility="exclusive" placeholder="Search projects"></s-search-field>

        <div id="tag-filters">
          <s-stack direction="inline" gap="small">
            <s-clickable-chip data-tag="all" accessibilityLabel="Show all projects">All</s-clickable-chip>
            <s-clickable-chip data-tag="shopify" accessibilityLabel="Filter: Shopify">Shopify</s-clickable-chip>
            <s-clickable-chip data-tag="js" accessibilityLabel="Filter: JavaScript">JavaScript</s-clickable-chip>
            <s-clickable-chip data-tag="typescript" accessibilityLabel="Filter: TypeScript">TypeScript</s-clickable-chip>
            <s-clickable-chip data-tag="liquid" accessibilityLabel="Filter: Liquid">Liquid</s-clickable-chip>
          </s-stack>
        </div>

        <s-banner id="no-results" tone="warning" hidden>No projects match. Try clearing the search or filter.</s-banner>

        <!-- REVIEW: descriptions below use only what GitHub states; please edit -->
        <s-grid gridTemplateColumns="repeat(auto-fill, minmax(260px, 1fr))" gap="base">

          <s-clickable class="project" data-tags="shopify js" data-title="shopify minicart js" commandFor="modal-minicart" command="--show" accessibilityLabel="Open Shopify MiniCart JS details">
            <s-box padding="base" border="base" borderRadius="base">
              <s-stack gap="small">
                <s-heading>Shopify MiniCart JS</s-heading>
                <s-text>Shorthand code for fast Shopify mini cart integration, with a customizable slider.</s-text>
                <s-stack direction="inline" gap="small"><s-badge>JavaScript</s-badge><s-badge>Shopify</s-badge></s-stack>
              </s-stack>
            </s-box>
          </s-clickable>

          <s-clickable class="project" data-tags="shopify typescript" data-title="section conditions" commandFor="modal-section-conditions" command="--show" accessibilityLabel="Open Section Conditions details">
            <s-box padding="base" border="base" borderRadius="base">
              <s-stack gap="small">
                <s-heading>Section Conditions</s-heading>
                <s-text>Shopify project written in TypeScript.</s-text>
                <s-stack direction="inline" gap="small"><s-badge>TypeScript</s-badge><s-badge>Shopify</s-badge></s-stack>
              </s-stack>
            </s-box>
          </s-clickable>

          <s-clickable class="project" data-tags="shopify liquid" data-title="minica" commandFor="modal-minica" command="--show" accessibilityLabel="Open Minica details">
            <s-box padding="base" border="base" borderRadius="base">
              <s-stack gap="small">
                <s-heading>Minica</s-heading>
                <s-text>Liquid-based Shopify project.</s-text>
                <s-stack direction="inline" gap="small"><s-badge>Liquid</s-badge><s-badge>Shopify</s-badge></s-stack>
              </s-stack>
            </s-box>
          </s-clickable>

          <s-clickable class="project" data-tags="shopify js" data-title="functions hub" commandFor="modal-functions-hub" command="--show" accessibilityLabel="Open Functions Hub details">
            <s-box padding="base" border="base" borderRadius="base">
              <s-stack gap="small">
                <s-heading>Functions Hub</s-heading>
                <s-text>Shopify Functions collection.</s-text>
                <s-stack direction="inline" gap="small"><s-badge>Shopify</s-badge></s-stack>
              </s-stack>
            </s-box>
          </s-clickable>

          <s-clickable class="project" data-tags="js" data-title="avex next" commandFor="modal-avex" command="--show" accessibilityLabel="Open Avex Next details">
            <s-box padding="base" border="base" borderRadius="base">
              <s-stack gap="small">
                <s-heading>Avex Next</s-heading>
                <s-text>Built with Next.js and Contentful, hosted on Netlify.</s-text>
                <s-stack direction="inline" gap="small"><s-badge>JavaScript</s-badge></s-stack>
              </s-stack>
            </s-box>
          </s-clickable>

        </s-grid>
      </s-stack>
    </s-section>

    <s-modal id="modal-minicart" heading="Shopify MiniCart JS">
      <s-paragraph>Shorthand code for fast Shopify mini cart integration. Provides a slider mini cart that is fully customizable.</s-paragraph>
      <s-button slot="secondary-actions" commandFor="modal-minicart" command="--hide">Close</s-button>
      <s-button slot="primary-action" variant="primary" href="https://github.com/Sanj718/Shopify-MinicartJS" target="_blank">View on GitHub</s-button>
    </s-modal>

    <s-modal id="modal-section-conditions" heading="Section Conditions">
      <s-paragraph>Shopify project written in TypeScript.</s-paragraph>
      <s-button slot="secondary-actions" commandFor="modal-section-conditions" command="--hide">Close</s-button>
      <s-button slot="primary-action" variant="primary" href="https://github.com/Sanj718/section-conditions" target="_blank">View on GitHub</s-button>
    </s-modal>

    <s-modal id="modal-minica" heading="Minica">
      <s-paragraph>Liquid-based Shopify project.</s-paragraph>
      <s-button slot="secondary-actions" commandFor="modal-minica" command="--hide">Close</s-button>
      <s-button slot="primary-action" variant="primary" href="https://github.com/Sanj718/minica" target="_blank">View on GitHub</s-button>
    </s-modal>

    <s-modal id="modal-functions-hub" heading="Functions Hub">
      <s-paragraph>Shopify Functions collection.</s-paragraph>
      <s-button slot="secondary-actions" commandFor="modal-functions-hub" command="--hide">Close</s-button>
      <s-button slot="primary-action" variant="primary" href="https://github.com/Sanj718/functions-hub" target="_blank">View on GitHub</s-button>
    </s-modal>

    <s-modal id="modal-avex" heading="Avex Next">
      <s-paragraph>Built with Next.js and Contentful, hosted on Netlify.</s-paragraph>
      <s-button slot="secondary-actions" commandFor="modal-avex" command="--hide">Close</s-button>
      <s-button slot="primary-action" variant="primary" href="https://github.com/Sanj718/avex-next" target="_blank">View on GitHub</s-button>
    </s-modal>
```

- [ ] **Step 2: Verify**

Reload `index.html` from disk.
Expected: five cards in a responsive grid; clicking a card opens its modal; "Close" closes it; Esc closes it; "View on GitHub" opens the repo in a new tab. If `commandFor`/`command` does not open the modal in the RC, check the RC docs for the modal show/hide mechanism and fix across all five cards.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: projects grid with detail modals

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Search, tag filter, theme toggle

**Files:**
- Modify: `app.js`

**Interfaces:**
- Consumes: `.project[data-tags][data-title]`, `#tag-filters [data-tag]`, `#project-search`, `#no-results`, `#theme-toggle` from Tasks 1–2.
- Produces: none.

- [ ] **Step 1: Replace `app.js`**

```js
(function () {
  var search = document.getElementById('project-search');
  var filters = document.getElementById('tag-filters');
  var empty = document.getElementById('no-results');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.project'));
  var activeTag = 'all';

  function apply() {
    var q = ((search && search.value) || '').trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (card) {
      var tags = (card.getAttribute('data-tags') || '').split(' ');
      var title = card.getAttribute('data-title') || '';
      var text = card.textContent.toLowerCase();
      var tagOk = activeTag === 'all' || tags.indexOf(activeTag) !== -1;
      var qOk = !q || title.indexOf(q) !== -1 || text.indexOf(q) !== -1;
      var visible = tagOk && qOk;
      card.hidden = !visible;
      if (visible) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }

  if (search) {
    search.addEventListener('input', apply);
    search.addEventListener('clear', apply);
  }

  if (filters) {
    filters.addEventListener('click', function (e) {
      var chip = e.target.closest('[data-tag]');
      if (!chip) return;
      activeTag = chip.getAttribute('data-tag');
      filters.querySelectorAll('[data-tag]').forEach(function (c) {
        c.toggleAttribute('data-active', c === chip);
      });
      apply();
    });
  }

  // Theme: system by default, toggle overrides, choice remembered when storage is available.
  var toggle = document.getElementById('theme-toggle');
  var root = document.documentElement;
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function setDark(on) {
    root.style.colorScheme = on ? 'dark' : 'light';
    if (toggle) toggle.checked = on;
  }

  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (_) {}
  setDark(saved ? saved === 'dark' : mq.matches);

  if (toggle) {
    toggle.addEventListener('change', function () {
      var on = !!toggle.checked;
      setDark(on);
      try { localStorage.setItem('theme', on ? 'dark' : 'light'); } catch (_) {}
    });
  }
})();
```

- [ ] **Step 2: Verify**

Reload from disk. Expected:
- Typing "cart" leaves only MiniCart; typing "zzz" shows the warning banner and no cards.
- Clicking "TypeScript" leaves Section Conditions only; combining with search "minica" shows the empty state (AND behaviour); "All" plus cleared search restores five cards.
- Toggling Dark mode changes the page; reloading keeps the choice.
- If `colorScheme` alone does not restyle Polaris, check how the RC expects theme control (docs) and adjust `setDark` only.
- Disable JS (DevTools → Disable JavaScript) and reload: all five cards still visible.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: project search, tag filter and theme toggle

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Experience table, contact, footer

**Files:**
- Modify: `index.html` (replace the remaining placeholder comment)

**Interfaces:**
- Consumes: `<s-stack gap="large">` from Task 1.
- Produces: ids `#experience`, `#contact`.

- [ ] **Step 1: Add the sections**

```html
    <s-section id="experience" heading="Experience">
      <!-- REVIEW: only the role you stated is listed. Add roles/dates/stack from LinkedIn. -->
      <s-table>
        <s-table-header-row>
          <s-table-header>Role</s-table-header>
          <s-table-header>Company</s-table-header>
          <s-table-header>Years</s-table-header>
          <s-table-header>Stack</s-table-header>
        </s-table-header-row>
        <s-table-body>
          <s-table-row>
            <s-table-cell>Developer</s-table-cell>
            <s-table-cell>Polaris, Shopify</s-table-cell>
            <s-table-cell>Present</s-table-cell>
            <s-table-cell>JavaScript, TypeScript, Web Components</s-table-cell>
          </s-table-row>
        </s-table-body>
      </s-table>
    </s-section>

    <s-section id="contact" heading="Contact">
      <s-stack direction="inline" gap="small">
        <s-button href="https://github.com/Sanj718" target="_blank">GitHub</s-button>
        <s-button href="https://twitter.com/sanj_sv" target="_blank">X / Twitter</s-button>
        <!-- REVIEW: add LinkedIn URL here once provided -->
        <s-button href="mailto:ssobirjonov@gmail.com" variant="primary">Email</s-button>
      </s-stack>
    </s-section>

    <s-text color="subdued">© 2026 Sanjar Sobirjonov · <s-link href="https://github.com/Sanj718/me" target="_blank">Source</s-link></s-text>
```

- [ ] **Step 2: Verify**

Reload from disk. Expected: table renders with a header row and one body row; contact buttons present; footer link opens the repo; `#experience` and `#contact` header buttons scroll to their sections.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: experience table, contact and footer

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Responsive, keyboard and visual pass

**Files:**
- Modify: `index.html`, `style.css` only as needed to fix findings.

- [ ] **Step 1: Check at phone width**

Open `index.html`, set the browser viewport to about 375px wide.
Expected: no horizontal scrollbar; cards in one column; header row wraps without overlapping; table does not overflow the viewport (if it does, wrap it in `<div style="overflow-x:auto">`).

- [ ] **Step 2: Check keyboard use**

Tab through the page. Expected: visible focus on chips, cards and buttons; Enter on a card opens its modal, focus moves into it, Esc closes it and focus returns to the card.

- [ ] **Step 3: Check light and dark**

Toggle both modes. Expected: text contrast is readable everywhere; page background follows the theme (if `style.css` forces a light background in dark mode, remove the `background` line from `body` and let Polaris own it).

- [ ] **Step 4: Check console and links**

Expected: no console errors; every `href` resolves (GitHub repos exist: `Shopify-MinicartJS`, `section-conditions`, `minica`, `functions-hub`, `avex-next`, `me`).

- [ ] **Step 5: Commit any fixes**

```bash
git add -A && git commit -m "fix: responsive and a11y adjustments

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Deploy (requires user confirmation at every step)

**Files:** none.

- [ ] **Step 1: Ask the user to review `index.html` content marked `REVIEW`, then confirm to push.**

- [ ] **Step 2: Push, after confirmation**

```bash
cd /Users/sanjar/Documents/my-site
git remote add origin https://github.com/Sanj718/me.git
git push -u origin main
```

- [ ] **Step 3: Enable Pages from `main` root, after confirmation**

```bash
gh api -X POST repos/Sanj718/me/pages -f 'source[branch]=main' -f 'source[path]=/'
```

- [ ] **Step 4: Release the domain from the old repo, after confirmation**

`Sanj718/my-glsl` currently has `CNAME` = `sanjar.dev`. Remove that file (or disable Pages there) so the domain can be claimed.

- [ ] **Step 5: Set the custom domain, after confirmation**

```bash
gh api -X PUT repos/Sanj718/me/pages -f cname=sanjar.dev
```

Verify DNS at the registrar points `sanjar.dev` to GitHub Pages (A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, or CNAME to `sanj718.github.io` for `www`). Then enable "Enforce HTTPS" once the certificate is issued.

- [ ] **Step 6: Verify live**

Open `https://sanjar.dev`. Expected: the site loads over HTTPS with no console errors.
