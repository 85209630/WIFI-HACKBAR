import React, { useState } from 'react';
import { Shield, Activity, Target, BookOpen, Zap, Search, Eye } from 'lucide-react';
import MatrixRain from './components/MatrixRain';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AttackSimulator from './components/AttackSimulator';
import ThreatFeed from './components/ThreatFeed';
import PlaybookViewer from './components/PlaybookViewer';
import DecoyManager from './components/DecoyManager';
import ForensicsLab from './components/ForensicsLab';
import ViewDemo from './components/ViewDemo';

export type ActiveView = 'dashboard' | 'simulator' | 'threats' | 'playbooks' | 'decoys' | 'forensics' | 'demo';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  const menuItems = [
    { id: 'dashboard' as ActiveView, label: 'Dashboard', icon: Activity },
    { id: 'simulator' as ActiveView, label: 'Attack Simulator', icon: Target },
    { id: 'threats' as ActiveView, label: 'Threat Feed', icon: Zap },
    { id: 'playbooks' as ActiveView, label: 'Playbooks', icon: BookOpen },
    { id: 'decoys' as ActiveView, label: 'Decoy Manager', icon: Shield },
    { id: 'forensics' as ActiveView, label: 'Forensics Lab', icon: Search },
    { id: 'demo' as ActiveView, label: 'View Demo', icon: Eye },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'simulator':
        return <AttackSimulator />;
      case 'threats':
        return <ThreatFeed />;
      case 'playbooks':
        return <PlaybookViewer />;
      case 'decoys':
        return <DecoyManager />;
      case 'forensics':
        return <ForensicsLab />;
      case 'demo':
        return <ViewDemo />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <MatrixRain />
      <div className="relative z-10 flex">
        <Sidebar 
          menuItems={menuItems}
          activeView={activeView}
          onViewChange={setActiveView}
        />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;