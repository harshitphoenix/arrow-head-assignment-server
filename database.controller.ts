import { Client } from "@notionhq/client";
import { Request, Response } from "express";
import { env } from "./env";
import {
  filterMapper,
  movieMapper,
  pageToMovieMapper,
  updatedMoviePropertyMapper,
} from "./utils";
import { GeneralResponse } from "./types/Response";
const notion = new Client({ auth: env.NOTION_TOKEN });

export const getDatabaseSchema = async (req: Request, res: Response) => {
  const database_id = env.DATABASE_ID as string;
  const response = await notion.databases.retrieve({
    database_id,
  });
  console.log(response);
  res.json(response);
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const database_id = env.DATABASE_ID as string;
    const { filter } = req.body;
    const filterProperty = filterMapper(filter);
    const response = await notion.databases.query({
      database_id,
      filter: filterProperty as any,
    });
    let responseBody = response.results.map((page) => {
      return pageToMovieMapper(page);
    });
    console.log(response);
    res.json(
      new GeneralResponse(200, "success", false, responseBody).getResponse()
    );
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const addMovie = async (req: Request, res: Response) => {
  try {
    const database_id = env.DATABASE_ID as string;
    console.log(req.body);

    const { title, ratings, isWatched, watchedDate, comment } = req.body.movie;
    const movieToAdd = movieMapper(
      title,
      comment,
      isWatched,
      watchedDate,
      ratings
    );
    console.log(movieToAdd);
    const response = pageToMovieMapper(
      await notion.pages.create({
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
      })
    );

    res.json(
      new GeneralResponse(200, "success", false, response).getResponse()
    );
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const database_id = env.DATABASE_ID as string;
    console.log("Older Version",req.body.movie);
    const { movie } = req.body;
    const newObjectProperties = updatedMoviePropertyMapper(movie);
    const response = await notion.pages.update({
      page_id: movie.id,
      properties: {
        ...newObjectProperties,
      },
    });
    console.log(response);
    res.json(
      new GeneralResponse(200, "success", false, response).getResponse()
    );
  } catch (error) {}
};
