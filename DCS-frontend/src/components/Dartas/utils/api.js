export const createDarta = (data) => {
    return fetch("http://localhost:5000/dartas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error creating Darta:", error));
  };
  