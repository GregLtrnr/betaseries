import { useState, useEffect } from "react";
import SearchIcon from "./search.png";
export default function Navbar() {
  const [search, setSearch] = useState("");
  function submitSearch() {
    if (search !== "") {
      window.location.href = "/search/" + search;
    }
  }
  return (
    <nav className="p-3 bg-gray-50 w-full border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="mx-10 flex flex-col md:flex-row justify-between">
        <div className="left">
          <a
            href="/"
            className="py-2 pr-4 pl-3 text-gray-800 hover:text-gray-600 dark:text-white rounded"
          >
            Home
          </a>
        </div>
        <div className="right">
          <div className="flex flex-col md:flex-row">
            <div className="flex">
              <input
                type="text"
                className="border"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                className="btn btn-blue bg-gray-500 hover:bg-gray-700 text-white font-bold rounded px-2 mr-4"
                onClick={() => {
                  submitSearch(search);
                }}
              >
                <img className="w-4" src={SearchIcon} />
              </button>
            </div>
            {localStorage.getItem("token") ? (
              <a
                className="py-2 pr-4 pl-3 mr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                href="/friends"
              >
                Mes amis
              </a>
            ) : null}
            {localStorage.getItem("token") ? (
              <a
                className="py-2 pr-4 pl-3 mr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                href="/profile/series"
              >
                Mes séries
              </a>
            ) : null}
            {localStorage.getItem("token") ? (
              <a
                className="py-2 pr-4 pl-3 mr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                href="/profile"
              >
                Profile
              </a>
            ) : null}
            {localStorage.getItem("token") ? (
              <a
                className="py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                href="/logout"
              >
                Deconnection
              </a>
            ) : (
              <a
                className="py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                href="/login"
              >
                Connection
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
