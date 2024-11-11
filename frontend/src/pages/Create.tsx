import React from "react";
import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { ReactComponent as PhotoFilm } from "../assets/icons/photo-film-solid.svg";
import axios from "axios";

type PostState = {
  content: string;
  image: File | null;
  location: string;
};

const Create = () => {
  const [post, setPost] = useState<PostState>({
    content: "",
    image: null,
    location: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPost((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found.");
      }

      const formData = new FormData();
      formData.append("content", post.content);
      formData.append("location", post.location);
      if (post.image) {
        formData.append("image", post.image);
      }

      const response = await axios.post(
        "http://localhost:3000/post/create-post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setPost({
        content: "",
        image: null,
        location: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <form className="p-3 mb-20" onSubmit={submitPost}>
        <h1 className="text-xl font-bold mt-5 mb-10">Create Post</h1>
        <div className="flex flex-col gap-3 mt-3">
          <div>
            <h1 className="font-semibold mb-2">Caption</h1>
            <textarea
              name="content"
              className="bg-[#121212] p-2 w-full h-32 text-sm rounded-lg border border-gray-600 focus:ring-[#bb86fc] focus:border-[#bb86fc]"
              placeholder="Write your caption here..."
              value={post.content}
              onChange={handleChange}
              required
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
                {post.image ? (
                  <button className="bg-[#3a3a3a] px-4 py-2 rounded-md text-sm font-semibold cursor-not-allowed">
                    Image Added
                  </button>
                ) : (
                  <button
                    className="bg-[#3a3a3a] px-4 py-2 rounded-md text-sm font-semibold"
                    type="button"
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.click();
                      }
                    }}
                  >
                    Select From Device
                  </button>
                )}
                <input
                  type="file"
                  name="image"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-semibold mb-2">Location</h1>
            <input
              name="location"
              onChange={handleChange}
              value={post.location}
              className="bg-[#121212] text-sm p-2 w-full rounded-lg border border-gray-600"
              type="text"
              placeholder="( Valenzuela, PH )"
            />
          </div>
          <div className="mt-5">
            <button
              className="bg-[#bb86fc] px-5 py-1 rounded-md text-sm font-bold"
              type="submit"
            >
              Upload Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
