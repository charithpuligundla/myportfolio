# Charith Puligundla - Portfolio

React + Vite portfolio with a home page and a /projects page.

## Run it
1. Install Node.js 18+ from https://nodejs.org
2. In this folder run:
   npm install
   npm run dev
3. Open the link shown in the terminal (usually http://localhost:5173)

## Add your files to the public/ folder
- cherry-2.jpg  - your photo (portrait, around 800x1000 looks best)
- Resume.pdf    - your resume (opened by the View resume button)
- logos/linkedinLogo.png, logos/githubLogo.png, logos/LeetCodeLogo.png
- Skill logos in logos/ as .svg: c, cpp, java, python, javaScript, html, css,
  React, nodejs, Express, MongoDB, Git, Docker
- Project screenshots in logos/: leetcode-clone-img.png, college-cart-img.png,
  quiz-app-img.png, bird-bar-img.png, expense-tracker-img.png, weather-dashboard-img.png
Anything missing falls back to a styled placeholder, so nothing breaks.

## EmailJS (contact form)
Put your public key in .env as VITE_GMAIL_SENDING_ID. Service and template IDs are in src/Home.jsx.

## Edit your details
- Name, bio, roles, skills, education, email: src/Home.jsx
- Projects (all 6): src/projectsData.js
- Colors: the variables at the top of src/Home.css

## Build for deployment
npm run build   (output goes to dist/, deploy on Vercel or Netlify)
