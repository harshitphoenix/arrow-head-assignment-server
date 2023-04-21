"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_controller_1 = require("./database.controller");
const router = express_1.default.Router();
router.get("/get-schema", database_controller_1.getDatabaseSchema);
router.post("/get-movies", database_controller_1.getMovies);
router.post("/add-movie", database_controller_1.addMovie);
router.patch("/update-movie", database_controller_1.updateMovie);
exports.default = router;
//# sourceMappingURL=database.router.js.map