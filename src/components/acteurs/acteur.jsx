import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getActorInformations } from "../../services/betaseries";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Actor() {
  const [actor, setActor] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const id = useParams().id;
  const photo = `https://api.betaseries.com/pictures/persons?client_id=${process.env.REACT_APP_APIKEY}&id=${id}`;

  useEffect(() => {
    fetchActorInformations(id);
  }, []);

  async function fetchActorInformations(id){
    try {
      const actorInformations = await getActorInformations(id);
      console.log(actorInformations);
      setActor(actorInformations.person);
    } catch (error) {
      console.log(error)
      setError("Erreur durant la récupération des informations")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="md:mx-20 lg:mx-80 p-4 border-2">
        { !error ? (
          <div className="flex flex-col items-center md:items-stretch lg:flex-row">
            <div className="w-full mr-4 items-center">
              { isLoading && (
                <>
                  <Skeleton className="text-4xl w-full font-bold underline mb-4" />
                  <Skeleton height="500px"/>
                </>
              )}
              { !isLoading && (
                <>
                  <h1 className="text-4xl font-bold underline mb-4">
                    {actor && actor.name}
                  </h1>
                  <img
                    src={photo ?? "https://via.placeholder.com/200x300"}
                    alt=""
                    style={{ minWidth: "300px", maxWidth: "450px" }}
                  />
                </>
              )}
            </div>
            <div className="w-full flex">
              <div className="flex flex-col">
                <h1 className="text-2xl underline mb-4 mt-2">Filmographie:</h1>
                <ul>
                  {isLoading && (
                    <Skeleton count={8} />
                  )}
                  {!isLoading && actor?.shows.map((show) => {
                    return (
                      <li className="text-xl text-blue-700 hover:text-blue:900">
                        -
                        <a className="underline" href={"/series/" + show.show.id}>
                          {show.show.title}
                        </a>
                        :
                        <span className="text-base text-black">{show.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        ) : (
            <h1 className="text-red-600">{error}</h1>
        )}
      </div>
    </div>
  );
}
