"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "../ThemeContext";

const projekData = [
  {
    id: 1,
    judul: "CareBot – Sistem Nutrisi Digital",
    deskripsi: `Terpenuhinya kebutuhan nutrisi yang optimal sangat penting untuk menjaga kesehatan dan kualitas hidup setiap individu, terutama bagi remaja, lansia, ibu hamil, dan ibu menyusui.`,
    link_demo: "https://carebot.tifpsdku.com",
    link_github: "https://github.com/WidiNug23/Frontend-Carebot.git",
    pdf_file: "uploads/[Lite] DOKUMENTASI TEKNIS CAREBOT (2).pdf",
    images: JSON.stringify([
      "Screenshot 2025-07-15 131930.png",
      "Screenshot 2025-07-15 132139.png",
      "Screenshot 2025-08-06 133251.png",
      "Screenshot 2025-08-06 134138.png",
      "Screenshot 2025-08-11 131200.png",
      "Screenshot 2025-08-11 131743.png",
      "Screenshot 2025-08-11 131810.png",
    ]),
  },
  {
    id: 2,
    judul: "SIPBIBU – Penanganan Baby Blues",
    deskripsi: `SIPBIBU merupakan website yang dibuat sebagai upaya untuk menekan angka baby blues pada Ibu.\n\nFitur-fitur utama:\n• Kuesioner Model Suryani & EPDS\n• Forum Diskusi Ibu\n• Konsultasi Online Psikolog\n• Edukasi Video & Audio`,
    link_demo: "https://sipbibu.tifpsdku.com",
    link_github: "",
    pdf_file: "uploads/Biru Isometrik Elemen & Mockup Teknologi dalam Hidup Konsumen Teknologi Presentasi.pdf",
    images: JSON.stringify([
      "Screenshot 2025-10-22 135825.png",
      "Screenshot 2025-10-22 135807.png",
      "Screenshot 2025-10-22 135731.png",
    ]),
  },
  {
    id: 3,
    judul: "NopolIndo - Cek Plat Nomor",
    deskripsi: `NopolIndo memudahkan pengguna mencari informasi plat nomor kendaraan di Indonesia berdasarkan wilayah, provinsi, atau huruf secara cepat dan fleksibel.`,
    link_demo: "https://nopolindo.vercel.app/",
    link_github: "",
    images: JSON.stringify([
      "nopolindo.vercel.app_ (1).png",
      "nopolindo.vercel.app_ (2).png",
      "nopolindo.vercel.app_ (3).png",
    ]),
  },
  {
    id: 4,
    judul: "Filterisasi Lowongan MagangHub",
    deskripsi: `Sistem filterisasi cerdas menggunakan Python & Naive Bayes untuk menyaring lowongan magang berdasarkan kuota, lokasi, dan peluang lolos secara akurat.`,
    link_demo: "https://filterisasi-data-lowongan-magang.streamlit.app/",
    link_github: "https://github.com/WidiNug23/filterisasi-data-lowongan-maganghub",
    pdf_file: "",
    images: JSON.stringify(["filter1.png", "filter2.png", "filter3.png"]),
  },
    {
    id: 5,
    judul: "Manajemen Gudang Berbasis Web Menggunakan Next JS & Supabase",
    deskripsi: `Sistem ini memudahkan penggunannya dalam management dan mengelola barang atau stock yang ada di dalam gudang. User akan diminta untuk mengelola kategori barang dan mengelola ketersediaan barang. Sistem ini menggunakan Next JS untuk Frontend dan Backendnya. Untuk database menggunakan Supabase. Sistem ini akan terus dikembangkan agar pengelolaan barang di gudang akan semakin kompleks.`,
    link_demo: "https://sistem-gudang-ten.vercel.app/",
    // link_github: "https://github.com/WidiNug23/sistem-gudang.git",
    pdf_file: "",
    images: JSON.stringify(["gudang1.png", "gudang2.png", "gudang3.png", "gudang4.png"]),
  },
  {
    id: 6,
    judul: "Hand Gesture",
    deskripsi: `Sistem ini dibuat untuk mengatur kecerahan layar, volume suara, mengambil scrennshot, dan melakukan play/pause video yang ada di laptop atau PC`,
    link_demo: "https://drive.google.com/drive/folders/1QSrsBeRIWnj6yDkE9d8FfdyajBcoWwyv?usp=sharing",
    link_github: "https://github.com/WidiNug23/hand-gesture.git",
    pdf_file: "https://drive.google.com/file/d/12WEGKDfVF-xH9LfWVl37iLvoDXXCjbZh/view?usp=sharing",
    images: JSON.stringify(["Screenshot (725).png"]),
  },
  {
    id: 7,
    judul: "Video: Pengenalan CareBot",
    deskripsi: `Projek produksi video pengenalan produk menggunakan CapCut dan Canva, mencakup tahap scripting hingga publikasi.`,
    link_demo: "https://www.youtube.com/watch?v=lJcgUrdF3ws",
    link_github: "",
    images: JSON.stringify([]),
  },
  {
    id: 8,
    judul: "Video: GoMadiun Tourism",
    deskripsi: `Produksi konten video kreatif untuk mempromosikan manajemen data wisata di Kabupaten Madiun.`,
    link_demo: "https://www.youtube.com/watch?v=7_L8LXGKcTI",
    link_github: "",
    images: JSON.stringify([]),
  },
  {
    id: 9,
    judul: "VR: Wonderful Kampung Pesilat",
    deskripsi: `Penyusunan video promosi Virtual Tour berbasis Virtual Reality di Kabupaten Madiun (Recording & Dubbing).`,
    link_demo: "https://www.youtube.com/watch?v=XfP6P09axso",
    link_github: "",
    images: JSON.stringify([]),
  },
  {
    id: 10,
    judul: "Video: Pameran Inovasi 5.0",
    deskripsi: `Dokumentasi cinematik aktivitas Pameran Inovasi Teknologi Era Revolusi Industri 5.0.`,
    link_demo: "https://www.youtube.com/watch?v=nHV9A8DgE8Q",
    link_github: "",
    images: JSON.stringify([]),
  },
  {
    id: 11,
    judul: "Upcoming Project",
    deskripsi: `Projek baru sedang dalam tahap pengembangan. Segera hadir!`,
    images: JSON.stringify([]),
    isUpcoming: true,
  },
];

// Komponen Jarum Jam Berputar
const SpinningClockIcon = () => (
  <div className="flex flex-col items-center justify-center gap-4">
    <svg 
      width="80" 
      height="80" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12" className="origin-center animate-[spin_3s_linear_infinite]" />
      <polyline points="12 12 16 14" className="origin-center animate-[spin_12s_linear_infinite]" />
    </svg>
    <div className="text-blue-400 font-bold tracking-[0.2em] text-xs uppercase animate-pulse">
      In Development
    </div>
  </div>
);

export default function ProjekPage() {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState({});
  const [modalVideoID, setModalVideoID] = useState(null);
  const [modalPDF, setModalPDF] = useState(null);
  const [currentSlide, setCurrentSlide] = useState({});
  const [lightbox, setLightbox] = useState({ isOpen: false, projekID: null, imgIndex: 0 });
  const isDark = theme === "dark";

  const openLightbox = (projekID, imgIndex) => setLightbox({ isOpen: true, projekID, imgIndex });
  const closeLightbox = () => setLightbox({ isOpen: false, projekID: null, imgIndex: 0 });
  
  const navigateLightbox = (e, dir) => {
    e.stopPropagation();
    const p = projekData.find((x) => x.id === lightbox.projekID);
    const imgs = JSON.parse(p.images || "[]");
    setLightbox((prev) => ({ 
      ...prev, 
      imgIndex: (prev.imgIndex + dir + imgs.length) % imgs.length 
    }));
  };

  const handleDotClick = (projekID, index) => {
    setCurrentSlide(prev => ({ ...prev, [projekID]: index }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const updated = { ...prev };
        projekData.forEach((p) => {
          let imgs = [];
          try { imgs = JSON.parse(p.images || "[]"); } catch { imgs = []; }
          if (imgs.length > 1) {
            updated[p.id] = ((prev[p.id] ?? 0) + 1) % imgs.length;
          }
        });
        return updated;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("reveal");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".projek-card").forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const extractYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <main className={`min-h-screen pt-32 pb-20 px-4 sm:px-8 lg:px-16 transition-colors duration-500 ${isDark ? "bg-[#080808] text-white" : "bg-slate-50 text-slate-900"}`}>
      
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className={`text-5xl md:text-7xl font-black mb-6 tracking-tighter ${isDark ? "neon-glow" : "text-slate-900"}`}>
          PROJECTS
        </h1>
        <p className="text-lg md:text-xl opacity-80 leading-relaxed font-light">
          Berbagai Projek Dalam Bidang <span className="font-semibold text-blue-500">Web Development</span>, 
          <span className="font-semibold text-purple-500"> Videografi</span>, dan 
          <span className="font-semibold text-cyan-500"> Inovasi Digital</span>.
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {projekData.map((p) => {
          const isExpanded = expanded[p.id];
          const textToShow = isExpanded ? p.deskripsi : p.deskripsi?.substring(0, 200) + (p.deskripsi?.length > 200 ? "..." : "");
          const youtubeID = extractYouTubeID(p.link_demo || "");
          let images = [];
          try { images = JSON.parse(p.images || "[]"); } catch { images = []; }
          const slideIdx = currentSlide[p.id] ?? 0;

          return (
            <div key={p.id} className="projek-card opacity-0 transform translate-y-12 transition-all duration-1000">
              <div className={`group relative rounded-[2.5rem] overflow-hidden border transition-all duration-500 ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-slate-200 shadow-xl hover:shadow-2xl"}`}>
                <div className="flex flex-col lg:flex-row">
                  
                  {/* Left Column */}
                  <div className="p-8 lg:p-12 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                       <span className={`w-12 h-1 rounded-full ${isDark ? "bg-blue-500 shadow-[0_0_10px_#3b82f6]" : "bg-blue-600"}`}></span>
                       <span className="text-xs font-black tracking-widest uppercase opacity-60">Featured Project</span>
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-4 tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                      {p.judul}
                    </h2>
                    
                    <p className="text-base leading-relaxed mb-6 opacity-80 whitespace-pre-line">
                      {textToShow}
                    </p>

                    {p.deskripsi?.length > 200 && (
                      <button onClick={() => setExpanded(e => ({...e, [p.id]: !isExpanded}))} className="text-sm font-bold text-blue-500 hover:text-blue-400 mb-8 flex items-center gap-2">
                        {isExpanded ? "... Sembunyikan" : "Selengkapnya ... "}
                      </button>
                    )}

                    <div className="flex flex-wrap gap-4 mt-auto">
                      {p.link_demo && (
                        <a href={p.link_demo} target="_blank" rel="noreferrer" className={`px-6 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isDark ? "bg-white text-black hover:bg-blue-400" : "bg-slate-900 text-white hover:bg-blue-600"}`}>
                          <span>🚀</span> Live Demo
                        </a>
                      )}
                      {p.link_github && (
                        <a href={p.link_github} target="_blank" rel="noreferrer" className={`px-6 py-3 rounded-full text-sm font-bold border transition-all flex items-center gap-2 ${isDark ? "border-white/20 hover:bg-white/10 text-white" : "border-slate-300 hover:bg-slate-50 text-slate-900"}`}>
                          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className={`w-4 h-4 ${isDark ? "invert" : ""}`} alt="github" /> Code
                        </a>
                      )}
                      {p.pdf_file && (
                        <button onClick={() => setModalPDF(p.pdf_file)} className="px-6 py-3 rounded-full border border-red-500/50 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all">
                          📄 Documentation
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column (Media / Clock) */}
                  <div className="lg:w-1/2 p-4 lg:p-8 bg-black/20 backdrop-blur-sm min-h-[350px] flex items-center justify-center">
                    {p.isUpcoming ? (
                      <SpinningClockIcon />
                    ) : youtubeID ? (
                      <div className="w-full relative aspect-video rounded-3xl overflow-hidden shadow-2xl cursor-pointer group/vid" onClick={() => setModalVideoID(youtubeID)}>
                        <img src={`https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`} className="w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-110" alt="youtube-thumb" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover/vid:bg-black/20 transition-all">
                          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover/vid:scale-110">
                            <div className="ml-1 border-y-[12px] border-y-transparent border-l-[18px] border-l-white"></div>
                          </div>
                        </div>
                      </div>
                    ) : images.length > 0 ? (
                      <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl group/img aspect-[4/3]">
                        <div className="flex h-full transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)" style={{ transform: `translateX(-${slideIdx * 100}%)` }}>
                          {images.map((img, i) => (
                            <img 
                              key={i} 
                              src={`uploads/${img}`} 
                              className="w-full h-full object-cover cursor-zoom-in shrink-0" 
                              alt={`Project step ${i}`} 
                              onClick={() => openLightbox(p.id, i)} 
                            />
                          ))}
                        </div>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2.5 bg-black/30 backdrop-blur-xl rounded-full z-10">
                          {images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => handleDotClick(p.id, i)}
                              className={`h-2 rounded-full transition-all duration-300 ${i === slideIdx ? "w-8 bg-blue-500 shadow-[0_0_10px_#3b82f6]" : "w-2 bg-white/40 hover:bg-white/60"}`}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-white/10 rounded-3xl opacity-30">
                        <p className="italic text-lg tracking-widest uppercase">No Media Available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIGHTBOX */}
      {lightbox.isOpen && (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300" onClick={closeLightbox}>
          <button className="absolute top-8 right-8 text-white/50 hover:text-white text-4xl">✕</button>
          <button onClick={(e) => navigateLightbox(e, -1)} className="absolute left-4 sm:left-10 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white z-20">❮</button>
          <button onClick={(e) => navigateLightbox(e, 1)} className="absolute right-4 sm:right-10 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white z-20">❯</button>
          <div className="relative max-w-5xl max-h-[85vh]" onClick={e => e.stopPropagation()}>
            <img 
              src={`uploads/${JSON.parse(projekData.find(x => x.id === lightbox.projekID).images)[lightbox.imgIndex]}`} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
              alt="lightbox-preview" 
            />
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {modalVideoID && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setModalVideoID(null)}>
           <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/10" onClick={e => e.stopPropagation()}>
             <iframe src={`https://www.youtube.com/embed/${modalVideoID}?autoplay=1`} className="w-full h-full" allowFullScreen allow="autoplay"></iframe>
             <button onClick={() => setModalVideoID(null)} className="absolute top-4 right-4 bg-black/50 hover:bg-red-600 p-3 rounded-full text-white">✕</button>
           </div>
        </div>
      )}

      {/* PDF MODAL */}
      {modalPDF && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setModalPDF(null)}>
           <div className="bg-white w-full max-w-6xl h-[90vh] rounded-[2rem] overflow-hidden relative shadow-2xl" onClick={e => e.stopPropagation()}>
             <div className="absolute top-4 right-6 flex gap-4">
                <a href={modalPDF} download className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">Download PDF</a>
                <button onClick={() => setModalPDF(null)} className="bg-red-500 text-white w-10 h-10 rounded-full font-bold">✕</button>
             </div>
             <iframe src={modalPDF} className="w-full h-full pt-16"></iframe>
           </div>
        </div>
      )}

      <style jsx>{`
        .neon-glow {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
          background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .reveal {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .projek-card {
          will-change: transform, opacity;
        }
      `}</style>
    </main>
  );
}