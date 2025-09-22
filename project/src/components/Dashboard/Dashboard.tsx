import React from 'react';
import { 
  TrendingUp, 
  Users, 
  FolderOpen, 
  MessageSquare, 
  MapPin, 
  CheckCircle,
  AlertTriangle,
  Clock,
  IndianRupee
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockDashboardStats, mockVillages, mockProjects, mockGrievances } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const stats = mockDashboardStats;

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change?: string;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, icon, color }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1">
              <TrendingUp className="inline h-4 w-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    return `${greeting}, ${user?.name}!`;
  };

  const highPriorityVillages = mockVillages
    .filter(v => v.priorityIndex > 8)
    .sort((a, b) => b.priorityIndex - a.priorityIndex);

  const recentGrievances = mockGrievances
    .filter(g => g.status === 'pending' || g.status === 'in_review')
    .slice(0, 5);

  const activeProjects = mockProjects
    .filter(p => p.status === 'in_progress')
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">{getWelcomeMessage()}</h1>
        <p className="mt-2 text-blue-100">
          Welcome to the PM-AJAY Adarsh Gram Administrative Portal. 
          Monitor progress, manage projects, and ensure transparent governance.
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full">
            Role: {user?.role.replace('_', ' ').toUpperCase()}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full">
            Level: {user?.level}
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Villages"
          value={stats.onboardedVillages}
          change="+12% from last month"
          icon={<MapPin className="h-6 w-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          change="+8% from last month"
          icon={<FolderOpen className="h-6 w-6 text-green-600" />}
          color="bg-green-50"
        />
        <StatCard
          title="Pending Grievances"
          value={stats.pendingGrievances}
          change="-15% from last month"
          icon={<MessageSquare className="h-6 w-6 text-orange-600" />}
          color="bg-orange-50"
        />
        <StatCard
          title="Budget Utilization"
          value={`${stats.budgetUtilization}%`}
          change="+5% from last month"
          icon={<IndianRupee className="h-6 w-6 text-purple-600" />}
          color="bg-purple-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Villages */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            High Priority Villages
          </h3>
          <div className="space-y-4">
            {highPriorityVillages.map((village) => (
              <div key={village.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                <div>
                  <h4 className="font-medium text-gray-900">{village.name}</h4>
                  <p className="text-sm text-gray-600">{village.district}, {village.state}</p>
                  <p className="text-sm text-gray-500">Population: {village.population.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                    Priority: {village.priorityIndex}/10
                  </div>
                  <p className="text-sm text-gray-600 mt-1">SC: {village.scPercentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Grievances */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            Recent Grievances
          </h3>
          <div className="space-y-4">
            {recentGrievances.map((grievance) => (
              <div key={grievance.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  grievance.priority === 'high' ? 'bg-red-100' : 
                  grievance.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                }`}>
                  <MessageSquare className={`h-4 w-4 ${
                    grievance.priority === 'high' ? 'text-red-600' : 
                    grievance.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{grievance.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{grievance.citizenName}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      grievance.status === 'pending' ? 'bg-red-100 text-red-800' : 
                      grievance.status === 'in_review' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {grievance.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{grievance.submittedDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Projects */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-blue-500" />
          Active Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeProjects.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <h4 className="font-medium text-gray-900 text-sm">{project.title}</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">{project.category}</p>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹{(project.spentAmount / 100000).toFixed(1)}L</span>
                <span>₹{(project.budget / 100000).toFixed(1)}L</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Satisfaction Score</h4>
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-green-600">{stats.averageSatisfaction}/10</div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(stats.averageSatisfaction / 10) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">Citizen Satisfaction</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Project Completion Rate</h4>
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-blue-600">
              {Math.round((stats.completedProjects / (stats.completedProjects + stats.activeProjects)) * 100)}%
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{stats.completedProjects} Completed</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-orange-500" />
                <span>{stats.activeProjects} Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Grievance Resolution</h4>
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-purple-600">
              {Math.round((stats.resolvedGrievances / (stats.resolvedGrievances + stats.pendingGrievances)) * 100)}%
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{stats.resolvedGrievances} Resolved</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-orange-500" />
                <span>{stats.pendingGrievances} Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;