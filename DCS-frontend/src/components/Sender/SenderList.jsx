import React, { useState, useEffect } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

const FetchSenderList = ({ onSenderChange }) => {
    const [data, setData] = useState([]);
    const [selectedOffices, setSelectedOffices] = useState([]);
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newSender, setNewSender] = useState({
        name: "",
        location: "",
        contact: "",
        type: "",
    });
    const [officeTypes, setOfficeTypes] = useState([]);
    const [typeLoading, setTypeLoading] = useState(true);
    const [typeError, setTypeError] = useState(null);

    useEffect(() => {
        fetch("http://192.168.1.16:8000/api/v1/sender_office/")
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                if (Array.isArray(json)) {
                    setValues(json);
                } else {
                    setError("Data format is incorrect. Expected an array.");
                }
                setLoading(false);
            })
            .catch((error) => {
                setError("Error fetching data.");
                setLoading(false);
            });

        fetch("http://192.168.1.16:8000/api/v1/office_type/")
            .then((response) => response.json())
            .then((json) => {
                setOfficeTypes(json);
                setTypeLoading(false);
            })
            .catch((error) => {
                setTypeError("Error fetching office types.");
                setTypeLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedOffices.length > 0) {
            onSenderChange(selectedOffices[0].id);
        }
    }, [selectedOffices, onSenderChange]);

    const handleSelect = (e) => {
        const selectedId = e.target.value;
        const selectedName = e.target.options[e.target.selectedIndex].text;

        if (selectedId && selectedOffices.length === 0) {
            setSelectedOffices([{ id: selectedId, name: selectedName }]);
        }
    };

    const handleClear = () => {
        setSelectedOffices([]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSender((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://192.168.1.16:8000/api/v1/sender_office/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newSender),
            });
            if (response.ok) {
                const newOffice = await response.json();
                setValues((prev) => [...prev, newOffice]);
                setShowModal(false);
                setNewSender({ name: "", location: "", contact: "", type: "" });
                alert("Sender added successfully!");
            } else {
                alert("Failed to add sender.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding the sender.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleSelect}
                >
                    <option value="">Select Office</option>
                    {values.length > 0 ? (
                        values.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>No values found</option>
                    )}
                </select>
                <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="ml-2 bg-blue-700 text-white p-2 rounded-md"
                >
                    <FaPlus />
                </button>
            </div>
            <div className="mt-4">
                {selectedOffices.length > 0 && (
                    <div className="flex items-center bg-blue-700 text-white text-xs px-2 py-1 rounded-md">
                        <span>{selectedOffices[0].name}</span>
                        <button
                            onClick={handleClear}
                            className="ml-2 text-white hover:text-red-500"
                            title="Clear Selection"
                        >
                            <FaTimes />
                        </button>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Add New Sender</h2>
                        <form onSubmit={handleModalSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newSender.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={newSender.location}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Contact
                                    </label>
                                    <input
                                        type="text"
                                        name="contact"
                                        value={newSender.contact}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Type
                                    </label>
                                    <select
                                        name="type"
                                        value={newSender.type}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        {officeTypes.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.type_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-700 text-white py-2 px-4 rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FetchSenderList;
