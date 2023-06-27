import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Login() {
  const APIKEY = process.env.REACT_APP_APIKEY;
  const SECRETKEY = process.env.REACT_APP_SECRETKEY;
  const REDIRECTURI = process.env.REACT_APP_REDIRECTURI;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  console.log(APIKEY, REDIRECTURI);
  const url =
    "https://www.betaseries.com/authorize?response_type=code&client_id=" +
    APIKEY +
    "&redirect_uri=" +
    REDIRECTURI;
  if (localStorage.getItem("token")) {
    window.location.href = "http://localhost:3000/";
  }
  if (code !== null) {
    if (localStorage.getItem("token") == null) {
      const options = {
        method: "POST",
        url: "https://api.betaseries.com/oauth/access_token",
        data: {
          client_id: APIKEY,
          client_secret: SECRETKEY,
          redirect_uri: REDIRECTURI,
          code: code,
        },
      };
      axios(options)
        .then(function (response) {
          console.log(response.data);
          localStorage.setItem("token", response.data.access_token);

          window.location.href = "http://localhost:3000/";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  function clg() {
    console.log(code);
  }

  return (
    <div className="w-full mt-32 flex justify-center">
      <div className="w-1/3 p-4 border-2 flex flex-col justify-center items-center">
        <h1 className="justify-center mb-5">Connection</h1>
        <a
          href={url}
          className="btn btn-blue bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center"
          onClick={() => {
            test();
          }}
        >
          Connection avec BetaSeries
        </a>
      </div>
    </div>
  );
}
