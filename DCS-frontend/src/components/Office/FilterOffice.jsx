import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTh } from 'react-icons/fa';

const FilterOfficeType = () => {
  const [tableData, setTableData] = useState([]);
  const [originalTableData, setOriginalTableData] = useState([]);
  const [officeTypes, setOfficeTypes] = useState([]);
  const [selectedOfficeType, setSelectedOfficeType] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get('api/v1/chalani/');
        setOriginalTableData(response.data); 
        setTableData(response.data); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchOfficeTypes = async () => {
      try {
        const response = await axios.get('api/v1/office_type/'); 
        setOfficeTypes(response.data); 
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTableData();
    fetchOfficeTypes();
  }, []);

  const filterByOfficeType = (officeType) => {
    setSelectedOfficeType(officeType);

    if (officeType === 'All') {
      setTableData(originalTableData);  // Show all data if 'All' is selected
    } else {
      const filteredData = originalTableData.filter((item) => {
        // Compare related_office to officeType
        return item.related_office === officeType; // Match the officeType ID to related_office ID
      });
      setTableData(filteredData);
    }

    setCurrentPage(1); // Reset to the first page when filter is applied
  };

  const getOfficeTypeName = (officeId) => {
    const office = officeTypes.find((office) => office.id === officeId);
    return office ? office.type_name : 'N/A'; // Return the type_name or 'N/A' if not found
  };

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const currentRows = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-h-full p-5">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => filterByOfficeType('All')}
                className={`py-1 px-3 rounded-md font-bold ${selectedOfficeType === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                All
              </button>
              {officeTypes.map((officeType) => (
                <button
                  key={officeType.id}
                  onClick={() => filterByOfficeType(officeType.id)}
                  className={`py-1 px-3 rounded-md font-bold ${selectedOfficeType === officeType.id ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {officeType.type_name}
                </button>
              ))}
            </div>
          </div>

          <div className="w-100 mt-2">
            <table className="w-full bg-slate-300">
              <thead>
                <tr className="h-10">
                  <th className="w-14 p-6 col-span-1">
                    <FaTh />
                  </th>
                  <th className="text-left p-5 col-span-7">चलानी सूचीकरण</th>
                </tr>
              </thead>
            </table>

            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300 text-xs">
                <thead>
                  <tr className="bg-slate-300">
                    <th className="border px-4 py-2">क्र.स.</th>
                    <th className="border px-4 py-2">विषय (Subject)</th>
                    <th className="border px-4 py-2">प्राप्तकर्ता को नाम(Receiver)</th>
                    <th className="border px-4 py-2">पठाइएको मिति (Sent Date)</th>
                    <th className="border px-4 py-2">कागजात प्रकार (Document Type)</th>
                    <th className="border px-4 py-2">स्थिति (Status)</th>
                    <th className="border px-4 py-2">डॉकुमेन्ट फाइल (Document File)</th>
                    <th className="border px-4 py-2">सम्बन्धित कार्यालय (Related Office)</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="border px-4 py-2 text-center">Loading...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="8" className="border px-4 py-2 text-center text-red-500">{error}</td>
                    </tr>
                  ) : currentRows.length > 0 ? (
                    currentRows.map((item, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{item.id}</td>
                        <td className="border px-4 py-2">{item.subject || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.receiver_name || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.sent_date || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.document_type || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.status || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.document_file || 'N/A'}</td>
                        <td className="border px-4 py-2">{getOfficeTypeName(item.related_office)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan="10">
                        कुनै रेकर्ड फेला परेन (No Records Found)
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex w-full h-10 mt-10">
              <button
                className={`text-gray-400 font-bold py-1 px-3 ml-2 rounded-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`py-1 px-3 ml-2 rounded-lg font-bold ${currentPage === i + 1 ? 'bg-cyan-500 text-white' : ' hover:bg-gray-400'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className={`text-gray-400 font-bold py-1 px-3 ml-2 rounded-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterOfficeType;
