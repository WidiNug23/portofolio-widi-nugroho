"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "../ThemeContext";

const projekData = [
  {
    id: 1,
    tag: "Freelance Project",
    judul: "Digital Profile of Mejayan Village",
    deskripsi: `The official web portal for Mejayan Village, serving as a digital bridge between the local administration and its community. It features a comprehensive village profile, a responsive news feed, and a dedicated public reporting system. Crucially, the platform is directly integrated with 'PECELANDAK' a digital administrative service to streamline bureaucracy and accelerate document processing for residents.`,
    link_demo: "https://desamejayan.com/",
    images: JSON.stringify([
      "mejayan1.jpeg",
      "mejayan2.png",
      "mejayan3.png",
      "mejayan4.png",
      "mejayan5.png",
      "mejayan6.png",
      "mejayan7.png",
    ]),
  },
  {
    id: 11, // Diubah agar ID unik
    tag: "Freelance Project",
    judul: "PECELANDAK - Pelayanan Cepat Langsung Digital Akuntabel",
    deskripsi: `This website is linked to the Mejayan village profile website, providing online letter submission services, which are managed directly by village officials. Developed using Laravel 12 & Mysql Database`,
    link_demo: "https://pecelandak.desamejayan.com/",
    images: JSON.stringify([
      "pecel1.png",
      "pecel2.png",
      "pecel3.png",
      "pecel4.png",
      "pecel5.png",
      "pecel6.png",
      "pecel7.png",
      "pecel8.png",
      "pecel9.png",
      "pecel10.png",
    ]),
  },
  {
    id: 12, // Diubah agar ID unik
    tag: "Personal Project",
    judul: "CareBot – Sistem Informasi Kebutuhan Nutrisi yang Dilengkapi Chatbot DialogFlow",
    deskripsi: `Terpenuhinya kebutuhan nutrisi yang optimal sangat penting untuk menjaga kesehatan dan kualitas hidup setiap individu, terutama bagi remaja, lansia, ibu hamil, dan ibu menyusui. Terdapat juga kalkulator perhitungan nutrisi menggunakan rumus Mifflin st Jeor`,
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
    tag: "Internship Project",
    judul: "SIPBIBU – Sistem Pencegahan dan Penanganan Baby Blues Pada Ibu",
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
    tag: "Personal Project",
    judul: "NopolIndo - Cek Plat Nomor Kendaraan dan Kode Wilayah Secara Online",
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
    tag: "Personal Project",
    judul: "Filterisasi Lowongan MagangHub",
    deskripsi: `Sistem filterisasi cerdas menggunakan Python & Naive Bayes untuk menyaring lowongan magang berdasarkan kuota, lokasi, dan peluang lolos secara akurat.`,
    link_demo: "https://filterisasi-data-lowongan-magang.streamlit.app/",
    link_github: "https://github.com/WidiNug23/filterisasi-data-lowongan-maganghub",
    pdf_file: "",
    images: JSON.stringify(["filter1.png", "filter2.png", "filter3.png"]),
  },
  {
    id: 5,
    tag: "Personal Project",
    judul: "Manajemen Gudang Berbasis Web Menggunakan Next JS & Supabase",
    deskripsi: `Sistem ini memudahkan penggunannya dalam management dan mengelola barang atau stock yang ada di dalam gudang. User akan diminta untuk mengelola kategori barang dan mengelola ketersediaan barang. Sistem ini menggunakan Next JS untuk Frontend dan Backendnya. Untuk database menggunakan Supabase. Sistem ini akan terus dikembangkan agar pengelolaan barang di gudang akan semakin kompleks.`,
    link_demo: "https://sistem-gudang-ten.vercel.app/",
    link_github: "https://github.com/WidiNug23/sistem-gudang.git",
    pdf_file: "",
    images: JSON.stringify(["gudang1.png", "gudang2.png", "gudang3.png", "gudang4.png"]),
  },
  {
    id: 6,
    tag: "Personal Project",
    judul: "Hand Gesture",
    deskripsi: `Sistem ini dibuat untuk mengatur kecerahan layar, volume suara, mengambil scrennshot, dan melakukan play/pause video yang ada di laptop atau PC`,
    link_github: "https://github.com/WidiNug23/hand-gesture.git",
    pdf_file: "uploads/Penggunaan hand gesture.pdf",
    images: JSON.stringify(["Screenshot (725).png"]),
  },
  {
    id: 7,
    tag: "Personal Project",
    judul: "Video: Pengenalan CareBot",
    deskripsi: `Projek produksi video pengenalan produk CareBot menggunakan CapCut dan Canva mencakup tahap penyusunan naskah hingga publikasi.`,
    link_demo: "https://www.youtube.com/watch?v=lJcgUrdF3ws",
    link_github: "",
    images: JSON.stringify([]),
  },
  {
    id: 8,
    tag: "Freelance Project",
    judul: "Video: PENGAPLIKASIAN VIRTUALTOUR WONDERFUL KAMPUNG PESILAT BERBASIS VIRTUAL REALITY DI KABUPATEN MADIUN",
    deskripsi: `Produksi konten video untuk mempromosikan wisata di Kabupaten Madiun. Pembuatan video dilakukan dengan mengambil footage, mengedit video dan melakukan dubbing.`,
    link_demo: "https://www.youtube.com/watch?v=7_L8LXGKcTI",
    link_github: "",
    images: JSON.stringify([]),
  },
  {
    id: 9,
    tag: "Freelance Project",
    judul: "Video: Pameran Inovasi Teknologi di Era Revolusi Industri 5.0",
    deskripsi: `melakukan dokumentasi dan pengeditan video dalam acara Pameran Inovasi Teknologi Era Revolusi Industri 5.0.`,
    link_demo: "https://www.youtube.com/watch?v=nHV9A8DgE8Q",
    link_github: "",
    images: JSON.stringify([]),
  },
  {
    id: 10,
    tag: "Internal Project",
    judul: "Upcoming Project",
    deskripsi: `Projek baru sedang dalam tahap pengembangan. Segera hadir!`,
    images: JSON.stringify([]),
    isUpcoming: true,
  },
];

const SpinningClockIcon = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-12">
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12" className="origin-center animate-[spin_3s_linear_infinite]" />
      <polyline points="12 12 16 14" className="origin-center animate-[spin_12s_linear_infinite]" />
    </svg>
    <div className="text-blue-400 font-bold tracking-[0.2em] text-[10px] uppercase animate-pulse">In Development</div>
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
      
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className={`text-5xl md:text-6xl font-black mb-6 tracking-tighter ${isDark ? "neon-glow" : "text-slate-900"}`}>
          PROJECTS
        </h1>
        <p className="text-lg opacity-80 leading-relaxed font-light">
          Berbagai Projek Dalam Bidang <span className="font-semibold text-blue-500">Web Development</span>, 
          <span className="font-semibold text-purple-500"> Videografi</span>, dan 
          <span className="font-semibold text-cyan-500"> Inovasi Digital</span>.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projekData.map((p) => {
          const isExpanded = expanded[p.id];
          const textToShow = isExpanded ? p.deskripsi : p.deskripsi?.substring(0, 150) + (p.deskripsi?.length > 150 ? "..." : "");
          const youtubeID = extractYouTubeID(p.link_demo || "");
          let images = [];
          try { images = JSON.parse(p.images || "[]"); } catch { images = []; }
          const slideIdx = currentSlide[p.id] ?? 0;

          return (
            <div key={p.id} className="projek-card opacity-0 transform translate-y-12 transition-all duration-700 flex">
              <div className={`group w-full flex flex-col rounded-[2rem] overflow-hidden border transition-all duration-500 ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-slate-200 shadow-lg hover:shadow-2xl"}`}>
                
                {/* Media Section */}
                <div className="relative aspect-video overflow-hidden bg-black/20">
                  {p.isUpcoming ? (
                    <SpinningClockIcon />
                  ) : youtubeID ? (
                    <div className="w-full h-full relative cursor-pointer group/vid" onClick={() => setModalVideoID(youtubeID)}>
                      <img src={`https://img.youtube.com/vi/${youtubeID}/mqdefault.jpg`} className="w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-110" alt="thumb" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover/vid:bg-black/20 transition-all">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                          <div className="ml-1 border-y-[8px] border-y-transparent border-l-[12px] border-l-white"></div>
                        </div>
                      </div>
                    </div>
                  ) : images.length > 0 ? (
                    <div className="w-full h-full relative group/img">
                      <div className="flex h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${slideIdx * 100}%)` }}>
                        {images.map((img, i) => (
                          <img key={i} src={`uploads/${img}`} className="w-full h-full object-cover cursor-zoom-in shrink-0" alt="step" onClick={() => openLightbox(p.id, i)} />
                        ))}
                      </div>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 p-1.5 bg-black/30 backdrop-blur-md rounded-full">
                        {images.map((_, i) => (
                          <button key={i} onClick={() => handleDotClick(p.id, i)} className={`h-1.5 rounded-full transition-all ${i === slideIdx ? "w-4 bg-blue-500" : "w-1.5 bg-white/40"}`} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center opacity-30 italic text-xs">No Media</div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Bagian Custom Tag */}
                  <div className="flex items-center gap-2 mb-3">
                     <span className={`w-8 h-0.5 rounded-full ${isDark ? "bg-blue-500 shadow-[0_0_8px_#3b82f6]" : "bg-blue-600"}`}></span>
                     <span className="text-[10px] font-black tracking-widest uppercase opacity-60">
                       {p.tag || "Project"}
                     </span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 tracking-tight leading-tight min-h-[3rem] group-hover:text-blue-400 transition-colors">
                    {p.judul}
                  </h2>
                  
                  <p className="text-sm leading-relaxed mb-2 opacity-80 whitespace-pre-line">
                    {textToShow}
                  </p>

                  {/* Tombol Selengkapnya */}
                  {p.deskripsi?.length > 150 && (
                    <button 
                      onClick={() => setExpanded(e => ({...e, [p.id]: !isExpanded}))} 
                      className="text-xs font-bold text-blue-500 hover:text-blue-400 mb-4 text-left"
                    >
                      {isExpanded ? "Sembunyikan" : "Selengkapnya..."}
                    </button>
                  )}

                  {/* Tombol Navigasi */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/10">
                    {p.link_demo && (
                      <a href={p.link_demo} target="_blank" rel="noreferrer" className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${isDark ? "bg-white text-black hover:bg-blue-400" : "bg-slate-900 text-white hover:bg-blue-600"}`}>
                        {youtubeID ? "Tonton" : "Website"}
                      </a>
                    )}
                    {p.link_github && (
                      <a href={p.link_github} target="_blank" rel="noreferrer" className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${isDark ? "border-white/20 text-white hover:bg-white/10" : "border-slate-300 text-slate-900 hover:bg-slate-50"}`}>
                        Github
                      </a>
                    )}
                    {p.pdf_file && (
                      <button onClick={() => setModalPDF(p.pdf_file)} className="px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                        Dokumen
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Preview Gambar */}
      {lightbox.isOpen && (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={closeLightbox}>
          <button className="absolute top-8 right-8 text-white/50 hover:text-white text-4xl">✕</button>
          <button onClick={(e) => navigateLightbox(e, -1)} className="absolute left-4 p-4 text-white text-2xl">❮</button>
          <button onClick={(e) => navigateLightbox(e, 1)} className="absolute right-4 p-4 text-white text-2xl">❯</button>
          <img 
            src={`uploads/${JSON.parse(projekData.find(x => x.id === lightbox.projekID).images)[lightbox.imgIndex]}`} 
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" 
            onClick={e => e.stopPropagation()} 
            alt="preview"
          />
        </div>
      )}

      {/* Modal Video */}
      {modalVideoID && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setModalVideoID(null)}>
           <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
             <iframe src={`https://www.youtube.com/embed/${modalVideoID}?autoplay=1`} className="w-full h-full" allowFullScreen allow="autoplay"></iframe>
             <button onClick={() => setModalVideoID(null)} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full">✕</button>
           </div>
        </div>
      )}

      {/* Modal PDF */}
      {modalPDF && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setModalPDF(null)}>
           <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
             <iframe src={modalPDF} className="w-full h-full pt-12"></iframe>
             <button onClick={() => setModalPDF(null)} className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full font-bold">✕</button>
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