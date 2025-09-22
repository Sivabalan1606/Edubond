import React from 'react';
import { 
  Home, 
  MapPin, 
  FolderOpen, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Settings,
  FileText,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['central_admin', 'state_admin', 'district_admin', 'village_admin'] },
    { id: 'villages', label: 'Villages', icon: MapPin, roles: ['central_admin', 'state_admin', 'district_admin'] },
    { id: 'projects', label: 'Projects', icon: FolderOpen, roles: ['central_admin', 'state_admin', 'district_admin', 'village_admin'] },
    { id: 'grievances', label: 'Grievances', icon: MessageSquare, roles: ['central_admin', 'state_admin', 'district_admin', 'village_admin'] },
    { id: 'reports', label: 'Reports', icon: BarChart3, roles: ['central_admin', 'state_admin', 'district_admin'] },
    { id: 'transparency', label: 'Public Portal', icon: FileText, roles: ['central_admin', 'state_admin', 'district_admin', 'village_admin'] },
    { id: 'users', label: 'User Management', icon: Users, roles: ['central_admin', 'state_admin'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['central_admin', 'state_admin', 'district_admin', 'village_admin'] }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="bg-white shadow-lg h-full w-64 fixed left-0 top-16 border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="font-bold text-gray-900">PM-AJAY Portal</h2>
            <p className="text-sm text-gray-600">Adarsh Gram</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;