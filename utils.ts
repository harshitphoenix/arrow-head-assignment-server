export const filterMapper = (filter: string | undefined) => {
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

export const movieMapper = (
  title: string,
  comment: string,
  isWatched: string,
  watchedDate: string,
  ratings: string
) => {
  return {
    title: title as string,
    isWatched: isWatched === "true",
    watchedDate: watchedDate as string,
    comment: comment as string,
    ratings: ratings as string,
  };
};

export const pageToMovieMapper = (page: any) => {
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

export const updatedMoviePropertyMapper = (movie: any) => {
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
