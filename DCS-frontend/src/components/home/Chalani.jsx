import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTh } from 'react-icons/fa';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Chalani = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rowsPerPage = 2;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get('api/v1/chalani/', { cancelToken: source.token });
        setTableData(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      source.cancel('Component unmounted, request canceled.');
    };
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-h-full p-5">
      {/* Button Group */}
      <div className="ButtonGroup flex">
        <Link to="/addChalani">
          <button className="bg-blue-500 text-white p-2 rounded-sm text-xs">थप्नुहोस्</button>
        </Link>
        <a href="#issues">
          <button className="bg-blue-500 text-white p-2 ml-3 rounded-sm text-xs">प्राप्त</button>
        </a>
        <a href="#chalaniPratibedan">
          <button className="bg-blue-500 text-white p-2 ml-3 rounded-sm text-xs">
            चलानी प्रतिवेदन खोज
          </button>
        </a>
      </div>

      {/* Table */}
      <div className="p-4 bg-slate-100 mt-4 shadow-sm">
        <div className="w-100 mt-2">
          <table className="w-full bg-slate-300">
            <thead>
              <tr className="h-10">
                <th className="w-14 p-6 col-span-1">
                  <FaTh />
                </th>
                <th className="text-left p-5 col-span-7">चलानी सूचीकरण</th>
                <th className="col-span-1 ml-5">
                  <button onClick={handlePrint} className="bg-green-600 text-white text-xs p-2 rounded-md">
                    Print
                  </button>
                </th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-xs">
            <thead>
              <tr className="bg-slate-300">
                <th className="border px-4 py-2">क्र.स.</th>
                <th className="border px-4 py-2">आर्थिक वर्ष</th>
                <th className="border px-4 py-2">विषय</th>
                <th className="border px-4 py-2">कार्यालय</th>
                <th className="border px-4 py-2">चलानी नं</th>
                <th className="border px-4 py-2">पत्रको नेपाली मिति</th>
                <th className="border px-4 py-2">कैफियत</th>
                <th className="border px-4 py-2">कर्बाही भएको स्थिति</th>
                <th className="border px-4 py-2">कार्य</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="border px-4 py-2 text-center">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="9" className="border px-4 py-2 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : currentRows.length > 0 ? (
                currentRows.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                    <td className="border px-4 py-2">{item.year}</td>
                    <td className="border px-4 py-2">{item.category}</td>
                    <td className="border px-4 py-2">{item.office}</td>
                    <td className="border px-4 py-2">{item.chalaniNo}</td>
                    <td className="border px-4 py-2">{item.date}</td>
                    <td className="border px-4 py-2">{item.remark}</td>
                    <td className="border px-4 py-2">{item.status}</td>
                    <td className="border px-4 py-2">
                      <Link to={`/`} className="bg-blue-500 text-white font-bold p-1">
                        View
                      </Link>
                      <Link to={`/`} className="bg-green-500 text-white font-bold p-1 ml-2">
                        Done
                      </Link>
                      <Link to={`/`} className="bg-red-500 text-white font-bold p-1 ml-2">
                        Delete
                      </Link>
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
        </div>

        {/* Pagination */}
        <div className="flex w-100 h-10 mt-10 justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`py-1 px-3 mx-1 rounded-lg font-bold ${
                currentPage === i + 1 ? 'bg-cyan-500 text-white' : 'hover:bg-gray-400'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chalani;
