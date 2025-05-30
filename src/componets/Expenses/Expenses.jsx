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
import { TbCurrencyDirham } from "react-icons/tb";



function Expenses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(setPageName('Balance sheet')); // Setting the page name
  // const expenseOptions = ["Rent", "Utilities", "Office Supplies", "Travel", "Other"];
  const [expenseOptions, setexpenseOptions] = useState([]);

  const [expeneceall, setexpeneceall] = useState([]);

  const getexpencetwo = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}expense/d-exp-type/`, {
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
    const expenseTypes = data.map((item) => item.expense_type);

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
    console.log(expenses, "expenses-test");
  
    // Helper function to format date nicely with time
    const formatDate = (isoString) => {
      return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "short", // Converts to Jan, Feb, etc.
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Uses 24-hour format
      }).format(new Date(isoString)).replace(/\//g, '-');
    };
  
    // Calculate total revenue, total expenses, and total profit
    let totalRevenue = 0;
    let totalExpense = 0;
  
    // Transform data to merge expense_type_name and expense_type_car_model
    const formattedExpenses = expenses.map((item) => {
      const mergedType = item.expense_type_name || item.expense_type_car_model || ""; // Merge into a single column
      const amount = parseFloat(item.amount);
  
      // Categorize amounts
      if (amount > 0) {
        totalRevenue += amount;
      } else {
        totalExpense += amount;
      }
  
      return {
        Date: formatDate(item.date), // Apply date formatting
        "Expense Type": mergedType,
        Amount: item.amount,
        Description: item.description,
      };
    });
  
    // Calculate total profit (Revenue + Expense)
    const totalProfit = totalRevenue + totalExpense;
  
    // Find the last row index
    const lastRowIndex = formattedExpenses.length + 1;
  
    // Append summary rows
    const totalRow = [
      { Date: "Total", "Expense Type": "", Amount: "", Description: "" },
      { Date: "Total Revenue", "Expense Type": "", Amount: totalRevenue.toFixed(2), Description: "" },
      { Date: "Total Expense", "Expense Type": "", Amount: totalExpense.toFixed(2), Description: "" },
      { Date: "Total Profit", "Expense Type": "", Amount: totalProfit.toFixed(2), Description: "" },
    ];
  
    // Create worksheet and workbook with correct headers
    const worksheet = XLSX.utils.json_to_sheet(formattedExpenses, { header: ["Date", "Expense Type", "Amount", "Description"] });
  
    // Add summary rows
    XLSX.utils.sheet_add_json(worksheet, totalRow, { skipHeader: true, origin: lastRowIndex });
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
  
    // Save Excel file
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
        value: single_data.car_no,
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
  console.log(fromDate, "fromdt");
  console.log(toDate, "to");


  useEffect(() => {
    fetchExpenses()
  }, [fromDate,toDate]);
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
  const [data, setData] = useState({
    total_expense: 0,
    total_income: 0,
    total_profit: 0,
  });

  const handleAddOtherExpense = (e) => {
    e.preventDefault();
    console.log(newExpense);

    if (newExpense.expenseType.length > 0) {
      var exp = newExpense.expenseType
    }
    else {
      var exp = newExpense.expenseTypetwo
    }
    const newEntry = {
      date: new Date().toLocaleDateString(),
      regNo: exp,
      amount: -newExpense.amount,
      description: newExpense.description,
    };

    createExpense(newEntry)


    setNewExpense({ selectedCars: "", amount: "", description: "", expenseType: "", });
    setIsOtherExpenseModalOpen(false);
  };

  
  async function exportToExceltwo() {
    console.log("kk");
    console.log(fromDate, toDate);


    if (fromDate && toDate) {
      const formattedFromDate = fromDate.toLocaleDateString("en-IN"); // "DD/MM/YYYY"
      const formattedToDate = toDate.toLocaleDateString("en-IN");
      console.log(formattedFromDate, formattedToDate, "pranv");

      var url_get = `${process.env.REACT_APP_API_URL}expense/dowload-excel?from_date=${formattedFromDate}&to_date=${formattedToDate}`
      if (selectedCarssend.length > 0) {
        url_get = url_get + `&ex=${selectedCarssend}`
      }

    }
    else {
      var url_get = `${process.env.REACT_APP_API_URL}expense/dowload-excel`
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

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   console.error("Failed to fetch expenses:", errorData);
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    const blob = await response.blob();

    // Create a temporary link element
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'expenses.xlsx'); // Set the file name
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);


  }

  async function fetchExpenses() {
    console.log("kk");
    console.log(fromDate, toDate);


    if (fromDate && toDate) {
      const formattedFromDate = fromDate.toLocaleDateString("en-IN"); // "DD/MM/YYYY"
      const formattedToDate = toDate.toLocaleDateString("en-IN");
      console.log(formattedFromDate, formattedToDate, "pranv");

      var url_get = `${process.env.REACT_APP_API_URL}expense/get-balance/?from_date=${formattedFromDate}&to_date=${formattedToDate}`
      if (selectedCarssend.length > 0) {
        url_get = url_get + `&ex=${selectedCarssend}`
      }

    }
    else {
      var url_get = `${process.env.REACT_APP_API_URL}expense/get-balance/`
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
      total_income: data.total_income,
      total_profit: data.total_profit,
    };

    // Update state with API data
    setData(apiResponse);

    setExpenses(data.data.map((single_data) => {
      return {

        date: single_data.expense_date,
        expense_type_name: single_data.expense_type_name,
        expense_type_car_model:single_data.expense_type_car_model,
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
    const newEntry = {
      expense_date: new Date().toISOString(),
      expense_type: expenseData.regNo,
      amount: expenseData.amount,
      description: expenseData.description,
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}expense/expense/expenses/`, {
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
  const handleReset = () => {
    setFromDate(null);
    setToDate(null);


  };
  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="md:flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-blue-900 md:mb-0 mb-4">Balance sheet List</h1>
        <div className="flex gap-3">
          {/* <button
            onClick={() => setIsCarExpenseModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            + Add Car Revenue
          </button> */}
          {/* <button
            onClick={() => setIsOtherExpenseModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            + Add  Expenses
          </button> */}


<button
            className="flex items-center gap-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={exportToExcel}
          >
            <FaDownload className="h-5 w-5" />
            Download Excel
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={exportToExceltwo}
          >
            <FaDownload className="md:text-15px text-[10px]h-5 w-5" />
            Date-wise Excel Report
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
             <GrPowerReset/>  Reset
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

        <div class="w-1/3 bg-red-100 h-24 py-4 ">
          <div className="flex justify-center items-center">
            <FaArrowDown className="text-red-500 text-xl" />
            <h3 className="text-lg font-semibold text-red-700">Total Expense</h3>
          </div>
          <div className="flex justify-center items-center">
            <p className=" Ttext-xl font-bold text-red-900 flex items-center "><TbCurrencyDirham />  {Math.abs(data.total_expense).toFixed(2)}  </p>
          </div>
        </div>

        <div class="w-1/3 bg-green-100 h-24 py-4 ">
          <div className="flex justify-center items-center">
            <FaArrowUp className="text-green-500 text-3xl " />
            <h3 className="text-lg font-semibold text-green-700">Total Income</h3>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-xl font-bold text-green-900 flex items-center" ><TbCurrencyDirham /> {data.total_income.toFixed(2)}</p>
          </div>
        </div>


        <div class="w-1/3 bg-blue-100 h-24 py-4 ">
          <div className="flex justify-center items-center">
            <FaMoneyBillAlt className="text-green-500 text-3xl " />
            <h3 className="text-lg font-semibold text-blue-700">Total Profit</h3>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-xl font-bold text-blue-900 flex items-center"> <TbCurrencyDirham /> {data.total_profit.toFixed(2)}</p>
          </div>
        </div>


      </div>
      <div className="md:flex flex-wrap justify-between mb-4   w-full">
        {/* Total Expense Card */}
        {/* <div className="flex flex-col items-center p-6 bg-red-100 rounded-lg h-28 min-w-56 shadow-md w-auto">
          <FaArrowDown className="text-red-500 text-xl mb-2" />
          <h3 className="text-lg font-semibold text-red-700">Total Expense</h3>
          <p className="text-xl font-bold text-red-900 flex items-center"><FaRupeeSign /> {Math.abs(data.total_expense).toFixed(2)}</p>
        </div> */}

        {/* Total Income Card */}
        {/* <div className="flex flex-col items-center p-6 bg-green-100 rounded-lg h-28 shadow-md min-w-56">
          <FaArrowUp className="text-green-500 text-3xl mb-2" />
          <h3 className="text-lg font-semibold text-green-700">Total Income</h3>
          <p className="text-xl font-bold text-green-900 flex items-center" ><FaRupeeSign /> {data.total_income.toFixed(2)}</p>
        </div> */}

        {/* Total Profit Card */}
        {/* <div className="flex flex-col items-center p-6 bg-blue-100 rounded-lg h-28 shadow-md min-w-56">
          <FaMoneyBillAlt className="text-blue-500 text-3xl mb-2" />
          <h3 className="text-lg font-semibold text-blue-700">Total Profit</h3>
          <p className="text-xl font-bold text-blue-900 flex items-center"><FaRupeeSign /> {data.total_profit.toFixed(2)}</p>
        </div> */}

      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Serial No.</th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Expenses Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
              {/* <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Action</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Intl.DateTimeFormat("en-GB").format(new Date(expense.date))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{expense.expense_type_name ?expense.expense_type_name : expense.expense_type_car_model }</td>
                <td className={`px-6 py-4 text-sm ${expense.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {expense.amount}
                </td>                <td className="px-6 py-4 text-sm text-gray-600">{expense.description}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {/* <button className="text-red-500 hover:text-red-700">
                    <FaEdit className="h-4 w-4" />
                  </button> */}
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
                        <option key={index} value={expense}>
                          {expense}
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