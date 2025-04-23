
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { getCurrentUser } from '@/lib/mockData';

interface MainLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, requireAuth = true }) => {
  const navigate = useNavigate();
  
  // Check authentication
  useEffect(() => {
    if (requireAuth) {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        navigate('/login');
      }
    }
  }, [requireAuth, navigate]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
