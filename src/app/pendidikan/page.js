"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeContext";

const educationData = [
  {
    id: 1,
    nama: "Universitas Sebelas Maret",
    jurusan: "D3 Teknik Informatika",
    tahun_masuk: "2022",
    tahun_lulus: "2025",
    nilai: "3.81",
    logo: "/uploads/Copy of Logo_UNS.png",
    deskripsi:
      "Mendalami pengembangan perangkat lunak, basis data, dan infrastruktur IT. Fokus pada pengembangan web modern dan manajemen proyek TI.",
    file_path: "",
  },
  {
    id: 2,
    nama: "SMA Negeri 1 Mejayan",
    jurusan: "IPA",
    tahun_masuk: "2019",
    tahun_lulus: "2022",
    nilai: "88.13",
    logo: "/uploads/DgN0gGmUYAA6hu5.png",
    deskripsi:
      "Menyelesaikan pendidikan menengah atas dengan fokus pada ilmu pengetahuan alam dan aktif dalam kegiatan organisasi sekolah.",
    file_path: "",
  },
];

const SpinningClock = ({ theme }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-full border ${
          theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 text-pink-500"
        >
          <circle cx="12" cy="12" r="9" />
          <polyline
            points="12 7 12 12 15 14"
            className="origin-center animate-[spin_4s_linear_infinite]"
          />
        </svg>
      </div>

      <div className="text-center">
        <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          Future Education
        </p>
        <p className={`text-xs mt-2 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
          Stay tuned for the next milestone
        </p>
      </div>
    </div>
  );
};

function EducationStory({ education, theme }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const normalizeFileUrl = (filePath) => {
    if (!filePath) return null;
    return filePath.startsWith("/") ? filePath : `/${filePath}`;
  };

  const getFileType = (filePath) => {
    if (!filePath) return null;
    const ext = filePath.split(".").pop().toLowerCase();
    if (ext === "pdf") return "pdf";
    if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "image";
    return null;
  };

  const fileUrl = normalizeFileUrl(education.file_path);
  const fileType = getFileType(education.file_path);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollDistance = rect.height - viewportHeight;

      if (totalScrollDistance <= 0) {
        setProgress(1);
        return;
      }

      const currentProgress = -rect.top / totalScrollDistance;
      const clamped = Math.max(0, Math.min(1, currentProgress));
      setProgress(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // LOGO: Diperbesar dan posisi awal digeser lebih ke kanan (320px)
  const logoMoveProgress = isMobile ? 1 : Math.max(0, Math.min(1, (progress - 0.05) / 0.35));
  const logoTranslateX = isMobile ? 0 : (1 - logoMoveProgress) * 320; 
  const logoScale = isMobile ? 1 : 0.9 + logoMoveProgress * 0.1;
  const logoOpacity = isMobile ? 1 : 1 - Math.max(0, logoMoveProgress - 0.9) * 0.5;

  const yearProgress = isMobile ? 1 : Math.max(0, Math.min(1, (progress - 0.25) / 0.15));
  const nameProgress = isMobile ? 1 : Math.max(0, Math.min(1, (progress - 0.38) / 0.15));
  const majorProgress = isMobile ? 1 : Math.max(0, Math.min(1, (progress - 0.52) / 0.15));
  const descriptionProgress = isMobile ? 1 : Math.max(0, Math.min(1, (progress - 0.65) / 0.2));

  const revealStyle = (elemProgress, translate = 30) => ({
    opacity: isMobile ? 1 : elemProgress,
    transform: isMobile ? "none" : `translateY(${(1 - elemProgress) * translate}px)`,
    willChange: "opacity, transform",
  });

  return (
    <section ref={sectionRef} className={`relative ${isMobile ? "py-16 px-4" : "h-[320vh] my-12"}`}>
      <div className={`${isMobile ? "relative" : "sticky top-24 h-[80vh] flex items-center"}`}>
        <div className="w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12">
          
          {/* Grid diperketat gap-nya agar jarak logo & teks tidak terlalu jauh */}
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 md:gap-8 items-center">
            
            {/* KOLOM LOGO (Ukuran Diperbesar) */}
            <div className="flex justify-center md:justify-start">
              <div
                className="flex items-center justify-center transition-all duration-75"
                style={{
                  transform: isMobile ? "none" : `translateX(${logoTranslateX}px) scale(${logoScale})`,
                  opacity: logoOpacity,
                  willChange: "transform, opacity",
                }}
              >
                <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 flex items-center justify-center p-2">
                  {education.logo ? (
                    <img src={education.logo} alt={`Logo ${education.nama}`} className="w-full h-full object-contain drop-shadow-2xl" />
                  ) : (
                    <span className="text-xs">Logo</span>
                  )}
                </div>
              </div>
            </div>

            {/* KOLOM KONTEN TEKS */}
            <div className="flex flex-col justify-center">
              
              {/* YEAR & IPK */}
              <div className="min-h-[38px] sm:min-h-[42px] flex items-center mb-3 sm:mb-4" style={revealStyle(yearProgress)}>
                <div className="flex flex-wrap gap-2.5">
                  <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                    theme === "dark" ? "bg-gray-900 text-gray-300 border border-gray-800" : "bg-gray-50 text-gray-600 border border-gray-200"
                  }`}>
                    {education.tahun_masuk || "TBA"} <span className="mx-2 text-pink-500">—</span> {education.tahun_lulus || "TBA"}
                  </span>

                  {education.nilai && (
                    <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                      theme === "dark" ? "bg-gray-900 text-gray-300 border border-gray-800" : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}>
                      IPK {education.nilai}
                    </span>
                  )}
                </div>
              </div>

              {/* NAME */}
              <div style={revealStyle(nameProgress)}>
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug sm:leading-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {education.nama}
                </h2>
              </div>

              {/* MAJOR */}
              <div className="mt-2 sm:mt-3" style={revealStyle(majorProgress)}>
                <p className={`text-sm sm:text-base md:text-lg font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  {education.jurusan || "Jurusan belum ditentukan"}
                </p>
              </div>

              <div className={`w-full h-px my-4 sm:my-5 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`} style={{ opacity: isMobile ? 1 : descriptionProgress }} />

              {/* DESCRIPTION */}
              <div className="max-w-xl" style={revealStyle(descriptionProgress)}>
                <p className={`text-xs sm:text-sm md:text-base leading-relaxed sm:leading-7 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {education.deskripsi}
                </p>

                {fileUrl && fileType && (
                  <div className="mt-4 sm:mt-5">
                    {fileType === "pdf" ? (
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold transition-colors shadow-lg"
                      >
                        Lihat Dokumen <span>↗</span>
                      </a>
                    ) : (
                      <img src={fileUrl} alt={`Dokumen ${education.nama}`} className="max-w-sm rounded-xl border cursor-pointer" />
                    )}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default function PendidikanPage() {
  const { theme } = useTheme();

  return (
    <main className={`min-h-screen font-poppins transition-colors duration-500 pt-24 sm:pt-28 pb-20 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
      
      {/* HEADER UTAMA */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 pb-6 sm:pb-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Pendidikan
          </h1>
          <div className="w-12 h-[3px] rounded-full bg-pink-500 mx-auto mt-4 sm:mt-6" />
        </div>
      </section>

      {/* EDUCATION STORY */}
      <section>
        {educationData.map((education) => (
          <EducationStory key={education.id} education={education} theme={theme} />
        ))}
      </section>

      {/* COMING SOON */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-20">
        <div className={`max-w-5xl mx-auto min-h-[250px] rounded-[32px] border flex items-center justify-center p-6 ${
          theme === "dark" ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"
        }`}>
          <SpinningClock theme={theme} />
        </div>
      </section>
    </main>
  );
}