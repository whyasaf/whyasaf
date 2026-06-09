# <p align="center"><img src="public/assets/wa_com1.png" alt="whyasaf logo" width="100" /></p>

# whyasaf.com

A premium, minimalist personal portfolio and blog built with **Next.js 14**, **Framer Motion**, and **Tailwind CSS**. Focused on clean typography, custom 3D animations, and robust SEO foundations.

---

## 🚀 Key Features

### 1. 📖 3D Interactive Notebook (Blog Footer)
A realistic, double-sided 3D notebook component simulating physical page turns:
- **Spine Anchored Pivot**: Transformation axis aligned (`originX: 0` / `originX: 1`) on the binding spine.
- **Backface Rendering**: Utilizes `backface-visibility: hidden` and `preserve-3d` cards to swap content mid-flip seamlessly.
- **Dynamic sweep shadows**: Gradient shadow layers that sweep across pages during turns to emphasize folding.
- **Loop Flow**: Contains 2 loopable spreads featuring bio quotes, Twitter/X, LinkedIn, and GitHub links.

### 2. 📐 AutoCAD Kinetic Typography (Projects Footer)
An interactive tag cloud reflecting engineering and system blueprints:
- **AutoCAD Crosshair**: Tracks cursors inside the container with responsive grid coordinate indicators (`X`, `Y`).
- **Interactive Ticks**: Bounding borders and corner `+` tick marks scale dynamically with active links.
- **Parallax movement**: Words glide slightly according to cursor vectors for kinetic depth.

### 3. 🔍 SEO & Web Schema Integration
- **Person JSON-LD**: Embedded structured data schemas representing skills (Next.js, Python, UI/UX, Systems Architecture).
- **Dynamic Sitemap & Robots**: Prerendered Next.js SEO route templates (`/sitemap.xml` and `/robots.txt`).
- **Dynamic Blog Metadata**: Automatically outputs multilingual canonical tags and OG Article tags.

---

## 🛠️ Tech Stack

- **Core**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, PostCSS, `@tailwindcss/typography`
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Analytics / Verification**: Google Search Console

---

## 📁 Directory Structure

```text
whyasaf-websayt/
├── app/                  # Next.js App Router (Layouts & Routes)
│   ├── about/            # About page
│   ├── blog/             # Blog indexing & [slug] dynamic posts
│   ├── projects/         # Projects grid page
│   ├── robots.ts         # Robots.txt generator
│   └── sitemap.ts        # Sitemap.xml generator
├── public/               # Public assets (images, logos, videos)
│   └── assets/           # Curated project showcases & profile media
├── src/
│   ├── components/       # Custom components (Footer, Hero, ProjectsGrid)
│   ├── context/          # State providers (LanguageContext)
│   ├── data/             # Static post databases
│   └── lib/              # Translations dictionary
├── package.json          # Dependency configurations
└── tailwind.config.js    # Tailwind layout overrides
```

---

## 💻 Local Setup & Development

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="your-google-verification-token"
```

### 3. Running Locally
Start the local development server (runs on port `3057`):
```bash
npm run dev
```
Open [http://localhost:3057](http://localhost:3057) to view the app.

### 4. Production Build
Check code validity and compile the optimized bundle:
```bash
npm run build
```
Run the production server:
```bash
npm run start
```
