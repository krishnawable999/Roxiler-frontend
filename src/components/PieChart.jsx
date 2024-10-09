import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register required components for the Pie chart
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchPieChartData = async () => {
      const response = await axios.get(`https://roxiler-i1fm.onrender.com/api/pie-chart`, {
        params: { month: selectedMonth },
      });
      setChartData(response.data);
    };

    fetchPieChartData();
  }, [selectedMonth]);

  const data = {
    labels: chartData.map(item => item.category),
    datasets: [
      {
        label: '# of Items',
        data: chartData.map(item => item.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
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
        text: 'Items by Category',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
