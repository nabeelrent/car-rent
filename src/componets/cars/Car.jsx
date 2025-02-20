import { FaPencilAlt, FaTrash, FaTimes } from "react-icons/fa";
import React, { useState,useEffect } from "react";
import { FaSearch } from 'react-icons/fa';

function Car() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCar, setNewCar] = useState({
    regNo: "",
    model: "",
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const [cars, setCars] = useState([
    
  ]);

async function createCar(car_data) {
    const response = await fetch('http://127.0.0.1:8000/car/cars/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Ensure this is dynamically fetched if needed
        },
        body: JSON.stringify(car_data)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    getCar()
    
}
const getCar = async ()=>{
    const response = await fetch('http://127.0.0.1:8000/car/cars/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Ensure this is dynamically fetched if needed
        },
        
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Car created:', data);
    setCars(data)
}
useEffect(() => {
    getCar()
}, []);


  const handleAddCar = (e) => {
    e.preventDefault();
    const newCarEntry = {
      
      car_no: newCar.regNo,
      car_model: newCar.model,
      date_created: new Date().toISOString()
    };
    
    
      createCar(newCarEntry)
    setIsModalOpen(false);
    console.log(newCarEntry);
  
    
  };
  const carDelete = async (carId)=>{
    const response = await fetch(`http://127.0.0.1:8000/car/cars/${carId}/`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` // If authentication is required
        }
    });

    if (response.status === 204) {
        console.log(`Car with ID ${carId} deleted successfully.`);
    } else {
        const errorData = await response.json();
        console.error("Failed to delete car:", errorData);
    }
    getCar()
}
  

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
              <tr key={car.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{car.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{car.car_no}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{car.car_model}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{car.date_created}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex gap-3">
                    <button className="text-gray-600 hover:text-blue-500">
                      <FaPencilAlt className="h-4 w-4" />
                    </button>
                    <button onClick={()=>carDelete(car.id)} className="text-gray-600 hover:text-red-500">
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
                  <button type="submit"  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
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
