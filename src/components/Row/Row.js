import { useState, useEffect } from "react";
import axios from "./../../axios";
import "./row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
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

  const [trailerUrl, setTrailerUrl] = useState("");
  let prevMovie = "";
  const clickHandler = function (movie) {
    if (
      (trailerUrl && prevMovie === movie?.name) ||
      prevMovie === movie?.title
    ) {
      setTrailerUrl("");
    } else {
      const query = movie?.name || movie?.title || " ";
      prevMovie = query;
      movieTrailer(query)
        .then(function (url) {
          // console.log(prevMovie, query);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoPlay: 1,
    },
  };
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
              onClick={() => clickHandler(movie)}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
