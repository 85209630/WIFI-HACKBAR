import React, { useState, useEffect } from 'react';
import { Shield, Zap, Target, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    threatsBlocked: 1247,
    activeDecoys: 8,
    networkHealth: 94,
    attacksToday: 23
  });

  const [realtimeData, setRealtimeData] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => {
        const newData = [...prev, Math.floor(Math.random() * 100)];
        return newData.slice(-20);
      });
      
      setStats(prev => ({
        ...prev,
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3),
        networkHealth: 90 + Math.floor(Math.random() * 10),
        attacksToday: prev.attacksToday + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${color}`} />
        <span className={`text-sm ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      </div>
      <div className="text-2xl font-bold text-green-400 mb-1">{value.toLocaleString()}</div>
      <div className="text-sm text-green-300/70">{title}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-green-400">Command Center</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400">System Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Shield}
          title="Threats Blocked"
          value={stats.threatsBlocked}
          change={12}
          color="text-green-400"
        />
        <StatCard
          icon={Target}
          title="Active Decoys"
          value={stats.activeDecoys}
          change={-2}
          color="text-blue-400"
        />
        <StatCard
          icon={Activity}
          title="Network Health"
          value={stats.networkHealth}
          change={3}
          color="text-green-400"
        />
        <StatCard
          icon={AlertTriangle}
          title="Attacks Today"
          value={stats.attacksToday}
          change={-15}
          color="text-red-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-green-400 mb-4">Real-time Threat Activity</h3>
          <div className="h-40 flex items-end space-x-1">
            {realtimeData.map((value, index) => (
              <div
                key={index}
                className="bg-green-500/50 flex-1 transition-all duration-300"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-green-400 mb-4">Recent Threats</h3>
          <div className="space-y-3">
            {[
              { type: 'Evil Twin AP', severity: 'HIGH', time: '2 min ago' },
              { type: 'Deauth Flood', severity: 'MEDIUM', time: '5 min ago' },
              { type: 'SSID Spoofing', severity: 'HIGH', time: '8 min ago' },
              { type: 'Probe Request Spam', severity: 'LOW', time: '12 min ago' }
            ].map((threat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                <div>
                  <div className="text-green-400 font-semibold">{threat.type}</div>
                  <div className="text-xs text-green-300/70">{threat.time}</div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  threat.severity === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                  threat.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {threat.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-green-400 mb-4">Network Topology</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          {['Router-01', 'AP-Guest', 'AP-Corp', 'Decoy-01', 'Decoy-02', 'Honeypot-A'].map((node, index) => (
            <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-green-500/20">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                node.includes('Decoy') || node.includes('Honeypot') ? 'bg-blue-500' : 'bg-green-500'
              } animate-pulse`}></div>
              <div className="text-sm text-green-400">{node}</div>
              <div className="text-xs text-green-300/70">Online</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;