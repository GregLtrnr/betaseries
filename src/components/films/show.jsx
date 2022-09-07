import axios from 'axios'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import DistributionMovie from './Distribution';
export default function FilmShow(){
    const id = useParams().id;
    const [film, setFilm] = useState()
    useEffect(()=>{
        axios('https://api.betaseries.com/movies/movie?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + id)
        .then(function (response) {
            setFilm(response.data.movie)
            console.log(response.data.movie)
        }).catch(function (error) {
            console.log(error);
        })
    },[])
    return(
        <div className='w-full flex flex-col justify-center bg-gray-50'>
            <div className='mx-10 p-4 border-2 bg-white'>        
                <div className="flex flex-col items-center md:items-stretch lg:flex-row">
                    <div className="flex flex-col mr-4">
                        <img src={film && film.poster} alt="" style={{minWidth : '200px',maxWidth: '450px'}} />
                    </div>
                    <div className="flex flex-col mr-4">
                        <h1 className='text-4xl font-bold mb-4'>{film && film.title} ({film && film.production_year})</h1>
                        <h3 className='text-xl font-bold'>Synopsis</h3>
                        <p>{film && film.synopsis}</p>
                        <h3 className='text-xl font-bold'>Genre</h3>
                        <div className="flex">
                            {film && film.genres.map((genre, index) => {
                                return(
                                    <p key={index} className='border'>{genre}</p>
                                    )
                            })}
                        </div>
                        <h3 className='text-xl font-bold'>Durée du film</h3>
                        <p>{film && film.length/60} mn</p>
                        <h3 className='text-xl font-bold'>Regarder sur:</h3>
                        <div className="flex">
                            {film && film.platform_links.map((stream, index) => {
                                return(
                                    <a href={stream.link}>
                                        <p key={index} className='border p-3' style={{backgroundColor:stream.color}}>{stream.platform}</p>
                                    </a>
                                    )
                            })}
                        </div>
                    </div>

                </div>
                <DistributionMovie id={id}/>
            </div>
        </div>
    )
}