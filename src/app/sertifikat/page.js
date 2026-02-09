"use client";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

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
      penerbit: "-",
      tahun: "-",
      tingkat: "",
      hasil: "",
      pdf_file: "",
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

  useEffect(() => {
    document.body.style.backgroundColor = theme === "dark" ? "#0a0a0a" : "#f8fafc";
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = modalPDF ? "hidden" : "auto";
  }, [modalPDF]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".sertifikat-card").forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [sertifikat]);

  const isDark = theme === "dark";

  return (
    <main className={`min-h-screen font-poppins transition-colors duration-500 pt-32 pb-20 px-4 sm:px-8 md:px-16 lg:px-24 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      
      {/* HEADER SECTION */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1 className={`text-4xl md:text-6xl font-extrabold mb-4 tracking-tight ${isDark ? "neon-glow text-white" : "text-gray-900"}`}>
          Sertifikat
        </h1>
        <div className={`h-1.5 w-24 mx-auto rounded-full ${isDark ? 'bg-[#9be414] shadow-[0_0_15px_#9be414]' : 'bg-[#9be414]'}`}></div>
      </div>

      {/* LIST SECTION */}
      {sertifikat.length === 0 ? (
        <p className="text-center opacity-50 italic">Memuat data sertifikat...</p>
      ) : (
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          {sertifikat.map((s) => {
            const isExpanded = expanded[s.id];
            const textToShow = isExpanded || s.deskripsi.length <= 180 ? s.deskripsi : s.deskripsi.substring(0, 180) + "...";
            const pdfUrl = normalizePdfUrl(s.pdf_file);

            return (
              <div key={s.id} className="sertifikat-card opacity-0 translate-y-10 transition-all duration-1000 group">
                <div className="neon-border rounded-3xl p-[1px]">
                  <div className={`relative rounded-[23px] p-6 md:p-10 flex flex-col lg:flex-row gap-10 transition-all duration-500 ${isDark ? "bg-gray-900/40 backdrop-blur-xl border border-white/5" : "bg-white shadow-xl border border-gray-100"}`}>
                    
                    {/* LEFT CONTENT */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {s.tingkat && (
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-[#9be414]/10 text-[#9be414] border border-[#9be414]/20' : 'bg-lime-100 text-lime-700'}`}>
                            {s.tingkat}
                          </span>
                        )}
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                          {s.tahun || "TBA"}
                        </span>
                      </div>

                      <h2 className={`text-2xl md:text-3xl font-bold mb-4 leading-tight tracking-tight transition-colors ${isDark ? "text-white group-hover:text-[#9be414]" : "text-gray-900"}`}>
                        {s.nama}
                      </h2>

                      <div className="mb-6 space-y-4">
                        <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {textToShow}
                        </p>
                        {s.deskripsi.length > 180 && (
                          <button onClick={() => toggleExpand(s.id)} className="text-xs font-bold text-[#9be414] uppercase tracking-tighter hover:underline">
                            {isExpanded ? "Sembunyikan" : "Baca Selengkapnya"}
                          </button>
                        )}
                      </div>

                      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t ${isDark ? 'border-white/5' : 'border-gray-100'} mt-auto`}>
                        <div>
                          <p className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Penerbit</p>
                          <p className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{s.penerbit || "-"}</p>
                        </div>
                        {s.hasil && (
                          <div>
                            <p className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Pencapaian</p>
                            <p className={`text-sm font-semibold text-[#9be414]`}>{s.hasil}</p>
                          </div>
                        )}
                      </div>

                      {pdfUrl && (
                        <div className="mt-8">
                          <button onClick={() => setModalPDF(pdfUrl)} className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-sm transition-all transform active:scale-95 shadow-lg ${isDark ? 'bg-[#9be414] text-black hover:bg-[#b0f524] shadow-[#9be414]/20' : 'bg-black text-white hover:bg-gray-800 shadow-gray-200'}`}>
                            <span className="text-lg">📄</span> LIHAT SERTIFIKAT FULL
                          </button>
                        </div>
                      )}
                    </div>

                    {/* RIGHT PREVIEW */}
                    {pdfUrl && (
                      <div className="w-full lg:w-[450px]">
                        <div className={`relative h-64 lg:h-full min-h-[300px] rounded-2xl overflow-hidden border-2 transition-all duration-500 group-hover:border-[#9be414]/50 ${isDark ? 'border-gray-800 bg-black/40' : 'border-gray-100 bg-gray-50 shadow-inner'}`}>
                          <object data={pdfUrl} type="application/pdf" width="100%" height="100%" className="opacity-80 group-hover:opacity-100 transition-opacity">
                            <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                               <p className="text-sm opacity-50 mb-4">Preview tidak tersedia di browser ini</p>
                               <a href={pdfUrl} target="_blank" rel="noreferrer" className="text-[#9be414] underline font-bold">Buka Langsung</a>
                            </div>
                          </object>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                      </div>
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
        <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/95 backdrop-blur-md p-4 animate-fade-in" onClick={() => setModalPDF(null)}>
          <button onClick={() => setModalPDF(null)} className="absolute top-6 right-6 text-white text-3xl hover:text-[#9be414] transition-all z-10">✕</button>
          <div className="relative w-full h-full max-w-5xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <iframe src={modalPDF} className="w-full h-full" title="PDF Preview"></iframe>
          </div>
        </div>
      )}

      <style jsx>{`
        .neon-glow {
          text-shadow: 0 0 15px rgba(155, 228, 20, 0.4);
        }
        
        .neon-border { position: relative; }

        .sertifikat-card.reveal {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .neon-border::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #9be414, transparent, #00ff99);
          z-index: -1;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .sertifikat-card:hover .neon-border::before {
          opacity: 0.3;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </main>
  );
}