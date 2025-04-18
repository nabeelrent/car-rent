import React, { useState, useEffect } from "react";
import { FaCalendar, FaDownload, FaEdit, FaTimes } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setPageName } from '../../store/pageSlice';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import { FaMoneyBillAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import { IoMdSearch } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbCurrencyDirham } from "react-icons/tb";

function ExpenseNew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(setPageName('Expense List')); // Setting the page name
  // const expenseOptions = ["Rent", "Utilities", "Office Supplies", "Travel", "Other"];
  const [expenseOptions, setexpenseOptions] = useState([]);

  const [expeneceall, setexpeneceall] = useState([]);
  const [isEdit, setIsEdit] = useState(false)

  const getexpencetwo = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}expense/expense_tp_loss/`, {
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
    console.log(data, "data-p");

    const expenseTypes = data.data.map((item) => ({ value: item, label: item }));

    setexpeneceall(expenseTypes);
  }


  const getCartwo = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}expense/api/expense-types/`, {
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
    const expenseTypes = data.map((item) => { return { id: item.id, label: item.expense_type } });

    setexpenseOptions(expenseTypes);
  }
  const [isCarExpenseModalOpen, setIsCarExpenseModalOpen] = useState(false);
  const [isOtherExpenseModalOpen, setIsOtherExpenseModalOpen] = useState(false);

  // Sample car options for multi-select
  // const carOptions = [
  //   { value: "KL 56 W8976", label: "KL 56 W8976" },
  //   { value: "Template 001", label: "Template 001" },
  //   { value: "Template 002", label: "Template 002" },
  // ];
  const exportToExcel = () => {
    console.log(expenses, "expensespp");
  
    // Transform data: combine two fields and remove unwanted fields
    const formattedExpenses = expenses.map(item => ({
      Date: item.date,
      Description: item.description,
      "Expense Type & Car Model": `${item.expense_type_name || ""} - ${item.expense_type_car_model || ""}`,
      Amount: parseFloat(item.amount || 0).toFixed(2) // Ensure amount is formatted properly
    }));
  
    // Calculate total amount
    let totalAmount = formattedExpenses.reduce((sum, item) => sum + parseFloat(item.Amount), 0);
  
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedExpenses);
  
    // Add total row at the bottom
    const lastRow = formattedExpenses.length + 1; 
    XLSX.utils.sheet_add_aoa(worksheet, [["", "Total", "", totalAmount.toFixed(2)]], { origin: lastRow });
  
    // Create workbook and export
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "Expenses_List.xlsx");
  };
  
  

  const [carOptions, setCaroption] = useState([])
  console.log(carOptions, "carOptions-ppp");
  console.log(expeneceall, "testiyu");



  const [selectedCars, setSelectedCars] = useState([]);
  const [selectedCarssend, setselectedCarssend] = useState([]);

  const handleSelectChange = (selectedList) => {
    const selectedValues = selectedList.map((item) => item.value);

    console.log(selectedValues, "selectedValues");

    setselectedCarssend(selectedValues);
    setSelectedCars(selectedList);

    console.log(selectedCars, "selectedCars*");
  };

  // Function to remove an item from both states
  const handleRemoveItem = (itemToRemove) => {
    setSelectedCars((prevSelected) =>
      prevSelected.filter((item) => item.value !== itemToRemove.value)
    );

    setselectedCarssend((prevSelected) =>
      prevSelected.filter((value) => value !== itemToRemove.value)
    );
  };



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
        value: single_data.id,
        label: single_data.car_no
      }
    }))
  }
  useEffect(() => {
    getCar()
    getCartwo()
    getexpencetwo()
  }, []);
  // Sample data
  const [expenses, setExpenses] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [newExpense, setNewExpense] = useState({
    selectedCars: "",
    amount: "",
    description: "",
    expenseType: "",
    expenseTypetwo: "",
  });
  console.log(fromDate, "fromdt");
  console.log(toDate, "to");
console.log(newExpense,"newExpense-op");


  useEffect(() => {
    fetchExpenses()
  }, [fromDate, toDate]);
  const handleAddCarExpense = (e) => {
    e.preventDefault();
    const newEntry = {
      date: new Date().toLocaleDateString(),
      regNo: newExpense.selectedCars,
      amount: newExpense.amount,
      description: newExpense.description,
    };
    createExpense(newEntry)


    setNewExpense({
      selectedCars: "",
      amount: "",
      description: "",
      expenseType: "",
      expenseTypetwo: "",
    });
    setIsCarExpenseModalOpen(false);
  };
  const [data, setData] = useState({
    total_expense: 0,
    total_income: 0,
    total_profit: 0,
  });

  const handleAddOtherExpense = (e) => {
    e.preventDefault();
    console.log(newExpense, "new-exp");

    if (newExpense.expenseType.length > 0) {
      var exp = newExpense.expenseType
      var newEntry = {
        expense_date: new Date().toISOString(),
        expense_type: exp,
        amount: -newExpense.amount,
        description: newExpense.description,
      };
    }
    else {
      var exp = newExpense.expenseTypetwo
      var newEntry = {
        expense_date: new Date().toISOString(),
        expense_type_car: exp,
        amount: -newExpense.amount,
        description: newExpense.description,
      };
    }
 

    createExpense(newEntry)


    setNewExpense({
      selectedCars: "",
      amount: "",
      description: "",
      expenseType: "",
      expenseTypetwo: "",
    });
    setIsOtherExpenseModalOpen(false);
  };


  async function fetchExpenses() {
    console.log("kk");
    console.log(fromDate, toDate);


    if (fromDate && toDate) {
      const formattedFromDate = fromDate.toLocaleDateString("en-IN"); // "DD/MM/YYYY"
      const formattedToDate = toDate.toLocaleDateString("en-IN");
      console.log(formattedFromDate, formattedToDate, "pranv");

      var url_get = `${process.env.REACT_APP_API_URL}expense/expense_list_loss/?from_date=${formattedFromDate}&to_date=${formattedToDate}`
      if (selectedCarssend.length > 0) {
        url_get = url_get + `&ex=${selectedCarssend}`
      }

    }
    else {
      var url_get = `${process.env.REACT_APP_API_URL}expense/expense_list_loss/`
      if (selectedCarssend.length > 0) {
        url_get = url_get + `?ex=${selectedCarssend}`
      }

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

    };

    // Update state with API data
    setData(apiResponse);
    // "amount": "-34.00",
    // "expense_type": "kl 18 r 3745",
    // "description": "addddddd",
    // "expense_date": "2025-02-21T06:47:55.895000Z"

    setExpenses(data.data.map((single_data) => {
      return {
        id: single_data.id,

        date: single_data.expense_date,
        expense_type_name: single_data.expense_type_name,
        expense_type_id: single_data.expense_type_id,
        expense_type_car_model: single_data.expense_type_car_model,
        expense_type_car_model_id: single_data.expense_type_car_model_id,
        amount: single_data.amount,
        description: single_data.description,

      }
    }))
    console.log(expenses, "data");


  }
  const searchBYDate = async () => {
    await fetchExpenses()
  }



  async function createExpense(expenseData) {

    const response = await fetch(`${process.env.REACT_APP_API_URL}expense/api/expenses/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // If authentication is required
      },
      body: JSON.stringify(expenseData)
    });

    if (!response.ok) {
      setNewExpense({
        selectedCars: "",
        amount: "",
        description: "",
        expenseType: "",
        expenseTypetwo: "",
      });

      const errorData = await response.json();
      console.error("Failed to create expense:", errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(newExpense,"newExpense-op-op");

    const data = await response.json();
    console.log('Expense created:', data);
    fetchExpenses()
    getexpencetwo()
  }
  const handleReset = () => {
    setFromDate(null);
    setToDate(null);


  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editedExpense, setEditedExpense] = useState({
    expenseType: "",
    expenseTypetwo: "",
    amount: "",
    description: "",
    id:""
  });

  const handleEditExpense = (e) => {
    e.preventDefault();
    
    if (!editedExpense.expenseType && !editedExpense.expenseTypetwo) {
      console.error("Expense type is required.");
      return;
    }
  
    let updatedEntry = {
      date: new Date().toLocaleDateString(),
      amount: -Math.abs(editedExpense.amount),
       description: editedExpense.description,
      ...(editedExpense.expenseType
        ? { expense_type: editedExpense.expenseType }
        : { expense_type_car: editedExpense.expenseTypetwo })
    };
    
    
  
    updateExpense(editedExpense.id, updatedEntry);
  
    // Clear the edit state
    setEditedExpense({ expenseType: "", expenseTypetwo: "", amount: "", description: "" });
    setIsEditModalOpen(false);
  };
  
  // Function to update the expense
  async function updateExpense(expenseId, expenseData) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}expense/api/expenses/${expenseId}/`, {
      method: "PUT", // Assuming PUT method for update
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}` // If authentication is required
      },
      body: JSON.stringify(expenseData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to update expense:", errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const data = await response.json();
    console.log("Expense updated:", data);
  
    // Refresh the expenses list
    fetchExpenses();
    getexpencetwo();
  }
  
  const handleDeleteExpense = async (expenseId) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}expense/api/expenses/${expenseId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // If authentication is required
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete expense:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log(`Expense ID ${expenseId} deleted successfully.`);
      fetchExpenses(); // Refresh expense list after deletion
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  
  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="md:flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-blue-900 md:mb-0 mb-4">Expenses List</h1>
        <div className="flex gap-3">
          {/* <button
            onClick={() => setIsCarExpenseModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            + Add Car Revenue
          </button> */}
          <button
            onClick={() => setIsOtherExpenseModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-[#bf8327] via-[#a46f32] to-[#34291c]  text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            + Add  Expenses
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={exportToExcel}
          >
            <FaDownload className="h-5 w-5" />
            Download Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="md:flex gap-4  mb-6">
        <div className="flex md:justify-start md:mb-0 mb-3 md:gap-4 gap-3">
          <div className="relative">
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              selectsStart
              startDate={fromDate}
              endDate={toDate}
              placeholderText="From Date"
              className="pl-10 pr-4 py-2 h-[40px] border rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="pl-10 pr-4 py-2 h-[40px] border rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaCalendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          <button
            onClick={handleReset}
            className="px-2 py-2 h-[40px] flex justify-start text-[14px] items-center gap-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <GrPowerReset />  Reset
          </button>

          {/* <button
          className="md:hidden flex items-center justify-center gap-2 px-4 py-2 h-16 text-white bg-green-500 rounded-md hover:bg-green-600"
          onClick={searchBYDate}
          style={{ height: "40px" }}>
          search

          <IoMdSearch />
        </button> */}

        </div>


        <div className="min-w-80 max-w-[350px] flex gap-6">

          <Multiselect
            options={expeneceall} // Options to display in the dropdown
            selectedValues={selectedCars} // Preselected values
            onSelect={(selectedList) => handleSelectChange(selectedList)} // On select event
            onRemove={(selectedList) => handleRemoveItem(selectedList)} // On remove event
            displayValue="label" // Property to show in the dropdown
            className="border border-gray-300 rounded-lg shadow-sm w-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            style={{
              multiselectContainer: {
                width: "100%",
                height: "auto",
              },
              searchBox: {
                padding: "10px",
                borderRadius: "8px",
              },
              chips: {
                backgroundColor: "#3b82f6",
                color: "white",
              },
              option: {
                padding: "8px",
                cursor: "pointer",
              },
            }}
          />


          <button
            className="flex items-center justify-center gap-2 px-4 py-2 h-16 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={searchBYDate}
            style={{ height: "40px" }}>
            search

            <IoMdSearch />
          </button>

        </div>


      </div>
      <div class="flex mb-4 gap-4">

        <div class="w-full bg-red-100 h-24 py-4 ">
          <div className="flex justify-center items-center">
            <FaArrowDown className="text-red-500 text-xl" />
            <h3 className="text-lg font-semibold text-red-700">Total Expense</h3>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-xl font-bold text-red-900 flex items-center"><TbCurrencyDirham /> {Math.abs(data.total_expense).toFixed(2)}</p>
          </div>
        </div>



      </div>
      <div className="md:flex flex-wrap justify-between mb-4   w-full">


      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Serial No.</th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Expenses Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Intl.DateTimeFormat("en-GB").format(new Date(expense.date))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{expense.expense_type_name ? expense.expense_type_name : expense.expense_type_car_model}</td>
                <td className={`px-6 py-4 text-sm ${expense.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {expense.amount}
                </td>                <td className="px-6 py-4 text-sm text-gray-600">{expense.description}</td>
                <td className="px-6 py-4 text-sm text-gray-600 flex">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setSelectedExpense(expense);
                      setEditedExpense({
                        expenseType: expense.expense_type_id ? expense.expense_type_id : "",
                        expenseTypetwo: expense.expense_type_car_model_id ? expense.expense_type_car_model_id : "",
                        amount: expense.amount,
                        description: expense.description,
                        id:expense.id
                      });
                      setIsEditModalOpen(true);
                    }}
                  >
                    <FaEdit className="h-4 w-4" />
                  </button>
                  <button
    className="text-red-500 hover:text-red-700"
    onClick={() => handleDeleteExpense(expense.id)}
  >
    <MdOutlineDeleteOutline className="h-4 w-4" />
  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* <div className="flex items-center justify-end gap-2 mt-4">
        <button className="px-2 py-1 text-sm text-gray-600 hover:text-blue-500">«</button>
        <button className="px-2 py-1 text-sm text-white bg-red-500 rounded">1</button>
        <button className="px-2 py-1 text-sm text-gray-600 hover:text-blue-500">2</button>
        <button className="px-2 py-1 text-sm text-gray-600 hover:text-blue-500">3</button>
        <button className="px-2 py-1 text-sm text-gray-600 hover:text-blue-500">4</button>
        <button className="px-2 py-1 text-sm text-gray-600 hover:text-blue-500">5</button>
        <button className="px-2 py-1 text-sm text-gray-600 hover:text-blue-500">»</button>
      </div> */}

      {/* Car Expenses Modal */}
      {/* {isCarExpenseModalOpen && (
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
                    required>
                    <option value="">Select Car</option>
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
      )} */}
      {isEditModalOpen && selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Expense</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleEditExpense}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Cars</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editedExpense.expenseTypetwo}
                    onChange={(e) =>
                      setEditedExpense({
                        ...editedExpense,
                        expenseTypetwo: e.target.value,
                        expenseType: "",
                      })
                    }
                    disabled={editedExpense.expenseType !== ""}
                  >
                    <option value="">Select a car</option>
                    {carOptions.map((car) => (
                      <option key={car.value} value={car.value}>
                        {car.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex-grow items-center">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expense Type</label>
                    <select
                      value={editedExpense.expenseType}
                      onChange={(e) => {
                        const value = e.target.value;
                        setEditedExpense({
                          ...editedExpense,
                          expenseType: value,
                          expenseTypetwo: value === "" ? "" : editedExpense.expenseTypetwo,
                        });
                      }}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={editedExpense.expenseTypetwo !== ""}
                    >
                      <option value="">Select expense type</option>
                      {expenseOptions.map((expense, index) => (
                        <option key={index} value={expense.id}>
                          {expense.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => navigate("/cars/expenses-type/")}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-6"
                  >
                    +
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
  type="number"
  value={Math.abs(editedExpense.amount)} // Ensure displayed value is always positive
  onChange={(e) => {
    const value = Math.abs(e.target.value); // Convert input to absolute value
    setEditedExpense({ ...editedExpense, amount: -value }); // Store as negative in state
  }}
  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="Enter amount"
  required
/>

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editedExpense.description}
                    onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-sm text-gray-600 border rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-gradient-to-r from-[#bf8327] via-[#a46f32] to-[#34291c] rounded-md hover:bg-blue-600"
                  >
                    Save Changes
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


                <div className="flex items-center space-x-2">
                  <div className="flex-grow items-center">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expense Type</label>
                    <select
                      value={newExpense.expenseType}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          expenseType: e.target.value,
                          expenseTypetwo: "",
                        })
                      }
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={newExpense.expenseTypetwo !== ""}
                    >
                      <option value="" disabled>Select expense type</option>
                      {expenseOptions.map((expense, index) => (
                        <option key={index} value={expense.id}>
                          {expense.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => navigate("/cars/expenses-type/")}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-6"
                  >
                    +
                  </button>
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
  onClick={() => {
    setIsOtherExpenseModalOpen(false);
    setNewExpense({
      selectedCars: "",
      amount: "",
      description: "",
      expenseType: "",
      expenseTypetwo: "",
    });
  }}
  className="px-4 py-2 text-sm text-gray-600 border rounded-md hover:bg-gray-50"
>
  Cancel
</button>

                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-gradient-to-r from-[#bf8327] via-[#a46f32] to-[#34291c]  rounded-md hover:bg-blue-600"
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

export default ExpenseNew;