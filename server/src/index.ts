import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { UserRoutes } from "./routes/user.routes";
import { ScoreRoutes } from "./routes/score.routes";

function registerRoutes(app: Application, routes: any[]) {
    routes.forEach((route) => {
        (app as any)[route.method](
            route.route,
            (req: Request, res: Response, next: Function) => {
                const result = new route.controller()[route.action](
                    req,
                    res,
                    next
                );
                if (result instanceof Promise) {
                    result.then((result) =>
                        result !== null && result !== undefined
                            ? res.send(result)
                            : undefined
                    );
                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            }
        );
    });
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

registerRoutes(app, UserRoutes);
registerRoutes(app, ScoreRoutes);

app.listen(PORT, () => {
    console.log(`Express server has started on port ${PORT}`);
});
