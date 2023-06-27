import axios from "axios";
import { useEffect, useState } from "react";
export default function DistributionMovie(props) {
  const [acteurs, setActeurs] = useState();
  useEffect(() => {
    axios
      .get(
        `https://api.betaseries.com/movies/characters?client_id=${process.env.REACT_APP_APIKEY}&id=${props.id}`
      )
      .then(function (response) {
        setActeurs(response.data.characters.slice(0, 20));
        console.log();
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  function actorPage(id) {
    window.location.href = `/acteur/${id}`;
  }
  return (
    <div className="mt-4">
      <h1>Distribution:</h1>
      <div className="flex flex-col md:flex-row items-center hover:overflow-x-scroll overflow-hidden hover:overflow-y-hidden cursor-pointer">
        {acteurs &&
          acteurs.map((char, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  actorPage(char.person_id);
                }}
                className="flex flex-col items-center mx-4"
                style={{
                  minWidth: "200px",
                  width: "200px",
                  height: "380px",
                }}
              >
                <img
                  src={
                    `https://api.betaseries.com/pictures/persons?client_id=${process.env.REACT_APP_APIKEY}&id=${char.person_id}` ??
                    "https://via.placeholder.com/200x300"
                  }
                  alt=""
                />
                <p className="text-xl text-center text-blue-700">
                  {char.actor}
                </p>
                <p className="text-center">{char.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
