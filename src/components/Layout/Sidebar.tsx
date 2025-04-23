
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, AlertTriangle, ChartLine, Settings, Building } from 'lucide-react';
import { getCurrentUser } from '@/lib/mockData';

const Sidebar = () => {
  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.role === 'admin';
  
  const navItems = [
    {
      title: 'Dashboard',
      href: isAdmin ? '/dashboard/admin' : '/dashboard/operator',
      icon: <Home className="w-5 h-5" />
    },
    {
      title: 'Alerts',
      href: '/alerts',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      title: 'Predictive Maintenance',
      href: '/dashboard/predictive',
      icon: <ChartLine className="w-5 h-5" />,
      adminOnly: true
    },
    {
      title: 'Industries',
      href: '/industries',
      icon: <Building className="w-5 h-5" />,
      adminOnly: true
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col bg-sidebar">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <h2 className="text-xl font-bold text-white">Oil Guardian</h2>
      </div>
      
      <div className="flex flex-1 flex-col px-4 py-6">
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            // Skip admin-only items for operator role
            if (item.adminOnly && !isAdmin) {
              return null;
            }
            
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      
      <div className="border-t border-sidebar-border p-4">
        <div className="text-xs text-slate-400">
          <p>Oil Guardian v1.0</p>
          <p>© 2025 All Rights Reserved</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
