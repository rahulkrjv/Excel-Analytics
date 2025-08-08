import React, { useState, useRef } from 'react';
import { Upload, File, X, FileSpreadsheet } from 'lucide-react';

const FileUpload = ({ onFileUpload, uploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelection = (file) => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid Excel file (.xlsx or .xls)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Drag and Drop Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
          ${dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : selectedFile 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <FileSpreadsheet className="h-12 w-12 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-800">{selectedFile.name}</p>
              <p className="text-sm text-green-600 mt-1">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={clearFile}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Remove file</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Upload className={`h-12 w-12 ${dragActive ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>
            <div>
              <p className={`text-lg font-medium ${dragActive ? 'text-blue-800' : 'text-gray-700'}`}>
                {dragActive ? 'Drop your file here' : 'Drag and drop your Excel file'}
              </p>
              <p className="text-gray-500 mt-2">or</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
              >
                Browse Files
              </button>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>Supported formats: .xlsx, .xls</p>
              <p>Maximum size: 10MB</p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {/* Upload Button */}
      {selectedFile && (
        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
          >
            {uploading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload & Analyze</span>
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;