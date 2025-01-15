import React, { useState } from 'react';
import NepaliDatepicker from 'nepali-datepicker-and-dateinput';

const DateInput = () => {
  const [bsDate, setBsDate] = useState(''); 

  const handleDateChange = (name, dateInMilli, bsDate, adDate) => {
    setBsDate(bsDate); 
  };

  return (
    <div className="datepicker-container">
      <NepaliDatepicker
        id="nepali-date"
        onChange={handleDateChange}   
        className="nepali-datepicker"  
        value={bsDate}  
      />

    </div>
  );
};

export default DateInput;
