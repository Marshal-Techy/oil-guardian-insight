
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logoutUser, getCurrentUser } from '@/lib/mockData';

const Header = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };
  
  const handleSettings = () => {
    navigate('/settings');
  };
  
  const handleNotifications = () => {
    navigate('/alerts');
  };
  
  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-full">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>Oil Guardian</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={handleNotifications}>
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleSettings}>
            <Settings className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            {currentUser && (
              <>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{currentUser.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{currentUser.role}</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-sm font-medium text-white">{currentUser.name.charAt(0)}</span>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
