"use client";
import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";

// Komponen Jarum Jam Berputar untuk Coming Soon
const SpinningClockIcon = () => (
  <div className="flex flex-col items-center justify-center py-10 gap-4 w-full bg-yellow-500/5 rounded-3xl border-2 border-dashed border-yellow-500/20">
    <div className="relative w-16 h-16">
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-yellow-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
      >
        <circle cx="12" cy="12" r="10" />
        {/* Jarum Jam */}
        <polyline points="12 6 12 12" className="origin-center animate-[spin_3s_linear_infinite]" />
        {/* Jarum Menit */}
        <polyline points="12 12 16 14" className="origin-center animate-[spin_12s_linear_infinite]" />
      </svg>
    </div>
    <p className="text-yellow-500/60 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
      Next Experience Loading
    </p>
  </div>
);

export default function OrganisasiPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [organisasi] = useState([
    {
      id: 1,
      nama: "D3 Teknik Informatika UNS PSDKU",
      jabatan: "Divisi Dokumentasi Prodi",
      tahun_masuk: "2022",
      tahun_keluar: "2025",
      deskripsi: "Melakukan dokumentasi kegiatan prodi menggunakan kamera DSLR atau Mirrorless. Melakukan pengeditan video yang berhubungan dengan kegiatan prodi menggunakan Capcut dan Canva. Melakukan penyimpanan hasil dokumentasi menggunakan Google Drive",
      file_path: "",
    },
    {
      id: 2,
      nama: "Himpunan Mahasiswa PSDKU UNS",
      jabatan: "Staff Divisi Media Komunikasi",
      tahun_masuk: "2023",
      tahun_keluar: "2024",
      deskripsi: "Melakukan dokumentasi kegiatan himpunan menggunakan kamera DSLR atau Mirrorless. Melakukan pengeditan video dan foto yang berhubungan dengan kegiatan himpunan menggunakan Capcut dan Canva. Melakukan upload konten press release. Melakukan penyimpanan hasil dokumentasi menggunakan Google Drive.",
      file_path: "",
    },
    {
      id: 3,
      nama: "PT. Garapan Indonesia Sukses",
      jabatan: "Full Stack Developer",
      tahun_masuk: "2024",
      tahun_keluar: "2024",
      deskripsi: "Melakukan perancangan dan pembuatan website bersama dengan tim menggunakan teknologi web modern.",
      file_path: "",
    },
    {
      id: 4,
      nama: "PT. Garapan Indonesia Sukses",
      jabatan: "Multimedia Content Creator",
      tahun_masuk: "2025",
      tahun_keluar: "2025",
      deskripsi: "Melakukan kegiatan dokumentasi kegiatan meliputi pengambilan gambar dan video serta melakukan pengeditan video.",
      file_path: "",
    },
    {
      id: 5,
      nama: "[COMING SOON]",
      isComingSoon: true,
    },
  ]);

  const [expanded, setExpanded] = useState({});
  const [popupImage, setPopupImage] = useState(null);

  const toggleExpand = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const normalizeFileUrl = (filePath) => {
    if (!filePath) return null;
    return filePath.startsWith("/") ? filePath : `/${filePath}`;
  };

  const getFileType = (filePath) => {
    if (!filePath) return null;
    const ext = filePath.split(".").pop().toLowerCase();
    if (ext === "pdf") return "pdf";
    if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "image";
    return null;
  };

  useEffect(() => {
    document.body.style.overflow = popupImage ? "hidden" : "auto";
  }, [popupImage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".organisasi-item").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={`min-h-screen font-poppins transition-colors duration-500 pt-32 pb-20 px-4 sm:px-12 md:px-20 lg:px-32 ${isDark ? "bg-[#080808] text-gray-100" : "bg-slate-50 text-gray-900"}`}>
      
      {/* Header Section */}
      <header className="max-w-4xl mx-auto mb-20 text-center">
        <h1 className={`text-4xl md:text-6xl font-extrabold mb-4 tracking-tight ${isDark ? "neon-glow text-white" : "text-gray-900"}`}>
          Pengalaman & Organisasi
        </h1>
        <div className={`h-1.5 w-24 mx-auto rounded-full ${isDark ? 'bg-yellow-500 shadow-[0_0_15px_#f59e0b]' : 'bg-yellow-500'}`}></div>
      </header>

      <div className="max-w-6xl mx-auto relative">
        {/* Central Vertical Line (Desktop Only) */}
        <div className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-[1px] ${isDark ? 'bg-gray-800' : 'bg-gray-200'} hidden md:block`}></div>

        <div className="flex flex-col gap-12">
          {organisasi.map((o, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = expanded[o.id];
            const textToShow = isExpanded ? o.deskripsi : o.deskripsi?.length > 180 ? o.deskripsi.substring(0, 180) + "..." : o.deskripsi;
            const fileUrl = normalizeFileUrl(o.file_path);
            const type = getFileType(o.file_path);

            return (
              <div
                key={o.id}
                className={`organisasi-item opacity-0 translate-y-10 transition-all duration-1000 flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Desktop Spacer */}
                <div className="hidden md:block md:w-1/2"></div>

                {/* Timeline Dot */}
                <div className={`absolute left-0 md:left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-2 ${isDark ? 'bg-yellow-500 border-gray-900 shadow-[0_0_10px_#f59e0b]' : 'bg-yellow-500 border-white shadow-md'} z-10 hidden md:block`}></div>

                {/* Card Content */}
                <div className="w-full md:w-1/2 px-0 md:px-12">
                  <div className={`relative group p-8 rounded-[2rem] transition-all duration-500 border ${
                    isDark ? "bg-gray-900/40 border-white/5 hover:border-yellow-500/40 backdrop-blur-xl" : "bg-white border-gray-100 shadow-xl hover:shadow-2xl"
                  }`}>
                    
                    {o.isComingSoon ? (
                      <SpinningClockIcon />
                    ) : (
                      <>
                        {/* Year Badge */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            isDark ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {o.tahun_masuk} — {o.tahun_keluar}
                          </span>
                        </div>

                        <h2 className={`text-xl md:text-2xl font-bold mb-1 leading-tight ${isDark ? "text-white group-hover:text-yellow-400" : "text-gray-800"} transition-colors`}>
                          {o.nama}
                        </h2>
                        
                        <p className={`font-semibold mb-6 text-sm uppercase tracking-tighter ${isDark ? 'text-gray-500' : 'text-yellow-600'}`}>
                          {o.jabatan}
                        </p>

                        <div className="relative">
                          <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            {textToShow}
                          </p>
                          {o.deskripsi?.length > 180 && (
                            <button
                              onClick={() => toggleExpand(o.id)}
                              className="mt-3 text-[10px] font-black uppercase tracking-widest text-yellow-500 hover:underline"
                            >
                              {isExpanded ? "Show Less" : "Read Full Story"}
                            </button>
                          )}
                        </div>

                        {/* File Attachment */}
                        {fileUrl && (
                          <div className="mt-8 rounded-2xl overflow-hidden border border-white/5 bg-black/20">
                            {type === "image" ? (
                              <img
                                src={fileUrl}
                                alt={o.nama}
                                className="w-full h-44 object-cover transition-transform duration-700 hover:scale-110 cursor-zoom-in"
                                onClick={() => setPopupImage(fileUrl)}
                              />
                            ) : type === "pdf" ? (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={`flex items-center justify-center gap-3 p-4 text-xs font-black tracking-widest uppercase ${
                                  isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'
                                } transition-all`}
                              >
                                📄 View Document
                              </a>
                            ) : null}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popup Lightbox */}
      {popupImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md flex justify-center items-center z-[1000] p-6 transition-all"
          onClick={() => setPopupImage(null)}
        >
          <button className="absolute top-10 right-10 text-white/50 hover:text-white text-4xl transition-colors z-[1001]">&times;</button>
          <img
            src={popupImage}
            alt="Preview Full"
            className="max-h-[85vh] max-w-full rounded-lg shadow-2xl animate-fade-in"
          />
        </div>
      )}

      <style jsx>{`
        .neon-glow {
          text-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
        }
        
        .organisasi-item.reveal {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}