import React from 'react';
import { Database, Network, Settings, Plus, RotateCcw, Zap } from 'lucide-react';
import { useSimulationStore } from '../store/useSimulationStore';
import { useChaosMode } from '../hooks/useChaosMode';

export function Layout({ children }: { children: React.ReactNode }) {
  const { peers, addPeer, resetSimulation } = useSimulationStore();
  const { isChaosActive, toggleChaosMode } = useChaosMode();
  
  // Check global convergence
  const hashes = Object.values(peers).map(p => p.snapshotHash);
  const isConverged = hashes.length > 0 && hashes.every(h => h === hashes[0]);

  return (
    <div className="flex h-screen w-full text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200/60 bg-white/70 backdrop-blur-2xl flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-5 border-b border-slate-200/60">
          <h1 className="text-xl font-bold text-cyan-600 flex items-center gap-2 tracking-wide">
            <Database className="w-5 h-5 text-cyan-500" />
            CRDT-OLTP
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Local-First Simulator</p>
        </div>

        <div className="flex-1 p-5 overflow-y-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Global Controls</h2>
              <div className="space-y-2">
                <button
                  onClick={() => addPeer(`Peer-${Object.keys(peers).length + 1}`)}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200/50 rounded-xl text-sm transition-all text-cyan-700 font-medium hover:shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Add Peer
                </button>
                <button
                  onClick={resetSimulation}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200/50 rounded-xl text-sm transition-all text-red-600 font-medium hover:shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Simulation
                </button>
                <button
                  onClick={toggleChaosMode}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all font-bold border ${isChaosActive ? 'bg-orange-100 border-orange-300 text-orange-700 animate-pulse shadow-sm' : 'bg-slate-100 hover:bg-slate-200 border-slate-200/50 text-orange-600 hover:shadow-sm'}`}
                >
                  <Zap className="w-4 h-4" /> {isChaosActive ? 'STOP CHAOS' : 'RUN CHAOS MODE'}
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Network Status</h2>
              <div className="space-y-2">
                {Object.values(peers).map(peer => (
                  <div key={peer.id} className="flex items-center justify-between text-sm px-3 py-2 rounded-xl bg-white/80 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 font-medium">
                      <div className={`w-2.5 h-2.5 rounded-full shadow-inner ${peer.isOnline ? 'bg-green-500 shadow-green-500/50 animate-pulse' : 'bg-red-400'}`} />
                      <span className="text-slate-700">{peer.id}</span>
                    </div>
                    <span className="font-mono text-[10px] text-cyan-600 font-bold bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-100">{peer.snapshotHash}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-200/60 bg-white/70 backdrop-blur-2xl flex items-center justify-between px-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-sm">
              <Network className="w-5 h-5 text-purple-500" />
              <span className="text-slate-600 font-medium">Network Convergence:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${hashes.length === 0 ? 'bg-slate-100 border-slate-200 text-slate-500' : isConverged ? 'bg-green-100 border-green-200 text-green-700 shadow-sm' : 'bg-orange-100 border-orange-200 text-orange-700 animate-pulse shadow-sm'}`}>
                {hashes.length === 0 ? 'Empty' : isConverged ? 'Synchronized' : 'Diverged'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dashboard Area */}
        <div className="flex-1 overflow-auto relative">
          {children}
        </div>
      </main>
    </div>
  );
}
