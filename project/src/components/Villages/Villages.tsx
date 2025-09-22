import React, { useState } from 'react';
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  Search, 
  Filter, 
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
  Droplet,
  GraduationCap,
  Heart,
  Trash2,
  Car
} from 'lucide-react';
import { mockVillages } from '../../data/mockData';
import { Village } from '../../types';

const Villages: React.FC = () => {
  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredVillages = mockVillages.filter(village => {
    const matchesSearch = village.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         village.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = filterPriority === 'all' || 
                           (filterPriority === 'high' && village.priorityIndex >= 8) ||
                           (filterPriority === 'medium' && village.priorityIndex >= 5 && village.priorityIndex < 8) ||
                           (filterPriority === 'low' && village.priorityIndex < 5);
    
    return matchesSearch && matchesPriority;
  });

  const InfrastructureIcon: React.FC<{ type: string }> = ({ type }) => {
    const icons = {
      education: GraduationCap,
      health: Heart,
      water: Droplet,
      sanitation: Trash2,
      connectivity: Wifi,
      roads: Car
    };
    const Icon = icons[type as keyof typeof icons];
    return <Icon className="h-4 w-4" />;
  };

  const getInfrastructureStatus = (facility: any) => {
    if (facility.underConstruction) return { status: 'Under Construction', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock };
    if (facility.available && facility.functional) return { status: 'Functional', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle };
    if (facility.available && !facility.functional) return { status: 'Non-Functional', color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle };
    return { status: 'Not Available', color: 'text-gray-600', bg: 'bg-gray-50', icon: AlertTriangle };
  };

  const VillageCard: React.FC<{ village: Village }> = ({ village }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{village.name}</h3>
          <p className="text-sm text-gray-600">{village.district}, {village.state}</p>
          <p className="text-sm text-gray-500">{village.block} Block</p>
        </div>
        <div className="text-right">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            village.priorityIndex >= 8 ? 'bg-red-100 text-red-800' :
            village.priorityIndex >= 5 ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            Priority: {village.priorityIndex}/10
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Satisfaction: {village.satisfactionScore}/10
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Pop: {village.population.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">SC: {village.scPercentage}%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {Object.entries(village.infrastructure).map(([key, facility]) => {
          const status = getInfrastructureStatus(facility);
          return (
            <div key={key} className={`p-2 rounded-lg ${status.bg} flex flex-col items-center gap-1`}>
              <InfrastructureIcon type={key} />
              <span className="text-xs font-medium capitalize">{key}</span>
              <div className={`text-xs ${status.color}`}>{status.status}</div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setSelectedVillage(village)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Eye className="h-4 w-4" />
        View Details
      </button>
    </div>
  );

  const VillageDetailModal: React.FC<{ village: Village; onClose: () => void }> = ({ village, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{village.name}</h2>
              <p className="text-gray-600">{village.district}, {village.state}</p>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {village.coordinates[0].toFixed(4)}, {village.coordinates[1].toFixed(4)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Demographics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Population</h4>
              <p className="text-2xl font-bold text-blue-600">{village.population.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">SC Population</h4>
              <p className="text-2xl font-bold text-green-600">{village.scPercentage}%</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Satisfaction Score</h4>
              <p className="text-2xl font-bold text-purple-600">{village.satisfactionScore}/10</p>
            </div>
          </div>

          {/* Infrastructure Status */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Infrastructure Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(village.infrastructure).map(([key, facility]) => {
                const status = getInfrastructureStatus(facility);
                const StatusIcon = status.icon;
                
                return (
                  <div key={key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <InfrastructureIcon type={key} />
                      <h4 className="font-medium text-gray-900 capitalize">{key}</h4>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <StatusIcon className={`h-4 w-4 ${status.color}`} />
                      <span className={`text-sm font-medium ${status.color}`}>{status.status}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Quality: <span className="capitalize">{facility.quality}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Priority Assessment */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Assessment</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700">Priority Index</span>
                <span className="text-xl font-bold text-gray-900">{village.priorityIndex}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    village.priorityIndex >= 8 ? 'bg-red-500' :
                    village.priorityIndex >= 5 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${village.priorityIndex * 10}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {village.priorityIndex >= 8 ? 'High priority - requires immediate attention' :
                 village.priorityIndex >= 5 ? 'Medium priority - regular monitoring needed' :
                 'Low priority - stable development'}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              View Projects
            </button>
            <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              View Grievances
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Villages</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search villages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVillages.map((village) => (
          <VillageCard key={village.id} village={village} />
        ))}
      </div>

      {filteredVillages.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No villages found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {selectedVillage && (
        <VillageDetailModal
          village={selectedVillage}
          onClose={() => setSelectedVillage(null)}
        />
      )}
    </div>
  );
};

export default Villages;