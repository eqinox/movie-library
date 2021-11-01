import { createSlice } from "@reduxjs/toolkit";

const initialMovieState = {
  all: [],
  filtered: [],
  image: null,
  movieForReview: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState: initialMovieState,
  reducers: {
    getAll(state, action) {
      state.all = action.payload;
    },
    setMovieForReview(state, action) {
      state.movieForReview = action.payload;
    },
    getAllByTitle(state, action) {
      const re = new RegExp(action.payload, "gi");
      const filtered = state.all.filter((movie) => {
        return movie.title.match(re);
      });
      if (filtered.length > 0) {
        state.filtered = filtered;
      } else {
        state.filtered = [];
      }
    },
    deleteMovie(state, action) {
      const movieId = action.payload;
      const indexofAll = state.all.findIndex((item) => item._id === movieId);
      const indexofFiltered = state.filtered.findIndex(
        (item) => item._id === movieId
      );
      if (indexofAll !== -1) {
        state.all.splice(indexofAll, 1);
      } else {
        console.log("movie not found");
      }
      if (indexofFiltered !== -1) {
        state.filtered.splice(indexofFiltered, 1);
      } else {
        console.log("movie of filtered not found");
      }
    },
    voteForMovie(state, action) {
      // TODO: 
      // const movieId = action.payload.movieId;
      // const number = action.payload.totalVote;
      // console.log(movieId);
      // console.log(number);

      // const index = state.all.indexOf((item) => {
      //   return item.id === movieId;
      // });
      // state.all[index].totalVote = number;
    },
  },
});

export const movieActions = movieSlice.actions;

export default movieSlice;
