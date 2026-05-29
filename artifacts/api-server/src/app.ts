import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.set("trust proxy", 1);

const allowedOrigins = buildAllowedOrigins();

function buildAllowedOrigins(): Set<string> {
  const origins = new Set<string>();
  const domains = process.env.REPLIT_DOMAINS;
  if (domains) {
    for (const d of domains.split(",")) {
      const trimmed = d.trim();
      if (trimmed) {
        origins.add(`https://${trimmed}`);
      }
    }
  }
  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost");
    origins.add("http://localhost:80");
    const devDomain = process.env.REPLIT_DEV_DOMAIN;
    if (devDomain) {
      origins.add(`https://${devDomain}`);
    }
  }
  return origins;
}

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err.message === "Not allowed by CORS") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  res.status(500).json({ error: "Internal server error" });
});

export default app;
