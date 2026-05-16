import React, { useState } from 'react';
import {
  Database, Network, Settings, Plus, RotateCcw,
  Info, Shield, Clock, Users, Zap as FastIcon, Layers,
  ChevronDown, ChevronUp, Terminal, Mail, Globe
} from 'lucide-react';
import { useSimulationStore } from '../store/useSimulationStore';
import { useChaosMode } from '../hooks/useChaosMode';

export function Layout({ children }: { children: React.ReactNode }) {
  const { peers, addPeer, resetSimulation } = useSimulationStore();
  const { isChaosActive, toggleChaosMode } = useChaosMode();

  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  // Global convergence
  const activePeers = Object.values(peers).filter(p => p.isOnline);
  const hashes = activePeers.map(p => p.snapshotHash);
  const isConverged = hashes.length > 0 && hashes.every(h => h === hashes[0]);

  return (
    <div className="flex h-screen w-full text-slate-800 overflow-hidden bg-slate-50 relative z-0">

      {/* Animated Background Blobs (Behind Sidebar & Main) */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none -z-10"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none -z-10"></div>
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none -z-10"></div>

      {/* Massive Left Sidebar */}
      <aside className="w-[420px] shrink-0 border-r border-slate-200/60 bg-white/80 backdrop-blur-3xl flex flex-col z-20 shadow-[8px_0_30px_rgba(0,0,0,0.03)] overflow-hidden">

        {/* Branding Header */}
        <div className="px-6 py-8 border-b border-slate-200/60 bg-gradient-to-br from-white to-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700 tracking-tight">
                CRDT-OLTP
              </h1>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                Distributed Relational Simulator
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
          {/* Global Controls */}
          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Simulation Controls</h2>
            <div className="space-y-2">
              <button
                onClick={() => addPeer(`Peer-${Object.keys(peers).length + 1}`)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-xl text-sm transition-all text-cyan-700 font-bold shadow-sm"
              >
                <Plus className="w-4 h-4" /> Initialize New Peer Node
              </button>
              <button
                onClick={toggleChaosMode}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm transition-all font-bold border shadow-sm ${isChaosActive
                  ? 'bg-orange-500 border-orange-600 text-white animate-pulse'
                  : 'bg-white hover:bg-orange-50 border-orange-200 text-orange-600'
                  }`}
              >
                <FastIcon className="w-4 h-4" /> {isChaosActive ? 'HALT CHAOS MODE' : 'ENGAGE CHAOS MODE'}
              </button>
              <button
                onClick={resetSimulation}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-red-50 border border-red-100 rounded-xl text-sm transition-all text-red-500 font-bold shadow-sm mt-4"
              >
                <RotateCcw className="w-4 h-4" /> Purge Network State
              </button>
            </div>
          </section>

          {/* Network Node Status Tracker */}
          <section>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Nodes</h2>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{Object.keys(peers).length} Total</span>
            </div>
            <div className="space-y-2">
              {Object.values(peers).map(peer => (
                <div key={peer.id} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                      {peer.isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${peer.isOnline ? 'bg-emerald-500' : 'bg-red-400'}`}></span>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{peer.id}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-[10px] text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-100">
                      #{peer.snapshotHash}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features Grid */}
          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Key Features</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl hover:bg-cyan-50 transition-colors group">
                <Shield className="w-4 h-4 text-cyan-500 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-slate-700">Conflict Resolution</div>
                <div className="text-[10px] text-slate-500 mt-0.5">LWW Timestamp Engine</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl hover:bg-purple-50 transition-colors group">
                <Network className="w-4 h-4 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-slate-700">Gossip Sync</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Pairwise P2P Merging</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl hover:bg-orange-50 transition-colors group">
                <Clock className="w-4 h-4 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-slate-700">Logical Clocks</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Vector Time Tracking</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl hover:bg-emerald-50 transition-colors group">
                <Layers className="w-4 h-4 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-slate-700">Relational Rules</div>
                <div className="text-[10px] text-slate-500 mt-0.5">FK & Unique Bounds</div>
              </div>
            </div>
          </section>
          {/* About Project Section */}
          <section className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm transition-all hover:shadow-md">
            <button
              onClick={() => setIsAboutExpanded(!isAboutExpanded)}
              className="w-full flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-purple-500" />
                <h2 className="font-bold text-slate-700">About the Protocol</h2>
              </div>
              {isAboutExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {isAboutExpanded && (
              <div className="mt-4 text-sm text-slate-600 space-y-3 leading-relaxed border-t border-slate-100 pt-4">
                <p>
                  <strong className="text-purple-600">CRDT</strong> (Conflict-Free Replicated Data Type) guarantees eventual consistency across distributed nodes without a central coordinating server.
                </p>
                <p>
                  <strong className="text-cyan-600">Local-First Architecture:</strong> Each peer maintains an independent materialized view of the database. Edits are instantaneous locally.
                </p>
                <p>
                  <strong className="text-orange-600">Tombstones & FKs:</strong> Deletions use tombstones to ensure "Delete-Wins" semantics. Relational constraints (Foreign Keys) are validated during pairwise gossip sync.
                </p>
              </div>
            )}
          </section>

          {/* Team Section */}
          <section>

            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
              Engineering Team
            </h2>

            <div className="space-y-4">

              {/* MEMBER 1 */}

              <div className="group flex items-center gap-4 p-4 bg-white/90 backdrop-blur-xl border border-cyan-100 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                {/* PHOTO */}

                <img
                  src="/team/member1.jpeg"
                  alt="Team Member"
                  className="w-14 h-14 rounded-full object-cover border-4 border-cyan-200 shadow-md"
                />

                {/* DETAILS */}

                <div className="flex-1">

                  <div className="text-sm font-bold text-cyan-600">
                    HARSHITHA H G
                  </div>

                  <div className="text-[11px] text-slate-500 mt-1">
                    harshithahrgopal@gmail.com
                  </div>


                </div>

              </div>

              {/* MEMBER 2 */}

              <div className="group flex items-center gap-4 p-4 bg-white/90 backdrop-blur-xl border border-purple-100 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                <img
                  src="/team/member2.jpeg"
                  alt="Team Member"
                  className="w-14 h-14 rounded-full object-cover border-4 border-purple-200 shadow-md"
                />

                <div className="flex-1">

                  <div className="text-sm font-bold text-purple-600">
                    HITHA HARISH
                  </div>

                  <div className="text-[11px] text-slate-500 mt-1">
                    hitha22harish@gmail.com
                  </div>

                </div>

              </div>

              {/* MEMBER 3 */}

              <div className="group flex items-center gap-4 p-4 bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                <img
                  src="/team/member3.jpeg"
                  alt="Team Member"
                  className="w-14 h-14 rounded-full object-cover border-4 border-emerald-200 shadow-md"
                />

                <div className="flex-1">

                  <div className="text-sm font-bold text-green-600">
                    SIRIPURAPU MANASWI
                  </div>

                  <div className="text-[11px] text-slate-500 mt-1">
                    siripurapu.cs23@gmail.com
                  </div>

                </div>

              </div>

            </div>

          </section>



        </div>
      </aside>

      {/* Main Right Area */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">

        {/* Top Navbar */}
        <header className="h-20 shrink-0 border-b border-slate-200/60 bg-white/60 backdrop-blur-3xl flex items-center justify-between px-10 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Interactive Network Dashboard</h2>
            <div className="flex items-center gap-2 mt-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500">Peer-to-Peer Relational Database Platform</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 bg-white border border-slate-200 px-5 py-2.5 rounded-2xl shadow-sm">
              <Network className="w-5 h-5 text-purple-500" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">State Convergence</span>
                <span className={`text-sm font-bold flex items-center gap-2 ${hashes.length === 0 ? 'text-slate-500' : isConverged ? 'text-emerald-600' : 'text-orange-500'
                  }`}>
                  {hashes.length === 0 ? 'NO PEERS' : isConverged ? 'FULLY SYNCHRONIZED' : 'DIVERGED (SYNC REQUIRED)'}
                  {!isConverged && hashes.length > 0 && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span></span>}
                </span>
              </div>
            </div>
            <button className="p-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-2xl transition-all shadow-sm hover:shadow">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dashboard Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto relative hide-scrollbar flex flex-col">
          {/* Peer Topology / Workspace */}
          <div className="flex-1 w-full relative min-h-[calc(100vh-140px)]">
            {children}
          </div>

          {/* Professional Footer */}
          <footer className="w-full border-t border-slate-200 bg-white/80 backdrop-blur-xl mt-auto relative z-20">
            <div className="max-w-7xl mx-auto px-10 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <Database className="w-6 h-6 text-cyan-600" />
                    <span className="text-xl font-extrabold text-slate-800 tracking-tight">CRDT-OLTP Platform</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                    A cutting-edge distributed relational database simulator designed to showcase the power of Conflict-Free Replicated Data Types, local-first architecture, and peer-to-peer gossip protocols in a modern React environment.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-4">Technologies</h3>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li>React 18 & Vite</li>
                    <li>TypeScript Architecture</li>
                    <li>Zustand State Engine</li>
                    <li>TailwindCSS Styling</li>
                    <li>Framer Motion</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-4">Connect</h3>
                  <div className="flex gap-4 mb-4">
                    <a href="#" className="p-2 bg-slate-100 hover:bg-cyan-100 hover:text-cyan-600 text-slate-400 rounded-lg transition-colors">
                      <Terminal className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-2 bg-slate-100 hover:bg-purple-100 hover:text-purple-600 text-slate-400 rounded-lg transition-colors">
                      <Globe className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-2 bg-slate-100 hover:bg-pink-100 hover:text-pink-600 text-slate-400 rounded-lg transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-400">Built for the Global Hackathon 2026</p>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-400">© 2026 Distributed Systems Team. All rights reserved.</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-slate-500">System v1.0.0 Online</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
