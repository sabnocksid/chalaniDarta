import axios from "axios";

const handleError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.data);
    throw new Error(error.response.data.detail || "Something went wrong. Please try again.");
  } else if (error.request) {
    console.error("No response received:", error.request);
    throw new Error("No response from the server. Please try again later.");
  } else {
    console.error("Error:", error.message);
    throw new Error("Error occurred. Please try again later.");
  }
};

export const createSender = async (formData) => {
  try {
    const response = await axios.post("/api/v1/sender_office", formData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchOfficeTypes = async () => {
  try {
    const response = await axios.get("/api/v1/office_type");
    return response.data;
  } catch (error) {
    console.error("Error fetching office types:", error);
    throw new Error("Failed to fetch office types. Please try again later.");
  }
};

