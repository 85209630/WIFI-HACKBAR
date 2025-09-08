import React, { useState } from 'react';
import { Target, Zap, Wifi, AlertTriangle, Play, Square } from 'lucide-react';

const AttackSimulator: React.FC = () => {
  const [selectedAttack, setSelectedAttack] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const attackTypes = [
    {
      id: 'deauth',
      name: 'Deauthentication Flood',
      description: 'Simulates mass client disconnection attacks',
      severity: 'HIGH',
      icon: Zap
    },
    {
      id: 'evil_twin',
      name: 'Evil Twin AP',
      description: 'Creates fake access point to capture credentials',
      severity: 'CRITICAL',
      icon: Wifi
    },
    {
      id: 'ssid_spam',
      name: 'SSID Spoofing',
      description: 'Floods area with fake network names',
      severity: 'MEDIUM',
      icon: Target
    },
    {
      id: 'probe_flood',
      name: 'Probe Request Flood',
      description: 'Overwhelms APs with connection requests',
      severity: 'MEDIUM',
      icon: AlertTriangle
    }
  ];

  const runSimulation = async () => {
    if (!selectedAttack) return;
    
    setIsRunning(true);
    setResults([]);

    // Simulate attack execution
    const attack = attackTypes.find(a => a.id === selectedAttack);
    
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newResult = {
        timestamp: new Date().toLocaleTimeString(),
        phase: `Phase ${i + 1}`,
        status: i < 4 ? 'EXECUTING' : 'DETECTED',
        details: getPhaseDetails(selectedAttack, i),
        anomalyScore: Math.random() * (i + 1) * 0.2
      };
      
      setResults(prev => [...prev, newResult]);
    }
    
    setIsRunning(false);
  };

  const getPhaseDetails = (attackType: string, phase: number) => {
    const phases = {
      deauth: [
        'Scanning for target networks...',
        'Identifying connected clients...',
        'Sending deauth packets...',
        'Monitoring disconnections...',
        'Attack pattern detected by ML engine'
      ],
      evil_twin: [
        'Creating fake access point...',
        'Broadcasting spoofed SSID...',
        'Waiting for client connections...',
        'Capturing authentication attempts...',
        'Suspicious AP behavior flagged'
      ],
      ssid_spam: [
        'Generating fake network names...',
        'Broadcasting multiple SSIDs...',
        'Overwhelming client devices...',
        'Creating network confusion...',
        'Abnormal beacon patterns detected'
      ],
      probe_flood: [
        'Initiating probe requests...',
        'Flooding target access points...',
        'Overwhelming AP resources...',
        'Monitoring response times...',
        'Unusual traffic patterns identified'
      ]
    };
    
    return phases[attackType as keyof typeof phases]?.[phase] || 'Unknown phase';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-green-400">Attack Simulator</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
          <span className="text-green-400">{isRunning ? 'Simulation Running' : 'Ready'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-green-400 mb-4">Select Attack Type</h3>
          <div className="space-y-3">
            {attackTypes.map((attack) => {
              const Icon = attack.icon;
              return (
                <button
                  key={attack.id}
                  onClick={() => setSelectedAttack(attack.id)}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 ${
                    selectedAttack === attack.id
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-green-500/30 bg-gray-800/50 hover:border-green-500/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-6 h-6 text-green-400" />
                    <div className="text-left flex-1">
                      <div className="text-green-400 font-semibold">{attack.name}</div>
                      <div className="text-sm text-green-300/70">{attack.description}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      attack.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                      attack.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {attack.severity}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              onClick={runSimulation}
              disabled={!selectedAttack || isRunning}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <Play size={16} />
              <span>{isRunning ? 'Running...' : 'Start Simulation'}</span>
            </button>
            <button
              onClick={() => {setIsRunning(false); setResults([]);}}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <Square size={16} />
            </button>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-green-400 mb-4">Simulation Results</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <div className="text-center text-green-300/50 py-8">
                Select an attack type and click "Start Simulation" to begin
              </div>
            ) : (
              results.map((result, index) => (
                <div key={index} className="p-3 bg-gray-800/50 rounded border-l-4 border-green-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 font-semibold">{result.phase}</span>
                    <span className="text-xs text-green-300/70">{result.timestamp}</span>
                  </div>
                  <div className="text-sm text-green-300/80 mb-2">{result.details}</div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      result.status === 'DETECTED' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {result.status}
                    </span>
                    <span className="text-xs text-green-300/70">
                      Anomaly Score: {result.anomalyScore.toFixed(3)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-green-400 mb-4">Detection Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-green-400 font-semibold mb-2">ML Detection Engine</h4>
            <p className="text-sm text-green-300/70">
              Uses IsolationForest and neural networks to identify anomalous wireless behavior patterns
            </p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-green-400 font-semibold mb-2">RF Cross-Correlation</h4>
            <p className="text-sm text-green-300/70">
              Analyzes signal strength, timing, and mobility constraints to detect spoofed access points
            </p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-green-400 font-semibold mb-2">Behavioral Analysis</h4>
            <p className="text-sm text-green-300/70">
              Monitors beacon intervals, channel changes, and MAC address entropy for threat identification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttackSimulator;