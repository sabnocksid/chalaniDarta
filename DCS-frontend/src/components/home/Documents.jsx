import React, { useState } from 'react';
import {FaTh} from 'react-icons/fa';

const Documents = () => {
  const [tableData, setTableData] = useState([
    { no: 1, year: '२०७९/८०', category: 'पत्र', office: 'अर्थ मन्त्रालय', address: 'काठमाडौँ', subject: 'बजेट', date: '२०७९-०१-०१', remark: 'तुरुन्त', status: 'कर्बाही भएको' },
    { no: 2, year: '२०७९/८०', category: 'प्रतिवेदन', office: 'शिक्षा मन्त्रालय', address: 'ललितपुर', subject: 'अनुदान', date: '२०७९-०२-१५', remark: 'महत्वपूर्ण', status: 'कर्बाही नभएको' },
    { no: 3, year: '२०७९/८०', category: 'नोटिस', office: 'स्वास्थ्य मन्त्रालय', address: 'पोखरा', subject: 'सुझाव', date: '२०७९-०३-०५', remark: 'अनिवार्य', status: 'कर्बाही नभएको' },
    { no: 4, year: '२०७९/८०', category: 'फाइल', office: 'कृषि मन्त्रालय', address: 'धरान', subject: 'रिपोर्ट', date: '२०७९-०४-१०', remark: 'समयसीमा', status: 'कर्बाही भएको' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2; 

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-h-full p-5 ">
        
      <h1 className="font-semibold text-2xl mb-4">सबै पत्रहरू</h1>
      <div className='ButtonGroup flex'>
        <a href='#karbahiDoc'>
        <button className='bg-blue-500 text-white p-2 rounded-sm text-xs'>कारबाही भएका पत्रहरू</button>
        </a>
        <a href='#NoKarbahidoc'>
      <button className='bg-blue-500 text-white p-2 ml-3 rounded-sm text-xs'>कारबाही नभएका पत्रहरू</button>
      </a>
      </div>
      <div className='p-4 bg-slate-100 mt-4 shadow-sm'>
      <div className='w-100 mt-2'>
      
        <table className="w-full  bg-slate-300">
            <tr className='h-10'>
            <th   className='w-14 p-6  col-span-1'>
            <FaTh/>
            </th>
            <th  className='text-left p-5 col-span-7'>
               दर्ता सूचीकरण
            </th>
            <th className='col-span-1 ml-5 '>
                <button className='bg-green-600 text-white text-xs p-2 rounded-md'>
                    Print
                </button>
            </th>
            </tr>
       
       </table>

      </div>
      <table className="table-auto w-full border-collapse border border-gray-300  text-xs">
        <div>
        </div>
        <thead >
          <tr className='bg-slate-300'>
            <th className="border px-4 py-2">क्र.स.</th>
            <th className="border px-4 py-2">आर्थिक वर्ष</th>
            <th className="border px-4 py-2">कागजात वर्ग</th>
            <th className="border px-4 py-2">कार्यालय</th>
            <th className="border px-4 py-2">कार्यालय ठेगाना</th>
            <th className="border px-4 py-2">विषय</th>
            <th className="border px-4 py-2">पत्रको नेपाली मिति</th>
            <th className="border px-4 py-2">कैफियत</th>
            <th className="border px-4 py-2">कर्बाही भएको स्थिति</th>
            <th className="border px-4 py-2">कार्य</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.no}</td>
                <td className="border px-4 py-2">{item.year}</td>
                <td className="border px-4 py-2">{item.category}</td>
                <td className="border px-4 py-2">{item.office}</td>
                <td className="border px-4 py-2">{item.address}</td>
                <td className="border px-4 py-2">{item.subject}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.remark}</td>
                <td className="border px-4 py-2">{item.status}</td>
                <td className="border px-4 py-2">
                    <a href="#edit" className="bg-blue-600 px-2 py-1 mr-1 font-semibold text-white">Edit</a>
                    <a href="#view" className="bg-green-600 px-2 py-1 font-semibold text-white">View()</a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2 text-center" colSpan="9">
                कुनै रेकर्ड फेला परेन
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex w-100 h-10 mt-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`py-1 px-3 ml-2 rounded-lg font-bold ${
              currentPage === i + 1
                ? 'bg-cyan-500 text-white'
                : ' hover:bg-gray-400'
            }`}
          >
            {i + 1}
          </button>
        ))}
       <div className="items-center mt-1 space-x-2">
       <button
              className={` text-gray-400 font-bold py-1 px-3 ml-2 rounded-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`text-gray-400 font-bold py-1 px-3 rounded-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Documents;
