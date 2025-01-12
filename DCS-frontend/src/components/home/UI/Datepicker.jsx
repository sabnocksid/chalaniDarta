import React from 'react';
import NepaliDatepicker from 'nepali-datepicker-and-dateinput';

const Datepicker = () => {

  const handleDateChange = (name, dateInMilli, bsDate, adDate) => {
    console.log(name); 
    console.log(dateInMilli); 
    console.log(bsDate); 
    console.log(adDate); 
  }

  return (
    <div className="calender-container bg-gray-100 ">
      <NepaliDatepicker
        id="nepali-date"
        onChange={handleDateChange}
        defaultDate="{date}"
        className="calender-body"
      />
    </div>
  );
}

export default Datepicker;
