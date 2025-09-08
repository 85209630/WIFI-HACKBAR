import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ActiveView } from '../App';

interface MenuItem {
  id: ActiveView;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, activeView, onViewChange }) => {
  return (
    <div className="w-64 bg-gray-900 border-r border-green-500/30 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-400 mb-2">Wi-Guard</h1>
        <p className="text-xs text-green-300/70">AI-Driven Wireless Defense</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'text-green-300/70 hover:bg-green-500/10 hover:text-green-400'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="mt-8 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-red-400 font-semibold">THREAT LEVEL</span>
        </div>
        <div className="text-lg font-bold text-red-400">ELEVATED</div>
        <div className="text-xs text-red-300/70 mt-1">3 Active Threats</div>
      </div>
    </div>
  );
};

export default Sidebar;