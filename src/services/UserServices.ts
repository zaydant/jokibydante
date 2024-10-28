import axios from "axios";

export interface UserData {
  uid: string;
  fullName: string | null;
  username: string;
  email: string;
  phoneNumber: string;
  balance: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const baseUrl =
  "https://api-dante-joki-871423140998.asia-southeast2.run.app/api";

// Fetch all joki transactions
export const fetchAllUserData = async (
  token: string | null
): Promise<UserData[]> => {
  try {
    const response = await axios.get<{ message: string; data: UserData[] }>(
      `${baseUrl}/user`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : " ",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all user data:", error);
    throw new Error("Failed to fetch all user data. Please try again later.");
  }
};

// fetch single invoice data
export const fetchUserData = async (
  userId: string,
  token: string | null
): Promise<UserData> => {
  try {
    const response = await axios.get<{ message: string; data: UserData }>(
      `${baseUrl}/user/${userId}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : " ",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data. Please try again later.");
  }
};
