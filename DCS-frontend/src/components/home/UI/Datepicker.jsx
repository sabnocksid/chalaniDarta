import React, { useState } from 'react';
import NepaliDatepicker from 'nepali-datepicker-and-dateinput';

const Datepicker = () => {
  const [nepaliDate, setNepaliDate] = useState('');

  const handleDateChange = (name, dateInMilli, bsDate, adDate) => {
    setNepaliDate(bsDate);
    console.log('BS Date:', bsDate); 
    console.log('AD Date:', adDate); 
  };

  return (
    <div className="datepicker-container">
      <NepaliDatepicker
        id="nepali-date"
        onChange={handleDateChange}
        label="नेपाली मिति"  
        defaultDate="{date}"  
        className="nepali-datepicker"  
        value={nepaliDate}
      />

    </div>
  );
};

export default Datepicker;
