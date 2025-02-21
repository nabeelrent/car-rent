import React, { useState, useEffect } from "react";
import { FaCalendar, FaDownload, FaEdit, FaTimes } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setPageName } from '../../store/pageSlice';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import { FaMoneyBillAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FaRupeeSign } from "react-icons/fa";

function Expenses() {
  const dispatch = useDispatch();

  dispatch(setPageName('Expenses List')); // Setting the page name

  const [isCarExpenseModalOpen, setIsCarExpenseModalOpen] = useState(false);
  const [isOtherExpenseModalOpen, setIsOtherExpenseModalOpen] = useState(false);

  // Sample car options for multi-select
  // const carOptions = [
  //   { value: "KL 56 W8976", label: "KL 56 W8976" },
  //   { value: "Template 001", label: "Template 001" },
  //   { value: "Template 002", label: "Template 002" },
  // ];
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(expenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "Expenses_List.xlsx");
  };


  const [carOptions, setCaroption] = useState([])
  const [data, setData] = useState({
    total_expense: 0,
    total_income: 0,
    total_profit: 0,
  });

  const getCar = async () => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}car/cars/`, {

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
    setCaroption(data.map((single_data) => {
      return {
        value: single_data.car_no,
        label: single_data.car_no
      }
    }))
  }
  useEffect(() => {
    getCar()
  }, []);
  // Sample data
  const [expenses, setExpenses] = useState([

  ]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [newExpense, setNewExpense] = useState({
    selectedCars: "",
    amount: "",
    description: "",
    expenseType: "",
    expenseTypetwo: "",
  });
  console.log(fromDate,"fromdt");
  console.log(toDate,"to");
  
  
  useEffect(() => {
    fetchExpenses()
  }, []);
  const handleAddCarExpense = (e) => {
    e.preventDefault();
    const newEntry = {
      date: new Date().toLocaleDateString(),
      regNo: newExpense.selectedCars,
      amount: newExpense.amount,
      description: newExpense.description,
    };
    createExpense(newEntry)


    setNewExpense({ selectedCars: "", amount: "", description: "", expenseType: "" });
    setIsCarExpenseModalOpen(false);
  };

  const handleAddOtherExpense = (e) => {
    e.preventDefault();
    console.log(newExpense);
    
if(newExpense.expenseType.length > 0){
  var exp = newExpense.expenseType 
}
else{
  var exp = newExpense.expenseTypetwo
}
    const newEntry = {
      date: new Date().toLocaleDateString(),
      regNo: exp,
      amount: -newExpense.amount,
      description: newExpense.description,
    };

    createExpense(newEntry)


    setNewExpense({ selectedCars: "", amount: "", description: "", expenseType: "" ,});
    setIsOtherExpenseModalOpen(false);
  };


  async function fetchExpenses() {
    console.log("kk");
    console.log(fromDate,toDate);
    
    
    if(fromDate && toDate)
    {
const formattedFromDate = fromDate.toLocaleDateString("en-IN"); // "DD/MM/YYYY"
const formattedToDate = toDate.toLocaleDateString("en-IN");
console.log(formattedFromDate,formattedToDate,"pranv");

      var url_get = `${process.env.REACT_APP_API_URL}expense/get-balance/?from_date=${formattedFromDate}&to_date=${formattedToDate}`
    }
    else{
      var url_get = `${process.env.REACT_APP_API_URL}expense/get-balance/`
    }
    const response = await fetch(url_get, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // If authentication is required
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch expenses:", errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched expenses:', data);
    const apiResponse = {
      total_expense: data.total_expense,
      total_income:  data.total_income,
      total_profit:  data.total_profit,
    };

    // Update state with API data
    setData(apiResponse);

    setExpenses(data.data.map((single_data) => {
      return {

        date: single_data.expense_date,
        regNo: single_data.expense_type,
        amount: single_data.amount,
        description: single_data.description,

      }
    }))
    console.log(expenses, "data");


  }
  const searchBYDate = async ()=>{
    await fetchExpenses()
  }



  async function createExpense(expenseData) {
    const newEntry = {
      expense_date: new Date().toISOString(),
      expense_type: expenseData.regNo,
      amount: expenseData.amount,
      description: expenseData.description,
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}expense/api/expenses/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // If authentication is required
      },
      body: JSON.stringify(newEntry)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to create expense:", errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Expense created:', data);
    fetchExpenses()
  }
  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-blue-900">Expenses List</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsCarExpenseModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            + Add Car Revenue
          </button>
          <button
            onClick={() => setIsOtherExpenseModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            + Add  Expenses
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative">
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            selectsStart
            startDate={fromDate}
            endDate={toDate}
            placeholderText="From Date"
            className="pl-10 pr-4 py-2 border rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaCalendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>

        {/* To Date Picker */}
        <div className="relative">
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            selectsEnd
            startDate={fromDate}
            endDate={toDate}
            minDate={fromDate}
            placeholderText="To Date"
            className="pl-10 pr-4 py-2 border rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaCalendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        <select className="px-4 py-2 border rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Choose Car</option>
          {carOptions.map((car) => (
            <option key={car.value} value={car.value}>
              {car.label}
            </option>
          ))}
        </select>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          onClick={exportToExcel}
        >
          <FaDownload className="h-5 w-5" />
          Download Excel
        </button>
 <button
          className="flex items-center gap-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          onClick={searchBYDate}
        >
         search
      
        </button>
      </div>
      <div className="flex flex-wrap justify-between mb-4   w-full">
      {/* Total Expense Card */}
      <div className="flex flex-col items-center p-6 bg-red-100 rounded-lg h-28 shadow-md w-96">
        <FaArrowDown className="text-red-500 text-xl mb-2" />
        <h3 className="text-lg font-semibold text-red-700">Total Expense</h3>
        <p className="text-xl font-bold text-red-900 flex items-center"><FaRupeeSign/> {Math.abs(data.total_expense).toFixed(2)}</p>
      </div>

      {/* Total Income Card */}
      <div className="flex flex-col items-center p-6 bg-green-100 rounded-lg h-28 shadow-md w-96">
        <FaArrowUp className="text-green-500 text-3xl mb-2" />
        <h3 className="text-lg font-semibold text-green-700">Total Income</h3>
        <p className="text-xl font-bold text-green-900 flex items-center" ><FaRupeeSign/> {data.total_income.toFixed(2)}</p>
      </div>

      {/* Total Profit Card */}
      <div className="flex flex-col items-center p-6 bg-blue-100 rounded-lg h-28 shadow-md w-96">
        <FaMoneyBillAlt className="text-blue-500 text-3xl mb-2" />
        <h3 className="text-lg font-semibold text-blue-700">Total Profit</h3>
        <p className="text-xl font-bold text-blue-900 flex items-center"><FaRupeeSign/> {data.total_profit.toFixed(2)}</p>
      </div>
    </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">REG : No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{expense.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{expense.regNo}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{expense.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{expense.description}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <button className="text-red-500 hover:text-red-700">
                    <FaEdit className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2 mt-4">
        <button className="px-2 py-1 text-sm text-gray-600 hover:text-blue-500">«</button>
        <button className="px-2 py-1 text-sm text-white bg-red-500 rounded">1</button>
        <button className="px-2 py-1 text-sm text-gray-600 hover:text-blue-500">2</button>
        <button className="px-2 py-1 text-sm text-gray-600 hover:text-blue-500">3</button>
        <button className="px-2 py-1 text-sm text-gray-600 hover:text-blue-500">4</button>
        <button className="px-2 py-1 text-sm text-gray-600 hover:text-blue-500">5</button>
        <button className="px-2 py-1 text-sm text-gray-600 hover:text-blue-500">»</button>
      </div>

      {/* Car Expenses Modal */}
      {isCarExpenseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Car Balance</h2>
              <button onClick={() => setIsCarExpenseModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddCarExpense}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Cars</label>
                  <select

                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newExpense.selectedCars}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        selectedCars: e.target.value,
                      })
                    }
                  >
                    {carOptions.map((car) => (
                      <option key={car.value} value={car.value}>
                        {car.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsCarExpenseModalOpen(false)}
                    className="px-4 py-2 text-sm text-gray-600 border rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-gradient-to-r from-[#B41749] to-[#387BBF] rounded-md hover:bg-blue-600"
                  >
                    Add Balance
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Other Expenses Modal */}
      {isOtherExpenseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Other Expenses</h2>
              <button onClick={() => setIsOtherExpenseModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddOtherExpense}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Cars</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newExpense.expenseTypetwo}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        expenseTypetwo: e.target.value,
                        expenseType: "", 
                      })
                    }
                    disabled={newExpense.expenseType !== ""}
                  >
                    <option value="">Select a car</option>
                    {carOptions.map((car) => (
                      <option key={car.value} value={car.value}>
                        {car.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expense Type</label>
                  <input
                    type="text"
                    value={newExpense.expenseType}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        expenseType: e.target.value,
                        expenseTypetwo: "",
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter expense type"
                    required
                    disabled={newExpense.expenseTypetwo !== ""}
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                    rows={3}
                    required
                  />
                </div>



                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsOtherExpenseModalOpen(false)}
                    className="px-4 py-2 text-sm text-gray-600 border rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-gradient-to-r from-[#B41749] to-[#387BBF] rounded-md hover:bg-blue-600"
                  >
                    Add Expense
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

export default Expenses;