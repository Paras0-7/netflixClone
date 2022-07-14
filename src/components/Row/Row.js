import { useState, useEffect } from "react";
import axios from "./../../axios";
import "./row.css";
export const Row = function (props) {
  const [movies, setMovies] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(
    function () {
      async function fetchData() {
        const request = await axios.get(props.fetchUrl);
        setMovies(request.data.results);
      }

      fetchData();
    },
    [props.fetchUrl]
  );
  return (
    <div className="row">
      {/* title */}
      <h2>{props.title}</h2>
      {/* images */}
      <div className="row-posters">
        {movies.map(function (movie) {
          return (
            <img
              className={`row-poster ${props.isLargeRow && "row-posterLarge"}`}
              src={`${baseUrl}${
                props.isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              key={movie.id}
            />
          );
        })}
      </div>
    </div>
  );
};
