"use client";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

export default function LombaPage() {
  const { theme } = useTheme(); // 'dark' atau 'light'
  const [lomba, setLomba] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [popupImage, setPopupImage] = useState(null);
  const [imageIndex, setImageIndex] = useState({});

  // ✅ Data frontend-only
  const lombaData = [
    {
      id: 1,
      nama: "Web Design International Competition Gayatama UNESA 2024",
      deskripsi: "",
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
      id: 2,
      nama: "Olimpiade Vokasi Indonesia IX Tahun 2024",
      deskripsi: "",
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
      id: 3,
      nama: "Canter 60th Anniversary Photo Contest",
      deskripsi: "",
      tingkat: "Nasional",
      tahun: "2023",
      hasil: "Nominasi Juara Favorit",
      penyelenggara: "Mitsubishi Fuso",
      files: [
        { id: 1, filePath: "/uploads/width_800 (5).png", fileType: "image" },
      ],
    },
    {
      id: 4,
      nama: "[COMING SOON]",
      deskripsi: "",
      tingkat: "",
      tahun: "",
      hasil: "",
      penyelenggara: "",
      files: [{ id: 1, filePath: "", fileType: "image" }],
    },
  ];

  useEffect(() => setLomba(lombaData), []);
  useEffect(() => { document.body.style.overflow = popupImage ? "hidden" : "auto"; }, [popupImage]);
      useEffect(() => {
    document.body.style.backgroundColor = theme === "dark" ? "#000000ff" : "#ffffff"; // bg-gray-950 / putih
  }, [theme]);

  const toggleExpand = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  const normalizeFileUrl = (filePath) => filePath || null;

  // Auto-slide per lomba
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
    }, 2500);
    return () => clearInterval(interval);
  }, [lomba]);

  // Slide-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".projek-card").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [lomba]);

  const isDark = theme === "dark";

  return (
    <main className={`${isDark ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"} p-8 md:p-12 min-h-screen font-poppins`}>
<h1
  className={`text-4xl md:text-5xl font-bold mb-12 text-center mt-16 ${
    theme === "dark" ? "neon-glow" : ""
  }`}
>
  Lomba & Kompetensi
</h1>

      {lomba.length === 0 ? (
        <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-center`}>Memuat data lomba...</p>
      ) : (
        <div className="flex flex-col gap-10">
          {lomba.map((l) => {
            const isExpanded = expanded[l.id];
            const textToShow = isExpanded
              ? l.deskripsi
              : l.deskripsi?.length > 250
              ? l.deskripsi.substring(0, 250) + "..."
              : l.deskripsi;

            const images = l.files?.filter((f) => f.fileType === "image") || [];
            const pdfs = l.files?.filter((f) => f.fileType === "pdf") || [];
            const currentIndex = imageIndex[l.id] || 0;

            return (
              <div key={l.id} className="projek-card relative group opacity-0 transform translate-y-8 transition-all duration-700">
                <div className="neon-border rounded-2xl p-[2px]">
                  <div className={`${isDark ? "bg-gray-900" : "bg-gray-100"} relative rounded-2xl p-6 flex flex-col md:flex-row gap-6 transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]`}>
                    {/* KIRI */}
                    <div className="flex-1 min-w-0">
                      <h2
                        className={`text-2xl font-bold mb-3 break-words ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                        style={
                          theme === "dark"
                            ? { textShadow: "0 0 10px #a855f7, 0 0 20px #8b5cf6" }
                            : {}
                        }
                      >
                        {l.nama}
                      </h2>                      <p className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-3 break-words leading-relaxed whitespace-pre-line`}>{textToShow}</p>
                      {l.deskripsi?.length > 250 && (
                        <button onClick={() => toggleExpand(l.id)} className="text-[#a855f7] hover:underline mb-4 font-semibold">
                          {isExpanded ? "Sembunyikan" : "Selengkapnya"}
                        </button>
                      )}
                      <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}><strong>Tingkat:</strong> {l.tingkat || "-"}</p>
                      <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}><strong>Tahun:</strong> {l.tahun || "-"}</p>
                      <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}><strong>Hasil:</strong> {l.hasil || "-"}</p>
                      <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}><strong>Penyelenggara:</strong> {l.penyelenggara || "-"}</p>
                      {pdfs.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {pdfs.map((f) => (
                            <a key={f.id} href={normalizeFileUrl(f.filePath)} target="_blank" rel="noreferrer"
                               className="inline-block bg-[#7c3aed] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#a855f7] transition">
                              📄 Lihat PDF
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* KANAN */}
                    <div className="w-full md:w-[450px] flex flex-col gap-4">
                      {images.length > 0 && (
                        <>
                          <div className={`w-full overflow-hidden border rounded-xl ${isDark ? "border-gray-700 bg-gray-950" : "border-gray-300 bg-gray-200"} relative h-64`}>
                            <div className="flex transition-transform duration-500 ease-in-out cursor-grab" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                              {images.map((img, idx) => (
                                <img key={idx} src={normalizeFileUrl(img.filePath)} alt={l.nama} className="w-full flex-shrink-0 h-64 object-cover cursor-pointer"
                                     onClick={() => setPopupImage({ url: normalizeFileUrl(img.filePath), index: idx, lombaId: l.id, allImages: images })}/>
                              ))}
                            </div>
                          </div>

                          {images.length > 1 && (
                            <div className="flex gap-2 mt-2 justify-center">
                              {images.map((_, idx) => (
                                <span key={idx} onClick={() => setImageIndex((prev) => ({ ...prev, [l.id]: idx }))}
                                      className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${idx === currentIndex ? "bg-[#a855f7]" : "bg-gray-500"}`}/>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* POPUP */}
      {popupImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm" onClick={() => setPopupImage(null)}>
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img src={popupImage.url} alt="Preview" className="rounded shadow-lg max-h-[90vh] max-w-[90vw]" />
            {popupImage.allImages.length > 1 && (
              <>
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded hover:bg-opacity-75"
                        onClick={() => {
                          const prev = (popupImage.index - 1 + popupImage.allImages.length) % popupImage.allImages.length;
                          setPopupImage(prevImg => ({ ...prevImg, url: normalizeFileUrl(prevImg.allImages[prev].filePath), index: prev }));
                        }}>❮</button>
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded hover:bg-opacity-75"
                        onClick={() => {
                          const next = (popupImage.index + 1) % popupImage.allImages.length;
                          setPopupImage(nextImg => ({ ...nextImg, url: normalizeFileUrl(nextImg.allImages[next].filePath), index: next }));
                        }}>❯</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Neon & Slide-in */}
      <style jsx>{`
        .neon-border { position: relative; overflow: visible; }
          .neon-glow {
    text-shadow: 0 0 10px #a855f7, 0 0 20px #8b5cf6;
    transition: text-shadow 0.3s ease-in-out;
  }
        .neon-border::before, .neon-border::after {
          content: "";
          position: absolute;
          inset: -5px;
          border-radius: inherit;
          background: linear-gradient(120deg,#a855f7,#8b5cf6,#9333ea,#7c3aed);
          background-size: 400% 400%;
          animation: spinNeon 18s linear infinite;
          z-index: 0;
          filter: blur(15px);
          opacity: 0.25;
        }
        .neon-border::after { inset: -10px; filter: blur(25px); opacity: 0.5; }
        .neon-border > * { position: relative; z-index: 1; }

        @keyframes spinNeon { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }

        .slide-in { opacity:1 !important; transform: translateY(-40) !important; }
      `}</style>
    </main>
  );
}