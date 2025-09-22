import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login/Login';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Villages from './components/Villages/Villages';
import Projects from './components/Projects/Projects';
import Grievances from './components/Grievances/Grievances';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (!user) {
    return <Login />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'villages':
        return <Villages />;
      case 'projects':
        return <Projects />;
      case 'grievances':
        return <Grievances />;
      case 'reports':
        return <div className="p-6">Reports section coming soon...</div>;
      case 'transparency':
        return <div className="p-6">Public transparency portal coming soon...</div>;
      case 'users':
        return <div className="p-6">User management section coming soon...</div>;
      case 'settings':
        return <div className="p-6">Settings section coming soon...</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 ml-64 mt-16 p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;