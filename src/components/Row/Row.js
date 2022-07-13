import { useState, useEffect } from "react";
import axios from "./../../axios";
export const Row = function (props) {
  const [movies, setMovies] = useState([]);

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
    <div>
      {/* title */}
      <h2>{props.title}</h2>
      {/* images */}
    </div>
  );
};
