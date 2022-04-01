import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  getAllMovies,
  getPageNumber,
  incrementPageNumber,
  getNewMovies,
  fetchMoviesWithPage,
} from "../../features/movies/movieSlice";
import { store } from "../../features/store";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";
const MovieListing = () => {
  const dispatch = useDispatch();
  const new_state = store.getState();
  useEffect(() => {
    dispatch(fetchAsyncMovies({ page: new_state.movies.page_number }));
  }, [dispatch]);

  const movies = useSelector(getAllMovies);
  console.log(movies);
  movies.map((movie, index) => {
    console.log(movie);
  });
  const page_number = useSelector(getPageNumber);
  // const dispatch = useDispatch();

  const loadMore = () => {
    dispatch(incrementPageNumber());
    dispatch(
      fetchAsyncMovies({
        page: new_state.movies.page_number + 1,
        query: new_state.movies.movieQuery
          ? new_state.movies.movieQuery.payload
          : null,
      })
    );
  };
  let renderMovies;

  renderMovies = movies ? (
    movies.map((movie, index) => <MovieCard key={index} data={movie} />)
  ) : (
    <div className="movies-error">
      <h3>{movies.Error}</h3>
    </div>
  );
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Animes</h2>
        <div className="movie-container">{renderMovies}</div>
      </div>
      <button onClick={loadMore} className="load-but">
        Load More
      </button>
    </div>
  );
};

export default MovieListing;
