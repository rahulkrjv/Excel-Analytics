import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Table, Download } from 'lucide-react';

const DataPreview = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  
  if (!data || !data.headers || !data.rows) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Table className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p>No data to preview</p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.rows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = data.rows.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-4">
      {/* Data Info */}
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <span className="flex items-center space-x-2">
            <Table className="h-4 w-4" />
            <span>{data.headers.length} columns</span>
          </span>
          <span>{data.rows.length} rows</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
          <Download className="h-4 w-4" />
          <span>Export Preview</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                #
              </th>
              {data.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header || `Column ${index + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map((row, rowIndex) => (
              <tr key={startIndex + rowIndex} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-sm text-gray-500 font-medium">
                  {startIndex + rowIndex + 1}
                </td>
                {data.headers.map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs truncate" title={row[colIndex] || ''}>
                      {row[colIndex] !== undefined ? String(row[colIndex]) : ''}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, data.rows.length)} of {data.rows.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <div className="flex items-center space-x-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                      pageNum === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPreview;