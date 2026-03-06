import dotenv from "dotenv";

dotenv.config();

const ipStore = new Map();

const getRequiredEnvInt = (name) => {
  const raw = process.env[name];
  const parsed = Number.parseInt(raw ?? "", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Missing or invalid env: ${name}. Expected a positive integer.`);
  }
  return parsed;
};

const getRequiredEnvString = (name) => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required env: ${name}.`);
  }
  return value;
};

const normalizeIp = (ip = "") => ip.replace("::ffff:", "").trim() || "unknown";

const getClientIp = (req) => normalizeIp(req.ip || req.socket?.remoteAddress || "");

// Periodically clean stale in-memory records to avoid unbounded growth.
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of ipStore.entries()) {
    if (entry.blockedUntil > now) continue;
    if (now - entry.windowStart > entry.windowMs * 2) {
      ipStore.delete(key);
    }
  }
}, 60 * 1000).unref();

export const securityHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-DNS-Prefetch-Control", "off");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
};

export const preventHttpParamPollution = (req, res, next) => {
  const keys = Object.keys(req.query || {});
  const hasPollutedParam = keys.some((key) => Array.isArray(req.query[key]));
  if (hasPollutedParam) {
    return res.status(400).json({ success: false, message: "Invalid query parameters." });
  }
  next();
};

export const createRateLimiter = ({
  keyPrefix = "global",
  windowMs,
  max,
  blockDurationMs,
} = {}) => {
  if (!Number.isFinite(windowMs) || windowMs <= 0) {
    throw new Error(`Invalid rate limiter windowMs for "${keyPrefix}".`);
  }
  if (!Number.isFinite(max) || max <= 0) {
    throw new Error(`Invalid rate limiter max for "${keyPrefix}".`);
  }
  if (!Number.isFinite(blockDurationMs) || blockDurationMs <= 0) {
    throw new Error(`Invalid rate limiter blockDurationMs for "${keyPrefix}".`);
  }

  return (req, res, next) => {
    const now = Date.now();
    const ip = getClientIp(req);
    const key = `${keyPrefix}:${ip}`;

    let entry = ipStore.get(key);
    if (!entry) {
      entry = {
        count: 0,
        windowStart: now,
        blockedUntil: 0,
        windowMs,
      };
      ipStore.set(key, entry);
    }

    // Reset usage for a new window.
    if (now - entry.windowStart >= windowMs) {
      entry.count = 0;
      entry.windowStart = now;
    }

    if (entry.blockedUntil > now) {
      const retryAfterSeconds = Math.ceil((entry.blockedUntil - now) / 1000);
      res.setHeader("Retry-After", String(retryAfterSeconds));
      return res.status(429).json({
        success: false,
        message: "Too many requests from this IP. Please try again later.",
      });
    }

    entry.count += 1;
    const remaining = Math.max(0, max - entry.count);
    const resetSeconds = Math.ceil((entry.windowStart + windowMs - now) / 1000);

    res.setHeader("X-RateLimit-Limit", String(max));
    res.setHeader("X-RateLimit-Remaining", String(remaining));
    res.setHeader("X-RateLimit-Reset", String(resetSeconds));

    if (entry.count > max) {
      entry.blockedUntil = now + blockDurationMs;
      res.setHeader("Retry-After", String(Math.ceil(blockDurationMs / 1000)));
      return res.status(429).json({
        success: false,
        message: "Rate limit exceeded. Your IP has been temporarily blocked.",
      });
    }

    next();
  };
};

export const maxConcurrentRequests = (maxPerIp = 40) => {
  const activeByIp = new Map();

  return (req, res, next) => {
    const ip = getClientIp(req);
    const active = activeByIp.get(ip) || 0;

    if (active >= maxPerIp) {
      return res.status(429).json({
        success: false,
        message: "Too many concurrent requests. Please slow down.",
      });
    }

    activeByIp.set(ip, active + 1);

    const release = () => {
      const current = activeByIp.get(ip) || 0;
      if (current <= 1) {
        activeByIp.delete(ip);
      } else {
        activeByIp.set(ip, current - 1);
      }
    };

    res.on("finish", release);
    res.on("close", release);
    next();
  };
};

export const securityConfigFromEnv = () => ({
  trustProxyHops: getRequiredEnvInt("TRUST_PROXY_HOPS"),
  jsonLimit: getRequiredEnvString("JSON_BODY_LIMIT"),
  globalRate: {
    windowMs: getRequiredEnvInt("RATE_LIMIT_WINDOW_MS"),
    max: getRequiredEnvInt("RATE_LIMIT_MAX"),
    blockDurationMs: getRequiredEnvInt("RATE_LIMIT_BLOCK_MS"),
  },
  authRate: {
    windowMs: getRequiredEnvInt("AUTH_RATE_LIMIT_WINDOW_MS"),
    max: getRequiredEnvInt("AUTH_RATE_LIMIT_MAX"),
    blockDurationMs: getRequiredEnvInt("AUTH_RATE_LIMIT_BLOCK_MS"),
  },
  feedbackRate: {
    windowMs: getRequiredEnvInt("FEEDBACK_RATE_LIMIT_WINDOW_MS"),
    max: getRequiredEnvInt("FEEDBACK_RATE_LIMIT_MAX"),
    blockDurationMs: getRequiredEnvInt("FEEDBACK_RATE_LIMIT_BLOCK_MS"),
  },
  maxConcurrentPerIp: getRequiredEnvInt("MAX_CONCURRENT_REQUESTS_PER_IP"),
});

