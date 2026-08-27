// Must be imported before everything else so that Sentry's
// automatic instrumentation can be set up in time (Vercel runs this file
// directly as the entry point; server.ts is only used locally).
import "./instrument";
import * as Sentry from "@sentry/node";

import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { UserRoutes } from "./routes/user.routes";
import { ScoreRoutes } from "./routes/score.routes";
import { AppConfigRoutes } from "./routes/appconfig.routes";
import { GroupRoutes } from "./routes/group.routes";
import { NotificationRoutes } from "./routes/notification.routes";
import { ContentRoutes } from "./routes/content.routes";
import { Games2048Routes } from "./routes/games2048.routes";
import { AdminAuthRoutes } from "./routes/admin/auth.routes";
import { AdminContentsRoutes } from "./routes/admin/contents.routes";
import { requireAdminAuth } from "./middleware/adminAuth.middleware";

function registerRoutes(app: Application, routes: any[]) {
    routes.forEach((route) => {
        (app as any)[route.method](
            route.route,
            async (req: Request, res: Response, next: Function) => {
                try {
                    const result = await new route.controller()[route.action](
                        req,
                        res,
                        next,
                    );
                    // `null` is a legitimate value some controllers return on purpose
                    // (e.g. GroupController.getGroup when the user has no group yet).
                    if (result !== undefined) {
                        if (result?.status) {
                            res.status(result.status).json(result);
                        } else {
                            res.json(result);
                        }
                    }
                } catch (err) {
                    Sentry.captureException(err);
                    if (!res.headersSent) {
                        res.status(500).json({
                            error: "Internal server error",
                        });
                    }
                }
            },
        );
    });
}

const app: Application = express();
app.use(bodyParser.json());

// Admin routes carry a signed, credentialed cookie, so they get their own strict CORS.
const isProd = process.env.NODE_ENV === "production";
const ADMIN_ALLOWED_ORIGINS = new Set(
    (process.env.ADMIN_ORIGINS ?? "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
);
const adminCors = cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // non-browser callers (curl, the native app)
        if (!isProd && /^http:\/\/localhost:\d+$/.test(origin))
            return callback(null, true);
        if (ADMIN_ALLOWED_ORIGINS.has(origin)) return callback(null, true);
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
});
app.use("/admin-auth", adminCors);
app.use("/admin", adminCors);

registerRoutes(app, AdminAuthRoutes); // public: /admin-auth/*
app.use("/admin", requireAdminAuth);
registerRoutes(app, AdminContentsRoutes);

// Public routes
app.use(cors());
registerRoutes(app, UserRoutes);
registerRoutes(app, ScoreRoutes);
registerRoutes(app, AppConfigRoutes);
registerRoutes(app, GroupRoutes);
registerRoutes(app, NotificationRoutes);
registerRoutes(app, ContentRoutes);
registerRoutes(app, Games2048Routes);

app.get("/", (req: Request, res: Response) => {
    res.send("Calendar API working ✅");
});

Sentry.setupExpressErrorHandler(app);

export default app;
