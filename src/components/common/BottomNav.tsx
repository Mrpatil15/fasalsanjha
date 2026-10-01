import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Store, PlusCircle, User, Layers } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { currentRole } = useAppStore();

  const getDashboardPath = () => {
    switch (currentRole) {
      case 'farmer': return '/farmer/dashboard';
      case 'investor': return '/investor/dashboard';
      case 'admin': return '/admin';
      default: return '/farmer/dashboard';
    }
  };

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Invest', path: '/invest', icon: TrendingUp },
    { label: 'Post Req', path: '/requirement/new', icon: PlusCircle, highlight: true },
    { label: 'Bazaar', path: '/bazaar', icon: Store },
    { label: 'Portal', path: getDashboardPath(), icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 py-1.5 px-3 md:hidden shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          if (item.highlight) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-forest-900 to-forest-700 text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-forest-500/20 active:scale-90 transition-transform">
                  <PlusCircle className="w-6 h-6 text-harvest-400" />
                </div>
                <span className="text-[10px] font-bold text-forest-900 mt-1">Post Req</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
                isActive ? 'text-forest-900 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-forest-800' : 'text-slate-400'}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
