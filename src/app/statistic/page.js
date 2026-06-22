"use client";

import { useEffect, useState, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../ThemeContext';

export default function StatisticPage() {
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState([]);
  const [displayMode, setDisplayMode] = useState('paginated'); 
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'viewed_at', direction: 'desc' });
  const { theme } = useTheme();

  const ITEMS_PER_PAGE = 100;

  useEffect(() => {
    fetchStatistics();
  }, []);

  async function fetchStatistics() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('*')
        .order('viewed_at', { ascending: false });
      if (error) throw error;
      setRawData(data || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  // Helper untuk format nama perangkat
  const formatDeviceName = (ua) => {
    if (!ua) return 'Tidak Dikenal';
    if (ua.includes('iPhone')) return 'iPhone / iOS';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Macintosh')) return 'MacOS';
    return 'Desktop/Lainnya';
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedData = useMemo(() => {
    return [...rawData].sort((a, b) => {
      // Khusus untuk sorting user_agent, kita ambil versi formatnya
      const valA = sortConfig.key === 'user_agent' ? formatDeviceName(a.user_agent) : (a[sortConfig.key] || "");
      const valB = sortConfig.key === 'user_agent' ? formatDeviceName(b.user_agent) : (b[sortConfig.key] || "");
      
      return sortConfig.direction === 'asc' 
        ? (valA > valB ? 1 : -1) 
        : (valA < valB ? 1 : -1);
    });
  }, [rawData, sortConfig]);

  const paginatedData = useMemo(() => {
    if (displayMode === 'all') return sortedData;
    return sortedData.slice(0, currentPage * ITEMS_PER_PAGE);
  }, [sortedData, displayMode, currentPage]);

  const pageStats = useMemo(() => {
    const map = {};
    rawData.forEach(item => { const p = item.page_path || '/'; map[p] = (map[p] || 0) + 1; });
    return Object.entries(map).map(([path, count]) => ({ path, count })).sort((a, b) => b.count - a.count);
  }, [rawData]);

  const locStats = useMemo(() => {
    const map = {};
    rawData.forEach(item => { const l = item.city || 'Tidak Terdeteksi'; map[l] = (map[l] || 0) + 1; });
    return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [rawData]);

  return (
    <div className={`min-h-screen py-12 px-4 md:px-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background-color: ${theme === 'dark' ? '#333' : '#ccc'}; 
          border-radius: 20px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #3b82f6; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black uppercase mb-10 tracking-tight">Analitik Website</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[{title: 'Total Tayangan', val: rawData.length}, {title: 'Halaman Teratas', list: pageStats}, {title: 'Lokasi Teratas', list: locStats}].map((box, i) => (
            <div key={i} className={`p-8 rounded-[2rem] border ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-gray-50 border-gray-100'}`}>
              <h3 className="text-xs font-black opacity-40 mb-4 tracking-widest uppercase">{box.title}</h3>
              {box.val !== undefined ? <p className="text-6xl font-black">{box.val.toLocaleString()}</p> : 
                <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                  {box.list.map((item, j) => <div key={j} className="flex justify-between text-sm font-bold border-b border-gray-500/10 pb-2">
                    <span className="truncate mr-2">{item.path || item.name}</span> 
                    <span className="text-blue-600 shrink-0">{item.count}</span>
                  </div>)}
                </div>
              }
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button onClick={() => setDisplayMode(displayMode === 'all' ? 'paginated' : 'all')} className="px-8 py-3 bg-blue-600 text-white rounded-full font-black uppercase text-sm tracking-widest hover:bg-blue-700 transition-all">
            {displayMode === 'all' ? 'Tampilkan 100 Data Saja' : 'Tampilkan Semua Data'}
          </button>
        </div>

        <div className={`rounded-[2rem] border overflow-hidden ${theme === 'dark' ? 'border-neutral-800' : 'border-gray-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className={theme === 'dark' ? 'bg-neutral-900' : 'bg-gray-50'}>
                <tr>
                  {[
                    {key: 'viewed_at', label: 'Waktu'}, 
                    {key: 'city', label: 'Wilayah'}, 
                    {key: 'page_path', label: 'Path'},
                    {key: 'user_agent', label: 'Perangkat'}
                  ].map((col) => (
                    <th key={col.key} className="p-6 cursor-pointer hover:text-blue-600 transition-colors uppercase text-xs tracking-widest font-black" onClick={() => handleSort(col.key)}>
                      {col.label} {sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '↕'}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-500/10">
                {paginatedData.map((v) => (
                  <tr key={v.id} className="hover:bg-blue-600/5 transition-colors">
                    <td className="p-6 text-sm">{new Date(v.viewed_at).toLocaleString('id-ID')}</td>
                    <td className="p-6 text-sm font-bold">{v.city || 'N/A'}</td>
                    <td className="p-6 text-sm font-mono opacity-70">{v.page_path}</td>
                    <td className="p-6 text-sm font-bold text-blue-600">{formatDeviceName(v.user_agent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {displayMode === 'paginated' && paginatedData.length < sortedData.length && (
            <div className="p-8 text-center border-t border-gray-500/10">
              <button onClick={() => setCurrentPage(p => p + 1)} className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all">
                Muat 100 Data Berikutnya
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}