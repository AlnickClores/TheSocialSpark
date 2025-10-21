import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import RecentSearch from "../components/RecentSearch";
import RecentSearchModal from "../components/modals/RecentSearchModal";
import { ReactComponent as UserIcon } from "../assets/icons/user-solid.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUserImageByUsername } from "../utils/api";

interface User {
  userID: number;
  username: string;
  image: string;
}

interface RecentSearchItem {
  username: string;
  image: string;
}

const Search = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);
  const [results, setResults] = useState<User[]>([]);
  const navigate = useNavigate();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const fetchSearchResults = async (searchQuery: string) => {
    if (searchQuery.length > 2) {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/search?query=${searchQuery}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setResults([]);
    }
  };

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedFetchSearchResults = useCallback(
    debounce(fetchSearchResults, 300),
    []
  );

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");

    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    debouncedFetchSearchResults(query);
  }, [query]);

  const handleUserClick = async (username: string) => {
    try {
      const response = await fetchUserImageByUsername(username);

      const storedSearches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]"
      );

      const updatedSearches = [
        { username, image: response },
        ...storedSearches.filter((name: string) => name !== username),
      ];

      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      navigate(`/profile/${username}`);
    } catch (error) {
      console.error("Error handling user click:", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className="p-3">
        <h1 className="text-xl font-bold mt-5 mb-10">Add People</h1>
        <div className="flex">
          <input
            className="text-sm rounded-lg py-1 bg-[#121212] border border-gray-600 px-3 w-full"
            type="text"
            placeholder="Enter username"
            value={query}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="mt-5">
          <h1 className="text-xl font-semibold">Results:</h1>
          <div>
            {results.map((user) => (
              <div
                key={user.userID}
                className="flex items-center gap-3 p-2 border-b border-gray-600 cursor-pointer"
                onClick={() => handleUserClick(user.username)}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.username}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-white" />
                  </div>
                )}
                <span className="text-sm">{user.username}</span>
              </div>
            ))}
          </div>
          <h1 className="text-xl font-semibold mt-5">Recent:</h1>
          <div>
            <RecentSearch
              recentSearches={recentSearches}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </div>
          {openModal && <RecentSearchModal onClose={handleCloseModal} />}
        </div>
      </div>
    </div>
  );
};

export default Search;
