import axios from "axios";
import { useEffect, useState } from "react";

export default function AddFriend(props) {
  function addFriend(id) {
    if (localStorage.getItem("token")) {
      axios
        .post(
          "https://api.betaseries.com/friends/friend?client_id=" +
            process.env.REACT_APP_APIKEY +
            "&access_token=" +
            localStorage.getItem("token") +
            "&id=" +
            id
        )
        .then(function (response) {
          console.log("success");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  return (
    <button
      className="btn btn-blue bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        addFriend(props.id);
      }}
    >
      Ajouter en ami
    </button>
  );
}
