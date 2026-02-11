# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Textura - Intelligent Digital Strategy CMS

Textura is a modern, responsive Content Management System and blog platform designed for content creators. It features a sleek homepage with high-end animations, a dedicated insights archive, and a robust admin dashboard for real-time content management.

## 🚀 Architecture Overview

The project is built using a modern decoupled architecture:

- **Frontend**: React 18+ powered by Vite for lighting-fast development and builds.
- **Styling**: A hybrid approach using **Tailwind CSS 4.0** for utility-first styling and **Inline CSS fallbacks** to ensure layout stability across all environments.
- **Animations**: **Framer Motion** manages sophisticated scroll-linked animations and interactive UI transitions.
- **Routing**: **React Router v7** handles multi-page navigation and protected CMS access via hash-based routing (`#cms`).
- **SEO**: **React Helmet Async** manages dynamic metadata for every page and blog post.

---

## 📂 Folder Structure

```text
src/
├── assets/             # Global assets (fonts, brand icons, svgs)
├── components/         # Atomic and Layout components
│   ├── AdminDashboard.jsx # Full-featured CMS control center
│   ├── BlogList.jsx       # Dynamic insights feed
│   ├── HeroSlider.jsx     # Interactive expanding-card showcase
│   └── ...                # Individual section components
├── config.js           # Centralized API configuration
├── App.jsx             # Root component with routing and global state
├── main.jsx            # Entry point
└── index.css           # Tailwind directives and base styles
```

---

## 🔍 SEO Strategy

Textura treats SEO as a core feature rather than an afterthought:

1.  **Dynamic Metadata**: Every blog post and page updates its `<title>` and `<meta description>` dynamically based on the current content.
2.  **Open Graph Integration**: Metadata for OG (Facebook/LinkedIn) and Twitter Cards are automatically generated for blog posts, ensuring high-quality previews when shared.
3.  **Semantic HTML5**: Used throughout (e.g., `<header>`, `<main>`, `<footer>`, `<section>`) to assist search engine crawlers in understanding site hierarchy.
4.  **Responsive Layouts**: Fully optimized for mobile-first indexing, passing core web vital benchmarks for layout stability.

---

## ⚖️ Trade-offs Made

- **Inline vs Utility CSS**: Per requirements, extensive inline CSS was added. While this increases JSX verbosity, it provides an unbeatable "fallback" layer that prevents the site's layout from breaking if Tailwind fails to load.
- **Hash-based Admin Routing**: We used `#cms` for the dashboard. This allows for simple "State-based" navigation without needing complex server-to-client redirect logic for a single-page application.
- **Client-Side Rendering**: We opted for CSR for the blog list. While SSR (Server-Side Rendering) is technically superior for SEO, CSR allowed for a snappier, app-like feel for the Admin interaction.

---

## 🛠 Improvements Planned

Given more time, the following features would be implemented:

- **TypeScript Migration**: Converting the codebase to TypeScript for better developer experience and type safety in content schemas.
- **Server-Side Rendering (SSR)**: Migrating to a framework like Next.js to pre-render blog posts for even faster search engine indexing.
- **Image Optimization**: Implementing a CDN-based image processing service to serve WebP/AVIF formats dynamically based on screen size.
- **Testing Suite**: Adding E2E tests (Cypress/Playwright) for critical paths like publishing a blog and authentication.
