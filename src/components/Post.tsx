import React, { useState } from "react";
import { users } from "../data/users";
import starFilled from "../assets/icons/star-solid.svg";
import starRegular from "../assets/icons/star-regular.svg";
import bookmarkRegular from "../assets/icons/bookmark-regular.svg";
import bookmarkFilled from "../assets/icons/bookmark-solid.svg";
import { ReactComponent as User } from "../assets/icons/user-solid.svg";

const Post = () => {
  const [starred, setStarred] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleStar = () => {
    setStarred(!starred);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="my-2 py-3 px-1 bg-[#121212] rounded-xl">
      <div className="flex items-center">
        <User className="h-8 w-10 text-[#bb86fc] fill-current" />
        <div className="ml-2">
          <h1 className="font-bold text-md">
            {users[0].firstname} {users[0].lastname}{" "}
          </h1>
          <p className="text-slate-300 text-sm">13/06/2024</p>
        </div>
      </div>
      <div className="p-1">
        <span className="font-center text-sm">
          Hello Everyone. This is a placeholder post. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Magni nisi nesciunt in sint nobis
          doloremque fugiat laboriosam velit libero! Quam fugit beatae voluptas
          eius, praesentium cupiditate. Labore omnis iure animi?
        </span>
      </div>
      <div className="flex justify-between mt-3 px-2">
        {!starred ? (
          <img
            className="h-5 w-5"
            src={starRegular}
            alt="star"
            onClick={handleStar}
          />
        ) : (
          <img
            className="h-5 w-5"
            src={starFilled}
            alt="star"
            onClick={handleStar}
          />
        )}

        {!saved ? (
          <img
            className="h-5 w-5"
            src={bookmarkRegular}
            alt="bookmark"
            onClick={handleSave}
          />
        ) : (
          <img
            className="h-5 w-5"
            src={bookmarkFilled}
            alt="bookmark"
            onClick={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
