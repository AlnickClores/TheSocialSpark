import React from "react";
import { useState } from "react";
import { ReactComponent as User } from "../assets/icons/user-solid.svg";
import { icons } from "../assets/icons/icons";

interface RecentSearchProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const RecentSearch: React.FC<RecentSearchProps> = ({
  openModal,
  setOpenModal,
}) => {
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className="flex items-center justify-between my-4">
      <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center">
        <User className="h-6 w-6 text-white" />
      </div>
      <p className="mr-auto ml-4 font-semibold">Knotz</p>
      {icons.ellipsis(toggleModal)}
    </div>
  );
};

export default RecentSearch;
