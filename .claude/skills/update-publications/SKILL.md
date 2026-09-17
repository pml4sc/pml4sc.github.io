---
name: update-publications
description: Add or update papers on the lab publications page (_data/publications.yaml) from arXiv links/IDs, DOIs, or raw paper details. Fetches title, authors, abstract and submission date, writes an entry in this repo's house YAML schema, and keeps the list ordered by publication date. Use whenever asked to add a paper, preprint, or accepted publication to the website, or to mark an existing preprint as accepted.
---

# Update publications

The publications page is driven entirely by `_data/publications.yaml`. `publications/index.md`
sorts it by `date` descending, groups by `year`, and renders each entry through
`_includes/publication.html`. Never hand-edit `publications/index.md` to add a paper — the only
file that changes is the data file (plus a banner image, if one is supplied).

## 1. Collect metadata

For each arXiv link or ID the user gives (`https://arxiv.org/abs/XXXX.XXXXX`):

- `WebFetch` `https://arxiv.org/abs/<id>` and pull out **exact title**, **full author list in
  order**, **abstract**, and the **v1 submission date** from the "Submission history" line, plus
  any `Comments:` note about acceptance.
- Fetch the papers in parallel — one `WebFetch` call per paper in a single message.
- `curl` to arxiv.org and the arXiv API is blocked by the sandbox here; use `WebFetch`.
- If the user supplies details directly instead of a link, use those and don't invent anything.

Never guess a date, an author list, or an author order. If a field can't be established, ask.

## 2. Write the entry

Append to `_data/publications.yaml` using this schema. Field order matters for readability —
keep it exactly as below.

```yaml
- title: "Exact Title As Published: With Subtitle"
  authors:
    - First Last          # every author, in paper order
  venue: arXiv preprint   # or the full venue name, e.g. European Conference on Computer Vision
  short_venue: arXiv 2026 # or ICML 2026 / ECCV 2026 / IJCNN/WCCI 2026
  status: Accepted        # ONLY for accepted papers; omit entirely for preprints
  type: preprint          # or conference / journal — shown as the card's grey chip
  date: 2026-07-27        # v1 arXiv submission date, or the acceptance date for venue papers
  year: 2026              # must match date's year; drives the year heading on the page
  description: "One or two sentences, present tense, paraphrased from the abstract."
  banner: images/pub_banners/NAME.png   # omit if there is no banner image
  buttons:
    - text: arXiv
      link: https://arxiv.org/abs/2607.25018
      icon: fa-solid fa-file-lines
    - text: PDF
      link: https://arxiv.org/pdf/2607.25018
      icon: fa-solid fa-file-pdf
    - text: Code
      link: "#"           # "#" is the placeholder when no repo exists yet
      icon: fa-brands fa-github
  bibtex: |-
    @article{last2026keyword,
      title={Exact Title As Published: With Subtitle},
      author={Last, First and Last, First},
      journal={arXiv preprint arXiv:2607.25018},
      year={2026}
    }
```

Conventions to follow:

- **description** — the card blurb, not the abstract. Two lines at most, no hype, no "we propose".
  Lead with the method's name when it has one ("MFFM calibrates…", "ConsistencyGate is a…").
- **bibtex key** — `<first author surname lowercased><year><one lowercase keyword>`, e.g.
  `dou2026conformal`, `zhang2026consistencygate`. Check the file for collisions.
- **bibtex braces** — protect acronyms and proper nouns so BibTeX doesn't down-case them:
  `{LLM}`, `{PDE}`, `{Bayesian}`, `{Gaussian}`, `{ConsistencyGate}`. A leading acronym goes as
  `{{COMPOL}}: ...`.
- **bibtex entry type** — `@article` with `journal={arXiv preprint arXiv:<id>}` for preprints;
  `@inproceedings` with `booktitle={<full venue>}` for accepted conference papers.
- **authors** — spell names exactly as in `_members/*.md` for lab members. `_includes/publication-author.html`
  matches on the `name:` field and links matching authors to their member card; a typo silently
  drops the link. Read the member files to check before writing.
- **banner** — only set it if the image actually exists in `images/pub_banners/`. A missing file
  falls back to `images/fallback.svg`, which looks broken. Cards render fine without a banner, so
  omit the key and tell the user they can drop a PNG in later.

## 3. Keep the file ordered

Entries live in the file newest-first, matching the rendered order. After inserting, verify:

```bash
ruby -ryaml -rdate -e 'd=YAML.load_file("_data/publications.yaml", permitted_classes: [Date]); \
  puts "entries: #{d.size}"; \
  d.each{|p| puts "#{p["date"]}  #{(p["status"]||"preprint").ljust(9)}  #{p["title"][0,55]}"}; \
  puts "sorted: #{d.map{|p| p["date"]} == d.map{|p| p["date"]}.sort.reverse}"'
```

That both parses the YAML (catching indentation and quoting errors) and confirms the ordering.
`permitted_classes: [Date]` is required — without it Psych raises `DisallowedClass` on the
`date:` fields, which is not a problem with the file.

`bundle exec jekyll build` does not run on this machine (gems from `Gemfile.lock` are missing and
installing them needs network). The Ruby check above is the verification step; don't chase the
build.

## 4. Marking a preprint as accepted

When a listed preprint gets in somewhere, edit the existing entry in place rather than adding a
second one: set `status: Accepted`, change `type` to `conference`/`journal`, replace `venue` with
the full venue name and `short_venue` with the short form, move `date` to the acceptance date,
re-sort, and switch the bibtex to `@inproceedings`/`@article` with `booktitle`/`journal`.

## 5. Report back

Tell the user, per paper, where it landed in the ordering and what is still missing — a Code link
still on `"#"`, or a banner image not yet supplied.
