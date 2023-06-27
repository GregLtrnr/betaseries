import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Search from "./components/search/search";
import Login from "./components/user/login";
import Logout from "./components/user/logout";
import Navbar from "./components/navbar";
import Profile from "./components/user/profile/profile";
import SeriesHistory from "./components/user/profile/series";
import SeriesShow from "./components/series/show";
import EpisodeShow from "./components/episodes/show";
import FilmShow from "./components/films/show";
import Friends from "./components/user/friends/friends";
import SearchFriends from "./components/user/friends/search";
import Acteur from "./components/acteurs/acteur";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:text" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/acteur/:id" element={<Acteur />} />
        <Route path="/series/:slug/" element={<SeriesShow />} />
        <Route path="/film/:id/" element={<FilmShow />} />
        <Route path="/series/:slug/episode/:id" element={<EpisodeShow />} />
        {localStorage.getItem("token") ? (
          <Route path="/profile/series" element={<SeriesHistory />} />
        ) : null}
        {localStorage.getItem("token") ? (
          <Route path="/profile/" element={<Profile />} />
        ) : null}
        {localStorage.getItem("token") ? (
          <Route path="/friends/" element={<Friends />} />
        ) : null}
        {localStorage.getItem("token") ? (
          <Route path="/friends/add" element={<SearchFriends />} />
        ) : null}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
