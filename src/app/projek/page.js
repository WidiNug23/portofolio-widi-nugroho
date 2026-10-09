"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";

const projekData = [
  {
    id: 5,
    tag: "Personal Project",
    judul:
      "UPDATE V.1.2 - Manajemen Gudang Berbasis Web Menggunakan Next JS & Supabase",
    deskripsi: `Sistem ini memudahkan penggunannya dalam management dan mengelola barang atau stock yang ada di dalam gudang. User akan diminta untuk mengelola kategori barang dan mengelola ketersediaan barang yang digunakan untuk produksi. Sistem ini menggunakan Next JS untuk Frontend and Backendnya. Untuk database menggunakan Supabase. Sistem ini akan terus dikembangkan agar pengelolaan barang di gudang akan semakin kompleks.`,
    link_demo:
      "https://sistem-gudang-ten.vercel.app/",
    link_github:
      "https://github.com/WidiNug23/sistem-gudang.git",
    pdf_file: "",
    images: JSON.stringify([
      "gudang1.1.png",
      "gudang1.2.png",
      "gudang1.3.png",
      "gudang1.4.png",
    ]),
  },
  {
    id: 1,
    tag: "Freelance Project",
    judul: "Company Profile Website",
    deskripsi: `Terdapat beberapa role dalam website ini di antaranya yaitu pengunjung, admin, pimpinan, dan superadmin. Website ini dibuat untuk memaksimalkan pengenalan profile suatu company kepada khalayak ramai. Website ini dibangun menggunakan Laravel dan MySQL.`,
    link_demo: "https://danadipa.com/",
    images: JSON.stringify(["Screenshot 2026-04-19 195831.png"]),
  },
  {
    id: 2,
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
    id: 11,
    tag: "Freelance Project",
    judul: "PECELANDAK - Pelayanan Cepat Langsung Digital Akuntabel",
    deskripsi: `This website is linked to the Mejayan village profile website, providing online letter submission services, which are managed directly by village officials. Developed using Laravel 12 & Mysql Database`,
    link_demo:
      "https://pecelandak.desamejayan.com/",
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
    id: 12,
    tag: "Personal Project",
    judul:
      "CareBot – Sistem Informasi Kebutuhan Nutrisi yang Dilengkapi Chatbot DialogFlow",
    deskripsi: `Terpenuhinya kebutuhan nutrisi yang optimal sangat penting untuk menjaga kesehatan dan kualitas hidup setiap individu, terutama bagi remaja, lansia, ibu hamil, dan ibu menyusui. Terdapat juga kalkulator perhitungan nutrisi menggunakan rumus Mifflin st Jeor`,
    link_demo: "https://carebot.tifpsdku.com",
    link_github: "",
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
    id: 22,
    tag: "Internship Project",
    judul: "SIPBIBU – Sistem Pencegahan dan Penanganan Baby Blues Pada Ibu",
    deskripsi: `SIPBIBU merupakan website yang dibuat sebagai upaya untuk menekan angka baby blues pada Ibu.\n\nFitur-fitur utama:\n• Kuesioner Model Suryani & EPDS\n• Forum Diskusi Ibu\n• Konsultasi Online Psikolog\n• Edukasi Video & Audio`,
    link_demo: "https://sipbibu.tifpsdku.com",
    link_github: "",
    pdf_file:
      "uploads/Biru Isometrik Elemen & Mockup Teknologi dalam Hidup Konsumen Teknologi Presentasi.pdf",
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
    link_demo:
      "https://filterisasi-data-lowongan-magang.streamlit.app/",
    link_github:
      "https://github.com/WidiNug23/filterisasi-data-lowongan-maganghub",
    pdf_file: "",
    images: JSON.stringify(["filter1.png", "filter2.png", "filter3.png"]),
  },
  {
    id: 6,
    tag: "Personal Project",
    judul: "Hand Gesture",
    deskripsi: `Sistem ini dibuat untuk mengatur kecerahan layar, volume suara, mengambil screenshot, dan melakukan play/pause video yang ada di laptop atau PC`,
    link_github:
      "https://github.com/WidiNug23/hand-gesture.git",
    pdf_file: "uploads/Penggunaan hand gesture.pdf",
    images: JSON.stringify(["Screenshot (725).png"]),
  },
  {
    id: 7,
    tag: "Personal Project",
    judul: "Video: Pengenalan CareBot",
    deskripsi: `Projek produksi video pengenalan produk CareBot menggunakan CapCut dan Canva mencakup tahap penyusunan naskah hingga publikasi.`,
    link_demo:
      "https://www.youtube.com/watch?v=lJcgUrdF3ws",
    link_github: "",
    images: JSON.stringify([]),
  },
  {
    id: 8,
    tag: "Freelance Project",
    judul:
      "Video: PENGAPLIKASIAN VIRTUALTOUR WONDERFUL KAMPUNG PESILAT BERBASIS VIRTUAL REALITY DI KABUPATEN MADIUN",
    deskripsi: `Produksi konten video untuk mempromosikan wisata di Kabupaten Madiun. Pembuatan video dilakukan dengan mengambil footage, mengedit video dan melakukan dubbing.`,
    link_demo:
      "https://www.youtube.com/watch?v=7_L8LXGKcTI",
    link_github: "",
    images: JSON.stringify([]),
  },
  {
    id: 9,
    tag: "Freelance Project",
    judul: "Video: Pameran Inovasi Teknologi di Era Revolusi Industri 5.0",
    deskripsi: `Melakukan dokumentasi dan pengeditan video dalam acara Pameran Inovasi Teknologi Era Revolusi Industri 5.0.`,
    link_demo:
      "https://www.youtube.com/watch?v=nHV9A8DgE8Q",
    link_github: "",
    images: JSON.stringify([]),
  },
  {
    id: 10,
    tag: "Upcoming Project",
    judul: "Upcoming Project",
    deskripsi: "Project baru yang sedang dalam tahap perencanaan dan pengembangan berikutnya.",
    images: JSON.stringify([]),
    isUpcoming: true,
  },
];

const SpinningClockIcon = () => (
  <div className="flex flex-col items-center justify-center gap-4 h-full min-h-[220px]">
    <svg
      width="45"
      height="45"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline
        points="12 6 12 12"
        className="origin-center animate-[spin_3s_linear_infinite]"
      />
      <polyline
        points="12 12 16 14"
        className="origin-center animate-[spin_12s_linear_infinite]"
      />
    </svg>
    <div className="text-blue-400 font-bold tracking-[0.2em] text-[10px] uppercase animate-pulse">
      In Development
    </div>
  </div>
);

export default function ProjekPage() {
  const { theme } = useTheme();

  const [modalVideoID, setModalVideoID] = useState(null);
  const [modalPDF, setModalPDF] = useState(null);

  const [lightbox, setLightbox] = useState({
    isOpen: false,
    projekID: null,
    imgIndex: 0,
  });

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const isDark = theme === "dark";
  const minSwipeDistance = 50;

  const cleanUrl = (url) => {
    if (!url) return "";
    const markdownMatch = url.match(/\]\((.*?)\)/);
    if (markdownMatch) return markdownMatch[1];
    return url.replace(/^\[\vert{}\]$/g, "");
  };

  const extractYouTubeID = (url) => {
    if (!url) return null;
    const clean = cleanUrl(url);
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/\s]{11})/;
    const match = clean.match(regExp);
    return match ? match[1] : null;
  };

  const openLightbox = (projekID, imgIndex) => {
    setLightbox({ isOpen: true, projekID, imgIndex });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, projekID: null, imgIndex: 0 });
  };

  const navigateLightbox = (e, dir) => {
    if (e) e.stopPropagation();
    const p = projekData.find((x) => x.id === lightbox.projekID);
    if (!p) return;
    let imgs = [];
    try {
      imgs = JSON.parse(p.images || "[]");
    } catch {
      imgs = [];
    }
    if (imgs.length === 0) return;

    setLightbox((prev) => ({
      ...prev,
      imgIndex: (prev.imgIndex + dir + imgs.length) % imgs.length,
    }));
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) navigateLightbox(null, 1);
    if (distance < -minSwipeDistance) navigateLightbox(null, -1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setModalVideoID(null);
        setModalPDF(null);
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main
      className={`min-h-screen pt-28 pb-24 px-4 sm:px-8 lg:px-12 transition-colors duration-500 font-poppins ${
        isDark ? "bg-[#080808] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* HEADER SECTION */}
      <div className="max-w-5xl mx-auto text-center mb-12 md:mb-16">
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight ${
            isDark ? "neon-glow" : "text-slate-900"
          }`}
        >
          Projek
        </h1>
        <div className="h-1.5 w-16 mx-auto rounded-full bg-blue-500 mb-4" />
      </div>

      {/* CARDS CONTAINER DENGAN EFEK STICKY STACKING TERTUTUP TOTAL */}
      <div className="max-w-5xl mx-auto">
        <div className="relative flex flex-col gap-20 pb-28">
          {projekData.map((p, index) => {
            const youtubeID = extractYouTubeID(p.link_demo);
            let images = [];
            try {
              images = JSON.parse(p.images || "[]");
            } catch {
              images = [];
            }

            const demoUrl = cleanUrl(p.link_demo);
            const githubUrl = cleanUrl(p.link_github);

            const topOffset = 90;
            const scaleValue = 1 - index * 0.015;

            return (
              <div
                key={p.id}
                className="w-full sticky transition-all duration-300"
                style={{
                  top: `${topOffset}px`,
                  zIndex: index + 1,
                  transform: `scale(${Math.max(scaleValue, 0.88)})`,
                  transformOrigin: "top center",
                }}
              >
                <article
                  className={`group relative w-full overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border transition-all duration-500 shadow-2xl ${
                    isDark
                      ? "bg-[#121212] border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-xl hover:border-blue-500/30"
                      : "bg-white border-slate-200 shadow-[0_25px_60px_rgba(15,23,42,0.2)] hover:shadow-[0_30px_70px_rgba(15,23,42,0.25)]"
                  }`}
                >
                  {/* LAYOUT: KIRI FOTO, KANAN KONTEN */}
                  <div className="flex flex-col lg:flex-row items-stretch">
                    
                    {/* BAGIAN KIRI: FOTO / MEDIA */}
                    <div
                      className={`relative w-full lg:w-[42%] shrink-0 ${
                        isDark ? "bg-[#090909]" : "bg-slate-100"
                      }`}
                    >
                      <div className="relative h-[210px] sm:h-[250px] lg:h-full min-h-[220px] lg:min-h-[320px] overflow-hidden">
                        {p.isUpcoming ? (
                          <SpinningClockIcon />
                        ) : youtubeID ? (
                          <div
                            className="relative w-full h-full cursor-pointer group/video"
                            onClick={() => setModalVideoID(youtubeID)}
                          >
                            <img
                              src={`https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`}
                              onError={(e) => {
                                e.currentTarget.src = `https://img.youtube.com/vi/${youtubeID}/hqdefault.jpg`;
                              }}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105"
                              alt={p.judul}
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover/video:bg-black/20 transition-all duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover/video:scale-110 transition-transform duration-300">
                                <div className="ml-1 border-y-[8px] border-y-transparent border-l-[12px] border-l-white" />
                              </div>
                            </div>
                            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest border border-white/10">
                              Watch Video
                            </div>
                          </div>
                        ) : images.length > 0 ? (
                          <div className="relative w-full h-full group/image min-h-[220px] lg:min-h-[320px]">
                            <img
                              src={`uploads/${images[0]}`}
                              className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 group-hover/image:scale-105"
                              alt={p.judul}
                              onClick={() => openLightbox(p.id, 0)}
                            />
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                            {images.length > 1 && (
                              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-bold tracking-wider border border-white/10">
                                {images.length} IMAGES
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center min-h-[180px]">
                            <div className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-white/20" : "text-slate-400"}`}>
                              No Media
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* BAGIAN KANAN: KONTEN */}
                    <div className="flex-1 p-5 sm:p-7 flex flex-col justify-between">
                      <div>
                        {/* TAG */}
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <span className={`h-[2px] w-5 rounded-full ${isDark ? "bg-blue-500" : "bg-blue-600"}`} />
                          <span className={`text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase ${isDark ? "text-white/50" : "text-slate-400"}`}>
                            {p.tag || "Project"}
                          </span>
                        </div>

                        {/* JUDUL PROJEK */}
                        <h2
                          className={`text-lg sm:text-xl md:text-2xl font-black leading-tight tracking-tight mb-2.5 transition-colors duration-300 ${
                            isDark ? "group-hover:text-blue-400" : "group-hover:text-blue-600"
                          }`}
                        >
                          {p.judul}
                        </h2>

                        <div className={`w-full h-px mb-3 ${isDark ? "bg-white/[0.08]" : "bg-slate-200"}`} />

                        {/* DESKRIPSI: overflow-y-auto (hanya muncul scrollbar jika teks melebihi max-h-[110px]) */}
                        <div className="max-h-[110px] overflow-y-auto pr-3 custom-scrollbar">
                          <p className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line ${isDark ? "text-white/70" : "text-slate-600"}`}>
                            {p.deskripsi || "Project sedang dalam tahap pengembangan."}
                          </p>
                        </div>
                      </div>

                      {/* TOMBOL / BUTTONS DI BAGIAN BAWAH */}
                      <div
                        className={`pt-4 mt-4 border-t flex flex-wrap items-center gap-2 ${
                          isDark ? "border-white/[0.08]" : "border-slate-200"
                        }`}
                      >
                        {demoUrl && (
                          <a
                            href={demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center justify-center px-3.5 py-2 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                              isDark
                                ? "bg-white text-black hover:bg-blue-400 hover:text-white"
                                : "bg-slate-900 text-white hover:bg-blue-600"
                            }`}
                          >
                            {youtubeID ? "Tonton Video" : "Website"}
                          </a>
                        )}

                        {githubUrl && (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center justify-center px-3.5 py-2 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                              isDark
                                ? "border-white/15 text-white hover:bg-white/10"
                                : "border-slate-300 text-slate-800 hover:bg-slate-100"
                            }`}
                          >
                            Github
                          </a>
                        )}

                        {p.pdf_file && (
                          <button
                            onClick={() => setModalPDF(p.pdf_file)}
                            className="inline-flex items-center justify-center px-3.5 py-2 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                          >
                            Dokumen
                          </button>
                        )}
                      </div>

                    </div>

                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* CUSTOM CSS UNTUK SCROLLBAR MINIMALIS HANYA MUNCUL SAAT ADA OVERFLOW */}
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: ${isDark ? "rgba(59, 130, 246, 0.6) transparent" : "rgba(37, 99, 235, 0.6) transparent"};
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDark ? "rgba(59, 130, 246, 0.6)" : "rgba(37, 99, 235, 0.6)"};
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? "rgba(59, 130, 246, 1)" : "rgba(37, 99, 235, 1)"};
        }
      `}</style>

      {/* MODAL YOUTUBE VIDEO */}
      {modalVideoID && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalVideoID(null)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${modalVideoID}?autoplay=1`}
              title="YouTube video player"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setModalVideoID(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center font-bold hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* MODAL PDF DOCUMENT */}
      {modalPDF && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setModalPDF(null)}
        >
          <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <span className="text-xs font-bold tracking-wider uppercase">Dokumen Preview</span>
              <button
                onClick={() => setModalPDF(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold hover:bg-red-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 w-full bg-slate-100">
              <iframe src={`/${modalPDF}`} title="PDF Viewer" className="w-full h-full border-0" />
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX GALERI GAMBAR */}
      {lightbox.isOpen && (() => {
        const p = projekData.find((x) => x.id === lightbox.projekID);
        if (!p) return null;
        let imgs = [];
        try {
          imgs = JSON.parse(p.images || "[]");
        } catch {
          imgs = [];
        }
        if (imgs.length === 0) return null;

        return (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 select-none"
            onClick={closeLightbox}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative max-w-5xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={`uploads/${imgs[lightbox.imgIndex]}`}
                alt="Lightbox preview"
                className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
              />

              {imgs.length > 1 && (
                <>
                  <button
                    onClick={(e) => navigateLightbox(e, -1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center text-xl font-bold transition-all border border-white/10"
                  >
                    ‹
                  </button>
                  <button
                    onClick={(e) => navigateLightbox(e, 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center text-xl font-bold transition-all border border-white/10"
                  >
                    ›
                  </button>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/70 text-xs font-semibold tracking-widest">
                    {lightbox.imgIndex + 1} / {imgs.length}
                  </div>
                </>
              )}

              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center font-bold transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        );
      })()}
    </main>
  );
}