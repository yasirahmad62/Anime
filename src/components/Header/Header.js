import React, { useState, useEffect } from "react";
import {
  fetchAsyncMoviesBySearch,
  getAllMovies,
  setmovieQuery,
  getPageNumber,
  incrementPageNumber,
  getNewMovies,
  fetchMoviesWithPage,
} from "../../features/movies/movieSlice";
import { store } from "../../features/store";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const new_state = store.getState();

  const [searchText, setSearchText] = useState("");

  const searchMovie = (event) => {
    console.log("5555");
    console.log(new_state.movies.movieQuery);
    event.preventDefault();
    console.log(searchText);
    console.log("Searching...");
    // console.log(searchText)
    dispatch(setmovieQuery(searchText));
    dispatch(fetchAsyncMoviesBySearch({ page: 1, query: searchText }));
  };

  return (
    <div className="header">
      <div class="search">
        <input
          type="text"
          placeholder="search for an anime, e.g Naruto"
          name="name"
          className="input searchTerm"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input
          type="submit"
          className="searchButton"
          onClick={searchMovie}
          value="Go"
        />
      </div>
      <div className="para-div">
        <p className="paragraph">
          https://api.jikan.moe/v3/search/anime?q={searchText}
        </p>
      </div>
    </div>
  );
};

export default Header;
