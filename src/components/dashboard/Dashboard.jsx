import React from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Upload, 
  BarChart3, 
  FileSpreadsheet, 
  TrendingUp,
  Calendar,
  Download,
  Trash2,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const { uploads, charts, deleteUpload } = useData();
  const { user } = useAuth();

  const stats = [
    {
      name: 'Total Uploads',
      value: uploads.length,
      icon: Upload,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      name: 'Generated Charts',
      value: charts.length,
      icon: BarChart3,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      name: 'Data Points',
      value: uploads.reduce((sum, upload) => sum + upload.rows.length, 0),
      icon: TrendingUp,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      name: 'Files Processed',
      value: uploads.filter(upload => upload.rows.length > 0).length,
      icon: FileSpreadsheet,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}! Here's your analytics overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Uploads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Uploads</h2>
              <Upload className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="p-6">
            {uploads.length === 0 ? (
              <div className="text-center py-8">
                <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No uploads yet</p>
                <p className="text-sm text-gray-400 mt-2">Upload your first Excel file to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {uploads.slice(0, 5).map((upload) => (
                  <div key={upload.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <FileSpreadsheet className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900 truncate">{upload.filename}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {format(new Date(upload.uploadedAt), 'MMM dd, yyyy')}
                            </span>
                            <span>{upload.rows.length} rows</span>
                            <span>{formatFileSize(upload.size)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteUpload(upload.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Charts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Charts</h2>
              <BarChart3 className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="p-6">
            {charts.length === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No charts yet</p>
                <p className="text-sm text-gray-400 mt-2">Generate your first chart to see it here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {charts.slice(0, 5).map((chart) => (
                  <div key={chart.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{chart.title || `${chart.type} Chart`}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {format(new Date(chart.createdAt), 'MMM dd, yyyy')}
                            </span>
                            <span className="capitalize">{chart.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button className="bg-white text-blue-700 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Upload New File</span>
          </button>
          <button className="bg-white text-blue-700 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Create Chart</span>
          </button>
          <button className="bg-white text-blue-700 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;