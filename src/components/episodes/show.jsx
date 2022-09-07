import axios from 'axios';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Commentaires from '../commentaires';
export default function ShowEpisode(){
    const id = useParams().id;
    const [episode, setEpisode] = useState();
    useEffect(() => {
        axios.get('https://api.betaseries.com/episodes/display?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + id)
        .then(function (response) {
            setEpisode(response.data.episode);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [])
    return(
        <div className='w-full flex flex-col justify-center'>
            <div className='mx-10 border-2'>
                <div className=" p-4">
                    <a href={"/series/"+useParams().slug}className='btn btn-blue bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center'>Retour à la série</a>    
                    <div className="mt-2 flex flex-col items-center md:items-stretch lg:flex-row">
                    <div className="flex flex-col mr-4">
                        <img src={"https://api.betaseries.com/pictures/episodes?client_id=" + process.env.REACT_APP_APIKEY + "&id=" + id + "&width=500&height=282"} alt="" style={{minWidth : '200px',maxWidth: '450px'}} />
                    </div>
                    <div className="w-full flex flex-col">
                        <h1 className='text-5xl font-normal leading-normal mt-0 mb-2 text-gray-800' >{episode && episode.title}</h1>
                        <p>{episode && episode.description}</p>
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <h2>Date de diffusion</h2>
                        <p>{episode && episode.date}</p>

                        <h2>Note:</h2>
                        <p>{episode && (
                            <Rating name="half-rating-read" value={episode.note.mean} precision={0.5} readOnly />
                            )}</p>
                    </div>
                </div>
                </div> 
                <Commentaires type='episode'id={id}/>
            </div>
        </div>
    )
}