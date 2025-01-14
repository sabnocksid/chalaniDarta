const API_BASE_URL = "https://darta.bimal1412.com.np/api/v1/darta/";

export const fetchDartas = () => {
  return fetch(API_BASE_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch Dartas. Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching Dartas:", error);
      throw error;
    });
};

export const createDarta = (formData) => {
  return fetch(API_BASE_URL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("Response Status:", response.status);
      return response.json().then((data) => {
        if (!response.ok) {
          throw new Error(data.detail || "Failed to create Darta");
        }
        return data;
      });
    })
    .catch((error) => {
      console.error("Error creating Darta:", error);
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
