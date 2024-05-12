import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import flowerService from '../services/flowerService';

const FlowerPieChart = () => {
  const [flowerData, setFlowerData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allFlowers = await flowerService.getAllFlowers();
        setFlowerData(allFlowers);
      } catch (error) {
        console.error('Error fetching flower data:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56'];

  const handleBack = () => {
    navigate('/'); // Navigate back to home page
  };

  const renderLegend = (data) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
        {data.map((entry, index) => (
          <div key={`legend-item-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: entry.fill, marginRight: '5px' }} />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    );
  };

  const generateChartData = (key) => {
    const dataMap = {};
    flowerData.forEach((flower) => {
      const value = flower[key];
      dataMap[value] = (dataMap[value] || 0) + 1;
    });

    return Object.keys(dataMap).map((name, index) => ({
      name,
      value: dataMap[name],
      fill: COLORS[index % COLORS.length],
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button color="primary" variant="contained" onClick={handleBack} style={{ marginBottom: '20px' }}>
        Back
      </Button>

      <h2>Flower Distribution by Name</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={generateChartData('name')}
          cx={200}
          cy={200}
          labelLine={false}
          label
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {generateChartData('name').map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
        <Legend wrapperStyle={{ marginBottom: '20px' }} content={renderLegend(generateChartData('name'))} />
      </PieChart>

      <h2>Flower Distribution by Uses</h2>
      <BarChart width={400} height={300} data={generateChartData('uses')}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend content={renderLegend(generateChartData('uses'))} />
        <Bar dataKey="value" fill="#8884d8">
          {generateChartData('uses').map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>

      <h2>Flower Distribution by Bloom Month</h2>
      <BarChart width={400} height={300} data={generateChartData('bloomMonth')}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend content={renderLegend(generateChartData('bloomMonth'))} />
        <Bar dataKey="value" fill="#8884d8">
          {generateChartData('bloomMonth').map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default FlowerPieChart;
