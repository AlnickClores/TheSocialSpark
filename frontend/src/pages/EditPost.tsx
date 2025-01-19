import React, { useState, useRef, useEffect } from "react";
import { fetchPostById, editPost } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ReactComponent as PhotoFilm } from "../assets/icons/photo-film-solid.svg";
import axios from "axios";

type PostState = {
  content: string;
  image: string | null;
  location: string;
};

const EditPost = () => {
  const [post, setPost] = useState<PostState>({
    content: "",
    image: null,
    location: "",
  });

  const [updatePost, setUpdatePost] = useState<PostState>({
    content: "",
    image: null,
    location: "",
  });

  const navigate = useNavigate();
  const { postId } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const hasChanges =
    updatePost.content !== post.content ||
    updatePost.image !== post.image ||
    updatePost.location !== post.location;

  useEffect(() => {
    if (!postId) {
      console.error("Post ID is required");
      return;
    }

    const parsedPostId = parseInt(postId, 10);

    if (isNaN(parsedPostId)) {
      console.error("Invalid Post ID");
      return;
    }

    const fetchPostData = async () => {
      try {
        const response = await fetchPostById(parsedPostId);

        if (response.success) {
          const { content, image, location } = response.data;
          setPost({
            content: content || "",
            image: image || null,
            location: location || "",
          });
          setUpdatePost({
            content: content || "",
            image: image || null,
            location: location || "",
          });
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatePost((prevData) => ({
          ...prevData,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatePost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const removeImage = () => {
    setUpdatePost((prevData) => ({
      ...prevData,
      image: null,
    }));
  };

  const submitEditPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found.");
      }

      const formData = new FormData();
      formData.append("content", updatePost.content);
      formData.append("location", updatePost.location);

      if (fileInputRef.current && fileInputRef.current.files?.[0]) {
        formData.append("image", fileInputRef.current.files[0]);
      } else if (
        !fileInputRef.current?.files?.[0] &&
        post.image &&
        !updatePost.image
      ) {
        formData.append("removeImage", "true");
      }

      const response = await axios.put(
        `http://localhost:3000/post/edit/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setPost(updatePost);
        alert("Post updated successfully.");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <form className="p-3 mb-20" onSubmit={submitEditPost}>
        <h1 className="text-xl font-bold mt-5 mb-10">Edit Post</h1>
        <div className="flex flex-col gap-3 mt-3">
          <div>
            <h1 className="font-semibold mb-2">Caption</h1>
            <textarea
              name="content"
              className="bg-[#121212] p-2 w-full h-32 text-sm rounded-lg border border-gray-600 focus:ring-[#bb86fc] focus:border-[#bb86fc]"
              placeholder="Write your caption here..."
              value={updatePost.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <h1 className="font-semibold mb-2">Add Photos</h1>
            <div
              className="relative flex flex-col justify-center items-center gap-5 bg-[#121212] rounded-lg border-2 border-dashed border-gray-600"
              style={{
                padding: updatePost.image ? "8px" : "48px 0px",
              }}
            >
              {updatePost.image ? (
                <div className="w-full h-full rounded-lg overflow-hidden bg-black">
                  <img
                    src={
                      updatePost.image.startsWith("data:image")
                        ? updatePost.image
                        : `data:image/jpeg;base64,${updatePost.image}`
                    }
                    alt="Uploaded Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}

              {!updatePost.image && (
                <>
                  <PhotoFilm className="text-gray-600 fill-current w-28" />
                  <div className="text-center">
                    <p className="font-bold text-lg">Drag photo here</p>
                    <p className="text-sm text-gray-400 font-light">
                      PNG, JPG, SVG
                    </p>
                  </div>
                </>
              )}

              <div
                style={
                  updatePost.image
                    ? {
                        position: "absolute",
                        bottom: 10,
                      }
                    : {}
                }
              >
                {updatePost.image ? (
                  <div className="flex gap-5">
                    <button
                      className="bg-[#3a3a3a] px-4 py-2 rounded-md text-sm font-semibold"
                      type="button"
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.click();
                        }
                      }}
                    >
                      Select Another Image
                    </button>
                    <button
                      className="bg-red-500 px-4 py-2 rounded-md text-sm font-semibold"
                      type="button"
                      onClick={removeImage}
                    >
                      Remove Image
                    </button>
                  </div>
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
              value={updatePost.location}
              className="bg-[#121212] text-sm p-2 w-full rounded-lg border border-gray-600"
              type="text"
              placeholder="( Valenzuela, PH )"
            />
          </div>
          <div className="mt-5">
            <button
              className={`${
                hasChanges
                  ? "bg-[#bb86fc] cursor-pointer"
                  : "bg-purple-800 cursor-not-allowed"
              } px-5 py-1 rounded-md text-sm font-bold`}
              type="submit"
              disabled={!hasChanges}
            >
              Update Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
