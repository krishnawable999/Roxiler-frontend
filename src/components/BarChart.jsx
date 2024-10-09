import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register required components for the Bar chart
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchBarChartData = async () => {
      const response = await axios.get(`https://roxiler-i1fm.onrender.com/api/bar-chart`, {
        params: { month: selectedMonth },
      });
      setChartData(response.data);
    };

    fetchBarChartData();
  }, [selectedMonth]);

  const data = {
    labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901-above'],
    datasets: [
      {
        label: '# of Items',
        data: chartData.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Items by Price Range',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
