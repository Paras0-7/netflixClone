import { useEffect, useState } from "react";
import axios from "../../axios";
import { requests } from "../../requests";
import "./Header.css";
export const Header = function (props) {
  const [movie, setMovie] = useState([]);

  useEffect(
    function () {
      async function fetchData() {
        const req = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          req.data.results[
            Math.floor(Math.random() * req.data.results.length - 1)
          ]
        );
      }

      fetchData();
    },
    [setMovie]
  );

  const truncate = function (string, n) {
    return string?.length > n ? string.substr(0, n - 1) + " ..." : string;
  };
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="description">{truncate(movie?.overview, 200)}</h1>
      </div>
      <div className="fadeBottom"></div>
    </header>
  );
};
