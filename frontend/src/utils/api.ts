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
