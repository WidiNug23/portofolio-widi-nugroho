"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../ThemeContext';

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

  const formatDeviceName = (ua) => {
    if (!ua) return 'Perangkat Tidak Dikenal';
    if (ua.includes('iPhone')) return 'iPhone / iOS';
    if (ua.includes('Android')) return 'Android Mobile';
    if (ua.includes('Windows')) return 'Windows Desktop';
    if (ua.includes('Macintosh')) return 'MacOS Desktop';
    if (ua.includes('Linux')) return 'Linux Desktop';
    return 'Browser Desktop';
  };

  const formatDateNoPukul = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('id-ID', { day: '2-digit' });
    const month = date.toLocaleDateString('id-ID', { month: 'long' });
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} ${hours}:${minutes}`;
  };

  async function fetchStatistics() {
    setLoading(true);
    try {
      const { count } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true });

      const { data: allData, error } = await supabase
        .from('page_views')
        .select('*')
        .order('viewed_at', { ascending: false });

      if (error) throw error;

      if (count) setTotalViews(count);
      if (allData) {
        setRecentViews(allData.slice(0, 10));

        const pageMap = {};
        allData.forEach(item => {
          const path = item.page_path || '/';
          pageMap[path] = (pageMap[path] || 0) + 1;
        });
        const sortedPages = Object.entries(pageMap)
          .map(([path, count]) => ({ path, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        setPageStats(sortedPages);

        const locMap = {};
        allData.forEach(item => {
          const loc = item.city && item.city !== 'Unknown City' 
                      ? `${item.city}, ${item.country_code}` 
                      : 'Lokasi Tidak Terdeteksi';
          locMap[loc] = (locMap[loc] || 0) + 1;
        });
        const sortedLocs = Object.entries(locMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        setLocationStats(sortedLocs);
      }
    } catch (err) {
      console.error("Error mengambil statistik:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`min-h-screen py-12 px-6 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16">
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">
            Analitik <span className="text-blue-600">Website</span>
          </h1>
          <div className="h-1 w-24 bg-blue-600 mb-4"></div>
          <p className="text-lg font-medium opacity-50 uppercase tracking-widest">Data Kunjungan Portofolio</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-gray-800 rounded-[3rem]">
            <p className="text-2xl font-black uppercase tracking-[0.3em] animate-pulse">Memuat Data</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
              <div className={`p-10 rounded-[3rem] border-2 transition-all ${
                theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-gray-50 border-gray-100'
              }`}>
                <h3 className="font-black text-sm uppercase tracking-widest mb-6 opacity-40">Total Tayangan</h3>
                <p className="text-7xl font-black tracking-tighter">{totalViews.toLocaleString()}</p>
              </div>

              <div className={`p-10 rounded-[3rem] border-2 transition-all ${
                theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-gray-50 border-gray-100'
              }`}>
                <h3 className="font-black text-sm uppercase tracking-widest mb-6 opacity-40">Halaman Teratas</h3>
                <div className="flex flex-col gap-4">
                  {pageStats.map((p, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-gray-500/10 pb-2">
                      <span className="font-bold text-sm truncate max-w-[150px]">{p.path}</span>
                      <span className="font-black text-blue-600">{p.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-10 rounded-[3rem] border-2 transition-all ${
                theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-gray-50 border-gray-100'
              }`}>
                <h3 className="font-black text-sm uppercase tracking-widest mb-6 opacity-40">Lokasi Teratas</h3>
                <div className="flex flex-col gap-4">
                  {locationStats.map((l, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-gray-500/10 pb-2">
                      <span className="font-bold text-sm truncate">{l.name}</span>
                      <span className="font-black text-blue-600">{l.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`rounded-[3rem] border-2 overflow-hidden ${
              theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-100'
            }`}>
              <div className="p-12 border-b border-gray-500/10 bg-neutral-500/5">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Log Aktivitas Pengunjung</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className={`text-xs uppercase tracking-[0.25em] font-black ${
                      theme === 'dark' ? 'bg-black text-neutral-500' : 'bg-gray-50 text-gray-400'
                    }`}>
                      <th className="py-8 px-12">Waktu & Path</th>
                      <th className="py-8 px-12">Wilayah</th>
                      <th className="py-8 px-12">Detail Perangkat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-500/10">
                    {recentViews.map((view) => (
                      <tr key={view.id} className="hover:bg-blue-600/[0.03] transition-colors group">
                        <td className="py-10 px-12">
                          <div className="flex flex-col gap-2">
                            <span className="text-lg font-black tracking-tight leading-none">
                              {formatDateNoPukul(view.viewed_at)}
                            </span>
                            <span className="text-xs font-bold opacity-40 uppercase tracking-widest">
                              {view.page_path}
                            </span>
                          </div>
                        </td>
                        <td className="py-10 px-12">
                          <div className="flex flex-col">
                            <span className="text-lg font-black">{view.city || 'Privat'}</span>
                            <span className="text-xs font-bold uppercase opacity-40 tracking-widest">{view.country || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="py-10 px-12">
                          <div className="flex flex-col gap-2">
                            <span className="text-lg font-black text-blue-600 tracking-tight uppercase">
                              {formatDeviceName(view.user_agent)}
                            </span>
                            <div className="max-w-md">
                              <span className="text-[11px] font-mono opacity-30 block break-words leading-tight">
                                {view.user_agent}
                              </span>
                            </div>
                          </div>
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