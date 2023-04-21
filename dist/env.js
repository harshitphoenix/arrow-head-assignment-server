"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    PORT: process.env.PORT,
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    DATABASE_ID: process.env.DATABASE_ID,
    FRONTEND_URL: process.env.FRONTEND_URL,
};
//# sourceMappingURL=env.js.map