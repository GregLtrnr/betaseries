import { useEffect, useState } from "react";
import axios from "axios";
import avatar from "./avatar.png";
import ActionsOnFriends from "./actionsOnFriends";

export default function Friends() {
  const [friends, setFriends] = useState();
  const [friendsRequest, setFriendsRequest] = useState();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get(
          "https://api.betaseries.com/friends/list?client_id=" +
            process.env.REACT_APP_APIKEY +
            "&access_token=" +
            localStorage.getItem("token")
        )
        .then(function (response) {
          setFriends(response.data.users);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get(
          "https://api.betaseries.com/friends/requests?received&client_id=" +
            process.env.REACT_APP_APIKEY +
            "&access_token=" +
            localStorage.getItem("token")
        )
        .then(function (response) {
          setFriendsRequest(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);
  return (
    <div className=" mx-10 flex flex-col justify-center">
      <div className="flex flex-col md:flex-row items-center md:justify-between mx-10">
        <h1 className="text-3xl font-bold">Liste d'amis</h1>
        <a
          className="btn btn-blue bg-blue-500 hover:bg-blue-700 text-white w-full md:w-auto text-center font-bold py-2 px-4 rounded"
          href="/friends/add"
        >
          ajouter un ami
        </a>
      </div>
      <div className="md:mx-10 flex flex-wrap justify-center">
        {friends &&
          friends.map((friend, index) => {
            return (
              <div
                className="relative w-1/6 p-4 m-5 border-2 flex flex-col justify-center items-center border"
                style={{ width: "300px" }}
              >
                <ActionsOnFriends index={index} id={friend.id} />
                <img className="m-4" src={avatar} alt="" />
                <h1 className="justify-center mb-2">{friend.login}</h1>
              </div>
            );
          })}
      </div>
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-bold mb-3">Demandes d'amis:</h2>
        <ul className="border">
          <li className="flex justify-between items-center">
            <p>- Pseudo</p>
            <div className="flex">
              <button className="btn btn-blue bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-3 rounded">
                Accepter
              </button>
              <button className="btn btn-blue bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Refuser
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
