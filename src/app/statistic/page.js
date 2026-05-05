"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../ThemeContext';
import { 
  FaUsers, FaHistory, FaMapMarkerAlt, 
  FaGlobe, FaChartBar, FaLaptop 
} from 'react-icons/fa';

export default function StatisticPage() {
  const [totalViews, setTotalViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recentViews, setRecentViews] = useState([]);
  const [pageStats, setPageStats] = useState([]);
  const [locationStats, setLocationStats] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    fetchStatistics();
  }, []);

  async function fetchStatistics() {
    setLoading(true);
    try {
      // 1. Ambil Total Count
      const { count } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true });

      // 2. Ambil Data mentah untuk diolah (Limit 1000 data terakhir untuk statistik)
      const { data: allData, error } = await supabase
        .from('page_views')
        .select('*')
        .order('viewed_at', { ascending: false });

      if (error) throw error;

      if (count) setTotalViews(count);
      if (allData) {
        setRecentViews(allData.slice(0, 10)); // Ambil 10 terbaru untuk tabel

        // --- PROSES AGREGASI HALAMAN ---
        const pageMap = {};
        allData.forEach(item => {
          const path = item.page_path || '/';
          pageMap[path] = (pageMap[path] || 0) + 1;
        });
        const sortedPages = Object.entries(pageMap)
          .map(([path, count]) => ({ path, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5); // Ambil Top 5 Halaman
        setPageStats(sortedPages);

        // --- PROSES AGREGASI LOKASI ---
        const locMap = {};
        allData.forEach(item => {
          const loc = item.city && item.city !== 'Unknown City' 
                      ? `${item.city}, ${item.country_code}` 
                      : 'Unknown Location';
          locMap[loc] = (locMap[loc] || 0) + 1;
        });
        const sortedLocs = Object.entries(locMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5); // Ambil Top 5 Lokasi
        setLocationStats(sortedLocs);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`min-h-screen py-12 px-6 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Website <span className="text-blue-500">Analytics</span>
          </h1>
          <p className="text-sm opacity-60">Insight pengunjung real-time untuk Portofolio Widi Suryo.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-blue-500">Menganalisis Data...</p>
          </div>
        ) : (
          <>
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className={`p-8 rounded-[2rem] border ${
                theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200 shadow-xl'
              }`}>
                <FaUsers className="text-blue-500 mb-4" size={32} />
                <h3 className="font-bold text-lg opacity-70">Total Views</h3>
                <p className="text-5xl font-black tracking-tighter">{totalViews.toLocaleString()}</p>
              </div>

              {/* Halaman Terpopuler Card */}
              <div className={`p-8 rounded-[2rem] border ${
                theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200 shadow-xl'
              }`}>
                <FaChartBar className="text-green-500 mb-4" size={32} />
                <h3 className="font-bold text-lg opacity-70 mb-3">Top Halaman</h3>
                <div className="flex flex-col gap-2">
                  {pageStats.map((p, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="truncate max-w-[150px] font-mono opacity-80">{p.path}</span>
                      <span className="font-bold text-blue-500">{p.count} views</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lokasi Teratas Card */}
              <div className={`p-8 rounded-[2rem] border ${
                theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200 shadow-xl'
              }`}>
                <FaGlobe className="text-purple-500 mb-4" size={32} />
                <h3 className="font-bold text-lg opacity-70 mb-3">Top Lokasi</h3>
                <div className="flex flex-col gap-2">
                  {locationStats.map((l, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="truncate font-bold opacity-80">{l.name}</span>
                      <span className="font-bold text-purple-500">{l.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className={`rounded-[2.5rem] border overflow-hidden ${
              theme === 'dark' ? 'bg-gray-900/30 border-gray-800' : 'bg-white border-gray-200 shadow-2xl'
            }`}>
              <div className="p-8 border-b border-gray-500/10 flex items-center gap-3">
                <FaHistory className="text-blue-500" />
                <h2 className="text-xl font-bold text-blue-500">Aktivitas Terakhir</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className={`text-xs uppercase tracking-widest font-bold ${
                      theme === 'dark' ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-50 text-gray-500'
                    }`}>
                      <th className="py-5 px-8">Waktu & Halaman</th>
                      <th className="py-5 px-8">Lokasi</th>
                      <th className="py-5 px-8">Perangkat & ISP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-500/10">
                    {recentViews.map((view) => (
                      <tr key={view.id} className="hover:bg-blue-500/5 transition-colors group">
                        <td className="py-6 px-8">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold">
                              {new Date(view.viewed_at).toLocaleString('id-ID', { 
                                day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
                              })}
                            </span>
                            <span className="text-[10px] text-blue-500 font-black italic">{view.page_path}</span>
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-500" size={14} />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold">{view.city || 'Unknown'}</span>
                              <span className="text-[10px] opacity-60 uppercase font-bold">{view.country || 'Unknown'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-8 text-[10px] font-mono opacity-50 truncate max-w-[150px]">
                          {view.user_agent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}