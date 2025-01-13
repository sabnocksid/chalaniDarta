export const createDarta = (data) => {
    return fetch("http://localhost:5000/chalanis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error creating Darta:", error));
  };
  
  export const deleteDarta = (id) => {
    return fetch(`http://localhost:5000/chalanis/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete Darta");
        }
        console.log('Delete Response:', response);
        return response.json();
      })
      .catch((error) => {
        console.error("Error deleting Darta:", error);
      });
  };
  