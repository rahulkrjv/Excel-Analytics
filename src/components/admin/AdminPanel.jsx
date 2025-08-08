import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { 
  Users, 
  FileSpreadsheet, 
  BarChart3, 
  Shield,
  TrendingUp,
  Eye,
  Trash2,
  UserPlus,
  Settings
} from 'lucide-react';
import { format } from 'date-fns';

const AdminPanel = () => {
  const { user } = useAuth();
  const { uploads, charts } = useData();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data - in real app, this would come from API
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', uploads: 5, lastActive: new Date() },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', uploads: 12, lastActive: new Date() },
    { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin', uploads: 3, lastActive: new Date() },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'data', name: 'Data Management', icon: FileSpreadsheet },
    { id: 'charts', name: 'Charts', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const stats = [
    {
      name: 'Total Users',
      value: mockUsers.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      name: 'Total Uploads',
      value: uploads.length,
      icon: FileSpreadsheet,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      name: 'Charts Created',
      value: charts.length,
      icon: BarChart3,
      color: 'bg-purple-500',
      change: '+24%'
    },
    {
      name: 'Storage Used',
      value: '2.4 GB',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+16%'
    }
  ];

  if (user.role !== 'admin' && user.role !== 'superuser') {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <Shield className="h-16 w-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin panel</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Manage users, data, and system settings</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Uploads</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {uploads.slice(0, 5).map((upload) => (
                    <div key={upload.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileSpreadsheet className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">{upload.filename}</p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(upload.uploadedAt), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{upload.rows.length} rows</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">System Health</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Server Status</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Database</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">AI Services</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Storage</span>
                    <span className="text-gray-900">2.4 GB / 10 GB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Add User</span>
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploads</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.uploads}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(user.lastActive, 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'data' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Storage Overview</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Used Storage</span>
                    <span className="text-sm font-medium">2.4 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Data Statistics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Files</span>
                    <span className="font-medium">{uploads.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Rows</span>
                    <span className="font-medium">{uploads.reduce((sum, upload) => sum + upload.rows.length, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average File Size</span>
                    <span className="font-medium">
                      {uploads.length > 0 
                        ? Math.round(uploads.reduce((sum, upload) => sum + upload.size, 0) / uploads.length / 1024) + ' KB'
                        : '0 KB'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(activeTab === 'charts' || activeTab === 'settings') && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 capitalize">{activeTab}</h2>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                {activeTab === 'charts' ? <BarChart3 className="h-16 w-16 mx-auto" /> : <Settings className="h-16 w-16 mx-auto" />}
              </div>
              <p className="text-gray-500">
                {activeTab === 'charts' ? 'Chart management features coming soon' : 'System settings panel coming soon'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;