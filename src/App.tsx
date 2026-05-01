import { useState } from 'react';
import Header from './components/Header';
import BlockchainLedger from './components/BlockchainLedger';
import AdminPanel from './components/AdminPanel';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Settings } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'explorer' | 'admin'>('explorer');

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-yellow-200">
      <Header />
      
      <main className="flex flex-col min-h-[calc(100vh-140px)]">
        {/* Navigation Info Bar */}
        <div className="border-b-4 border-black bg-[#E9ECEF] px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex bg-white border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <button 
              onClick={() => setView('explorer')}
              className={`py-1.5 px-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${
                view === 'explorer' 
                  ? 'bg-black text-white' 
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard size={14} />
              Canlı Defter
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`py-1.5 px-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${
                view === 'admin' 
                  ? 'bg-black text-white' 
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              <Settings size={14} />
              Yönetici Düğümü
            </button>
          </div>
          
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Ağ Durumu: Senkronize</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span>Protokol: v1.4.0</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-12">
          <AnimatePresence mode="wait">
            {view === 'explorer' ? (
              <motion.div
                key="explorer"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <BlockchainLedger />
              </motion.div>
            ) : (
              <motion.div
                key="admin"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <AdminPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="border-t-4 border-black p-6 bg-white flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-tighter opacity-60 gap-4">
        <div>Güvenli Özet Algoritması: SHA-256 // AES-256-GCM</div>
        <div>EduChain Protokolü © 2026 // Dağıtık Eğitim Defteri</div>
        <div className="flex gap-4">
          <span>Çalışma Süresi: 99.99%</span>
          <span>Düğümler: 48 aktif</span>
        </div>
      </footer>
    </div>
  );
}
