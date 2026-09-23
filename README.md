# Edward Mutetethia — Product Engineer Portfolio

A responsive, dependency-free portfolio built with semantic HTML, modern CSS, and vanilla JavaScript.

## Pages

- `index.html` — homepage, introduction, selected projects, expertise, stack, process, GitHub, about, and contact
- `projects/index.html` — complete project index
- `projects/jitume.html` — JITUME TVET case study
- `projects/coachflow.html` — CoachFlow case study
- `projects/binary-trees.html` — Binary Trees in C case study

## Preview locally

From this directory, run:

```bash
python3 -m http.server 8000
```

Then open:

- Homepage: `http://localhost:8000`
- Projects: `http://localhost:8000/projects/`

The pages can also be opened directly, although a local server is recommended for consistent browser behavior.

## Personal media

### Profile

Replace `assets/profile.svg` with a real profile photograph, then update the image `src`, dimensions, and `alt` text in `index.html`.

### Introduction video

`assets/edward-mutetethia-pitch.webm` currently contains a short branded motion-graphic placeholder. Replace it with the final introduction recording, or update the source in `index.html`. The visible duration updates from the actual video metadata.

## Contact form

The form supports two delivery modes:

1. **Default static-site mode:** validates the form and prepares a message in the visitor's email client.
2. **Endpoint mode:** set `data-endpoint` on the form to a Formspree, Basin, Getform, or compatible JSON endpoint to send the form with `fetch()`.

Example:

```html
<form data-contact-form data-endpoint="https://form-endpoint.example/submit">
```

The JavaScript includes field validation, loading state, success state, error handling, and a honeypot field.

## Theme behavior

The site automatically follows the operating system's light or dark appearance. CSS custom properties and `@media (prefers-color-scheme: dark)` keep both palettes consistent; JavaScript synchronizes browser theme metadata and responds to system changes.

## Project-content policy

Project descriptions intentionally avoid invented users, revenue, performance, adoption, or outcome metrics. Update case studies only when verified evidence becomes available.
