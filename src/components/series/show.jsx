import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Distribution from './Distribution';
import SeriesSimilaires from './SeriesSimilaires'
import SaisonsEpisodes from './SaisonsEpisodes'
import Commentaires from '../commentaires';
export default function Show(){
    const slug = useParams().slug;
    const [serie, setSerie] = useState();
    const [added, setAdded] = useState(false);
    const [archived, setArchived] = useState(false);
    const [userSeries, setUserSeries] = useState([]);
    useEffect(() => {
        //get serie info
        axios.get('https://api.betaseries.com/shows/display?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + slug)
        .then(function (response) {
            setSerie(response.data.show);
        }).catch(function (error) {
            console.log(error);
        })

        //séries suivies
        if(localStorage.getItem('token')){
            axios.get('https://api.betaseries.com/shows/member?client_id=' + process.env.REACT_APP_APIKEY + '&access_token=' + localStorage.getItem('token'))
            .then(function (response) {
                setUserSeries(response.data.shows)
                if(response.data.shows.find(serie => serie.id == slug) !== undefined){
                    setAdded(true)
                }
                if(response.data.shows.find(serie => serie.id == slug).user.archived == true){
                    setArchived(true)
                }
            }).catch(function (error) {
                console.log(error);
            })
        }
    }, [])
    function followSerie(){
        axios.post('https://api.betaseries.com/shows/show?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + slug + '&access_token=' + localStorage.getItem('token'))
        .then(function (response) {
            console.log("success")
        }).catch(function (error) {
            console.log(error);
        })
    }
    function unfollowSerie(){
        
        axios.delete('https://api.betaseries.com/shows/show?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + slug + '&access_token=' + localStorage.getItem('token'))
        .then(function (response) {
            console.log("success")
        }).catch(function (error) {
            console.log(error);
        })
    }
    function archiveSerie(){
        axios.post('https://api.betaseries.com/shows/archive?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + slug + '&access_token=' + localStorage.getItem('token'))
        .then(function (response) {
            console.log("success")
        }).catch(function (error) {
            console.log(error);
        })
    }
    function unarchiveSerie(){
        axios.delete('https://api.betaseries.com/shows/archive?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + slug + '&access_token=' + localStorage.getItem('token'))
        .then(function (response) {
            console.log("success")
        }).catch(function (error) {
            console.log(error);
        })
    }
    return (
        <div className='w-full flex flex-col justify-center bg-gray-50'>
            <div className='mx-10 p-4 border-2 bg-white'>        
                <div className="flex flex-col items-center md:items-stretch lg:flex-row">

                    <div className="flex flex-col mr-4">
                        <img src={serie && serie.images.poster} alt="" style={{minWidth : '200px',maxWidth: '450px'}} />
                    </div>
                    <div className="w-full flex flex-col">
                        <h1 className='text-5xl font-normal leading-normal mt-0 mb-2 text-gray-800' >{serie && serie.title}</h1>
                        <p>{serie && serie.description}</p>
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <h2>Genre:</h2>
                        <div className='flex'>
                            {serie && Object.keys(serie.genres).map((genre, index) => {
                                return(
                                    <p key={index} className='border '>{genre}</p>
                                    )
                                })}
                        </div>
                        <h2>Nombre de saisons:</h2>
                        <p>{serie && serie.seasons}</p>

                        <h2>Nombre d'épisodes:</h2>
                        <p>{serie && serie.episodes}</p>

                        <h2>Durée moyenne:</h2>
                        <p>{serie && serie.length}mn</p>

                        <h2>Showrunner:</h2>
                        <p>{serie && serie.showrunner && serie.showrunner.name && serie.showrunner.name}</p>

                        <h2>Note:</h2>
                        <p>{serie && (
                            <Rating name="half-rating-read" value={serie.notes.mean} precision={0.5} readOnly />
                            )}</p>
                        {!added &&
                        <button className='w-full btn btn-blue bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>{setAdded(true);followSerie()}}>Suivre la série</button>
                    }
                        {added &&
                        <button className='w-full btn btn-red bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded' onClick={()=>{unfollowSerie();setAdded(false)}}>Supprimer de ma liste</button>
                    }
                        {!archived && added && 
                        <button className='w-full btn btn-orange bg-orange-700 hover:bg-orange-900 text-white font-bold mt-4 py-2 px-4 rounded' onClick={()=>{archiveSerie();setArchived(true)}}>Archiver la série</button>
                    }
                        {archived && added &&
                        <button className='w-full btn btn-green bg-green-700 hover:bg-green-900 text-white font-bold mt-4 py-2 px-4 rounded' onClick={()=>{unarchiveSerie();setArchived(false)}}>Désarchiver la série</button>
                    }
                    </div>
                </div>
                <Distribution id={slug} />
                <SaisonsEpisodes id={slug} />
                <SeriesSimilaires id={slug} />
                <Commentaires type='show'id={slug}/>
                
            </div>
        </div>
    );
}