import React, { useState, useEffect } from "react";
import CardCarrousel from "./CardCarrousel.jsx";
import { getPopularShows, getPopularMovies, getRandomShows, getUserShows } from "../services/betaseries.js";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
  const [popularShows, setPopularShows] = useState([]);
  const [randomShows, setRandomShows] = useState([]);
  const [popularFilms, setPopularFilms] = useState([]);
  const [userShows, setUserShows] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const accessToken = localStorage.getItem("token");

  async function fetchData() {
    try {
      const [popularShowsData, randomSeriesData, popularFilmsData, userSeriesData] = await Promise.all([
        getPopularShows(),
        getRandomShows(),
        getPopularMovies(),
        getUserShows(accessToken)
      ]);
      const filteredPopularShows = popularShowsData.shows.filter((serie) => serie.images.poster !== (undefined || null));
      setRandomShows(randomSeriesData.shows.filter((serie) => serie.images.poster !== (undefined || null)));
      setPopularFilms(popularFilmsData.movies);
      setUserShows(userSeriesData.shows);
      setPopularShows(filteredPopularShows.map((serie, index) => {
        if (userShows.find((userSerie) => userSerie.id === serie.id)) {
          serie.followed = true;
        }
        return serie;
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-screen flex flex-col mb-4">
      <h1 className="text-3xl underline mb-2 mx-4">Séries tendances</h1>
      { isLoading && (
        <SkeletonCarrousel />
      )}
      { !isLoading && popularShows.length > 0 && (
        <>
          <CardCarrousel 
            items={popularShows} 
            displayFollowButton={true} 
            type="series"
          />
        </>
      )}
      <h1 className="text-3xl underline mb-2 mx-4">Séries aléatoires</h1>
      { isLoading && (
        <SkeletonCarrousel />
      )}
      { !isLoading && randomShows.length > 0 && (
        <>
          <CardCarrousel 
            items={randomShows} 
            displayFollowButton={true} 
            type="series"
          />
        </>
      )}
      <h1 className="text-3xl underline mb-2 mx-4">Films populaires</h1>
      { isLoading && (
        <SkeletonCarrousel />
      )}
      { !isLoading && popularFilms.length > 0 && (
        <>
          <CardCarrousel 
            items={popularFilms} 
            type="films"
          />
        </>
      )}

    </div>
  );
}

function SkeletonCarrousel() {
  return (
    <div className="flex items-center hover:overflow-x-scroll overflow-hidden hover:overflow-y-hidden hover:cursor-pointer">
      {Array(10).fill().map((item, index) => {
        return(
          <div
            key={index}
            className="relative flex flex-col items-center mx-4 border-2"
            style={{ minWidth: "250px", width: "250px", height: "475px" }}
          >
            <Skeleton height={362} width={246} />
            <Skeleton height={30} width={246} />
            <Skeleton height={40} width={150} />
          </div>
        )
      })}
              
    </div>
  )
}
