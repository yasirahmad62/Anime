import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (urlData) => {
    console.log(urlData.page);
    console.log(urlData.query);
    console.log("query text 11--> ", urlData.query);
    console.log("FF");
    console.log(urlData);
    console.log(urlData.page, "TTTTT");
    const movie_url =
      `/v3/search/anime?q=` +
      (urlData.query ? urlData.query : "<query>") +
      `&limit=16&page=${urlData.page}`;
    console.log(movie_url);
    const response = await movieApi.get(movie_url);
    return response.data;
  }
);

export const fetchAsyncMoviesBySearch = createAsyncThunk(
  "movies/fetchAsyncMoviesBySearch",
  async (urlData) => {
    console.log(urlData.page);
    console.log(urlData.query);
    console.log("query text --> ", urlData.query);
    console.log(urlData.page, "TTTTT");
    const movie_url =
      `/v3/search/anime?q=` +
      (urlData.query ? urlData.query : "<query>") +
      `&limit=16&page=${urlData.page}`;
    console.log(movie_url);
    const response = await movieApi.get(
      // `/v3/search/anime?${query ? 'q='+query : ''}&limit=16&page=${page}`
      movie_url
    );
    return response.data;
  }
);

const fetchNewMovies = async (page) => {
  const response = await movieApi.get(
    `/v3/search/anime?q=<query>&limit=16&page=${page}`
  );

  console.log("pg -> ", initialState.page_number);
  return response.data;
};

const initialState = {
  movies: [],
  movieQuery: null,
  page_number: 1,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    incrementPageNumber: (state) => {
      state.page_number += 1;
    },
    setmovieQuery: (state, query) => {
      return { ...state, movieQuery: query };
    },
    fetchMoviesWithPage: (state) => {
      console.log();
      const new_movies = fetchNewMovies;
      console.log("New ");
      console.log(new_movies);
      // const new_movies = movieApi.get(`/v3/search/anime?q=<query>&limit=16&page=${initialState.page_number}`);
      // console.log(new_movies);
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, movies: [...state.movies, ...payload.results] };
    },
    [fetchAsyncMoviesBySearch.fulfilled]: (state, { payload }) => {
      console.log("Search Successfully!");
      // state.movies = [];
      return { ...state, movies: payload.results };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected!");
    },
  },
});

export const {
  incrementPageNumber,
  fetchMoviesWithPage,
  setmovieQuery,
} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;

export const getPageNumber = (state) => state.movies.page_number;
export const getNewMovies = (state) => fetchAsyncMovies;
export default movieSlice.reducer;
