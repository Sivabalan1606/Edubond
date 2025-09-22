import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Eye, 
  User,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone,
  Calendar,
  Camera,
  Mic,
  Send
} from 'lucide-react';
import { mockGrievances, mockVillages } from '../../data/mockData';
import { Grievance } from '../../types';

const Grievances: React.FC = () => {
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in_review' | 'resolved' | 'closed'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>('all');

  const filteredGrievances = mockGrievances.filter(grievance => {
    const matchesSearch = grievance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grievance.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grievance.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || grievance.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || grievance.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-red-100 text-red-800',
      'in_review': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'bg-blue-100 text-blue-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'pending': Clock,
      'in_review': AlertTriangle,
      'resolved': CheckCircle,
      'closed': CheckCircle
    };
    const Icon = icons[status as keyof typeof icons] || Clock;
    return <Icon className="h-4 w-4" />;
  };

  const getVillageName = (villageId: string) => {
    const village = mockVillages.find(v => v.id === villageId);
    return village ? village.name : 'Unknown Village';
  };

  const GrievanceCard: React.FC<{ grievance: Grievance }> = ({ grievance }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{grievance.title}</h3>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(grievance.priority)}`}>
              {grievance.priority.toUpperCase()}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">{grievance.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">{grievance.category}</span>
            <span>•</span>
            <span>{getVillageName(grievance.villageId)}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(grievance.status)}`}>
          {getStatusIcon(grievance.status)}
          {grievance.status.replace('_', ' ').toUpperCase()}
        </div>
      </div>

      {/* Citizen Information */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-gray-500" />
          <span className="font-medium text-gray-900">{grievance.citizenName}</span>
          <Phone className="h-4 w-4 text-gray-500 ml-2" />
          <span className="text-gray-600">{grievance.citizenPhone}</span>
        </div>
      </div>

      {/* Media Attachments */}
      <div className="flex items-center gap-4 mb-4">
        {grievance.photos.length > 0 && (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Camera className="h-4 w-4" />
            <span>{grievance.photos.length} photo{grievance.photos.length > 1 ? 's' : ''}</span>
          </div>
        )}
        {grievance.audioFiles.length > 0 && (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Mic className="h-4 w-4" />
            <span>{grievance.audioFiles.length} audio file{grievance.audioFiles.length > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Submitted: {new Date(grievance.submittedDate).toLocaleDateString()}</span>
        </div>
        {grievance.resolvedDate && (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Resolved: {new Date(grievance.resolvedDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {grievance.assignedOfficer && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <User className="h-4 w-4" />
          <span>Assigned to: {grievance.assignedOfficer}</span>
        </div>
      )}

      <button
        onClick={() => setSelectedGrievance(grievance)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Eye className="h-4 w-4" />
        View Details & Respond
      </button>
    </div>
  );

  const GrievanceDetailModal: React.FC<{ grievance: Grievance; onClose: () => void }> = ({ grievance, onClose }) => {
    const [response, setResponse] = useState(grievance.response || '');
    const [newStatus, setNewStatus] = useState(grievance.status);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{grievance.title}</h2>
                <p className="text-gray-600 mt-1">{grievance.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(grievance.status)}`}>
                    {getStatusIcon(grievance.status)}
                    {grievance.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(grievance.priority)}`}>
                    {grievance.priority.toUpperCase()} PRIORITY
                  </span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {grievance.category}
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
            {/* Citizen Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Citizen Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{grievance.citizenName}</p>
                    <p className="text-sm text-gray-600">Complainant</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{grievance.citizenPhone}</p>
                    <p className="text-sm text-gray-600">Contact Number</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{getVillageName(grievance.villageId)}</p>
                    <p className="text-sm text-gray-600">Village</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{new Date(grievance.submittedDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Submitted Date</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments */}
            {(grievance.photos.length > 0 || grievance.audioFiles.length > 0) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
                {grievance.photos.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Photos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {grievance.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Grievance photo ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg border border-gray-200"
                        />
                      ))}
                    </div>
                  </div>
                )}
                {grievance.audioFiles.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Audio Files</h4>
                    <div className="space-y-2">
                      {grievance.audioFiles.map((audio, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Mic className="h-5 w-5 text-gray-500" />
                          <span className="text-sm text-gray-700">Audio recording {index + 1}</span>
                          <button className="ml-auto text-blue-600 hover:text-blue-800 text-sm">
                            Play
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Existing Response */}
            {grievance.response && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Previous Response</h3>
                <p className="text-green-800">{grievance.response}</p>
                {grievance.resolvedDate && (
                  <p className="text-sm text-green-600 mt-2">
                    Responded on {new Date(grievance.resolvedDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            {/* Response Form */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Update Grievance</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_review">In Review</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Response Message</label>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Enter your response to the citizen..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Response
              </button>
              <button className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                Mark as Resolved
              </button>
              <button
                onClick={onClose}
                className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Grievance Management</h1>
        <div className="text-sm text-gray-600">
          {filteredGrievances.length} grievance{filteredGrievances.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search grievances..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_review">In Review</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGrievances.map((grievance) => (
          <GrievanceCard key={grievance.id} grievance={grievance} />
        ))}
      </div>

      {filteredGrievances.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No grievances found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {selectedGrievance && (
        <GrievanceDetailModal
          grievance={selectedGrievance}
          onClose={() => setSelectedGrievance(null)}
        />
      )}
    </div>
  );
};

export default Grievances;