import axios from "axios";

export const fetchUserData = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get("http://localhost:3000/users/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data", error);
    throw error;
  }
};

export const fetchFollowedUsersPosts = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/post/followed-users-posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch followed users posts.", error);
  }
};

export const fetchUserPost = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get("http://localhost:3000/post/fetch-post", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user posts.", error);
    throw error;
  }
};

export const fetchSearchedUserData = async (username: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(
      `http://localhost:3000/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch searched user data", error);
    throw error;
  }
};

export const fetchSpecificUserData = async (userId: number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(
      `http://localhost:3000/users/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch searched user data", error);
    throw error;
  }
};

export const fetchSearchedUserPost = async (username: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found.");
  }

  try {
    const response = await axios.get(
      `http://localhost:3000/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch search user posts", error);
    throw error;
  }
};

export const deletePost = async (postId: number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found.");
  }

  try {
    const response = await axios.delete(
      `http://localhost:3000/post/delete/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(`Post with ID ${postId} deleted successfully.`);
      return { success: true, message: "Post deleted successfully." };
    } else {
      return { success: false, message: "Failed to delete the post." };
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    return {
      success: false,
      message: "An error occurred while deleting the post.",
    };
  }
};

export const fetchPostById = async (postId: Number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found.");
  }

  try {
    const response = await axios.get(`http://localhost:3000/post/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch post data.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the post.",
    };
  }
};

export const editPost = async (postId: number, formData: FormData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found.");
  }

  try {
    const response = await axios.put(
      `http://localhost:3000/post/edit/${postId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return { success: true, message: "Post edited successfully." };
    } else {
      return { success: false, message: "Failed to edit the post." };
    }
  } catch (error) {
    console.error("Error editing post:", error);
    return {
      success: false,
      message: "An error occurred while editing the post.",
    };
  }
};

export const starPost = async (postId: number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found.");
  }

  try {
    const response = await axios.post(
      `http://localhost:3000/post/star/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const checkIfStarred = async (postId: number, userId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/post/is-starred/${postId}/${userId}`
    );

    const isStarred = response.data?.result;

    return isStarred === true;
  } catch (error) {
    console.error("Error in checkIfStarred API call:", error);
    return false;
  }
};

export const fetchUserImageByUsername = async (username: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found.");
  }

  try {
    const response = await axios.get(
      `http://localhost:3000/users/image/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.image;
  } catch (error) {
    console.error("Error fetching user image:", error);
  }
};
