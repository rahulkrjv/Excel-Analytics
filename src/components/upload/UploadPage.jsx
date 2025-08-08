import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import FileUpload from './FileUpload';
import DataPreview from './DataPreview';
import { FileSpreadsheet, AlertCircle, CheckCircle, Upload as UploadIcon } from 'lucide-react';

const UploadPage = () => {
  const { parseExcelFile, addUpload } = useData();
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  const handleFileUpload = async (file) => {
    setUploading(true);
    setUploadResult(null);
    setPreviewData(null);

    try {
      const data = await parseExcelFile(file);
      addUpload(data);
      setPreviewData(data);
      setUploadResult({
        success: true,
        message: `Successfully uploaded ${file.name}`,
        data
      });
    } catch (error) {
      setUploadResult({
        success: false,
        message: `Error uploading file: ${error.message}`
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <UploadIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upload Excel File</h1>
            <p className="text-gray-600">Upload your Excel (.xls, .xlsx) files for analysis</p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="p-6">
          <FileUpload 
            onFileUpload={handleFileUpload} 
            uploading={uploading}
          />

          {uploadResult && (
            <div className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${
              uploadResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {uploadResult.success ? (
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              )}
              <div>
                <p className={`font-medium ${
                  uploadResult.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {uploadResult.message}
                </p>
                {uploadResult.success && uploadResult.data && (
                  <div className="mt-2 text-sm text-green-700">
                    <p>• {uploadResult.data.headers.length} columns detected</p>
                    <p>• {uploadResult.data.rows.length} rows of data</p>
                    <p>• File size: {(uploadResult.data.size / 1024).toFixed(1)} KB</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Section */}
      {previewData && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <FileSpreadsheet className="h-6 w-6 text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Data Preview</h2>
                <p className="text-gray-600">Preview of your uploaded data</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <DataPreview data={previewData} />
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Upload Instructions</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Supported Formats</h4>
            <ul className="space-y-1">
              <li>• Excel files (.xlsx, .xls)</li>
              <li>• Maximum file size: 10MB</li>
              <li>• First row should contain headers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Best Practices</h4>
            <ul className="space-y-1">
              <li>• Use clear, descriptive column names</li>
              <li>• Ensure data consistency in columns</li>
              <li>• Remove empty rows and columns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;