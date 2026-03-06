# Engazium

<p align="center">
  <img src="client/src/assets/Engazium_Logo.png" alt="Engazium Logo" width="80" />
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
| **Squad Rules Gate** | Members must accept squad rules before posting for the first time |
| **Engagement Validation Timer** | Engagement is only counted after validated viewing time (20s minimum) |
| **Plan-Based Post Limits** | Daily posting limits are enforced by plan (`Growth`: 1, `Pro`: 2, `Momentum`: 3) |
| **Admin Moderation Suite** | Admins can manage users, squads, feedback, testimonials, and squad ownership/blocking |
| **Public Live Signals** | Landing pages show live activity, growth achievements, and live user count |
| **Automated Governance Jobs** | Hourly/daily cron jobs recalculate engagement, clean old posts, and seed growth baselines |

---

## How It Works

1. **Sign Up & Pick Your Niche** — Create your account and select your content niche, format, and language preferences.

2. **Join a Squad** — Get matched into a squad of 10–20 creators in your niche with similar follower ranges.

3. **Share & Engage** — Post your content link; squad members engage with meaningful comments, likes, and saves.

4. **Watch Your Reach Grow** — Early engagement signals boost your algorithmic reach organically and safely.

---

## Implemented User/Admin Flows

### User Flows

- **Authentication**: Email/password signup/signin + Google OAuth signin, cookie-based JWT sessions
- **Profile Management**: Update username/email/bio/niche/platform stats, change password, delete account with password confirmation
- **Squad Discovery**: Browse squads with search, multi-select filters, status filter, and sorting
- **Membership Lifecycle**: Join squad, leave squad, view personal memberships with pagination and engagement stats
- **Squad Participation**:
  - accept squad rules before first post
  - create/delete posts (with daily plan limits)
  - engage with posts using start + validate flow
  - get per-squad engagement stats and pending engagement counts
- **Growth Tracking**:
  - weekly check-in snapshots across platforms
  - growth history for analytics charts
  - baseline-aware growth summary calculations
- **Testimonials & Feedback**:
  - submit/edit/delete personal testimonial (re-enters review on edit)
  - submit in-app bug/feature feedback
  - submit public contact form messages

### Admin Flows

- **User Management**: list/search/paginate users, view user details, delete users, toggle admin status
- **Squad Governance**: list/filter squads, view detailed squad metrics, remove members, block/unblock users, transfer ownership, delete squads
- **Audit Logging**: admin squad actions are tracked in `AdminAuditLog`
- **Feedback Hub**: list/filter/search feedback and update status (`resolved` or `implemented` based on type)
- **Testimonial Moderation**: list all testimonials and approve/reject/delete submissions

---

## Tech Stack

### Frontend (`client/`)

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router & React Compiler |
| **React 19** | UI library |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **shadcn/ui** | Accessible component library built on Radix UI |
| **Framer Motion** | Animation library |
| **Lucide React** | Icon library |
| **class-variance-authority** | Variant styling for components |
| **react-hot-toast** | Toast notification library |
| **tailwind-merge** | Utility for merging Tailwind classes |

### Backend (`api/`)

| Technology | Purpose |
|------------|---------|
| **Express 5** | Node.js web framework |
| **MongoDB + Mongoose 9** | NoSQL database & ODM |
| **JSON Web Tokens** | Stateless authentication (JWT) |
| **bcryptjs** | Password hashing |
| **CORS** | Cross-origin resource sharing middleware |
| **dotenv** | Environment variable management |
| **nodemon** | Auto-restart dev server on file changes |

---

## Project Structure

```
engazium/
├── api/
│   ├── src/
│   │   ├── index.js                  # Express app + route mounting + scheduler init
│   │   ├── config/db.js              # MongoDB connection
│   │   ├── controllers/              # auth, user, squad, post, engagement, growth, feedback, admin, testimonial
│   │   ├── jobs/scheduler.js         # cron jobs: engagement recalculation, cleanup, baseline snapshots
│   │   ├── middlewares/              # JWT verification/admin guard + global error handling
│   │   ├── models/                   # User, Squad, SquadMember, Post, Engagement, GrowthSnapshot, Feedback, Testimonial, AdminAuditLog
│   │   └── routes/                   # auth, user, admin, squad, post, engagement, growth, feedback, testimonial
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/            # user dashboard
│   │   │   ├── admin-dashboard/      # admin dashboard
│   │   │   ├── squads/               # squads listing + dynamic squad detail pages
│   │   │   ├── sign-in/ & sign-up/   # auth pages
│   │   │   ├── contact-us/           # public contact form
│   │   │   └── ...marketing pages
│   │   ├── assets/
│   │   ├── components/               # dashboard, squads, home, shared, shadcn/ui
│   │   ├── lib/                      # auth helpers, firebase config, utilities
│   │   ├── redux/                    # global user state
│   │   └── hooks/                    # shared hooks
│   ├── next.config.mjs               # /api rewrite to backend via NEXT_PUBLIC_API_URL
│   ├── components.json               # shadcn/ui config
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/engazium.git
   cd engazium
   ```

2. **Set up the backend**

   ```bash
   cd api
   npm install
   ```

3. **Set up the frontend**

   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file inside the `api/` directory (see [Environment Variables](#environment-variables) below).

5. **Run the development servers**

   In one terminal — start the API server:

   ```bash
   cd api
   npm run dev
   ```

   In another terminal — start the Next.js client:

   ```bash
   cd client
   npm run dev
   ```

6. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000) for the frontend.

### Build for Production

**Frontend:**

```bash
cd client
npm run build
npm start
```

**Backend:**

```bash
cd api
npm start
```

---

## Environment Variables

### Backend (`api/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port the API server listens on | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/engazium` |
| `JWT_SECRET` | Secret key for signing JSON Web Tokens | `your-super-secret-key` |
| `CLIENT_URL` | Primary allowed CORS origin | `http://localhost:3000` |
| `CLIENT_URLS` | Comma-separated additional allowed CORS origins | `http://localhost:3000,https://engazium.com` |

```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/engazium
JWT_SECRET=your-super-secret-key
CLIENT_URL=http://localhost:3000
CLIENT_URLS=http://localhost:3000
```

---

### Frontend (`client/.env.local`)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend base URL used by Next.js rewrite for `/api/*` | `http://localhost:5000` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase web API key | `...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `...` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project id | `...` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `...` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender id | `...` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app id | `...` |
| `NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL` | Community CTA link | `https://chat.whatsapp.com/...` |
| `NEXT_PUBLIC_TELEGRAM_COMMUNITY_URL` | Community CTA link | `https://t.me/...` |

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL=https://chat.whatsapp.com/...
NEXT_PUBLIC_TELEGRAM_COMMUNITY_URL=https://t.me/...
```

---

## API Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Returns server status |
| `GET` | `/api/ping` | Returns `pong` |

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/auth/signup` | Register a new user | `{ username, email, password }` |
| `POST` | `/api/auth/signin` | Sign in with email & password | `{ email, password }` |
| `POST` | `/api/auth/google` | Sign in / register via Google OAuth | `{ name, email }` |
| `POST` | `/api/auth/logout` | Log out (clears access token cookie) | — |

### Authentication Details

- **Token**: JWT stored as an `httpOnly` cookie (`access_token`) with a 7-day expiry.
- **Password Hashing**: Passwords are hashed with bcryptjs (10 salt rounds) before storage.
- **Middleware**: `verifyToken` validates JWTs on protected routes; `verifyAdmin` checks admin privileges.

### User (`/api/user`, protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/user/profile` | Get current user's profile |
| `PUT` | `/api/user/profile` | Update profile (username/email/bio/niche/platform stats) |
| `PUT` | `/api/user/change-password` | Change password |
| `DELETE` | `/api/user/delete-account` | Delete account with password confirmation |

### Squads (`/api/squads`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/squads` | Public | Browse squads with pagination/search/filter/sort |
| `POST` | `/api/squads` | Yes | Create squad |
| `GET` | `/api/squads/:id` | Yes | Get squad details + members |
| `GET` | `/api/squads/niche/:niche/slug/:slug` | Yes | Get squad by niche slug + squad slug |
| `DELETE` | `/api/squads/:id` | Yes | Delete squad (owner/admin) |
| `POST` | `/api/squads/:id/join` | Yes | Join squad (blocked/full checks) |
| `POST` | `/api/squads/:id/leave` | Yes | Leave squad (protects last admin) |
| `POST` | `/api/squads/:id/accept-rules` | Yes | Accept squad rules before first post |
| `GET` | `/api/squads/my/memberships` | Yes | Get memberships + engagement/post stats |

### Posts (`/api/posts`, protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/posts` | Create post (URL validation, rules gate, plan/day limits, engagement threshold checks) |
| `GET` | `/api/posts/squad/:squadId` | Get squad feed with search/filter/sort/time-range + pending engagement count |
| `GET` | `/api/posts/my-count/:squadId` | Get user's daily post count and remaining quota |
| `DELETE` | `/api/posts/:id` | Delete post (author/squad admin/platform admin) |

### Engagement (`/api/engagement`, protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/engagement/start` | Start engagement tracking for a post click |
| `POST` | `/api/engagement/validate` | Validate engagement after minimum viewing threshold |
| `GET` | `/api/engagement/stats/:squadId` | User engagement stats in squad |
| `GET` | `/api/engagement/squad-overview/:squadId` | Squad-wide engagement view |

### Growth (`/api/growth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/growth/snapshot` | Yes | Submit/update weekly growth snapshot |
| `GET` | `/api/growth/check-in-status` | Yes | Check weekly check-in completion |
| `GET` | `/api/growth/history` | Yes | Historical growth data + baseline summary |
| `GET` | `/api/growth/achievements` | Public | Landing page achievements |
| `GET` | `/api/growth/live-activity` | Public | Landing page live activity feed |
| `GET` | `/api/growth/live-user-count` | Public | Total users/new users counter |

### Feedback (`/api/feedback`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/feedback/contact` | Public | Submit contact form message |
| `POST` | `/api/feedback` | Yes | Submit bug/feature feedback |

### Testimonials (`/api/testimonials`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/testimonials` | Public | Get approved testimonials |
| `POST` | `/api/testimonials` | Yes | Submit testimonial |
| `GET` | `/api/testimonials/mine` | Yes | Get my testimonial |
| `PUT` | `/api/testimonials/mine` | Yes | Update my testimonial (resets to pending) |
| `DELETE` | `/api/testimonials/mine` | Yes | Delete my testimonial |
| `GET` | `/api/testimonials/admin/all` | Admin | Get all testimonials |
| `PATCH` | `/api/testimonials/admin/:id/status` | Admin | Approve/reject testimonial |
| `DELETE` | `/api/testimonials/admin/:id` | Admin | Delete testimonial |

### Admin (`/api/admin`, admin only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/admin/users` | List users (search, sort, pagination) |
| `GET` | `/api/admin/users/:id` | Get user details |
| `DELETE` | `/api/admin/users/:id` | Delete user |
| `PATCH` | `/api/admin/users/:id/toggle-admin` | Toggle admin access |
| `GET` | `/api/admin/squads` | List squads with filters + stats |
| `GET` | `/api/admin/squads/:id` | Squad deep details (members, blocked users, metrics, audit logs) |
| `DELETE` | `/api/admin/squads/:id` | Delete squad |
| `DELETE` | `/api/admin/squads/:id/members/:userId` | Remove member |
| `PATCH` | `/api/admin/squads/:id/members/:userId/block` | Block/unblock member |
| `PATCH` | `/api/admin/squads/:id/transfer-ownership` | Transfer squad ownership |
| `GET` | `/api/admin/feedback` | List feedback items |
| `PATCH` | `/api/admin/feedback/:id/status` | Update feedback status |

---

## Automated Scheduler Jobs

The backend initializes cron jobs at startup (`api/src/jobs/scheduler.js`):

- **Hourly**: recompute squad member engagement percentages from valid engagements in last 7 days
- **Low Engagement Enforcement**:
  - threshold is `< 30%`
  - warning state is recorded (`lowEngagementSince`, `warningNotified`)
  - members below threshold for 7+ days are removed from squad
- **Daily (00:00 UTC)**: delete posts older than 15 days and related engagement records
- **Daily (01:00 UTC)**: create baseline growth snapshots for users missing baselines

---

## User Model

The User schema includes fields for creator profiling and squad matching:

| Field | Type | Details |
|-------|------|---------|
| `username` | String | Required, unique, trimmed |
| `email` | String | Required, unique, lowercase |
| `password` | String | Required, hashed, excluded from queries by default |
| `isUserAdmin` | Boolean | Default: `false` |
| `niche` | String (enum) | 28 niches — Art & Creativity, Technology, Gaming, Education, etc. |
| `platforms` | String[] (enum) | Instagram, YouTube, TikTok, Facebook, X, LinkedIn, Twitch, Snapchat, Other |
| `numberOfFollowers` | Number | Default: `0` |
| `avgLikes` | Number | Default: `0` |
| `avgComments` | Number | Default: `0` |

---

## Adding shadcn/ui Components

The client is configured with shadcn/ui. To add more components:

```bash
cd client
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

### Frontend (`client/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

### Backend (`api/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Express server with nodemon (auto-reload) |
| `npm start` | Start Express server for production |

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
