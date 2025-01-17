import React, { useState } from 'react';
import NepaliDatepicker from 'nepali-datepicker-and-dateinput';

const DateInput = ({ onChange }) => {
  const [formattedDate, setFormattedDate] = useState('');

  const handleDateChange = (name, dateInMilli, bsDate) => {
    const date = new Date(bsDate);
    const formattedISO = date.toISOString(); 
    setFormattedDate(formattedISO);
    onChange({ target: { name, value: formattedISO } });
  };

  return (
    <div className="datepicker-container">
      <NepaliDatepicker
        id="nepali-date"
        onChange={handleDateChange}
        value={formattedDate} 
        className="nepali-datepicker"
      />
    </div>
  );
};

export default DateInput;
