import  { useState } from 'react';
import { FaTh } from 'react-icons/fa';

const Search = () => {
  const [formData, setFormData] = useState({
    date1: '',
    date2: '',
    select1: '',
    select2: '',
    select3: '',
    number1: '',
    number2: '',
    number3: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className='p-4 bg-slate-100 shadow-sm'>
      <div className='w-100 mt-2 bg-gray-50'>
        <table className="w-full bg-slate-300">
          <thead>
            <tr className='h-10'>
              <th className='w-14 p-6 col-span-1'>
                <FaTh />
              </th>
              <th className='text-left p-5 col-span-7'>
                अग्रिम खोज रिपोर्ट
              </th>
            </tr>
          </thead>
        </table>

        <div className="flex gap-4 mt-7 px-4 text-sm">
          <div className='block'>
            <label className="font-semibold " htmlFor="from">मिति (from)</label>
          <input
            type="date"
            name="date1"
            value={formData.date1}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          </div>
          <div className='block'>
          <label className="font-semibold" htmlFor="to">मिति (to)</label>
          <input
            type="date"
            name="date2"
            value={formData.date2}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          </div>
        </div>

        <div className="flex gap-4 mt-7 px-4 text-sm">
        <div className='block'>
        <label htmlFor="paperType" className="font-semibold">कागजत वर्ग</label>
          
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
          <div className='block'>
          <label htmlFor="from" className="font-semibold">पठाउने/बुझ्ने कार्यालको नाम *</label>
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
          <div className='block'>
          <label htmlFor="fiscalYear" className="font-semibold">आर्थिक वर्ष</label>
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

        <div className="flex gap-4 mt-7 px-4 text-sm">
        <div className='block'>
        <label htmlFor="DartaNo" className="font-semibold">दर्ता नम्बर</label>
          <input
            type="number"
            name="number"
            value={formData.number1}
            onChange={handleChange}
            placeholder=""
            className="w-full p-2 border border-gray-300 rounded"
          />
          </div>
          <div className='block'>
          <label htmlFor="PaperChalaniNo" className="font-semibold">पत्रको चलानी नम्बर</label>
          <input
            type="number"
            name="number2"
            value={formData.number2}
            onChange={handleChange}
            placeholder=""
            className="w-full p-2 border border-gray-300 rounded"
          />
          </div>
          <div className='block'>
          <label htmlFor="ChalaniNo" className="font-semibold">चलानी नम्बर</label>
          <input
            type="number"
            name="number3"
            value={formData.number3}
            onChange={handleChange}
            placeholder=""
            className="w-full p-2 border border-gray-300 rounded"
          />
          </div>
        </div>
        <div className='mt-5 p-4 text-sm'>
            <button className='bg-orange-400 text-emerald-50 p-2'>Search</button>
        </div>
      </div>
      <div className='text-center p-2 font-bold border-gray-950'>
         <h3>Records Not Found</h3>
        </div>
    </div>
  );
};

export default Search;
