"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.addMovie = exports.getMovies = exports.getDatabaseSchema = void 0;
const client_1 = require("@notionhq/client");
const env_1 = require("./env");
const utils_1 = require("./utils");
const Response_1 = require("./types/Response");
const notion = new client_1.Client({ auth: env_1.env.NOTION_TOKEN });
const getDatabaseSchema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const database_id = env_1.env.DATABASE_ID;
    const response = yield notion.databases.retrieve({
        database_id,
    });
    console.log(response);
    res.json(response);
});
exports.getDatabaseSchema = getDatabaseSchema;
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const database_id = env_1.env.DATABASE_ID;
        const { filter } = req.body;
        const filterProperty = (0, utils_1.filterMapper)(filter);
        const response = yield notion.databases.query({
            database_id,
            filter: filterProperty,
        });
        let responseBody = response.results.map((page) => {
            return (0, utils_1.pageToMovieMapper)(page);
        });
        console.log(response);
        res.json(new Response_1.GeneralResponse(200, "success", false, responseBody).getResponse());
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});
exports.getMovies = getMovies;
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const database_id = env_1.env.DATABASE_ID;
        console.log(req.body);
        const { title, ratings, isWatched, watchedDate, comment } = req.body.movie;
        const movieToAdd = (0, utils_1.movieMapper)(title, comment, isWatched, watchedDate, ratings);
        console.log(movieToAdd);
        const response = (0, utils_1.pageToMovieMapper)(yield notion.pages.create({
            parent: { database_id },
            //TODO - reate a utils function to create the properties
            properties: {
                Title: {
                    title: [
                        {
                            text: {
                                content: movieToAdd.title,
                            },
                        },
                    ],
                },
                Watched: {
                    checkbox: movieToAdd.isWatched,
                },
                Date_Watched: {
                    date: {
                        start: movieToAdd.watchedDate,
                        end: null,
                    },
                },
                Comment: {
                    rich_text: [
                        {
                            text: {
                                content: movieToAdd.comment,
                            },
                        },
                    ],
                },
                Ratings: {
                    select: {
                        name: movieToAdd.ratings,
                    },
                },
            },
        }));
        res.json(new Response_1.GeneralResponse(200, "success", false, response).getResponse());
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});
exports.addMovie = addMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const database_id = env_1.env.DATABASE_ID;
        console.log("Older Version", req.body.movie);
        const { movie } = req.body;
        const newObjectProperties = (0, utils_1.updatedMoviePropertyMapper)(movie);
        const response = yield notion.pages.update({
            page_id: movie.id,
            properties: Object.assign({}, newObjectProperties),
        });
        console.log(response);
        res.json(new Response_1.GeneralResponse(200, "success", false, response).getResponse());
    }
    catch (error) { }
});
exports.updateMovie = updateMovie;
//# sourceMappingURL=database.controller.js.map