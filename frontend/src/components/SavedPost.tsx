import React from "react";
import { ReactComponent as User } from "../assets/icons/user-solid.svg";

const SavedPost = () => {
  return (
    <div className="bg-[#121212] rounded-lg p-3 pb-0">
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum labore
        rerum placeat repudiandae provident nobis explicabo. Fuga similique
        explicabo illum, eligendi impedit laudantium, facere dignissimos minus
        rem aliquid, mollitia exercitationem?
      </p>
      <div className="flex relative gap-2 mt-5 items-center border-t border-gray-600 py-2">
        <User className="h-4 w-4 text-[#bb86fc] fill-current" />
        <p className="font-semibold text-sm">Knotz</p>
      </div>
    </div>
  );
};

export default SavedPost;
