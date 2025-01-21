import axios from "axios";

export const createChalanis = (formData) => {
  return fetch("/api/v1/chalani/", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          console.error("API Error:", data);  
          throw new Error(data.detail || "Failed to create Chalani");
        });
      }
      return response.json();  
    })
    .catch((error) => {
      console.error("Error creating Chalani:", error);
      throw error;  
    });
};

export const fetchDropdownOptions = async () => {
  try {
    const response = await fetch("/api/v1/chalani/"); // Replace with your actual API endpoint
    const data = await response.json();
    console.log("Dropdown options API response:", data); // Log the response
    if (!data.status_options || !data.related_office_options) {
      if (!data.status_options) console.warn("No status options found.");
      if (!data.related_office_options) console.warn("No related office options found.");
    }
    return data;
  } catch (error) {
    console.error("Error fetching dropdown options:", error);
    throw error;
  }
};