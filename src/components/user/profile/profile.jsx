import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get(
        "https://api.betaseries.com/members/infos?client_id=" +
          process.env.REACT_APP_APIKEY +
          "&access_token=" +
          localStorage.getItem("token")
      )
      .then(function (response) {
        setUser(response.data.member);
        console.log(response.data.member);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="md:mx-20 lg:mx-40 p-4 border-2">
        <div className="flex flex-col items-center md:items-stretch lg:flex-row">
          <div className="flex flex-col mr-4 items-center">
            <img
              src={user && user.avatar}
              alt=""
              style={{ minWidth: "300px", maxWidth: "450px" }}
            />
          </div>
          <div className="w-full flex">
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-4xl font-bold underline mb-4">
                {user && user.login}
              </h1>
              <h1 className="text-2xl mb-4 mt-2">
                Genre favori:{" "}
                {user && user.stats.favorite_genre
                  ? user.stats.favorite_genre
                  : "aucun"}{" "}
              </h1>
              <h1 className="text-2xl mb-4 mt-2">
                Nombre de série suivi:{" "}
                {user && user.stats.shows ? user.stats.shows : "0"}{" "}
              </h1>
              <h1 className="text-2xl mb-4 mt-2">
                Progression des séries suivis:{" "}
                {user && user.stats.progress ? user.stats.progress : "0"} %{" "}
              </h1>
              <h1 className="text-2xl mb-4 mt-2">
                Nombre de séries terminés:{" "}
                {user && user.stats.shows_finished
                  ? user.stats.shows_finished
                  : "0"}{" "}
                / {user && user.stats.shows}{" "}
              </h1>
              <h1 className="text-2xl mb-4 mt-2">
                Nombre de badges obtenus:{" "}
                {user && user.stats.badges ? user.stats.badges : "0"}{" "}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
