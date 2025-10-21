import React from "react";
import { ReactComponent as User } from "../assets/icons/user-solid.svg";
import { icons } from "../assets/icons/icons";

interface RecentSearchProps {
  recentSearches: { username: string; image: string }[];
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const RecentSearch: React.FC<RecentSearchProps> = ({
  recentSearches,
  openModal,
  setOpenModal,
}) => {
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      {recentSearches.map((search, index) => (
        <div key={index} className="flex items-center justify-between my-4">
          {search.image ? (
            <img
              src={`http://localhost:3000/uploads/${search.image}`}
              alt={search.username}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <>
              <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
            </>
          )}

          <p className="mr-auto ml-4 font-semibold">{search.username}</p>
          {icons.ellipsis(toggleModal)}
        </div>
      ))}
    </>
  );
};

export default RecentSearch;
