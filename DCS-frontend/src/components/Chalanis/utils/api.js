export const createChalanis = (formData) => {
  return fetch("https://darta.bimal1412.com.np/api/v1/chalani/", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          console.error("API Error:", data);  // Log the error detail from API
          throw new Error(data.detail || "Failed to create Chalani");
        });
      }
      return response.json();  // Return response data if successful
    })
    .catch((error) => {
      console.error("Error creating Chalani:", error);
      throw error;  // Throw error for further handling
    });
};
