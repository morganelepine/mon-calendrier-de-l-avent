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
                    if (result !== null && result !== undefined) {
                        if (result.status) {
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
app.use(cors());
app.use(bodyParser.json());

registerRoutes(app, UserRoutes);
registerRoutes(app, ScoreRoutes);
registerRoutes(app, AppConfigRoutes);
registerRoutes(app, GroupRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Calendar API working ✅");
});

Sentry.setupExpressErrorHandler(app);

export default app;
