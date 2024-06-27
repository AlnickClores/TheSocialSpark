import React from "react";
import Navbar from "../components/Navbar";
import { ReactComponent as PhotoFilm } from "../assets/icons/photo-film-solid.svg";

const Create = () => {
  return (
    <div>
      <Navbar />
      <div className="p-3">
        <h1 className="text-xl font-bold mt-5 mb-10">Create Post</h1>
        <div className="flex flex-col gap-3 mt-3">
          <div>
            <h1 className="font-semibold mb-2">Caption</h1>
            <textarea
              className="bg-[#121212] p-2 w-full h-32 text-sm rounded-lg border border-gray-600 focus:ring-[#bb86fc] focus:border-[#bb86fc]"
              placeholder="Write your caption here..."
            ></textarea>
          </div>
          <div>
            <h1 className="font-semibold mb-2">Add Photos</h1>
            <div className="flex flex-col justify-center items-center gap-5 py-8 bg-[#121212] rounded-lg border border-gray-600">
              <div>
                <PhotoFilm className="text-gray-600 fill-current w-28" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">Drag photo here</p>
                <p className="text-sm text-gray-400 font-light">
                  PNG, JPG, SVG
                </p>
              </div>
              <div>
                <button className="bg-[#3a3a3a] px-4 py-2 rounded-md text-sm font-semibold">
                  Select From Device
                </button>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-semibold mb-2">Location</h1>
            <input
              className="bg-[#121212] text-sm p-2 w-full rounded-lg border border-gray-600"
              type="text"
              placeholder="( Valenzuela, PH )"
            />
          </div>
          <div className="mt-5">
            <button className="bg-[#bb86fc] px-5 py-1 rounded-md text-sm font-bold">
              Upload Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
