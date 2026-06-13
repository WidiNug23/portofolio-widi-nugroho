"use client";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

// Komponen Animasi Jarum Jam Berputar (Lime Variant) - Dioptimalkan untuk Grid Layout
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
        {/* Jarum Jam */}
        <polyline points="12 6 12 12" className="origin-center animate-[spin_5s_linear_infinite]" />
        {/* Jarum Menit */}
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
    <main className={`min-h-screen font-poppins transition-colors duration-500 pt-32 pb-20 px-4 sm:px-8 md:px-12 lg:px-16 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      
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
        /* Menggunakan layout columns agar card di bawah otomatis naik mengisi ruang kosong di atasnya (True Masonry) */
        <div className="max-w-6xl mx-auto columns-1 md:columns-2 gap-8 space-y-8">
          {sertifikat.map((s) => {
            const isExpanded = expanded[s.id];
            const textToShow = isExpanded || s.deskripsi?.length <= 140 ? s.deskripsi : s.deskripsi?.substring(0, 140) + "...";
            const pdfUrl = normalizePdfUrl(s.pdf_file);

            return (
              /* break-inside-avoid mencegah card terpotong di tengah saat berganti kolom */
              <div key={s.id} className="sertifikat-card opacity-0 translate-y-10 transition-all duration-1000 group w-full inline-block break-inside-avoid">
                <div className="neon-border rounded-[2.5rem] p-[1px] relative w-full">
                  <div className={`relative rounded-[2.4rem] p-6 md:p-8 flex flex-col transition-all duration-500 ${isDark ? "bg-gray-900/40 backdrop-blur-xl border border-white/5" : "bg-white shadow-lg border border-gray-100 group-hover:shadow-2xl"}`}>
                    
                    {s.isComingSoon ? (
                      <SpinningClockIcon />
                    ) : (
                      <>
                        {/* MAIN CONTENT AREA */}
                        <div className="flex flex-col">
                          {/* TAGS */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {s.tingkat && (
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isDark ? 'bg-[#9be414]/10 text-[#9be414] border border-[#9be414]/20' : 'bg-lime-50 text-lime-700 border border-lime-100'}`}>
                                {s.tingkat}
                              </span>
                            )}
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isDark ? 'bg-gray-800/50 text-gray-400 border border-white/5' : 'bg-gray-100 text-gray-600'}`}>
                              {s.tahun || "TBA"}
                            </span>
                          </div>

                          {/* TITLE */}
                          <h2 className={`text-xl md:text-2xl font-bold mb-3 leading-tight tracking-tight transition-colors ${isDark ? "text-white group-hover:text-[#9be414]" : "text-gray-900"}`}>
                            {s.nama}
                          </h2>

                          {/* DESKRIPSI */}
                          <div className="mb-6">
                            <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {textToShow}
                            </p>
                            {s.deskripsi?.length > 140 && (
                              <button onClick={() => toggleExpand(s.id)} className="text-[9px] font-black text-[#9be414] uppercase tracking-widest hover:underline mt-2 block transition-all">
                                {isExpanded ? "Sembunyikan" : "Detail Deskripsi"}
                              </button>
                            )}
                          </div>

                          {/* FOOTER AREA INSIDE CARD */}
                          <div>
                            {/* METADATA INFO */}
                            <div className={`grid grid-cols-2 gap-4 pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'} mb-6`}>
                              <div>
                                <p className={`text-[9px] uppercase tracking-widest font-black mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Penerbit</p>
                                <p className={`text-xs font-bold line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{s.penerbit || "-"}</p>
                              </div>
                              {s.hasil && (
                                <div>
                                  <p className={`text-[9px] uppercase tracking-widest font-black mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Hasil</p>
                                  <p className={`text-xs font-bold text-[#9be414] italic`}>{s.hasil}</p>
                                </div>
                              )}
                            </div>

                            {/* ACTION BUTTON */}
                            {pdfUrl && (
                              <div className="flex justify-start">
                                <button onClick={() => setModalPDF(pdfUrl)} className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all transform active:scale-95 shadow-md group/btn w-full justify-center sm:w-auto ${isDark ? 'bg-[#9be414] text-black hover:bg-[#b0f524] shadow-[#9be414]/10' : 'bg-black text-white hover:bg-gray-800 shadow-black/5'}`}>
                                  Buka Dokumen
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
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
        /* z-[9999] dinaikkan agar mutlak berada di atas komponen navigasi luar */
        <div className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-black/95 backdrop-blur-xl p-4 md:p-10 animate-fade-in" onClick={() => setModalPDF(null)}>
          
          {/* md:pt-24 ditambahkan agar tombol X turun ke bawah jika ada navbar besar di desktop */}
          <div className="w-full max-w-5xl flex justify-end mb-3 pt-20 md:pt-24">
            <button 
              onClick={() => setModalPDF(null)} 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-[#9be414] text-white hover:text-black transition-all group duration-300 shadow-lg"
              title="Tutup Dokumen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="relative w-full h-[75vh] md:h-[80vh] max-w-5xl bg-black rounded-[2rem] overflow-hidden shadow-2xl scale-in-center border border-white/10" onClick={(e) => e.stopPropagation()}>
            <iframe 
              src={`${modalPDF}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0`} 
              className="w-full h-full bg-neutral-900 border-none" 
              title="PDF Preview"
            ></iframe>
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
          from { transform: scale(0.97); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .scale-in-center {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}