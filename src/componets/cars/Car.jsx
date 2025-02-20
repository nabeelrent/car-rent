import { FaPencilAlt, FaTrash, FaTimes } from "react-icons/fa";
import React, { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setPageName } from '../../store/pageSlice';

function Car() {
  const dispatch = useDispatch();

    dispatch(setPageName('Dashboard')); // Setting the page name
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCar, setNewCar] = useState({
    regNo: "",
    model: "",
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const [cars, setCars] = useState([
    {
      serialNo: "01",
      regNo: "KL 55 W8976",
      model: "Swift",
      date: "25-12-2025",
    },
    {
      serialNo: "02",
      regNo: "Template 001",
      model: "Muskan123@gmail.com",
      date: "170116764418775462",
    },
    {
      serialNo: "03",
      regNo: "Template 001",
      model: "Muskan123@gmail.com",
      date: "170116764418775462",
    },
  ]);

  const handleAddCar = (e) => {
    e.preventDefault();
    const newCarEntry = {
      serialNo: (cars.length + 1).toString().padStart(2, "0"),
      regNo: newCar.regNo,
      model: newCar.model,
      date: new Date().toLocaleDateString(),
    };
    setCars([...cars, newCarEntry]);
    setNewCar({ regNo: "", model: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="w-full px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">CarList</h1>
        <div className="relative bg-gray-200 rounded-lg">
                            <label className="flex gap-x-2 items-baseline">
                                <FaSearch
                                    className="absolute left-5 top-1/2 transform -translate-y-1/2 admin-main-text text-[#003465]"
                                    size={16}
                                />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-lg text-[#003465] bg-white pl-12 pr-4 py-2 focus:outline-none focus:border-transparent"
                                    placeholder="Search your chatbot"
                                />
                            </label>
                        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          + Add Car
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Serial No.</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">REG : No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Model</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car.serialNo} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{car.serialNo}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{car.regNo}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{car.model}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{car.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex gap-3">
                    <button className="text-gray-600 hover:text-blue-500">
                      <FaPencilAlt className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-red-500">
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Car Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Car</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddCar}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="regNo" className="block text-sm font-medium text-gray-700 mb-1">
                    Car Number
                  </label>
                  <input
                    id="regNo"
                    type="text"
                    value={newCar.regNo}
                    onChange={(e) => setNewCar({ ...newCar, regNo: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter car number"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <input
                    id="model"
                    type="text"
                    value={newCar.model}
                    onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter car model"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                    Save
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Car;
