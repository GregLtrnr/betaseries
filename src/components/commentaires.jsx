import axios from 'axios'
import {useEffect, useState} from 'react'
export default function Commentaires(props){
    const [commentaires, setCommentaires] = useState();
    const [nombre, setNombre] = useState(20);
    const [text,setText] = useState('');
    const [previousComment, setPreviousComment] = useState();
    const [error,setError] = useState(false);
    const [errorNetwork,setErrorNetwork] = useState(false);
    const [errorNetworkContent,setErrorNetworkContent] = useState("");
    useEffect(() => {
        axios.get('https://api.betaseries.com/comments/comments?type='+props.type+'&client_id=' + process.env.REACT_APP_APIKEY + '&id='+props.id)
        .then(function (response) {
            setCommentaires(response.data.comments)
            console.log(response.data.comments)
        }).catch(function (error) {
            console.log(error);
        })
    },[])
    async function loadMore(){
        await axios.get('https://api.betaseries.com/comments/comments?type='+props.type+'&client_id=' + process.env.REACT_APP_APIKEY + '&id='+props.id + '&nbpp='+nombre)
        .then(function (response) {
            setCommentaires(response.data.comments)
            console.log(response.data.comments)
        }).catch(function (error) {
            console.log(error);
        })
    }
    function sendCommentaire(){
        if(text !== previousComment){
            setError(false);
        if(localStorage.getItem('token')){
        axios.post('https://api.betaseries.com/comments/comment?type='+props.type+'&client_id=' + process.env.REACT_APP_APIKEY + '&id='+props.id + '&text='+text + '&access_token=' + localStorage.getItem('token'))
        .then(function (response) {
            console.log("success")
            setCommentaires(...Commentaires,response.data.comment)
        }
        ).catch(function (error) {
            console.log(error);
            setErrorNetwork(true);
            setErrorNetworkContent(error.response.data.errors[0].text);
        })
        setPreviousComment(text)
        setText('')

    }
    }else{
        setError(true)
    }
}
    return(
        <div>
            <h1>Commentaires</h1>
            {commentaires && commentaires.map((commentaire)=>{
                return(
                    <div className="flex flex-col items-center border">
                        <p className="text-xl text-center text-blue-700">{commentaire.login}</p>
                        <p className="text-center">{commentaire.text}</p>
                    </div>
                )
            })}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{setNombre(nombre+10);loadMore()}}>Charger plus</button>
            <div className="flex flex-col items-center border">
                <input className="w-full border border-blue-500 rounded-lg p-2" type="text" placeholder="Votre commentaire" value={text} onChange={(e)=>{setText(e.target.value)}}/>
                {error && <p className="text-red-500 text-center">Votre commentaire a déjà envoyé.</p>}
                {errorNetwork && <p className="text-red-500 text-center">{errorNetworkContent}</p>}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{sendCommentaire()}}>Envoyer</button>
            </div>

        </div>
    )
}