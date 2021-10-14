import { createSlice } from "@reduxjs/toolkit";

const initialMovieState = {
  all: [],
  image: null,
  movieForReview: null
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
    }
  },
});

export const movieActions = movieSlice.actions;

export default movieSlice;
