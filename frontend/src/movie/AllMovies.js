import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../store/movie/movie-actions";

import SearchMovieCard from "./SearchMovieCard";
import './AllMovies.css'

const AllMovies = (props) => {
  const dispatch = useDispatch();
  const movies = props.movies;
  
  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  return (
    <div className="all-movies">
      {movies.map((movies) => (
        <SearchMovieCard
          title={movies.title}
          publishingDate={new Date(movies.publishedDate)}
          body={movies.body}
          image={movies.image ? `http://localhost:1339/${movies.image}` : 'https://cdn.britannica.com/q:60/91/181391-050-1DA18304/cat-toes-paw-number-paws-tiger-tabby.jpg'}
          key={movies._id}
          id={movies._id}
          owner={movies.owner}
        />
      ))}
    </div>
  );
};

export default AllMovies;
