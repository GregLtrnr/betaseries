import axios from 'axios'
import plusIcon from './plus.png'
import minusIcon from './minus.png'
import React, { useState, useEffect } from 'react'

export default function Follow(props){
    const [source, setSource] = useState(props.followed ? minusIcon : plusIcon )
    const [followed, setFollowed] = useState(props.followed)
    function followSerie(id){
        if(localStorage.getItem('token')){
            axios.post('https://api.betaseries.com/shows/show?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + id + '&access_token=' + localStorage.getItem('token'))
            .then(function (response) {
                console.log("success")
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
    function unfollowSerie(id){
        if(localStorage.getItem('token')){
            axios.delete('https://api.betaseries.com/shows/show?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + id + '&access_token=' + localStorage.getItem('token'))
            .then(function (response) {
                console.log("success")
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
    return(
        <button onClick={()=>{
            if(localStorage.getItem('token')){
            if(!followed){
                followSerie(props.id);
                setSource(minusIcon);
                setFollowed(true);
            }else{
                unfollowSerie(props.id);
                setSource(plusIcon);
                setFollowed(false);
            }}
            }}
            className='absolute top-0 right-0'>
            <img className='' src={source} alt="+"/>
        </button>
    )
}