const url = "https://darta.bimal1412.com.np/api/v1/darta/";

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.length > 0) {
      data.forEach(record => {
        console.log(`Subject: ${record.subject}, Sender: ${record.sender_name}`);
      });
    } else {
      console.log("No records found.");
    }
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });