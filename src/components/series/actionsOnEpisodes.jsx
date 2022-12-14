import axios from 'axios'
import {useEffect, useState} from 'react'
import more from '../user/friends/more.png'
export default function ActionsOnFriends(props){
    const [showMenu, setShowMenu] = useState(false)
    const [successView, setSuccessView] = useState(props.iswatched)
    const [isConnected, setIsConnected] = useState(false)
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn'+props.index)) {
            setShowMenu(false)
        }
      }
    async function setEpisodeView(){
        if(localStorage.getItem('token')){
            if(!successView){
        await axios.post('https://api.betaseries.com/episodes/watched?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + props.id + '&access_token=' + localStorage.getItem('token') + '&bulk=false')
        .then(function (response) {
            console.log("success")
            setSuccessView(true)
            window.location.reload(false);
        }).catch(function (error) {
            console.log(error);
        })
        }else{
            await axios.delete('https://api.betaseries.com/episodes/watched?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + props.id + '&access_token=' + localStorage.getItem('token'))
            .then(function (response) {
                console.log("success")
                setSuccessView(false)
                window.location.reload(false);
            }).catch(function (error) {
                console.log(error);
            })
        }}}
    async function setAllEpisodeView(){
        if(localStorage.getItem('token')){
        await axios.post('https://api.betaseries.com/episodes/watched?client_id=' + process.env.REACT_APP_APIKEY + '&id=' + props.id + '&access_token=' + localStorage.getItem('token'))
        .then(function (response) {
            console.log("success")
            setSuccessView(true)
            window.location.reload(false);
        }).catch(function (error) {
            console.log(error);
        })
        }
    }
    return(
        <div className="absolute right-2 top-0 z-10">
            <button onClick={() => {setShowMenu(showMenu ? false : true)}}><img className={'dropbtn'+props.index} src={more} alt="" style={{width: '32px'}}/></button>
            {showMenu && <div className="bg-white shadow-md rounded-lg p-2 z-10">
                <div className="flex flex-col justify-center items-center">
                    <button onClick={()=>{setEpisodeView()}} className={successView ? "bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded" : "w-full text-white font-bold py-2 px-4 rounded bg-green-500 hover:bg-green-700"}>
                        {!successView ? "Marquer l'??pisode comme vu" : "Marquer l'??pisode comme non vu"}
                    </button>
                    <button onClick={()=>{setAllEpisodeView()}} className={"w-full text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"}>
                        {"Marquer l'??pisode comme vu ainsi que les pr??c??dents"}
                    </button>

                </div>
            </div>}
        </div>
    )
}