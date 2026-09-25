"use client";
import { useEffect, useState, useRef } from "react";
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

function LombaItem({ lomba, isDark, setPopupImage }) {
  const itemRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = lomba.files?.filter((f) => f.fileType === "image") || [];
  const pdfs = lomba.files?.filter((f) => f.fileType === "pdf") || [];
  const normalizeFileUrl = (filePath) => filePath || null;

  // Auto-slide for images
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Hitung progres scroll spesifik per item (0.0 sampai 1.0)
  useEffect(() => {
    const handleScroll = () => {
      if (!itemRef.current) return;
      const rect = itemRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Titik mulai animasi saat elemen masuk viewport bawah, dan selesai di tengah layar
      const start = windowHeight;
      const end = windowHeight * 0.2;
      
      const current = rect.top;
      let progress = (start - current) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textToShow = expanded ? lomba.deskripsi : lomba.deskripsi?.length > 180 ? lomba.deskripsi.substring(0, 180) + "..." : lomba.deskripsi;

  // Interpolasi posisi horizontal foto dari tengah (0px) ke kanan (0px di flex layout)
  // Saat progress 0 (di bawah layar), foto digeser ke tengah menggunakan persentase atau translate
  const translateX = (1 - scrollProgress) * 180; // Bergeser dari tengah ke kanan saat scroll bertambah
  const textOpacity = scrollProgress;
  const textTranslateX = (1 - scrollProgress) * -40;

  return (
    <div ref={itemRef} className="relative py-12 lg:py-20 flex flex-col lg:flex-row gap-12 items-center justify-between min-h-[70vh]">
      
      {/* LEFT SIDE: DETAILS (Muncul bertahap seiring scroll) */}
      <div 
        className="flex-1 flex flex-col justify-center transition-all duration-700 ease-out w-full"
        style={{
          opacity: textOpacity,
          transform: `translateX(${textTranslateX}px)`,
          visibility: scrollProgress > 0.05 ? 'visible' : 'hidden'
        }}
      >
        <div className="flex flex-wrap gap-2 mb-6">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-purple-100 text-purple-700'}`}>
            {lomba.tingkat || (lomba.isUpcoming ? "Vision" : "General")}
          </span>
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
            {lomba.tahun || "Future"}
          </span>
        </div>

        <h2 className={`text-2xl md:text-3xl font-bold mb-4 leading-tight tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
          {lomba.nama}
        </h2>

        <div className={`flex items-center gap-3 mb-6 p-3 rounded-xl w-fit ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
          <div className={`h-2 w-2 rounded-full animate-pulse ${lomba.isUpcoming ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
          <p className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {lomba.hasil || "Preparing..."}
          </p>
        </div>

        {lomba.deskripsi && (
          <div className="mb-6">
            <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {textToShow}
            </p>
            {lomba.deskripsi.length > 180 && (
              <button onClick={() => setExpanded(!expanded)} className="mt-3 text-xs font-bold text-purple-500 uppercase tracking-tighter hover:underline">
                {expanded ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
        )}

        {!lomba.isUpcoming && (
          <div className={`pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-200'} mt-auto`}>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} font-medium`}>Penyelenggara:</p>
            <p className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{lomba.penyelenggara || "-"}</p>
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

      {/* RIGHT SIDE: IMAGE SLIDER (Bergeser mulus dari tengah ke posisi kanan berdasarkan scroll) */}
      <div 
        className="w-full lg:w-[450px] flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          transform: `translateX(${window.innerWidth >= 1024 ? translateX : 0}px)`
        }}
      >
        {lomba.isUpcoming ? (
          <div className="w-full">
            <SpinningClockIcon />
          </div>
        ) : images.length > 0 ? (
          <div className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center min-h-[280px] max-h-[380px]">
            <div className="flex w-full h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {images.map((img, idx) => (
                <div key={idx} className="w-full h-full flex-shrink-0 flex items-center justify-center p-1">
                  <img src={normalizeFileUrl(img.filePath)} alt={lomba.nama} 
                       className="max-w-full max-h-[360px] w-auto h-auto object-contain cursor-zoom-in hover:scale-105 transition-transform duration-700 rounded-xl shadow-2xl"
                       onClick={() => setPopupImage({ url: normalizeFileUrl(img.filePath), index: idx, allImages: images })}/>
                </div>
              ))}
            </div>

            {images.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-10">
                {images.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentIndex(idx)}
                          className={`h-1.5 transition-all duration-300 rounded-full ${idx === currentIndex ? "w-8 bg-purple-500" : "w-2 bg-white/50"}`}/>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full aspect-[4/3] bg-gray-800/10 rounded-2xl border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-500 italic text-sm">
            No Documentation Available
          </div>
        )}
      </div>

    </div>
  );
}

export default function LombaPage() {
  const { theme } = useTheme();
  const [lomba, setLomba] = useState([]);
  const [popupImage, setPopupImage] = useState(null);

  const lombaData = [
    {
      id: 1,
      nama: "Olimpiade Vokasi Indonesia X Tahun 2025",
      deskripsi: "Berkompetisi dalam ajang OLIVIA 2025 tingkat nasional dalam bidang web technologies yang diikuti mahasiswa vokasi seluruh Indonesia.",
      tingkat: "Nasional",
      tahun: "2025",
      hasil: "Finalist",
      penyelenggara: "Forum Pendidikan Tinggi Vokasi Indonesia",
      files: [{ id: 1, filePath: "/uploads/DSC079288.JPG", fileType: "image" }],
    },
    {
      id: 2,
      nama: "Web Design International Competition Gayatama UNESA 2024",
      deskripsi: "Kompetisi desain web tingkat internasional yang memacu kreativitas dalam UI/UX dan fungsionalitas frontend.",
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
      deskripsi: "Berhasil meraih medali dalam kategori Web Technologies bersama tim yang diikuti seluruh mahasiswa vokasi Indonesia.",
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
      deskripsi: "Ajang kreativitas fotografi nasional yang diselenggarakan oleh Mitsubishi Fuso.",
      tingkat: "Nasional",
      tahun: "2023",
      hasil: "Nominasi Juara Favorit",
      penyelenggara: "Mitsubishi Fuso",
      files: [{ id: 1, filePath: "/uploads/width_800 (5).png", fileType: "image" }],
    },
    {
      id: 5,
      nama: "[COMING SOON]",
      deskripsi: "Persiapan untuk kompetisi berikutnya sedang dilakukan.",
      isUpcoming: true,
    },
  ];

  useEffect(() => setLomba(lombaData), []);
  useEffect(() => { document.body.style.overflow = popupImage ? "hidden" : "auto"; }, [popupImage]);

  const isDark = theme === "dark";

  return (
    <main className={`min-h-screen font-poppins transition-colors duration-500 pt-32 pb-20 px-4 sm:px-8 md:px-16 lg:px-24 overflow-x-hidden ${isDark ? "bg-[#080808] text-gray-100" : "bg-slate-50 text-gray-900"}`}>
      
      {/* HEADER SECTION */}
      <header className="max-w-4xl mx-auto mb-20 text-center">
        <h1 className={`text-4xl md:text-6xl font-extrabold mb-4 tracking-tight ${isDark ? "neon-glow text-white" : "text-gray-900"}`}>
          Lomba & Kompetisi
        </h1>
        <div className={`h-1.5 w-24 mx-auto rounded-full ${isDark ? 'bg-purple-600 shadow-[0_0_15px_#a855f7]' : 'bg-purple-500'}`}></div>
      </header>

      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {lomba.map((l) => (
          <LombaItem key={l.id} lomba={l} isDark={isDark} setPopupImage={setPopupImage} />
        ))}
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
                          setPopupImage(p => ({ ...p, url: p.allImages[prev].filePath, index: prev }));
                        }}>❮</button>
                <button className="bg-white/10 hover:bg-purple-600/40 p-4 rounded-full backdrop-blur-md transition-all text-white"
                        onClick={() => {
                          const next = (popupImage.index + 1) % popupImage.allImages.length;
                          setPopupImage(p => ({ ...p, url: p.allImages[next].filePath, index: next }));
                        }}>❯</button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .neon-glow { text-shadow: 0 0 15px rgba(168, 85, 247, 0.4); }

        @keyframes animate-fade-in {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fade-in { animation: animate-fade-in 0.3s ease-out forwards; }
      `}</style>
    </main>
  );
}