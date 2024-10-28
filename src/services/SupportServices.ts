import axios from "axios";

export interface SupportData {
  supportId: string;
  name: string;
  email: string;
  phoneNumber: string;
  transactionId: string;
  issue: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const baseUrl =
  "https://api-dante-joki-871423140998.asia-southeast2.run.app/api";

// Fetch all joki transactions
export const fetchAllSupportRequests = async (
  token: string | null
): Promise<SupportData[]> => {
  try {
    const response = await axios.get<{ message: string; data: SupportData[] }>(
      `${baseUrl}/support`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : " ",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all support requests:", error);
    throw new Error(
      "Failed to fetch all support requests. Please try again later."
    );
  }
};

// fetch single invoice data
export const fetchSupportRequest = async (
  supportId: string,
  token: string | null
): Promise<SupportData> => {
  try {
    const response = await axios.get<{ message: string; data: SupportData }>(
      `${baseUrl}/support/${supportId}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : " ",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching support request:", error);
    throw new Error("Failed to fetch support request. Please try again later.");
  }
};
