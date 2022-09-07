import axios from 'axios';
import {useEffect, useState} from 'react';
import ActionsOnEpisodes from './actionsOnEpisodes';
import Check from './check.png';
export default function SaisonsEpisodes(props){
    const [saisons, setSaisons] = useState();
    const [currentSaison, setCurrentSaison] = useState(1);
    const [episodes, setEpisodes] = useState();
    useEffect(() => {
        axios.get('https://api.betaseries.com/shows/seasons?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + props.id)
        .then(function (response) {
            setSaisons(response.data.seasons)
            axios.get('https://api.betaseries.com/shows/episodes?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + props.id + '&access_token=' + localStorage.getItem('token'))
            .then(function (response) {
                setEpisodes(response.data.episodes)
            }).catch(function (error) {
                console.log(error);
            })
        }).catch(function (error) {
            console.log(error);
        })
    } , [])
    return (
        <div className="w-full">
            <h2>Saisons</h2>
            <div className="flex items-center hover:overflow-x-scroll overflow-hidden hover:overflow-y-hidden hover:cursor-pointer">
            {saisons && saisons.map((saison, index)=>{
                return(
                    <div key={index} onClick={()=>{setCurrentSaison(saison.number)}} className="flex flex-col items-center mx-4" style={{minWidth:'150px', width: '150px', height : '250px'}}>
                        <img src={saison.image ? saison.image : 'https://via.placeholder.com/150x220'} alt="" />
                        <h3>{'Saison '+saison.number}</h3>
                    </div>
                )
            })}
            </div>
            <h2>Episodes</h2>
            <div className="flex  items-center hover:overflow-x-scroll overflow-hidden hover:overflow-y-hidden hover:cursor-pointer">
            {episodes && episodes.filter(episode => episode.season === currentSaison).map((episode, index)=>{
                const iswatched = episode.user.seen;
                return(
                    <div key={index} className="relative flex flex-col items-center mx-4" style={{minWidth:'250px', width: '250px', height : '220px'}}>
                        <ActionsOnEpisodes id={episode.id} list={episodes} iswatched={iswatched}/>
                        <img className='absolute top-8'src={iswatched ? Check : null} alt="" />
                        <a href={window.location.href+"/episode/"+episode.id}><img src={"https://api.betaseries.com/pictures/episodes?client_id=" + process.env.REACT_APP_APIKEY + "&id=" + episode.id + "&width=500&height=282"} alt="" /></a>
                        <h2>{episode.code}</h2>
                        <h3>{episode.title}</h3>
                    </div>
                )
            })}
            </div>
        </div>
    );
}