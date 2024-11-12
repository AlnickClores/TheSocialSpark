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
