"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./env");
const database_router_1 = __importDefault(require("./database.router"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: env_1.env.FRONTEND_URL,
    credentials: true,
}));
app.use("/movies", database_router_1.default);
app.listen(env_1.env.PORT, () => {
    console.log("server started at ", env_1.env.NOTION_TOKEN);
    console.log("server started at ", env_1.env.PORT);
});
//# sourceMappingURL=index.js.map