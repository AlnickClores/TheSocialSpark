import React from "react";
import { icons } from "../../assets/icons/icons";

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
        {icons.userCircle} <p className="font-bold text-sm">Knotz</p>
      </div>
    </div>
  );
};

export default SavedPost;
