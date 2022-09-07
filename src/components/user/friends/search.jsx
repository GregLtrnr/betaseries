import axios from 'axios'
import {useEffect, useState} from 'react'
import avatar from './avatar.png'
import AddFriend from './addFriend'
export default function Search(){
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    function searchAPI(){
        if(search !== '' && localStorage.getItem('token'))
        axios.get('https://api.betaseries.com/friends/find?client_id=' + process.env.REACT_APP_APIKEY + '&access_token=' + localStorage.getItem('token') + '&type=emails&emails=' + search)
        .then(function(response){
            console.log(response.data)
            setUsers(response.data.users)
        })
        .catch(function(error){
            console.log(error)
        })
    }

    return(
        <div>
            {/* input with tailwind */}
            <div className="md:mx-40 mt-4 flex justify-center items-center">
                <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
                <button  onClick={()=>{searchAPI()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
            </div>
            {/* search results */}
            <div className="flex flex-col justify-center items-center">
                {users && users.map((user, index) => {
                    return (
                        <div className="w-1/6 m-5 p-4 border-2 flex flex-col justify-center items-center" style={{width : '300px'}}>
                            <img className='m-2' src={avatar} alt=""/>
                            <h1 className='justify-center mb-5'>{user.login}</h1>
                            <AddFriend id={user.id}/>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}