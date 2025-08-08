import React from 'react';
import { FileSpreadsheet, Settings } from 'lucide-react';

const ChartControls = ({ 
  uploads, 
  selectedData, 
  onDataSelect, 
  chartConfig, 
  onConfigChange 
}) => {
  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: '📊' },
    { value: 'line', label: 'Line Chart', icon: '📈' },
    { value: 'pie', label: 'Pie Chart', icon: '🥧' },
    { value: 'scatter', label: 'Scatter Plot', icon: '🔸' },
    { value: 'area', label: 'Area Chart', icon: '🏔️' },
    { value: 'doughnut', label: 'Doughnut Chart', icon: '🍩' }
  ];

  const colorPresets = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  const handleConfigChange = (key, value) => {
    onConfigChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Data Source Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <FileSpreadsheet className="inline h-4 w-4 mr-1" />
          Data Source
        </label>
        <select
          value={selectedData?.id || ''}
          onChange={(e) => {
            const selected = uploads.find(upload => upload.id === parseInt(e.target.value));
            onDataSelect(selected);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select data source</option>
          {uploads.map((upload) => (
            <option key={upload.id} value={upload.id}>
              {upload.filename} ({upload.rows.length} rows)
            </option>
          ))}
        </select>
      </div>

      {selectedData && (
        <>
          {/* Chart Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Chart Type</label>
            <div className="grid grid-cols-2 gap-2">
              {chartTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleConfigChange('type', type.value)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    chartConfig.type === type.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{type.icon}</span>
                    <span className="text-sm font-medium">{type.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Axis Selection */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">X-Axis</label>
              <select
                value={chartConfig.xAxis}
                onChange={(e) => handleConfigChange('xAxis', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select X-axis</option>
                {selectedData.headers.map((header, index) => (
                  <option key={index} value={header}>
                    {header || `Column ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Y-Axis</label>
              <select
                value={chartConfig.yAxis}
                onChange={(e) => handleConfigChange('yAxis', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Y-axis</option>
                {selectedData.headers.map((header, index) => (
                  <option key={index} value={header}>
                    {header || `Column ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chart Title</label>
            <input
              type="text"
              value={chartConfig.title}
              onChange={(e) => handleConfigChange('title', e.target.value)}
              placeholder="Enter chart title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Chart Color</label>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((color) => (
                <button
                  key={color}
                  onClick={() => handleConfigChange('color', color)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${
                    chartConfig.color === color
                      ? 'border-gray-400 scale-110'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <input
              type="color"
              value={chartConfig.color}
              onChange={(e) => handleConfigChange('color', e.target.value)}
              className="mt-2 w-full h-10 rounded-lg border border-gray-300"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ChartControls;