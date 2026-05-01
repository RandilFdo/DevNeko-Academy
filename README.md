# DEVNEKO ACADEMY.
> **The Future of Engineering Education.** 

![Devneko Banner](https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200&h=300)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-FF00C1?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

## 🚀 Overview
DEVNEKO ACADEMY is a high-performance, minimalist Learning Management System (LMS) specifically designed for the next generation of Robotics and AI engineers. Built by the **Egg Yolk Robotics Lab**, the platform combines deep technical curriculum with a cinematic user experience.

## ✨ Core Features
- **Interactive Technical Grid:** A custom-engineered mouse-following grid system that reacts to user movement.
- **Minimalist Branding:** High-contrast, ALL CAPS aesthetic designed for focus and professionalism.
- **Paywall Integrated:** Built-in logic for **PayHere** LKR payments to gate high-tier engineering content.
- **Mobile Optimized:** A fully responsive, stackable architecture that looks perfect on any device.
- **Real-time Synchronization:** User profile and progress syncing powered by Supabase Postgres changes.

## 🛠 Tech Stack
- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS
- **Animations:** Framer Motion (Neural Grid & Cinematic Transitions)
- **Backend:** Supabase (Auth, Database, Real-time)
- **Payments:** PayHere LKR Integration (Ready for activation)
- **Icons:** Lucide React

## 📦 Project Structure
```bash
├── src/
│   ├── app/                # Next.js App Router (Pages & API)
│   ├── components/         
│   │   ├── animations/     # Technical Hero Animations
│   │   ├── layout/         # Professional Navbar & Footer
│   │   └── providers/      # Language & Theme Engine
│   ├── lib/                # Supabase & Utility Configs
├── public/                 # Branding Assets & Favicons
└── supabase_schema.sql      # Database Architecture
```

## ⚙️ Setup & Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/RandilFdo/DevNeko-Academy.git
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure Environment**
   Create a `.env.local` file and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```
4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🎯 Our Mission
To prepare students for a world powered by AI and Robotics by building logical reasoning, mathematical foundations, and physical hardware mastery.

---
© 2026 Egg Yolk Robotics Lab. All Rights Reserved.
