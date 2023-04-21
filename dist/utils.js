"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedMovieMapper = exports.pageToMovieMapper = exports.movieMapper = exports.filterMapper = void 0;
const filterMapper = (filter) => {
    switch (filter) {
        case "watched":
            return {
                property: "Watched",
                checkbox: {
                    equals: true,
                },
            };
        case "notWatched":
            return {
                property: "Watched",
                checkbox: {
                    equals: false,
                },
            };
        default:
            return undefined;
    }
};
exports.filterMapper = filterMapper;
const movieMapper = (title, comment, isWatched, watchedDate, ratings) => {
    return {
        title: title,
        isWatched: isWatched === "true",
        watchedDate: watchedDate,
        comment: comment,
        ratings: ratings,
    };
};
exports.movieMapper = movieMapper;
const pageToMovieMapper = (page) => {
    if ("properties" in page) {
        return {
            id: page.id,
            title: page.properties.Title,
            ratings: page.properties.Ratings,
            isWatched: page.properties.Watched,
            watchedDate: page.properties.Date_Watched,
            comment: page.properties.Comment,
        };
    }
};
exports.pageToMovieMapper = pageToMovieMapper;
const updatedMovieMapper = (movie) => {
    const updatedMovieProperties = {
        Title: {
            title: [
                {
                    text: {
                        content: movie.title,
                    },
                },
            ],
        },
        Watched: {
            checkbox: movie.isWatched,
        },
        Date_Watched: {
            date: {
                start: movie.watchedDate,
                end: null,
            },
        },
        Comment: {
            rich_text: [
                {
                    text: {
                        content: movie.comment,
                    },
                },
            ],
        },
        Ratings: {
            select: {
                name: movie.ratings,
            },
        },
    };
    return updatedMovieProperties;
};
exports.updatedMovieMapper = updatedMovieMapper;
//# sourceMappingURL=utils.js.map