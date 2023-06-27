import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function Search() {
  const [results, setResults] = useState([]);
  const [text, setText] = useState(useParams().text);
  useEffect(() => {
    if (text !== undefined && text !== "") {
      axios
        .get(
          "https://api.betaseries.com/search/shows?client_id=" +
            process.env.REACT_APP_APIKEY +
            "&text=" +
            text
        )
        .then(function (response) {
          setResults(response.data.shows);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);
  return (
    <div>
      <h1 className="text-3xl underline mb-2 mx-4">Résultats:</h1>
      <div className="flex items-center hover:overflow-x-scroll overflow-hidden hover:overflow-y-hidden hover:cursor-pointer">
        {results &&
          results.map((result) => {
            console.log(result);
            return (
              <div
                className="relative flex flex-col items-center mx-4 border-2"
                style={{
                  minWidth: "250px",
                  width: "250px",
                  height: "475px",
                }}
              >
                <img
                  src={result.poster ?? "https://via.placeholder.com/246x362"}
                  alt=""
                />
                <h1 className="justify-center mb-5 text-center">
                  {result.title}
                </h1>
                <a
                  href={`http://localhost:3000/series/${result.id}`}
                  className="btn btn-blue bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded justify-center"
                >
                  Voir la série
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}
