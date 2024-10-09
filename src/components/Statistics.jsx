import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // Log the selected month for debugging
        console.log('Fetching statistics for month:', selectedMonth);

        const response = await axios.get('https://roxiler-i1fm.onrender.com/api/statistics', {
          params: { month: selectedMonth }  // Pass the selectedMonth as query parameter
        });

        // Log the response data for debugging
        console.log('Statistics response data:', response.data);

        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    // Fetch statistics every time the selectedMonth changes
    if (selectedMonth) {
      fetchStatistics();
    }
  }, [selectedMonth]);

  return (
    <div>
      <h3>Statistics for {selectedMonth}</h3>
      <p>Total Sales Amount: {statistics.totalSales || 0}</p>
      <p>Total Sold Items: {statistics.soldItems || 0}</p>
      <p>Total Unsold Items: {statistics.unsoldItems || 0}</p>
    </div>
  );
};

export default Statistics;
