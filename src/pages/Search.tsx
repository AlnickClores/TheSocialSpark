// Search.tsx (updated for passing onClose to Modal)
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import RecentSearch from "../components/RecentSearch";
import Modal from "../components/Modal";

const Search = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className="p-3">
        <h1 className="text-xl font-bold mt-3 mb-10">Add People</h1>
        <div className="flex gap-5">
          <input
            className="text-sm rounded-lg py-1 bg-[#121212] border border-gray-600 px-3"
            type="text"
            placeholder="Search People"
          />
          <button className="text-sm font-bold bg-[#bb86fc] rounded-md py-1 px-6">
            Search
          </button>
        </div>
        <div className="mt-5">
          <h1 className="text-xl font-semibold">Recent:</h1>
          <div>
            {/* UI Sample Only: Change it to array map when the backend part is done */}
            <RecentSearch openModal={openModal} setOpenModal={setOpenModal} />
            <RecentSearch openModal={openModal} setOpenModal={setOpenModal} />
            <RecentSearch openModal={openModal} setOpenModal={setOpenModal} />
          </div>
          {openModal && <Modal onClose={handleCloseModal} />}
        </div>
      </div>
    </div>
  );
};

export default Search;
