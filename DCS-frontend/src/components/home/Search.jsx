import { useState } from "react";
import { FaTh } from "react-icons/fa";
import Datepicker from "./UI/Datepicker";

const Search = () => {
  const [formData, setFormData] = useState({
    date1: "",
    date2: "",
    select1: "",
    select2: "",
    select3: "",
    number1: "",
    number2: "",
    number3: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 bg-slate-100 shadow-sm">
      <div className="w-full mt-4 bg-gray-50 rounded-lg">
        {/* Date Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div className="block">
            <label className="font-semibold" htmlFor="from">
              मिति (from)
            </label>
            <Datepicker id="DateStart" className="DateFrom" />
          </div>
          <div className="block">
            <label className="font-semibold" htmlFor="to">
              मिति (to)
            </label>
            <Datepicker id="DateEnd" className="DateTo" />
          </div>
        </div>

        {/* Select Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 text-md">
          <div className="block">
            <label htmlFor="paperType" className="font-semibold">
              कागजत वर्ग
            </label>
            <select
              name="select1"
              value={formData.select1}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">छान्नुहोस्</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <div className="block">
            <label htmlFor="from" className="font-semibold">
              पठाउने/बुझ्ने कार्यालको नाम *
            </label>
            <select
              name="select2"
              value={formData.select2}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">NMC</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <div className="block">
            <label htmlFor="fiscalYear" className="font-semibold">
              आर्थिक वर्ष
            </label>
            <select
              name="select3"
              value={formData.select3}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">छान्नुहोस्</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>

        {/* Input Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 mt-6">
          <div className="block">
            <label htmlFor="DartaNo" className="font-semibold">
              दर्ता नम्बर
            </label>
            <input
              type="number"
              name="number1"
              value={formData.number1}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="block">
            <label htmlFor="PaperChalaniNo" className="font-semibold">
              पत्रको चलानी नम्बर
            </label>
            <input
              type="number"
              name="number2"
              value={formData.number2}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="block">
            <label htmlFor="ChalaniNo" className="font-semibold">
              चलानी नम्बर
            </label>
            <input
              type="number"
              name="number3"
              value={formData.number3}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-6 rounded-lg font-bold">
            Search
          </button>
        </div>
      </div>

      <div className="text-center p-4 font-bold text-gray-700">
        <h3>Records Not Found</h3>
      </div>
    </div>
  );
};

export default Search;
