"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./routes/user.routes");
const score_routes_1 = require("./routes/score.routes");
function registerRoutes(app, routes) {
    routes.forEach((route) => {
        app[route.method](route.route, (req, res, next) => {
            const result = new route.controller()[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then((result) => {
                    if (result !== null && result !== undefined) {
                        if (result.status) {
                            res.status(result.status).json(result);
                        }
                        else {
                            res.json(result);
                        }
                    }
                });
            }
            else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const PORT = process.env.PORT || 3000;
registerRoutes(app, user_routes_1.UserRoutes);
registerRoutes(app, score_routes_1.ScoreRoutes);
// app.listen(PORT, () => {
//     console.log(`Express server has started on port ${PORT}`);
// });
app.get("/", (req, res) => {
    res.send("Calendar API working ✅");
});
exports.default = app;
//# sourceMappingURL=index.js.map