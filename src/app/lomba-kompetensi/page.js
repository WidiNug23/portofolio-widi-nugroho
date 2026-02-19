"use client";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

// Komponen Jarum Jam Berputar untuk Item Upcoming
const SpinningClockIcon = () => (
  <div className="flex flex-col items-center justify-center gap-4 w-full h-full min-h-[250px] bg-purple-500/5 rounded-2xl border-2 border-dashed border-purple-500/20">
    <svg 
      width="60" 
      height="60" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12" className="origin-center animate-[spin_3s_linear_infinite]" />
      <polyline points="12 12 16 14" className="origin-center animate-[spin_12s_linear_infinite]" />
    </svg>
    <div className="text-purple-400 font-bold tracking-[0.2em] text-[10px] uppercase animate-pulse">
      Preparing Next Stage
    </div>
  </div>
);

export default function LombaPage() {
  const { theme } = useTheme();
  const [lomba, setLomba] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [popupImage, setPopupImage] = useState(null);
  const [imageIndex, setImageIndex] = useState({});

  const lombaData = [
    {
      id: 1,
      nama: "Olimpiade Vokasi Indonesia X Tahun 2025",
      deskripsi: "Berkompetisi dalam ajang bergengsi tingkat nasional yang menyatukan mahasiswa vokasi seluruh Indonesia untuk menunjukkan keahlian praktis dan inovasi teknologi.",
      tingkat: "Nasional",
      tahun: "2025",
      hasil: "Finalist",
      penyelenggara: "Forum Pendidikan Tinggi Vokasi Indonesia",
      files: [{ id: 1, filePath: "/uploads/DSC079288.JPG", fileType: "image" }],
    },
    {
      id: 2,
      nama: "Web Design International Competition Gayatama UNESA 2024",
      deskripsi: "Kompetisi desain web tingkat internasional yang menantang kreativitas dalam UI/UX dan fungsionalitas front-end dengan standar industri global.",
      tingkat: "Internasional",
      tahun: "2024",
      hasil: "Juara 1",
      penyelenggara: "Universitas Negeri Surabaya",
      files: [
        { id: 1, filePath: "/uploads/width_800.png", fileType: "image" },
        { id: 2, filePath: "/uploads/width_800 (1).png", fileType: "image" },
        { id: 3, filePath: "/uploads/width_800 (2).png", fileType: "image" },
        { id: 4, filePath: "/uploads/width_800 (3).png", fileType: "image" },
      ],
    },
    {
      id: 3,
      nama: "Olimpiade Vokasi Indonesia IX Tahun 2024",
      deskripsi: "Berhasil meraih medali dalam kategori Web Technologies dengan mengembangkan solusi web yang responsif dan efisien sesuai kebutuhan studi kasus.",
      tingkat: "Nasional",
      tahun: "2024",
      hasil: "Juara 3 - Bidang Web Technologies",
      penyelenggara: "Forum Pendidikan Tinggi Vokasi Indonesia",
      files: [
        { id: 1, filePath: "/uploads/width_750.png", fileType: "image" },
        { id: 2, filePath: "/uploads/width_600.png", fileType: "image" },
        { id: 3, filePath: "/uploads/width_378.png", fileType: "image" },
        { id: 4, filePath: "/uploads/width_800 (4).png", fileType: "image" },
      ],
    },
    {
      id: 4,
      nama: "Canter 60th Anniversary Photo Contest",
      deskripsi: "Ajang kreativitas fotografi nasional dalam merayakan warisan kendaraan niaga legendaris, menekankan pada aspek visual storytelling.",
      tingkat: "Nasional",
      tahun: "2023",
      hasil: "Nominasi Juara Favorit",
      penyelenggara: "Mitsubishi Fuso",
      files: [{ id: 1, filePath: "/uploads/width_800 (5).png", fileType: "image" }],
    },
    {
      id: 5,
      nama: "[COMING SOON]",
      deskripsi: "Persiapan untuk kompetisi berikutnya sedang berjalan. Pantau terus untuk pembaruan prestasi mendatang!",
      isUpcoming: true,
    },
  ];

  useEffect(() => setLomba(lombaData), []);
  useEffect(() => { document.body.style.overflow = popupImage ? "hidden" : "auto"; }, [popupImage]);

  const toggleExpand = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  const normalizeFileUrl = (filePath) => filePath || null;

  // Auto-slide for images
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => {
        const newIndex = { ...prev };
        lomba.forEach((l) => {
          const images = l.files?.filter((f) => f.fileType === "image") || [];
          if (images.length > 1) {
            newIndex[l.id] = prev[l.id] === undefined ? 0 : (prev[l.id] + 1) % images.length;
          }
        });
        return newIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [lomba]);

  // Reveal Animation on Scroll
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
    document.querySelectorAll(".lomba-card").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [lomba]);

  const isDark = theme === "dark";

  return (
    <main className={`min-h-screen font-poppins transition-colors duration-500 pt-32 pb-20 px-4 sm:px-8 md:px-16 lg:px-24 ${isDark ? "bg-[#080808] text-gray-100" : "bg-slate-50 text-gray-900"}`}>
      
      {/* HEADER SECTION */}
      <header className="max-w-4xl mx-auto mb-20 text-center">
        <h1 className={`text-4xl md:text-6xl font-extrabold mb-4 tracking-tight ${isDark ? "neon-glow text-white" : "text-gray-900"}`}>
          Lomba & Kompetisi
        </h1>
        <div className={`h-1.5 w-24 mx-auto rounded-full ${isDark ? 'bg-purple-600 shadow-[0_0_15px_#a855f7]' : 'bg-purple-500'}`}></div>
      </header>

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {lomba.map((l) => {
          const isExpanded = expanded[l.id];
          const textToShow = isExpanded ? l.deskripsi : l.deskripsi?.length > 180 ? l.deskripsi.substring(0, 180) + "..." : l.deskripsi;
          const images = l.files?.filter((f) => f.fileType === "image") || [];
          const pdfs = l.files?.filter((f) => f.fileType === "pdf") || [];
          const currentIndex = imageIndex[l.id] || 0;

          return (
            <div key={l.id} className="lomba-card opacity-0 translate-y-12 transition-all duration-1000 group">
              <div className="neon-border rounded-3xl p-[1px]">
                <div className={`relative rounded-[23px] p-6 md:p-10 flex flex-col lg:flex-row gap-10 transition-all duration-500 ${isDark ? "bg-gray-900/50 backdrop-blur-xl border border-white/5" : "bg-white shadow-xl border border-gray-100"}`}>
                  
                  {/* LEFT SIDE: DETAILS */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-purple-100 text-purple-700'}`}>
                        {l.tingkat || (l.isUpcoming ? "Vision" : "General")}
                      </span>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                        {l.tahun || "Future"}
                      </span>
                    </div>

                    <h2 className={`text-2xl md:text-3xl font-bold mb-4 leading-tight tracking-tight ${isDark ? "text-white group-hover:text-purple-400" : "text-gray-900"} transition-colors`}>
                      {l.nama}
                    </h2>

                    <div className={`flex items-center gap-3 mb-6 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <div className={`h-2 w-2 rounded-full animate-pulse ${l.isUpcoming ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                      <p className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {l.hasil || "Preparing..."}
                      </p>
                    </div>

                    {l.deskripsi && (
                      <div className="mb-6">
                        <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {textToShow}
                        </p>
                        {l.deskripsi.length > 180 && (
                          <button onClick={() => toggleExpand(l.id)} className="mt-3 text-xs font-bold text-purple-500 uppercase tracking-tighter hover:underline">
                            {isExpanded ? "Show Less" : "Read More"}
                          </button>
                        )}
                      </div>
                    )}

                    {!l.isUpcoming && (
                      <div className={`pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'} mt-auto`}>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} font-medium`}>Penyelenggara:</p>
                        <p className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{l.penyelenggara || "-"}</p>
                      </div>
                    )}

                    {pdfs.length > 0 && (
                      <div className="mt-6">
                        {pdfs.map((f) => (
                          <a key={f.id} href={normalizeFileUrl(f.filePath)} target="_blank" rel="noreferrer"
                             className="inline-flex items-center gap-2 bg-purple-600 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/20">
                            📄 VIEW CERTIFICATE
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RIGHT SIDE: IMAGE SLIDER OR CLOCK */}
                  <div className="w-full lg:w-[420px] flex items-center justify-center">
                    {l.isUpcoming ? (
                      <SpinningClockIcon />
                    ) : images.length > 0 ? (
                      <div className={`relative w-full rounded-2xl overflow-hidden aspect-[4/3] border-4 ${isDark ? 'border-gray-800' : 'border-white shadow-lg'}`}>
                        <div className="flex h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                          {images.map((img, idx) => (
                            <img key={idx} src={normalizeFileUrl(img.filePath)} alt={l.nama} 
                                 className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-700"
                                 onClick={() => setPopupImage({ url: normalizeFileUrl(img.filePath), index: idx, allImages: images })}/>
                          ))}
                        </div>

                        {images.length > 1 && (
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {images.map((_, idx) => (
                              <button key={idx} onClick={() => setImageIndex(prev => ({ ...prev, [l.id]: idx }))}
                                      className={`h-1.5 transition-all duration-300 rounded-full ${idx === currentIndex ? "w-8 bg-purple-500" : "w-2 bg-white/50"}`}/>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/3] bg-gray-800/20 rounded-2xl border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-500 italic text-sm">
                        No Documentation Available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* POPUP VIEWER */}
      {popupImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex justify-center items-center z-[110] p-4 transition-all" onClick={() => setPopupImage(null)}>
          <button className="absolute top-8 right-8 text-white text-3xl hover:text-purple-500 transition-colors z-[120]">✕</button>
          
          <div className="relative max-w-5xl w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={popupImage.url} alt="Full Preview" className="rounded-lg shadow-2xl max-h-[85vh] max-w-full object-contain animate-fade-in" />
            
            {popupImage.allImages.length > 1 && (
              <div className="flex justify-between absolute w-full px-4">
                <button className="bg-white/10 hover:bg-purple-600/40 p-4 rounded-full backdrop-blur-md transition-all text-white"
                        onClick={() => {
                          const prev = (popupImage.index - 1 + popupImage.allImages.length) % popupImage.allImages.length;
                          setPopupImage(p => ({ ...p, url: normalizeFileUrl(p.allImages[prev].filePath), index: prev }));
                        }}>❮</button>
                <button className="bg-white/10 hover:bg-purple-600/40 p-4 rounded-full backdrop-blur-md transition-all text-white"
                        onClick={() => {
                          const next = (popupImage.index + 1) % popupImage.allImages.length;
                          setPopupImage(p => ({ ...p, url: normalizeFileUrl(p.allImages[next].filePath), index: next }));
                        }}>❯</button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .neon-border { position: relative; }
        .neon-glow { text-shadow: 0 0 15px rgba(168, 85, 247, 0.4); }

        .lomba-card.reveal {
          opacity: 1;
          transform: translateY(0);
        }

        .neon-border::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #a855f7, transparent, #8b5cf6);
          z-index: -1;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .lomba-card:hover .neon-border::before {
          opacity: 0.4;
        }

        @keyframes animate-fade-in {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fade-in { animation: animate-fade-in 0.3s ease-out forwards; }
      `}</style>
    </main>
  );
}