"use client";

import { useState, useRef, useEffect } from "react";

// ✅ Data frontend-only
const projekData = [
  {
    id: 1,
    judul:
      "CareBot – Sistem Informasi Kebutuhan Nutrisi Remaja, Lansia, Ibu Hamil, dan Ibu Menyusui",
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
    judul: "SIPBIBU – Sistem Pencegahan dan Penanganan Baby Blues Pada Ibu",
    deskripsi: `SIPBIBU merupakan website yang dibuat sebagai upaya untuk menekan angka baby blues pada Ibu.\n\nFitur-fitur SIPBIBU di antaranya yaitu:\n• Fitur Kuesioner menggunakan pertanyaan Model Suryani dan EPDS\n• Fitur Forum Diskusi Ibu\n• Fitur Konsultasi Online dengan Psikolog\n• Rekomendasi Video dan Audio Edukasi\n• Rekomendasi Artikel atau Berita seputar kehamilan, kesehatan, dan lainnya.`,
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
    judul: "Sistem Filterisasi Lowongan MagangHub",
    deskripsi: `Pada https://maganghub.kemnaker.go.id/ filterisasi yang dilakukan hanya mampu sebatas pencarian berdasarkan posisi/jabatan dan provinsi. Maka dari itu, Sistem Filterisasi Lowongan MagangHub ini dibuat dengan menyediakan fitur filterisasi yang lebih banyak di antaranya yaitu:

Filter berdasarkan nama perusahaan
Filter Berdasarkan lokasi perusahaan
Filter urutan jumlah kuota dan jumlah pendaftar
Peluang Lolos
Filter tanggal lowongan terdaftar
Filter berdasarkan perusahaan Negeri atau Swasta
Filter berdasarkan Program Studi dan Jenjang
Kombinasi Keywords di pencarian.

sistem ini dibuat menggunakan python, streamlit, dan naive bayes. Saya melihat permasalahan terlebih dahulu lalu membuat logic dalam sistem ini dan merancang fitur-fitur yang dapat dikembangkan dan diimplementasikan ke dalam sistem. Saya dibantu oleh ChatGPT dalam penulisan source code untuk sistem yang dibuat.`,
    link_demo: "https://filterisasi-data-lowongan-magang.streamlit.app/",
    link_github: "https://github.com/WidiNug23/filterisasi-data-lowongan-maganghub",
    pdf_file: "",
    images: JSON.stringify([
"Screenshot 2025-10-12 104407.png",
"Screenshot 2025-10-12 104509.png",
"Screenshot 2025-10-12 104949.png",
"Screenshot 2025-10-12 105053.png",
    ]),
  },
  {
  id: 4,
  judul: "[Pembuatan Video] Pengenalan CareBot",
  deskripsi: `Ini merupakan projek video untuk pengenalan website CareBot. Dalam pembuatan video tersebut, dilakukan perancangan dan penyusunan konten, implementasi, hingga publikasi. CapCut dan Canva merupakan software yang digunakan dalam pengeditan video tersebut.`,
  link_demo: "https://www.youtube.com/watch?si=hDY9MOOPSze4uJzb&v=lJcgUrdF3ws&feature=youtu.be",
  link_github: "",
  pdf_file: "",
  images: JSON.stringify([

  ]),
},

{
  id: 5,
  judul: "[Pembuatan Video] GoMadiun : Sistem Manajemen Data Wisata di Kabupaten Madiun",
  deskripsi: `Ini merupakan projek video untuk pengenalan website GoMadiun. Dalam pembuatan video tersebut, dilakukan perancangan dan penyusunan konten, implementasi, hingga publikasi. CapCut dan Canva merupakan software yang digunakan dalam pengeditan video tersebut.`,
  link_demo: "https://www.youtube.com/watch?si=m96KiOELpEuc_GZL&v=7_L8LXGKcTI&feature=youtu.be",
  link_github: "",
  pdf_file: "",
  images: JSON.stringify([

  ]),
},

{
  id: 6,
  judul: "[Pembuatan Video] PENGAPLIKASIAN VIRTUALTOUR WONDERFUL KAMPUNG PESILAT BERBASIS VIRTUAL REALITY DI KABUPATEN MADIUN",
  deskripsi: `Dalam pembuatan konten video ini, saya bertugas untuk melakukan perekaman video, pengeditan video, dan dubbing video.`,
  link_demo: "https://www.youtube.com/watch?si=3CsBo7yA2jUohaCs&v=XfP6P09axso&feature=youtu.be",
  link_github: "",
  pdf_file: "",
  images: JSON.stringify([

  ]),
},

{
  id: 7,
  judul: "[Pembuatan Video] Pameran Inovasi Teknologi di Era Revolusi Industri 5.0",
  deskripsi: `Pembuatan video tersebut dilakukan dengan merekam aktivitas yang sedang berlangsung menggunakan kamera. Setelah itu, hasil rekaman dilakukan pengeditan hingga publikasi.`,
  link_demo: "https://www.youtube.com/watch?si=ldaddUyULuR-J4Ar&v=nHV9A8DgE8Q&feature=youtu.be",
  link_github: "",
  pdf_file: "",
  images: JSON.stringify([

  ]),
},

{
  id: 8,
  judul: "[COMING SOON]",
  deskripsi: ``,
  link_demo: "",
  link_github: "",
  pdf_file: "",
  images: JSON.stringify([

  ]),
},

];

export default function ProjekPage() {
  const [projek, setProjek] = useState(projekData);
  const [expanded, setExpanded] = useState({});
  const [modalVideoID, setModalVideoID] = useState(null);
  const [modalPDF, setModalPDF] = useState(null);
  const [currentSlide, setCurrentSlide] = useState({});
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    projekID: null,
    imgIndex: 0,
  });

  const carouselRefs = useRef({});

  useEffect(() => {
    document.body.style.overflow =
      modalVideoID || lightbox.isOpen || modalPDF ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [modalVideoID, lightbox.isOpen, modalPDF]);

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const extractYouTubeID = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const newSlide = { ...prev };
        projek.forEach((p) => {
          let imagesArray = [];
          try {
            imagesArray = p.images ? JSON.parse(p.images) : [];
          } catch {
            imagesArray = [];
          }
          if (imagesArray.length > 0) {
            newSlide[p.id] = (prev[p.id] ?? 0) + 1;
            if (newSlide[p.id] >= imagesArray.length) newSlide[p.id] = 0;
          }
        });
        return newSlide;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [projek]);

  const openLightbox = (projekID, imgIndex) => {
    setLightbox({ isOpen: true, projekID, imgIndex });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, projekID: null, imgIndex: 0 });
  };

  const navigateLightbox = (direction) => {
    const currentProj = projek.find((p) => p.id === lightbox.projekID);
    if (!currentProj) return;
    let imagesArray = [];
    try {
      imagesArray = currentProj.images ? JSON.parse(currentProj.images) : [];
    } catch {
      imagesArray = [];
    }
    let newIndex = lightbox.imgIndex + direction;
    if (newIndex < 0) newIndex = imagesArray.length - 1;
    if (newIndex >= imagesArray.length) newIndex = 0;
    setLightbox((prev) => ({ ...prev, imgIndex: newIndex }));
  };

  return (
    <main className="p-8 bg-gray-950 min-h-screen text-gray-100 font-poppins">
      <div className="text-center mb-8">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg"
          style={{
            textShadow: "0 0 10px #0066ff, 0 0 20px #00ffff",
          }}
        >
          Projek
        </h1>
        <p className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed">
          Saat ini, projek yang saya kerjakan mencakup{" "}
          <span className="text-blue-400 font-semibold">website development</span>,{" "}
          <span className="text-blue-400 font-semibold">videografi</span>, dan{" "}
          <span className="text-blue-400 font-semibold">fotografi</span>.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {projek.map((p) => {
          const isExpanded = expanded[p.id];
          const textToShow = isExpanded
            ? p.deskripsi
            : p.deskripsi?.length > 250
            ? p.deskripsi.substring(0, 250) + "..."
            : p.deskripsi;

          const youtubeID = p.link_demo ? extractYouTubeID(p.link_demo) : null;

          let imagesArray = [];
          try {
            imagesArray = p.images ? JSON.parse(p.images) : [];
          } catch {
            imagesArray = [];
          }

          const slideIndex = currentSlide[p.id] ?? 0;

          return (
            <div key={p.id} className="relative group">
              <div className="neon-border rounded-2xl p-[2px]">
                <div className="relative bg-gray-900 rounded-2xl p-6 flex flex-col md:flex-row md:items-start gap-6 transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-2xl font-bold text-white mb-3 break-words"
                      style={{
                        textShadow:
                          "0 0 2px #004dc0ff, 0 0 20px #06b4b4ff",
                      }}
                    >
                      {p.judul}
                    </h2>
                    <p className="text-gray-300 mb-3 break-words leading-relaxed whitespace-pre-line">
                      {textToShow}
                    </p>
                    {p.deskripsi?.length > 250 && (
                      <button
                        onClick={() => toggleExpand(p.id)}
                        className="text-blue-400 hover:underline mb-4"
                      >
                        {isExpanded ? "Sembunyikan" : "Selengkapnya"}
                      </button>
                    )}

                    {p.link_demo && (
                      <a
                        href={p.link_demo}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-blue-400 font-medium hover:underline mb-2"
                      >
                        🔗 Lihat Situs
                      </a>
                    )}

                    {p.link_github && (
                      <a
                        href={p.link_github}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-blue-400 font-medium hover:underline mb-4"
                      >
                        💻 Repositori GitHub
                      </a>
                    )}

                    {p.pdf_file && (
                      <button
                        onClick={() => setModalPDF(p.pdf_file)}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
                      >
                        📄 Lihat PDF
                      </button>
                    )}
                  </div>

                  <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col gap-4">
                    {youtubeID && (
                      <div
                        className="relative w-full h-56 cursor-pointer rounded-xl overflow-hidden"
                        onClick={() => setModalVideoID(youtubeID)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${youtubeID}/hqdefault.jpg`}
                          alt={`Thumbnail ${p.judul}`}
                          className="object-cover w-full h-full rounded-xl transition-transform duration-300 hover:scale-105"
                        />
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                          alt="YouTube Logo"
                          className="absolute top-1/2 left-1/2 w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        />
                      </div>
                    )}

{imagesArray.length > 0 && (
  <div className="mt-4">
    {/* Carousel wrapper */}
    <div
      className="relative overflow-hidden rounded-lg"
      onMouseDown={(e) => {
        const el = carouselRefs.current[p.id];
        el.isDragging = true;
        el.startX = e.pageX - el.offsetLeft;
        el.scrollLeftStart = el.scrollLeft;
      }}
      onMouseMove={(e) => {
        const el = carouselRefs.current[p.id];
        if (!el.isDragging) return;
        const x = e.pageX - el.offsetLeft;
        const walk = x - el.startX;
        el.scrollLeft = el.scrollLeftStart - walk;
      }}
      onMouseUp={(e) => {
        const el = carouselRefs.current[p.id];
        el.isDragging = false;
      }}
      onMouseLeave={(e) => {
        const el = carouselRefs.current[p.id];
        el.isDragging = false;
      }}
      onTouchStart={(e) => {
        const el = carouselRefs.current[p.id];
        el.isDragging = true;
        el.startX = e.touches[0].pageX - el.offsetLeft;
        el.scrollLeftStart = el.scrollLeft;
      }}
      onTouchMove={(e) => {
        const el = carouselRefs.current[p.id];
        if (!el.isDragging) return;
        const x = e.touches[0].pageX - el.offsetLeft;
        const walk = x - el.startX;
        el.scrollLeft = el.scrollLeftStart - walk;
      }}
      onTouchEnd={(e) => {
        const el = carouselRefs.current[p.id];
        el.isDragging = false;
      }}
    >
      <div
        className="flex transition-transform duration-700"
        style={{
          transform: `translateX(-${slideIndex * 100}%)`,
        }}
        ref={(el) => (carouselRefs.current[p.id] = el)}
      >
        {imagesArray.map((img, idx) => (
          <img
            key={idx}
            src={`uploads/${img}`}
            alt={`Gambar ${idx + 1}`}
            className="w-full md:min-w-[400px] lg:min-w-[450px] h-64 object-cover flex-shrink-0 cursor-pointer rounded-lg"
            onClick={() => openLightbox(p.id, idx)}
          />
        ))}
      </div>
    </div>

    {/* Pagination dots */}
    <div className="flex justify-center mt-3 gap-2">
      {imagesArray.map((_, idx) => (
        <span
          key={idx}
          className={`w-3 h-3 rounded-full cursor-pointer ${
            idx === slideIndex ? "bg-blue-400" : "bg-gray-600"
          }`}
          onClick={() =>
            setCurrentSlide((prev) => ({
              ...prev,
              [p.id]: idx,
            }))
          }
        ></span>
      ))}
    </div>
  </div>
)}


                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Video */}
      {modalVideoID && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
          onClick={() => setModalVideoID(null)}
        >
          <div
            className="relative w-[90%] md:w-[800px] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${modalVideoID}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
            <button
              onClick={() => setModalVideoID(null)}
              className="absolute top-2 right-2 text-white bg-red-600 rounded-full w-8 h-8 flex justify-center items-center font-bold hover:bg-red-700 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Modal PDF Preview */}
      {modalPDF && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 p-4"
          onClick={() => setModalPDF(null)}
        >
          <div
            className="relative w-full h-full max-w-[90vw] max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={modalPDF}
              className="w-full h-full"
              title="PDF Preview"
            ></iframe>
            <button
              onClick={() => setModalPDF(null)}
              className="absolute top-2 right-2 text-white bg-red-600 rounded-full w-8 h-8 flex justify-center items-center font-bold hover:bg-red-700 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`uploads/${
                JSON.parse(
                  projek.find((p) => p.id === lightbox.projekID)?.images || "[]"
                )[lightbox.imgIndex]
              }`}
              alt="Popup Gambar"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            {JSON.parse(
              projek.find((p) => p.id === lightbox.projekID)?.images || "[]"
            ).length > 1 && (
              <>
                <button
                  onClick={() => navigateLightbox(-1)}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-3xl font-bold bg-black/50 rounded-full w-10 h-10 flex justify-center items-center hover:bg-black/70 transition"
                >
                  ‹
                </button>
                <button
                  onClick={() => navigateLightbox(1)}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-3xl font-bold bg-black/50 rounded-full w-10 h-10 flex justify-center items-center hover:bg-black/70 transition"
                >
                  ›
                </button>
              </>
            )}
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 text-white bg-red-600 rounded-full w-8 h-8 flex justify-center items-center font-bold hover:bg-red-700 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
            {/* Efek Neon */}
      <style jsx>{`
        .neon-border {
          position: relative;
          overflow: visible;
        }

        .neon-border::before,
        .neon-border::after {
          content: "";
          position: absolute;
          inset: -5px;
          border-radius: inherit;
          background: linear-gradient(
            120deg,
            #00ffff,
            #0066ff,
            #21e4a6ff
          );
          background-size: 400% 400%;
          animation: spinNeon 22s linear infinite;
          z-index: 0;
          filter: blur(15px);
          opacity: 0.15;
        }

        .neon-border::after {
          inset: -10px;
          filter: blur(15px);
          opacity: 0.5;
        }

        .neon-border > * {
          position: relative;
          z-index: 1;
        }

        @keyframes spinNeon {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </main>
  );
}
