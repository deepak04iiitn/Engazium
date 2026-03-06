import { readdirSync, existsSync } from "fs";
import { join, relative, sep } from "path";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://engazium.com";

// These routes require auth or are admin-only — exclude from sitemap
const EXCLUDED = new Set(["/dashboard", "/admin-dashboard"]);

const PAGE_FILES = ["page.js", "page.jsx", "page.ts", "page.tsx"];

// Priority config for known routes
const PRIORITY_MAP = {
  "/": 1.0,
  "/home": 1.0,
  "/features": 0.9,
  "/pricing": 0.9,
  "/how-it-works": 0.85,
  "/squads": 0.85,
  "/about-us": 0.8,
  "/contact-us": 0.75,
  "/sign-in": 0.6,
  "/sign-up": 0.6,
  "/privacy-policy": 0.4,
};

const CHANGE_FREQ_MAP = {
  "/": "daily",
  "/home": "daily",
  "/squads": "daily",
  "/pricing": "weekly",
  "/features": "weekly",
  "/how-it-works": "monthly",
  "/about-us": "monthly",
  "/contact-us": "monthly",
  "/sign-in": "yearly",
  "/sign-up": "yearly",
  "/privacy-policy": "yearly",
};

function scanPages(dir, appDir) {
  const routes = [];
  let entries;

  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return routes;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const name = entry.name;
    // Skip dynamic segments, route groups, and api folder
    if (name.startsWith("[") || name.startsWith("(") || name === "api") {
      continue;
    }

    const fullPath = join(dir, name);
    const relPath = relative(appDir, fullPath).split(sep).join("/");
    const route = "/" + relPath;

    if (EXCLUDED.has(route)) continue;

    if (PAGE_FILES.some((f) => existsSync(join(fullPath, f)))) {
      routes.push(route);
    }

    // Recurse into subdirectories
    routes.push(...scanPages(fullPath, appDir));
  }

  return routes;
}

export default function sitemap() {
  const appDir = join(process.cwd(), "src", "app");

  // Root route first, then auto-discovered routes
  const routes = ["/", ...scanPages(appDir, appDir)];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: CHANGE_FREQ_MAP[route] ?? "weekly",
    priority: PRIORITY_MAP[route] ?? 0.7,
  }));
}
