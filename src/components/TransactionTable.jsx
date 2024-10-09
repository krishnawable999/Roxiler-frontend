import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './BarChart'; // Make sure this import points to your BarChart component
import PieChart from './PieChart';

const TransactionTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true); // Show loading state
      setError(null); // Reset error state
      try {
        const response = await axios.get(`https://roxiler-i1fm.onrender.com/api/transactions`, {
          params: { month: selectedMonth, page, search: searchText }
        });
        setTransactions(response.data.transactions);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions. Please try again.');
      } finally {
        setLoading(false); // Hide loading state
      }
    };

    fetchTransactions();
  }, [selectedMonth, page, searchText]); // Trigger effect when month, page, or searchText changes

  // Reset page to 1 when the month changes
  useEffect(() => {
    setPage(1);
  }, [selectedMonth]);

  // Helper function to truncate description
  const truncateDescription = (description, showFull) => {
    if (showFull) {
      return description;
    }
    return description.length > 200 ? `${description.slice(0, 200)}...` : description;
  };

  return (
    <div style={{ display: 'flex', padding: '16px', height: '100vh' }}>
      {/* Transaction Table Section */}
      <div style={{ flex: '0 0 50%', marginRight: '16px', overflowY: 'auto' }}>
        <div style={{ marginBottom: '16px' }}>
          <input 
            type="text" 
            placeholder="Search transactions..." 
            style={{ width: '100%', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#6B7280' }}>Loading transactions...</p>
        ) : error ? (
          <p style={{ textAlign: 'center', color: '#B91C1C' }}>{error}</p>
        ) : (
          <>
            <table style={{ width: '100%', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                <tr>
                  <th style={{ padding: '8px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Id</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Category</th>
                  
                  <th style={{ padding: '8px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Title</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Description</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Price</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Sold</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Date of Sale</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '8px', color: '#374151' }}>{transaction.id}</td>
                    <td style={{ padding: '8px', color: '#374151' }}>{transaction.category}</td>
                    
                    <td style={{ padding: '8px', color: '#374151' }}>{transaction.title}</td>
                    <td style={{ padding: '8px', color: '#374151' }}>{transaction.description}</td>
                    <td style={{ padding: '8px', color: '#374151' }}>${transaction.price}</td>
                    <td style={{ padding: '8px', color: '#374151' }}>{transaction.sold? "Yes" : "No"}</td>
                    <td style={{ padding: '8px', color: '#374151' }}>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
                disabled={page === 1}
                style={{ backgroundColor: '#3B82F6', color: '#FFFFFF', padding: '8px 16px', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
              >
                Previous
              </button>
              <span style={{ color: '#374151' }}>Page {page} of {totalPages}</span>
              <button 
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} 
                disabled={page === totalPages}
                style={{ backgroundColor: '#3B82F6', color: '#FFFFFF', padding: '8px 16px', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Bar Chart and Pie Chart Section */}
      <div style={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column' }}>
        {/* Bar Chart */}
        <div style={{ flex: '1', padding: '16px' }}>
          <BarChart selectedMonth={selectedMonth} />
        </div>
        {/* Pie Chart */}
        <div style={{ flex: '1', padding: '16px' }}>
          <PieChart selectedMonth={selectedMonth} />
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;