import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const FetchLatestId = ({ onChalaniNoFetched }) => {
  const [chalaniNo, setChalaniNo] = useState('');
  const [error, setError] = useState(null);
  const isFetchedRef = useRef(false);

  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const response = await axios.get('/api/v1/chalani/'); // Adjust endpoint as necessary

        if (response.status >= 200 && response.status < 300) {
          const latestChalani = response.data[response.data.length - 1]; // Get the last chalani record
          const latestChalaniNo = latestChalani?.chalani_no;

          if (latestChalaniNo) {
            const [prefix, number] = latestChalaniNo.split('-'); // Split the chalani_no into prefix and number
            const incrementedNumber = parseInt(number, 10) + 1; // Increment the number part
            const newChalaniNo = `${prefix}-${incrementedNumber}`; // Construct new chalani_no with incremented number

            setChalaniNo(newChalaniNo);
            if (onChalaniNoFetched) {
              onChalaniNoFetched(newChalaniNo); // Pass new chalani_no to parent
            }
          }
        } else {
          setError(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        setError('Fetch failed: ' + error.message);
      }
    };

    if (!isFetchedRef.current) {
      fetchLatestId();
      isFetchedRef.current = true;
    }
  }, [onChalaniNoFetched]);

  return error ? <p>Error: {error}</p> : null;
};

export default FetchLatestId;
