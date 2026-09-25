"use client";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

// Komponen Animasi Jarum Jam Berputar (Lime Variant)
const SpinningClockIcon = () => (
  <div className="flex flex-col items-center justify-center py-16 px-6 gap-5 h-full w-full bg-[#9be414]/5 rounded-3xl border-2 border-dashed border-[#9be414]/20 min-h-[250px]">
    <div className="relative w-16 h-16">
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-[#9be414] drop-shadow-[0_0_8px_rgba(155,228,20,0.5)]"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12" className="origin-center animate-[spin_5s_linear_infinite]" />
        <polyline points="12 12 16 14" className="origin-center animate-[spin_2s_linear_infinite]" />
      </svg>
    </div>
    <div className="text-center">
      <p className="text-[#9be414]/70 text-[11px] font-black uppercase tracking-[0.3em] animate-pulse">
        Incoming Certificate
      </p>
      <p className="text-[10px] mt-1 text-gray-500 italic">Verifying achievements...</p>
    </div>
  </div>
);

export default function SertifikatPage() {
  const { theme } = useTheme();
  const [sertifikat, setSertifikat] = useState([]);
  const [expanded, setExpanded] = useState({});

  const sertifikatData = [
    {
      id: 1,
      nama: "Sertifikat Kompetensi Pemrogram",
      deskripsi: "No. 62019 2514 5 00000439 2025",
      penerbit: "BNSP LSP Universitas Sebelas Maret",
      tahun: "2025-2028",
      tingkat: "Nasional",
      hasil: "Kompeten",
      pdf_file: "/uploads/serkom_widi.pdf",
    },
    {
      id: 2,
      nama: "TOEIC",
      deskripsi: "Listening And Reading Official Institutional Score Report",
      penerbit: "Educational Testing Service.",
      tahun: "2025-2027",
      tingkat: "Internasional",
      hasil: "485",
      pdf_file: "/uploads/toeic widi.pdf",
    },
    {
      id: 3,
      nama: "Certificate of Appreciation 1st Place Web Design International Competition GAYATAMA 2024",
      deskripsi: "Bersama dengan Tim Pokpokji berhasil memperoleh juara 1 Web desain International Competition GAYATAMA 2024 UNESA pada 9 Dokumenter 2024",
      penerbit: "Universitas Negeri Surabaya (UNESA)",
      tahun: "2024",
      tingkat: "Internasional",
      hasil: "Juara 1",
      pdf_file: "/uploads/130_Winner_GAYATAMA_compressed.pdf",
    },
    {
      id: 4,
      nama: "Juara 3 - Olimpiade Vokasi Indonesia IX Tahun 2024 Bidang Web Technologies",
      deskripsi: "Bersama dengan tim memperoleh juara 3 dalam gelaran OLIVIA IX Tahun 2024 di Makassar, Sulawesi Selatan pada bidang Web Technologies",
      penerbit: "Forum Pendidikan Tinggi Vokasi Indonesia",
      tahun: "2024",
      tingkat: "Nasional",
      hasil: "Juara 3",
      pdf_file: "/uploads/Sertifikat Juara (Emas, Perak dan Perunggu) OLIVIA IX_page-0069 (1).pdf",
    },
    {
      id: 5,
      nama: "[COMING SOON]",
      deskripsi: "Sertifikat mendatang sedang dalam proses verifikasi atau pelaksanaan kompetisi.",
      isComingSoon: true,
    },
  ];

  useEffect(() => {
    setSertifikat(sertifikatData);
  }, []);

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const normalizePdfUrl = (pdfFile) => {
    if (!pdfFile) return null;
    return pdfFile.startsWith("/") ? pdfFile : `/${pdfFile}`;
  };

  const isDark = theme === "dark";

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? "#080808" : "#f8fafc";
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
          }
        });
      },
      { threshold: 0.02 }
    );
    document.querySelectorAll(".sertifikat-card").forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [sertifikat]);

  return (
    <main className={`min-h-screen font-poppins transition-colors duration-500 pt-32 pb-20 px-4 sm:px-8 md:px-12 lg:px-16 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      
      {/* HEADER SECTION */}
      <header className="max-w-4xl mx-auto mb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Sertifikat
        </h1>
        <div className="h-1.5 w-24 mx-auto rounded-full bg-[#9be414]"></div>
      </header>

      {/* LIST SECTION */}
      {sertifikat.length === 0 ? (
        <div className="flex justify-center items-center h-40">
           <p className="opacity-50 italic animate-pulse">Memuat data sertifikat...</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 md:block md:[column-count:2] md:[column-gap:2rem] space-y-0 md:space-y-8">
          {sertifikat.map((s) => {
            const isExpanded = expanded[s.id];
            const textToShow = isExpanded || s.deskripsi?.length <= 140 ? s.deskripsi : s.deskripsi?.substring(0, 140) + "...";
            const pdfUrl = normalizePdfUrl(s.pdf_file);

            return (
              <div 
                key={s.id} 
                className="sertifikat-card opacity-0 translate-y-6 transition-all duration-700 w-full md:break-inside-avoid mb-8"
              >
                <div className={`h-full rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between transition-all duration-500 border ${
                  isDark 
                    ? "bg-gray-900/40 backdrop-blur-xl border-gray-800" 
                    : "bg-white shadow-lg border-gray-100"
                }`}>
                  
                  {s.isComingSoon ? (
                    <SpinningClockIcon />
                  ) : (
                    <div className="flex flex-col h-full">
                      {/* TAGS */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {s.tingkat && (
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isDark ? 'bg-[#9be414]/10 text-[#9be414]' : 'bg-lime-50 text-lime-700'}`}>
                            {s.tingkat}
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isDark ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                          {s.tahun || "TBA"}
                        </span>
                      </div>

                      {/* TITLE */}
                      <h2 className={`text-xl md:text-2xl font-bold mb-3 leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                        {s.nama}
                      </h2>

                      {/* DESKRIPSI */}
                      <div className="mb-6">
                        <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {textToShow}
                        </p>
                        {s.deskripsi?.length > 140 && (
                          <button 
                            onClick={() => toggleExpand(s.id)} 
                            className="text-[9px] font-black text-[#9be414] uppercase tracking-widest hover:underline mt-2 block relative z-10"
                          >
                            {isExpanded ? "Sembunyikan" : "Detail Deskripsi"}
                          </button>
                        )}
                      </div>

                      {/* FOOTER AREA: PENERBIT, HASIL (TANPA CARD, WARNA TETAP MENONJOL), & TOMBOL BUKA DOKUMEN */}
                      <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'} mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`}>
                        
                        <div className="flex items-center gap-6">
                          <div>
                            <p className={`text-[9px] uppercase tracking-widest font-black mb-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Penerbit</p>
                            <p className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{s.penerbit || "-"}</p>
                          </div>
                          {s.hasil && (
                            <div>
                              <p className={`text-[9px] uppercase tracking-widest font-black mb-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Hasil</p>
                              <p className={`text-xs font-black italic ${isDark ? 'text-[#9be414]' : 'text-lime-700'}`}>
                                {s.hasil}
                              </p>
                            </div>
                          )}
                        </div>

                        {pdfUrl && (
                          <a 
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-5 py-3 rounded-xl font-black text-[11px] tracking-widest uppercase text-center transition-all whitespace-nowrap ${
                              isDark 
                                ? 'bg-[#9be414] text-black hover:bg-[#b0f524]' 
                                : 'bg-black text-white hover:bg-gray-800'
                            }`}
                          >
                            Buka Dokumen
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .sertifikat-card.reveal {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .sertifikat-card:hover {
          transform: translateY(-5px) !important;
        }
        
        .sertifikat-card {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}