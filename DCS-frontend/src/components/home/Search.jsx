import { useState, useEffect } from "react";
import axios from "axios";
import Datepicker from "./UI/Datepicker"; // Assuming Datepicker is a reusable component

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

  const [officeTypes, setOfficeTypes] = useState([]);
  const [fiscalYears, setFiscalYears] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const [receiverOffices, senderOffices, dartaData, chalaniData] = await Promise.all([
        axios.get("api/v1/receiver_office/"),
        axios.get("api/v1/sender_office/"),
        axios.get("api/v1/darta/"),
        axios.get("api/v1/chalani/"),
      ]);

      setOfficeTypes([...receiverOffices.data, ...senderOffices.data]);
      setDocumentTypes([...new Set(dartaData.data.map((item) => item.document_type))]);
      setFiscalYears([
        ...new Set([
          ...dartaData.data.map((item) => item.received_date),
          ...chalaniData.data.map((item) => item.sent_date),
        ]),
      ]);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatFiscalYear = (fiscalYear) => {
    const [startYear, endYear] = fiscalYear.split("-").map(Number);
    const startDate = new Date(`${startYear}-04-01`);
    const endDate = new Date(`${endYear}-03-31`);
    return `${startDate.getFullYear()}-${endDate.getFullYear()}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");
      const params = { ...formData };

      const [dartaResponse, chalaniResponse] = await Promise.all([
        axios.get("api/v1/darta/", { params }),
        axios.get("api/v1/chalani/", { params }),
      ]);

      setSearchResults([
        ...dartaResponse.data.map((item) => ({ ...item, source: "Darta" })),
        ...chalaniResponse.data.map((item) => ({ ...item, source: "Chalani" })),
      ]);
    } catch (err) {
      setError("Search failed. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-slate-100 shadow-sm">
      <div className="w-full mt-4 bg-gray-50 rounded-lg">
        {/* Search Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <Datepicker
            label="मिति (from)"
            id="date1"
            name="date1"
            value={formData.date1}
            onChange={handleChange}
          />
          <Datepicker
            label="मिति (to)"
            id="date2"
            name="date2"
            value={formData.date2}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 text-md">
          <Dropdown
            label="कागजत वर्ग"
            name="select1"
            options={documentTypes}
            value={formData.select1}
            onChange={handleChange}
          />
          <Dropdown
            label="पठाउने/बुझ्ने कार्यालको नाम *"
            name="select2"
            options={officeTypes.map((office) => ({ value: office.id, label: office.name }))}
            value={formData.select2}
            onChange={handleChange}
          />
          <Dropdown
            label="आर्थिक वर्ष"
            name="select3"
            options={fiscalYears.map((year) => ({
              value: year,
              label: formatFiscalYear(year),
            }))}
            value={formData.select3}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 mt-6">
          <Input
            label="दर्ता नम्बर"
            type="number"
            name="number1"
            value={formData.number1}
            onChange={handleChange}
          />
          <Input
            label="पत्रको चलानी नम्बर"
            type="number"
            name="number2"
            value={formData.number2}
            onChange={handleChange}
          />
          <Input
            label="चलानी नम्बर"
            type="number"
            name="number3"
            value={formData.number3}
            onChange={handleChange}
          />
        </div>

        {/* Search Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-6 rounded-lg font-bold mb-3"
            onClick={handleSearch}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      {/* Search Results */}
      <div className="overflow-x-auto mt-6">
        {searchResults.length === 0 ? (
          <div className="text-center p-4 font-bold text-gray-700">
            {loading ? "Loading..." : "Records Not Found"}
          </div>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Source</th>
                <th className="px-4 py-2">Document Type</th>
                <th className="px-4 py-2">Received Date</th>
                <th className="px-4 py-2">Sent Date</th>
                <th className="px-4 py-2">Darta Number</th>
                <th className="px-4 py-2">Chalani Number</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{result.source}</td>
                  <td className="border px-4 py-2">{result.document_type}</td>
                  <td className="border px-4 py-2">{result.received_date || result.received_date}</td>
                  <td className="border px-4 py-2">{result.sent_date || result.letter_date}</td>
                  <td className="border px-4 py-2">{result.darta_no}</td>
                  <td className="border px-4 py-2">{result.chalani_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const Dropdown = ({ label, name, options, value, onChange }) => (
  <div className="block">
    <label htmlFor={name} className="font-semibold">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded"
    >
      <option value="">छान्नुहोस्</option>
      {options.length > 0 ? (
        options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))
      ) : (
        <option value="">Loading...</option>
      )}
    </select>
  </div>
);

const Input = ({ label, type, name, value, onChange }) => (
  <div className="block">
    <label htmlFor={name} className="font-semibold">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded"
    />
  </div>
);

export default Search;
