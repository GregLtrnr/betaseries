import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FollowButton from './followShowButton.jsx'
export default function Home(){
    const [series, setSeries] = useState([]);
    const [randomSeries, setRandomSeries] = useState([]);
    const [popularFilms,setPopularFilms] = useState([]);
    const [userSeries, setUserSeries] = useState([]);
    useEffect(() => {
        //séries du moment
        axios.get('https://api.betaseries.com/shows/discover?client_id=' + process.env.REACT_APP_APIKEY + '&limit=30')
        .then(function (response) {
            setSeries(response.data.shows)
        }).catch(function (error) {
            console.log(error);
        })
        //films du moment
        axios.get('https://api.betaseries.com/movies/discover?client_id=' + process.env.REACT_APP_APIKEY + '&limit=30&type=popular')
        .then(function (response) {
            setPopularFilms(response.data.movies)
        }).catch(function (error) {
            console.log(error);
        })
        if(localStorage.getItem('token')){
            //séries suivies
            axios.get('https://api.betaseries.com/shows/member?client_id=' + process.env.REACT_APP_APIKEY + '&access_token=' + localStorage.getItem('token'))
            .then(function (response) {
                setUserSeries(response.data.shows)
            }).catch(function (error) {
                console.log(error);
            })
        }
        axios.get('https://api.betaseries.com/shows/random?client_id=' + process.env.REACT_APP_APIKEY + '&nb=30')
        .then(function (response) {
            setRandomSeries(response.data.shows.filter(serie => serie.images.poster !== null))
        }).catch(function (error) {
            console.log(error);
        })
    }, [])

    return (
        <div className="w-full flex flex-col mb-4">

            <h1 className='text-3xl underline mb-2 mx-4'>Séries tendances</h1>
            <div className="flex items-center hover:overflow-x-scroll overflow-hidden hover:overflow-y-hidden hover:cursor-pointer">
                {series && series.map((serie, index) => {
                    return (
                        <div key={index} className="relative flex flex-col items-center mx-4 border-2" style={{minWidth:'250px', width: '250px', height : '475px'}}>
                            <img className=''src={serie.images.poster ? serie.images.poster : 'https://via.placeholder.com/246x362'} alt=""/>
                            <FollowButton
                             id={serie.id}
                             followed={userSeries.find(userSerie => userSerie.id === serie.id) != undefined ? true : false}
                             />
                            <h1 className='justify-center mb-5 text-center'>{serie.title}</h1>
                            <a href={'http://localhost:3000/series/' + serie.id} className='btn btn-blue bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded justify-center'>Voir la série</a>
                        </div>
                    )
                })}
                </div>
                <h1 className='text-3xl underline mb-2 mx-4'>Séries aléatoires</h1>
                <div className="flex items-center hover:overflow-x-scroll overflow-hidden hover:overflow-y-hidden hover:cursor-pointer">

                {randomSeries && randomSeries.map((serie, index) => {
                    return (
                        <div  key={index} className="relative flex flex-col items-center mx-4 border-2" style={{minWidth:'250px', width: '250px', height : '475px'}}>
                            <img className=''src={serie.images.poster ? serie.images.poster : 'https://via.placeholder.com/246x362'} alt=""/>
                            <FollowButton
                             id={serie.id}
                             followed={userSeries.find(userSerie => userSerie.id === serie.id) != undefined ? true : false}
                             />
                            <h1 className='justify-center mb-5 text-center'>{serie.title}</h1>
                            <a href={'http://localhost:3000/series/' + serie.id} className='btn btn-blue bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded justify-center'>Voir la série</a>
                        </div>
                    )
                })}
                </div>
                <h1 className='text-3xl underline mb-2 mx-4'>Films populaires</h1>
                <div className="flex items-center hover:overflow-x-scroll overflow-hidden hover:overflow-y-hidden hover:cursor-pointer">

                {popularFilms && popularFilms.map((film, index) => {
                    return (
                        <div key={index} className="relative flex flex-col items-center mx-4 border-2" style={{minWidth:'250px', width: '250px', height : '475px'}}>
                            <img className='' src={film.poster ? film.poster : 'https://via.placeholder.com/246x362'} alt=""/>
                            <h1 className='justify-center mb-5 text-center'>{film.title}</h1>
                            <a href={'http://localhost:3000/film/' + film.id} className='btn btn-blue bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded justify-center'>Voir le film</a>
                        </div>
                    )
                })}
                </div>

        </div>
    );
}