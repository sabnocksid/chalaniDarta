import axios from 'axios';


export const createDarta = (formData) => {
  return fetch("/api/v1/darta/", {
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

export const updateDarta = (id, data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return fetch(`${API_BASE_URL}${id}/`, {
    method: "PUT",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to update Darta. Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error updating Darta:", error);
      throw error;
    });
};

export const deleteDarta = (id) => {
  return fetch(`${API_BASE_URL}${id}/`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete Darta. Status: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("Error deleting Darta:", error);
      throw error;
    });
};

export const fetchStatusChoices = () => {
  return axios({
    method: "OPTIONS",
    url: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
    .then((response) => {
      return response.data.status; 
    })
    .catch((error) => {
      console.error("Error fetching status choices:", error);
      throw error;
    });
};