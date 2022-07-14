import { useEffect, useState } from "react";
import axios from "./../../axios";
import { requests } from "../../requests";
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
  return (
    <header>
      <div></div>
    </header>
  );
};
