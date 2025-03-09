import { FaPencilAlt, FaTrash, FaTimes } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageName } from "../../store/pageSlice";

function ExpensesType() {
  const dispatch = useDispatch();
  dispatch(setPageName("Expenses Type List")); // Setting the page name

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newExpense, setNewExpense] = useState({ expense_type: "" });
  const [expenses, setExpenses] = useState([]);

  // Fetch Expenses
  const getExpenses = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}expense/api/expense-types/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setExpenses(data);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  // Handle Add/Edit Expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiURL = isEdit
      ? `${process.env.REACT_APP_API_URL}expense/api/expense-types/${newExpense.id}/`
      : `${process.env.REACT_APP_API_URL}expense/api/expense-types/`;

    const method = isEdit ? "PUT" : "POST";

    const response = await fetch(apiURL, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ expense_type: newExpense.expense_type }),
    });

    if (!response.ok) {
      console.error(`Failed to ${isEdit ? "update" : "create"} expense.`);
      return;
    }

    await response.json();
    setIsModalOpen(false);
    setIsEdit(false);
    setNewExpense({ expense_type: "" });
    getExpenses();
  };

  // Open Edit Modal
  const openEditModal = (expense) => {
    setIsModalOpen(true);
    setIsEdit(true);
    setNewExpense({ id: expense.id, expense_type: expense.expense_type });
  };

  // Delete Expense
  const deleteExpense = async (expenseId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this expense?");
    if (!isConfirmed) return;
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}expense/api/expense-types/${expenseId}/`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
  
      if (response.ok) {
        getExpenses(); // Refresh the list after deletion
      } else {
        console.error("Failed to delete expense.");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  
  return (
    <div className="w-full px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Expense Type</h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEdit(false);
            setNewExpense({ expense_type: "" });
          }}
          className="px-4 py-2 bg-gradient-to-r from-[#bf8327] via-[#a46f32] to-[#34291c] text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          + Expense Type
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Serial No.</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Expense Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense, index) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{expense.expense_type}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex gap-3">
                    <button onClick={() => openEditModal(expense)} className="text-gray-600 hover:text-blue-500">
                      <FaPencilAlt className="h-4 w-4" />
                    </button>
                    <button onClick={() => deleteExpense(expense.id)} className="text-gray-600 hover:text-red-500">
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal (for Add/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{isEdit ? "Edit Expense Type" : "Add Expense Type"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="expensetype" className="block text-sm font-medium text-gray-700 mb-1">
                    Expense Type
                  </label>
                  <input
                    id="expensetype"
                    type="text"
                    value={newExpense.expense_type}
                    onChange={(e) => setNewExpense({ ...newExpense, expense_type: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Expense Type"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-[#B41749] to-[#387BBF] text-white rounded-md hover:bg-green-600"
                  >
                    {isEdit ? "Update" : "Save"}
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

export default ExpensesType;
