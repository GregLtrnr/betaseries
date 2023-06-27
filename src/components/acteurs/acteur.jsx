import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function Actor() {
  const id = useParams().id;
  const [actor, setActor] = useState();
  const photo = `https://api.betaseries.com/pictures/persons?client_id=${process.env.REACT_APP_APIKEY}&id=${id}`;
  useEffect(() => {
    axios
      .get(
        "https://api.betaseries.com/persons/person?client_id=" +
          process.env.REACT_APP_APIKEY +
          "&id=" +
          id
      )
      .then(function (response) {
        setActor(response.data.person);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="md:mx-20 lg:mx-80 p-4 border-2">
        <div className="flex flex-col items-center md:items-stretch lg:flex-row">
          <div className="flex flex-col mr-4 items-center">
            <h1 className="text-4xl font-bold underline mb-4">
              {actor && actor.name}
            </h1>
            <img
              src={photo ?? "https://via.placeholder.com/200x300"}
              alt=""
              style={{ minWidth: "300px", maxWidth: "450px" }}
            />
          </div>
          <div className="w-full flex">
            <div className="flex flex-col">
              <h1 className="text-2xl underline mb-4 mt-2">Filmographie:</h1>
              <ul>
                {actor?.shows.map((show) => {
                  return (
                    <li className="text-xl text-blue-700 hover:text-blue:900">
                      -{" "}
                      <a className="underline" href={"/series/" + show.show.id}>
                        {show.show.title}
                      </a>{" "}
                      :{" "}
                      <span className="text-base text-black">{show.name}</span>{" "}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
