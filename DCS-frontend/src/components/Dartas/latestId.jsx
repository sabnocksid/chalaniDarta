import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const FetchLatestId = ({ onDartaNoFetched }) => {
  const [dartaNo, setDartaNo] = useState(''); // Local state for the new Darta number
  const [error, setError] = useState(null);   // Local state for error messages
  const isFetchedRef = useRef(false);         // Ref to track whether data is fetched

  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const response = await axios.get('/api/v1/darta/'); // Fetch data from the API

        if (response.status >= 200 && response.status < 300) {
          const latestDarta = response.data[response.data.length - 1]; // Get the last entry
          const latestDartaNo = latestDarta?.darta_no; // Extract the Darta number

          if (latestDartaNo) {
            const [prefix, number] = latestDartaNo.split('-');
            const incrementedNumber = parseInt(number, 10) + 1; // Increment the numeric part
            const newDartaNo = `${prefix}-${incrementedNumber}`; // Construct the new ID

            setDartaNo(newDartaNo); // Update the local state
            if (onDartaNoFetched) {
              onDartaNoFetched(newDartaNo); // Pass the value to the parent component
            }
          }
        } else {
          setError(`HTTP error! Status: ${response.status}`); // Handle HTTP errors
        }
      } catch (error) {
        setError('Fetch failed: ' + error.message); // Handle other errors
      }
    };

    // Only fetch if not already fetched
    if (!isFetchedRef.current) {
      fetchLatestId();
      isFetchedRef.current = true; // Mark as fetched
    }
  }, [onDartaNoFetched]); // Depend only on the callback

  return error ? <p>Error: {error}</p> : null; // Render nothing if no error
};

export default FetchLatestId;
