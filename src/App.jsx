import React, { useState } from 'react';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import TransactionTable from './components/TransactionTable';
import './App.css'; // Make sure you have Tailwind directives in this file
import './index.css'
const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');  // State holding the selected month

  return (
    <div className="container mx-auto p-6">
      
      <h1 className="text-3xl font-bold text-center mb-8">Transaction Dashboard</h1>

      {/* Dropdown for selecting the month */}
      <div className="mb-6 text-center">
        <label className="mr-3 text-lg font-semibold">Select Month:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm"
        >
          {[
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Grid layout for components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transactions Table */}
        <div className="lg:col-span-2">
          <TransactionTable selectedMonth={selectedMonth} />
        </div>

        {/* Statistics Component */}
        <div>
          <Statistics selectedMonth={selectedMonth} />
        </div>

        {/* Bar Chart */}
        {/* <div>
          <BarChart selectedMonth={selectedMonth} />
        </div> */}

        {/* Pie Chart */}
        {/* <div>
          <PieChart selectedMonth={selectedMonth} />
        </div> */}
      </div>
    </div>
  );
};

export default App;
