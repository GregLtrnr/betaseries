import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Similaires(props) {
  const [similairesSeries, setSimilairesSeries] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.betaseries.com/shows/similars?client_id=" +
          process.env.REACT_APP_APIKEY +
          "&id=" +
          props.id
      )
      .then(function (response) {
        let text = [];
        response.data.similars.map((serie, index) => {
          text.push(serie.show_id);
        });
        text = text.slice(0, 5);
        const ids = text.join(",");
        axios
          .get(
            "https://api.betaseries.com/shows/display?client_id=" +
              process.env.REACT_APP_APIKEY +
              "&id=" +
              ids
          )
          .then(function (response) {
            setSimilairesSeries(response.data.shows);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h2>Séries similaires:</h2>
      <div className="flex flex-col md:flex-row flex-wrap">
        {similairesSeries &&
          similairesSeries.map((similaire, index) => {
            return (
              <div
                key={index}
                className="w-1/6 m-5 border-2 flex flex-col items-center"
                style={{ width: "300px" }}
              >
                <a href={"/series/" + similaire.id}>
                  <img
                    src={similaire.images.poster}
                    alt=""
                    style={{ minWidth: "300px" }}
                  />
                </a>
                <h1 className="text-1xl font-normal leading-normal mt-0 mb-2 text-gray-800">
                  {similaire.title}
                </h1>
              </div>
            );
          })}
      </div>
    </div>
  );
}
