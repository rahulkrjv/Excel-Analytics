import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  Filler
} from 'chart.js';
import { Bar, Line, Pie, Scatter, Doughnut } from 'react-chartjs-2';
import { BarChart3 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  Filler
);

const ChartViewer = ({ data, config }) => {
  const chartRef = useRef(null);

  if (!data || !config.xAxis || !config.yAxis) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Select data source and axes to generate chart</p>
          <p className="text-sm text-gray-400 mt-2">Configure your chart settings in the left panel</p>
        </div>
      </div>
    );
  }

  // Get column indices
  const xIndex = data.headers.indexOf(config.xAxis);
  const yIndex = data.headers.indexOf(config.yAxis);

  if (xIndex === -1 || yIndex === -1) {
    return (
      <div className="flex items-center justify-center h-96 bg-red-50 rounded-lg border border-red-200">
        <div className="text-center">
          <p className="text-red-600 font-medium">Invalid axis selection</p>
          <p className="text-sm text-red-500 mt-2">Please select valid columns for both axes</p>
        </div>
      </div>
    );
  }

  // Process data
  const processedData = data.rows
    .filter(row => row[xIndex] !== undefined && row[yIndex] !== undefined)
    .map(row => ({
      x: row[xIndex],
      y: parseFloat(row[yIndex]) || 0
    }));

  // Group data for categorical charts
  const groupedData = {};
  processedData.forEach(item => {
    if (groupedData[item.x]) {
      groupedData[item.x] += item.y;
    } else {
      groupedData[item.x] = item.y;
    }
  });

  const labels = Object.keys(groupedData);
  const values = Object.values(groupedData);

  // Generate colors
  const generateColors = (count, baseColor) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (parseInt(baseColor.slice(1), 16) + i * 50) % 360;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  const backgroundColors = config.type === 'pie' || config.type === 'doughnut' 
    ? generateColors(labels.length, config.color)
    : config.color;

  const chartData = {
    labels: labels,
    datasets: [{
      label: config.yAxis,
      data: values,
      backgroundColor: Array.isArray(backgroundColors) 
        ? backgroundColors 
        : `${backgroundColors}80`,
      borderColor: config.color,
      borderWidth: 2,
      fill: config.type === 'area' ? true : false,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif'
          }
        }
      },
      title: {
        display: !!config.title,
        text: config.title,
        font: {
          size: 18,
          weight: 'bold',
          family: 'Inter, system-ui, sans-serif'
        },
        padding: 20
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: config.color,
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: config.type !== 'pie' && config.type !== 'doughnut' ? {
      x: {
        title: {
          display: true,
          text: config.xAxis,
          font: {
            size: 14,
            weight: 'bold',
            family: 'Inter, system-ui, sans-serif'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      y: {
        title: {
          display: true,
          text: config.yAxis,
          font: {
            size: 14,
            weight: 'bold',
            family: 'Inter, system-ui, sans-serif'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    } : undefined,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  const renderChart = () => {
    const props = { ref: chartRef, data: chartData, options };

    switch (config.type) {
      case 'line':
        return <Line {...props} />;
      case 'pie':
        return <Pie {...props} />;
      case 'scatter':
        return <Scatter {...props} />;
      case 'doughnut':
        return <Doughnut {...props} />;
      case 'area':
        return <Line {...props} />;
      default:
        return <Bar {...props} />;
    }
  };

  return (
    <div className="h-96">
      {renderChart()}
    </div>
  );
};

export default ChartViewer;