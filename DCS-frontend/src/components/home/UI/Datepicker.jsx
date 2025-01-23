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
    <div className="datepicker-container flex w-100">
      <label className='w-1/6 p-3 font-semibold text-gray-700'>मिति</label>
      <div className='w-3/4'>
      <NepaliDatepicker
        id="nepali-date"
        onChange={handleDateChange}
        value={formattedDate} 
        className="nepali-datepicker"
      />
      </div>
    </div>
  );
};

export default DateInput;
