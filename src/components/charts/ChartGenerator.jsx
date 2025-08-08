import React, { useState, useRef } from 'react';
import { useData } from '../../contexts/DataContext';
import ChartControls from './ChartControls';
import ChartViewer from './ChartViewer';
import { BarChart3, Download, Save, Sparkles } from 'lucide-react';

const ChartGenerator = () => {
  const { currentData, uploads, saveChart } = useData();
  const [selectedData, setSelectedData] = useState(currentData || uploads[0] || null);
  const [chartConfig, setChartConfig] = useState({
    type: 'bar',
    xAxis: '',
    yAxis: '',
    title: '',
    color: '#3B82F6'
  });
  const [aiInsights, setAiInsights] = useState('');
  const [loadingInsights, setLoadingInsights] = useState(false);
  const chartRef = useRef(null);

  const generateAIInsights = async () => {
    if (!selectedData || !chartConfig.xAxis || !chartConfig.yAxis) return;

    setLoadingInsights(true);
    
    // Simulate AI analysis - replace with actual AI API call
    setTimeout(() => {
      const insights = [
        `The ${chartConfig.type} chart shows a clear relationship between ${chartConfig.xAxis} and ${chartConfig.yAxis}.`,
        `Data analysis reveals ${selectedData.rows.length} data points with varying trends.`,
        `Consider examining outliers in the dataset for deeper insights.`,
        `The visualization suggests potential correlations that warrant further investigation.`
      ];
      
      setAiInsights(insights[Math.floor(Math.random() * insights.length)]);
      setLoadingInsights(false);
    }, 2000);
  };

  const handleSaveChart = () => {
    const chart = {
      title: chartConfig.title || `${chartConfig.type} Chart`,
      type: chartConfig.type,
      config: chartConfig,
      dataSource: selectedData.filename,
      insights: aiInsights
    };
    
    saveChart(chart);
    alert('Chart saved successfully!');
  };

  const handleDownloadChart = () => {
    if (chartRef.current) {
      // This would integrate with chart library's export functionality
      alert('Chart download functionality would be implemented here');
    }
  };

  if (!uploads.length) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Data Available</h2>
          <p className="text-gray-600 mb-6">Upload an Excel file first to generate charts</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Upload Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Chart Generator</h1>
            <p className="text-gray-600">Create interactive charts from your data</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart Controls */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Chart Configuration</h2>
            </div>
            <div className="p-6">
              <ChartControls
                uploads={uploads}
                selectedData={selectedData}
                onDataSelect={setSelectedData}
                chartConfig={chartConfig}
                onConfigChange={setChartConfig}
              />

              {/* AI Insights Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">AI Insights</h3>
                  <button
                    onClick={generateAIInsights}
                    disabled={loadingInsights || !chartConfig.xAxis || !chartConfig.yAxis}
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 disabled:opacity-50 text-sm"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Generate</span>
                  </button>
                </div>
                
                {loadingInsights ? (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Analyzing data...</span>
                  </div>
                ) : aiInsights ? (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <p className="text-sm text-purple-800">{aiInsights}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Configure chart axes and click Generate for AI insights</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <button
                  onClick={handleSaveChart}
                  disabled={!chartConfig.xAxis || !chartConfig.yAxis}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Chart</span>
                </button>
                
                <button
                  onClick={handleDownloadChart}
                  disabled={!chartConfig.xAxis || !chartConfig.yAxis}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PNG</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Display */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {chartConfig.title || 'Chart Preview'}
              </h2>
            </div>
            <div className="p-6" ref={chartRef}>
              <ChartViewer 
                data={selectedData}
                config={chartConfig}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartGenerator;