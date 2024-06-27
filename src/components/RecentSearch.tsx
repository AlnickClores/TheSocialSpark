import React from "react";
import { useState } from "react";
import { ReactComponent as User } from "../assets/icons/user-solid.svg";
import { ReactComponent as Ellipsis } from "../assets/icons/ellipsis-solid.svg";

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
      <User className="w-7 h-7 text-[#bb86fc] fill-current" />
      <p className="mr-auto ml-4 font-semibold">Knotz</p>
      <Ellipsis
        className="w-5 h-5 text-white fill-current"
        onClick={toggleModal}
      />
    </div>
  );
};

export default RecentSearch;
