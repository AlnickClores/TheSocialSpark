import React from "react";
import { users } from "../data/users";
import User from "../assets/icons/user-solid.svg";

const Post = () => {
  return (
    <div className="mx-2 py-3 px-1 bg-slate-400">
      <div className="flex">
        <img className="10-5 w-10" src={User} alt="profile-image" />
        <div className="ml-2">
          <h1 className="font-bold">
            {users[0].firstname} {users[0].lastname}{" "}
          </h1>
          <p className="text-gray-700 text-sm">13/06/2024</p>
        </div>
      </div>
      <div className="p-1">
        <span className="font-center">
          This is my post. Hello Everyone. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Magni nisi nesciunt in sint nobis
          doloremque fugiat laboriosam velit libero! Quam fugit beatae voluptas
          eius, praesentium cupiditate. Labore omnis iure animi?
        </span>
      </div>
    </div>
  );
};

export default Post;
