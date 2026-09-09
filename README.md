# Vishal Pethkar — Portfolio

A premium, responsive, dark-themed personal portfolio for Vishal Pethkar, focused on Data Analytics, Python, SQL, Power BI and Excel.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Git
- GitHub Pages

## Features

- Responsive desktop, tablet and mobile layout
- Premium dark theme
- Sticky blur navbar
- Active section navigation
- Mobile hamburger menu
- Smooth scrolling
- Scroll reveal animations
- Animated statistics
- Skills and experience timeline
- Featured project cards
- Vanilla JavaScript project modal
- GitHub / Live Demo buttons hide when URLs are not configured
- Resume section with PDF handling
- Contact mailto form
- Image fallback for missing profile image
- Back-to-top button
- Accessibility and keyboard support
- `prefers-reduced-motion` support
- SEO and social metadata
- GitHub Pages-ready relative paths

## Folder Structure

```text
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── img/
    │   ├── profile.jpg
    │   ├── project-1.jpg
    │   ├── project-2.jpg
    │   ├── project-3.jpg
    │   ├── project-4.jpg
    │   └── resume-preview.jpg
    └── resume/
        └── Vishal_Pethkar_Resume.pdf
```

The cover-letter file is not included because a source PDF was not provided. The website detects its absence and keeps its buttons hidden.

## Configuration

Open `script.js` and update only the fields you actually have:

```js
const siteConfig = {
  email: "your-real-email@example.com",
  phone: "your-real-phone",
  github: "your-real-github-url",
  linkedin: "your-real-linkedin-url",
  canonical: "your-github-pages-url"
};
```

Project links are centralized in the same file:

```js
const projectLinks = {
  project1: { github: "", live: "" },
  project2: { github: "", live: "" },
  project3: { github: "", live: "" },
  project4: { github: "", live: "" }
};
```

Leave a value empty until you have the real URL. The corresponding button automatically stays hidden.

## Live Website

YOUR_GITHUB_PAGES_URL

## Deployment to GitHub Pages

1. Create a GitHub repository.
2. Upload the contents of this `portfolio` folder.
3. Commit and push the files.
4. In GitHub, open **Settings → Pages**.
5. Select the deployment source for the repository branch/root.
6. Save and open the generated GitHub Pages URL.

No Node.js, npm, backend, database, PHP, API, or build process is required.

## Author

Vishal Pethkar
