import React, { createContext, useContext, useState } from 'react';
import * as XLSX from 'xlsx';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [uploads, setUploads] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [charts, setCharts] = useState([]);

  const parseExcelFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          const headers = jsonData[0] || [];
          const rows = jsonData.slice(1);
          
          const parsedData = {
            id: Date.now(),
            filename: file.name,
            headers,
            rows,
            uploadedAt: new Date().toISOString(),
            size: file.size
          };

          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const addUpload = (data) => {
    setUploads(prev => [data, ...prev]);
    setCurrentData(data);
  };

  const saveChart = (chartData) => {
    const chart = {
      id: Date.now(),
      ...chartData,
      createdAt: new Date().toISOString()
    };
    setCharts(prev => [chart, ...prev]);
    return chart;
  };

  const deleteUpload = (id) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
    if (currentData && currentData.id === id) {
      setCurrentData(null);
    }
  };

  const value = {
    uploads,
    currentData,
    charts,
    parseExcelFile,
    addUpload,
    saveChart,
    deleteUpload,
    setCurrentData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};