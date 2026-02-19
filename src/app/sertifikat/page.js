"use client";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

// Komponen Animasi Jarum Jam Berputar (Lime Variant)
const SpinningClockIcon = () => (
  <div className="flex flex-col items-center justify-center py-12 gap-5 w-full bg-[#9be414]/5 rounded-3xl border-2 border-dashed border-[#9be414]/20">
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
        {/* Jarum Jam */}
        <polyline points="12 6 12 12" className="origin-center animate-[spin_5s_linear_infinite]" />
        {/* Jarum Menit */}
        <polyline points="12 12 16 14" className="origin-center animate-[spin_2s_linear_infinite]" />
      </svg>
    </div>
    <div className="text-center">
      <p className="text-[#9be414]/70 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
        Incoming Certificate
      </p>
      <p className="text-[9px] mt-1 text-gray-500 italic">Verifying achievements...</p>
    </div>
  </div>
);

export default function SertifikatPage() {
  const { theme } = useTheme();
  const [sertifikat, setSertifikat] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [modalPDF, setModalPDF] = useState(null);

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
      nama: "Certificate of Appreciation 1st Place Web Design International Competition GAYATAMA 2024",
      deskripsi: "Bersama dengan Tim Pokpokji berhasil memperoleh juara 1 Web desain International Competition GAYATAMA 2024 UNESA pada 9 Desember 2024",
      penerbit: "Universitas Negeri Surabaya (UNESA)",
      tahun: "2024",
      tingkat: "Internasional",
      hasil: "Juara 1",
      pdf_file: "/uploads/130_Winner_GAYATAMA_compressed.pdf",
    },
    {
      id: 3,
      nama: "Juara 3 - Olimpiade Vokasi Indonesia IX Tahun 2024 Bidang Web Technologies",
      deskripsi: "Bersama dengan tim memperoleh juara 3 dalam gelaran OLIVIA IX Tahun 2024 di Makassar, Sulawesi Selatan pada bidang Web Technologies",
      penerbit: "Forum Pendidikan Tinggi Vokasi Indonesia",
      tahun: "2024",
      tingkat: "Nasional",
      hasil: "Juara 3",
      pdf_file: "/uploads/Sertifikat Juara (Emas, Perak dan Perunggu) OLIVIA IX_page-0069 (1).pdf",
    },
    {
      id: 4,
      nama: "[COMING SOON]",
      deskripsi: "Sertifikat mendatang sedang dalam proses verifikasi atau pelaksanaan kompetisi.",
      isComingSoon: true, // Flag untuk memicu animasi jam
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
    document.body.style.overflow = modalPDF ? "hidden" : "auto";
  }, [modalPDF]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".sertifikat-card").forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [sertifikat]);

  return (
    <main className={`min-h-screen font-poppins transition-colors duration-500 pt-32 pb-20 px-4 sm:px-8 md:px-16 lg:px-24 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      
      {/* HEADER SECTION */}
      <header className="max-w-4xl mx-auto mb-20 text-center">
        <h1 className={`text-4xl md:text-6xl font-extrabold mb-4 tracking-tight ${isDark ? "neon-glow text-white" : "text-gray-900"}`}>
          Sertifikat
        </h1>
        <div className={`h-1.5 w-24 mx-auto rounded-full ${isDark ? 'bg-[#9be414] shadow-[0_0_15px_#9be414]' : 'bg-[#9be414]'}`}></div>
      </header>

      {/* LIST SECTION */}
      {sertifikat.length === 0 ? (
        <div className="flex justify-center items-center h-40">
           <p className="opacity-50 italic animate-pulse">Memuat data sertifikat...</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          {sertifikat.map((s) => {
            const isExpanded = expanded[s.id];
            const textToShow = isExpanded || s.deskripsi?.length <= 180 ? s.deskripsi : s.deskripsi?.substring(0, 180) + "...";
            const pdfUrl = normalizePdfUrl(s.pdf_file);

            return (
              <div key={s.id} className="sertifikat-card opacity-0 translate-y-10 transition-all duration-1000 group">
                <div className="neon-border rounded-[2.5rem] p-[1px] relative">
                  <div className={`relative rounded-[2.4rem] p-8 md:p-10 flex flex-col lg:flex-row gap-10 transition-all duration-500 ${isDark ? "bg-gray-900/40 backdrop-blur-xl border border-white/5" : "bg-white shadow-xl border border-gray-100 group-hover:shadow-2xl"}`}>
                    
                    {s.isComingSoon ? (
                      <SpinningClockIcon />
                    ) : (
                      <>
                        {/* LEFT CONTENT */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex flex-wrap gap-2 mb-6">
                            {s.tingkat && (
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-[#9be414]/10 text-[#9be414] border border-[#9be414]/20' : 'bg-lime-50 text-lime-700 border border-lime-100'}`}>
                                {s.tingkat}
                              </span>
                            )}
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-gray-800/50 text-gray-400 border border-white/5' : 'bg-gray-100 text-gray-600'}`}>
                              {s.tahun || "TBA"}
                            </span>
                          </div>

                          <h2 className={`text-2xl md:text-3xl font-bold mb-4 leading-tight tracking-tight transition-colors ${isDark ? "text-white group-hover:text-[#9be414]" : "text-gray-900"}`}>
                            {s.nama}
                          </h2>

                          <div className="mb-8 space-y-4">
                            <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {textToShow}
                            </p>
                            {s.deskripsi?.length > 180 && (
                              <button onClick={() => toggleExpand(s.id)} className="text-[10px] font-black text-[#9be414] uppercase tracking-widest hover:underline transition-all">
                                {isExpanded ? "Sembunyikan" : "Detail Deskripsi"}
                              </button>
                            )}
                          </div>

                          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t ${isDark ? 'border-white/5' : 'border-gray-100'} mt-auto`}>
                            <div>
                              <p className={`text-[10px] uppercase tracking-widest font-black mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Penerbit Instansi</p>
                              <p className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{s.penerbit || "-"}</p>
                            </div>
                            {s.hasil && (
                              <div>
                                <p className={`text-[10px] uppercase tracking-widest font-black mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Status / Hasil</p>
                                <p className={`text-sm font-bold text-[#9be414] italic`}>{s.hasil}</p>
                              </div>
                            )}
                          </div>

                          {pdfUrl && (
                            <div className="mt-10">
                              <button onClick={() => setModalPDF(pdfUrl)} className={`inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all transform active:scale-95 shadow-xl group/btn ${isDark ? 'bg-[#9be414] text-black hover:bg-[#b0f524] shadow-[#9be414]/20' : 'bg-black text-white hover:bg-gray-800 shadow-black/10'}`}>
                                <span className="text-lg group-hover/btn:rotate-12 transition-transform">📄</span> 
                                Buka Dokumen
                              </button>
                            </div>
                          )}
                        </div>

                        {/* RIGHT PREVIEW */}
                        {pdfUrl && (
                          <div className="w-full lg:w-[450px]">
                            <div className={`relative h-64 lg:h-full min-h-[350px] rounded-3xl overflow-hidden border-2 transition-all duration-700 group-hover:border-[#9be414]/40 ${isDark ? 'border-white/5 bg-black/40' : 'border-gray-100 bg-gray-50 shadow-inner'}`}>
                              <object data={pdfUrl} type="application/pdf" width="100%" height="100%" className="opacity-70 group-hover:opacity-100 transition-all duration-500 scale-[1.01]">
                                <div className="p-8 text-center flex flex-col items-center justify-center h-full gap-4">
                                   <div className="text-4xl opacity-20 text-[#9be414]">📄</div>
                                   <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Preview not supported</p>
                                   <a href={pdfUrl} target="_blank" rel="noreferrer" className="text-[10px] px-4 py-2 border border-[#9be414] text-[#9be414] font-black uppercase tracking-widest rounded-lg hover:bg-[#9be414] hover:text-black transition-all">Open Externally</a>
                                </div>
                              </object>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
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
      )}

      {/* MODAL VIEW */}
      {modalPDF && (
        <div className="fixed inset-0 z-[1000] flex justify-center items-center bg-black/95 backdrop-blur-xl p-4 md:p-10 animate-fade-in" onClick={() => setModalPDF(null)}>
          <button onClick={() => setModalPDF(null)} className="absolute top-8 right-8 text-white/50 hover:text-[#9be414] text-4xl transition-all z-10">&times;</button>
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-[2rem] overflow-hidden shadow-2xl scale-in-center" onClick={(e) => e.stopPropagation()}>
            <iframe src={modalPDF} className="w-full h-full" title="PDF Preview"></iframe>
          </div>
        </div>
      )}

      <style jsx>{`
        .neon-glow {
          text-shadow: 0 0 20px rgba(155, 228, 20, 0.3);
        }
        
        .sertifikat-card.reveal {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .neon-border::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, #9be414, transparent, #00ff99);
          z-index: -1;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .sertifikat-card:hover .neon-border::before {
          opacity: 0.2;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .scale-in-center {
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}