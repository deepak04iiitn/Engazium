# Engazium

<p align="center">
  <img src="src/assets/Engazium_Logo.png" alt="Engazium Logo" width="80" />
</p>

<p align="center">
  <strong>The Engagement & Reach Hub for Creators</strong>
</p>

<p align="center">
  Build Engagement. Expand Reach. Grow Together.
</p>

---

## Overview

**Engazium** is a community-driven engagement ecosystem designed for micro creators who want to grow their social media presence organically and safely. Unlike unsafe engagement pods or fake bot services, Engazium provides a structured, fair, and platform-safe way for creators to support each other's content.

### The Problem We Solve

Micro creators face significant challenges:

- **Low Early Engagement** — Algorithms prioritize posts with strong initial engagement. Without it, great content gets buried.
- **Unsafe Engagement Pods** — WhatsApp & Telegram pods lack rules, accountability, and risk shadowbans.
- **Fake Engagement Services** — Paid bots destroy account credibility and violate platform terms.
- **Freeloaders** — Unstructured groups are plagued by members who take but never give back.

### Our Solution

Engazium matches creators into **niche-based squads** where everyone contributes equally through a **credit-based system**. Engagement is time-distributed to mimic organic behavior, keeping your account safe while boosting your reach.

---

## Features

| Feature | Description |
|---------|-------------|
| **Niche-Based Squads** | Join squads matched by niche, format, and follower range for relevant engagement |
| **Credit-Based Fairness** | Earn credits by engaging, spend credits to post — no freeloaders |
| **Platform Safe** | Time-distributed engagement with quality guidelines protects your account |
| **Organic Timing** | Engagement spread over time to avoid algorithmic penalties |
| **Weekly Accountability** | Track follower growth, reach, and engagement metrics weekly |
| **Real Human Engagement** | No bots, no automation — every interaction comes from real creators |

---

## How It Works

1. **Sign Up & Pick Your Niche** — Create your account and select your content niche, format, and language preferences.

2. **Join a Squad** — Get matched into a squad of 10–20 creators in your niche with similar follower ranges.

3. **Share & Engage** — Post your content link; squad members engage with meaningful comments, likes, and saves.

4. **Watch Your Reach Grow** — Early engagement signals boost your algorithmic reach organically and safely.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **shadcn/ui** | Accessible component library built on Radix UI |
| **Framer Motion** | Animation library |
| **Lucide React** | Icon library |
| **class-variance-authority** | Variant styling for components |

---

## Project Structure

```
engazium/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles & CSS variables
│   │   ├── layout.js            # Root layout
│   │   ├── page.js              # Entry point
│   │   └── home/
│   │       └── page.jsx         # Home page
│   ├── assets/
│   │   ├── Engazium_Logo.png    # Brand logo
│   │   └── hero-bg.jpg          # Hero background image
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Footer.jsx           # Footer
│   │   ├── home/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ProblemSection.jsx
│   │   │   ├── HowItWorksSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── PricingSection.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   ├── FAQSection.jsx
│   │   │   └── CTASection.jsx
│   │   └── ui/                  # shadcn/ui components
│   │       ├── accordion.jsx
│   │       ├── avatar.jsx
│   │       └── button.jsx
│   └── lib/
│       └── utils.js             # Utility functions (cn helper)
├── components.json              # shadcn/ui configuration
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/engazium.git
   cd engazium
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## Adding shadcn/ui Components

This project is configured with shadcn/ui. To add more components:

```bash
npx shadcn@latest add [component-name]
```

Examples:

```bash
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add dropdown-menu
```

---

## Styling

### Design System

The project uses a custom dark theme with cyan/teal accent colors:

- **Primary**: `hsl(175, 85%, 55%)` — Cyan/Teal
- **Background**: `hsl(220, 20%, 5%)` — Deep blue-gray
- **Fonts**: Space Grotesk (headings) + Inter (body)

### Custom Utilities

| Class | Description |
|-------|-------------|
| `.text-gradient` | Cyan gradient text effect |
| `.glow-box` | Glowing box shadow |
| `.glow-text` | Glowing text shadow |
| `.glass` | Glassmorphism effect |
| `.glass-strong` | Stronger glassmorphism |
| `.gradient-border` | Gradient border effect |
| `.animate-pulse-glow` | Pulsing glow animation |

---

## Pricing

| Plan | Squad Size | Price |
|------|------------|-------|
| **Starter Squad** | 10 Members | ₹50/month |
| **Growth Squad** | 20 Members | ₹100/month |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is private and proprietary.

---

## Contact

For questions or support, reach out through our social channels or visit [engazium.com](https://engazium.com).

---

<p align="center">
  Made with ❤️ for creators who deserve to be seen
</p>
