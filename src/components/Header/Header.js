import React, { useState, useEffect } from "react";
import {
  fetchAsyncMoviesBySearch,
  setmovieQuery,
  setMoviewPageLimit,
  resetPageNumber,
} from "../../features/movies/movieSlice";
import { store } from "../../features/store";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const new_state = store.getState();

  const [searchText, setSearchText] = useState("");
  const [searchPage, setPage] = useState("");

  const searchMovie = (event) => {
    event.preventDefault();
    dispatch(resetPageNumber());
    dispatch(setmovieQuery(searchText));
    dispatch(setMoviewPageLimit(searchPage));
    dispatch(
      fetchAsyncMoviesBySearch({
        page: 1,
        query: searchText,
        pageNum: searchPage,
      })
    );
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
        <select id="dropdown" onChange={(e) => setPage(e.target.value)}>
          <option value="N/A">Select page limit</option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
        </select>
      </div>
      <div className="para-div">
        <p className="paragraph">
          <span className="para-span">Requesting: </span>
          https://api.jikan.moe/v3/search/anime?q={searchText}
        </p>
      </div>
    </div>
  );
};

export default Header;
