import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTh } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NepaliDate from 'nepali-date';

const DartaChalani = () => {
  const [dartaData, setDartaData] = useState([]);
  const [chalaniData, setChalaniData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nepaliDate, setNepaliDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const rowsPerPage = 2;

  useEffect(() => {
    const currentDate = new NepaliDate();
    setNepaliDate(currentDate.format('YYYY-MM-DD'));
  }, []);

  const fetchDartaData = async () => {
    try {
      const response = await axios.get('api/v1/darta/');
      setDartaData(response.data);
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      setError(errorMessage);
    } finally {
      setLoading(false); 
    }
  };
  
  const fetchChalaniData = async () => {
    try {
      const response = await axios.get('api/v1/chalani/');
      setChalaniData(response.data);
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      setError(errorMessage);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchDartaData();
    fetchChalaniData();
  }, []);

  useEffect(() => {
    const combined = [...dartaData, ...chalaniData];
    const filtered = selectedStatus ? combined.filter(item => item.status === selectedStatus) : combined;
    setCombinedData(filtered);
  }, [dartaData, chalaniData, selectedStatus]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = combinedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(combinedData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrint = () => {
    const content = `
      <html>
        <head>
          <style>
            @page { margin: 0; }
            body { font-family: Arial, sans-serif; }
            .tablePrint { width: 100%; border: 2px solid black; }
            .top-section { margin-top: 30px; text-align: center; }
            .gatey { font-family: 'Noto Sans Devanagari', sans-serif; }
            th, td { width: 100px; font-weight: bold; font-size: 12px; text-align: center; border: 2px solid black; }
            th { background: #0009; }
            .bottomContainer { position: relative; height: 800px; }
            .bottomSection { position: absolute; bottom: 0; left: 0; right: 0; padding-left: 5px; }
          </style>
        </head>
        <body>
          <div class="top-section">
            <h2>दर्ता र चलानी सूचीकरण</h2>
            <p class="gatey">${nepaliDate}</p>
          </div>
          <table class="tablePrint">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>विषय (Subject)</th>
                <th>पत्र नं (Document no.)</th>
                <th>पत्र मिति (Date)</th>
                <th>डॉकुमेन्ट प्रकार (Document Type)</th>
                <th>स्थिति (Status)</th>
                <th>Related Office</th>
              </tr>
            </thead>
            <tbody>
              ${currentRows.map((item) => `
                <tr>
                  <td>${item.id}</td>
                  <td>${item.subject || 'N/A'}</td>
                  <td>${item.remarks || 'N/A'}</td>
                  <td>${item.received_date || 'N/A'}</td>
                  <td>${item.letter_no || 'N/A'}</td>
                  <td>${item.letter_date || 'N/A'}</td>
                  <td>${item.document_type || 'N/A'}</td>
                  <td>${item.status || 'N/A'}</td>
                  <td>${item.sender_office || 'N/A'}</td>
                  <td>${item.receiver_office || 'N/A'}</td>
                 </tr>

              `).join('')}
              ${currentRows.length === 0 ? `

                <tr>
                  <td colspan="10" class="text-center">कुनै रेकर्ड फेला परेन (No Records Found)</td>
                </tr>
              ` : ''}
            </tbody>
          </table>
          <div class="bottomContainer">
            <div class="bottomSection">
              <h3>--------------------</h3>
              <h3>हस्ताक्षर</h3>
            </div>
          </div>
        </body>
      </html>
    `;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(content);
    iframeDoc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    document.body.removeChild(iframe);
  };

  return (
    <div className="max-h-full p-5">
      {loading && !error ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
<div className="ButtonGroup flex">

  <button
    onClick={() => setSelectedStatus('Pending')}
    className="bg-blue-700 text-white p-2  rounded-md hover:bg-black"
  >
    कारबाही नभएका पत्रहरू
  </button>
  <button
    onClick={() => setSelectedStatus('Shipped')}
    className="bg-blue-700 text-white p-2  ml-3 rounded-md hover:bg-black"
  >
    कारबाही भएका पत्रहरू
  </button>
</div>

          <div className="w-100 mt-2">
            <table className="w-full bg-slate-300">
              <thead>
                <tr className="h-10">
                  <th className="w-14 p-6 col-span-1">
                    <FaTh />
                  </th>
                  <th className="text-left p-5 col-span-7">दर्ता र चलानी सूचीकरण</th>
                  <th className="col-span-1 ml-5">
                    <button onClick={handlePrint} className="bg-green-600 text-white text-xs p-2 rounded-md">
                      Print
                    </button>
                  </th>
                </tr>
              </thead>
            </table>

            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300 text-xs">
                <thead>
                  <tr className='bg-slate-300'>
                    <th className="border px-4 py-2">क्र.स.</th>
                    <th className="border px-4 py-2">प्रकार</th>
                    <th className="border px-4 py-2">विषय (Subject)</th>
                    <th className="border px-4 py-2">Remarks</th>
                    <th className="border px-4 py-2">Document No.</th>
                    <th className="border px-4 py-2">डॉकुमेन्ट प्रकार (Document Type)</th>
                    <th className="border px-4 py-2">डॉकुमेन्ट (Document File)</th>
                    <th className="border px-4 py-2">स्थिति (Status)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.length > 0 ? (
                    currentRows.map((item, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{item.id}</td>
                        <td className="border px-4 py-2">{ item.darta_no ? 'darta' : 'chalani' }</td>                      
                        <td className="border px-4 py-2">{item.subject || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.remarks || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.darta_no || item.chalani_no || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.document_type || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.document_file || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.status || 'N/A'}</td>
                        </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan="9">
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
              {Array.from({ length: totalPages }, (_, i) => {
                const startPage = Math.max(1, currentPage - 1);
                const endPage = Math.min(totalPages, currentPage + 1);

                if (i + 1 >= startPage && i + 1 <= endPage) {
                  return (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`py-1 px-3 ml-2 rounded-lg font-bold ${currentPage === i + 1 ? 'bg-cyan-500 text-white' : ' hover:bg-gray-400'}`}
                    >
                      {i + 1}
                    </button>
                  );
                }
                return null;
              })}

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

export default DartaChalani;
