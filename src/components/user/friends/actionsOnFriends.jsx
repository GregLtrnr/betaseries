import axios from 'axios'
import {useEffect, useState} from 'react'
import more from './more.png'
export default function ActionsOnFriends(props){
    const [showMenu, setShowMenu] = useState(false)
    const [bloqued, setBlocked] = useState(false)
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn'+props.index)) {
            setShowMenu(false)
        }
      }
    
    function deleteFriend(id){
        if(localStorage.getItem('token')){
            axios.delete('https://api.betaseries.com/friends/friend?client_id=' + process.env.REACT_APP_APIKEY + '&access_token=' + localStorage.getItem('token') + '&id=' + id)
            .then(function (response) {
                console.log("success")
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
    function blockFriend(id){
        axios.post('https://api.betaseries.com/friends/block?client_id=' + process.env.REACT_APP_APIKEY + '&access_token=' + localStorage.getItem('token') + '&id=' + id)
        .then(function (response) {
            console.log("success")
            setBlocked(true)
        }
        ).catch(function (error) {
            console.log(error);
        })
    }
    function unBlockFriend(id){
        axios.delete('https://api.betaseries.com/friends/block?client_id=' + process.env.REACT_APP_APIKEY + '&access_token=' + localStorage.getItem('token') + '&id=' + id)
        .then(function (response) {
            console.log("success")
            setBlocked(true)
        }
        ).catch(function (error) {
            console.log(error);
        })
    }
    return(
        <div className="absolute right-2 top-0">
            <button onClick={() => {setShowMenu(showMenu ? false : true)}}><img className={'dropbtn'+props.index} src={more} alt="" style={{width: '32px'}}/></button>
            {showMenu && <div className="absolute bg-white shadow-md rounded-lg p-2 z-10">
                <div className="flex flex-col justify-center items-center">
                    <button onClick={()=>{deleteFriend(props.id)}} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Supprimer
                    </button>
                    {!bloqued && <button onClick={()=>{blockFriend(props.id)}} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Bloquer</button>}
                    {bloqued && <button onClick={()=>{unBlockFriend(props.id)}} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Débloquer</button>}
                </div>
            </div>}
        </div>
    )
}