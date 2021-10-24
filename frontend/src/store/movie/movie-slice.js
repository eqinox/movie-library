import { createSlice } from "@reduxjs/toolkit";

const initialMovieState = {
  all: [],
  filtered: [],
  image: null,
  movieForReview: null,
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
    voteForMovie(state, action) {
      console.log(action.payload);
      // const movieId = action.payload.movieId;
      // const number = action.payload.totalVote;
      // console.log(movieId);
      // console.log(number);
      // console.log("asd)");

      // const index = state.all.indexOf((item) => {
      //   return item.id === movieId;
      // });
      // state.all[index].totalVote = number;
    },
  },
});

export const movieActions = movieSlice.actions;

export default movieSlice;
