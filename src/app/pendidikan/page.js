"use client";
import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";

export default function PendidikanPage() {
  const { theme } = useTheme();

  const [pendidikan, setPendidikan] = useState([
    {
      id: 1,
      nama: "Universitas Sebelas Maret",
      jurusan: "D3 Teknik Informatika",
      tahun_masuk: "2022",
      tahun_lulus: "2025",
      nilai: "3.81",
      logo: "/uploads/Copy of Logo_UNS.png",
      deskripsi: "Mendalami pengembangan perangkat lunak, basis data, dan infrastruktur IT. Fokus pada pengembangan web modern dan manajemen proyek TI.",
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
      deskripsi: "Menyelesaikan pendidikan menengah atas dengan fokus pada ilmu pengetahuan alam dan aktif dalam kegiatan organisasi sekolah.",
      file_path: "",
    },
    {
      id: 3,
      nama: "[COMING SOON]",
      logo: null,
    },
  ]);

  const [expanded, setExpanded] = useState({});
  const [popupImage, setPopupImage] = useState(null);

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const normalizeFileUrl = (filePath) =>
    !filePath ? null : filePath.startsWith("/") ? filePath : `/${filePath}`;

  const getFileType = (filePath) => {
    if (!filePath) return null;
    const ext = filePath.split(".").pop().toLowerCase();
    if (ext === "pdf") return "pdf";
    if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "image";
    return null;
  };

  useEffect(() => {
    document.body.style.overflow = popupImage ? "hidden" : "auto";
  }, [popupImage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".pendidikan-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [pendidikan]);

  return (
    <main className={`min-h-screen font-poppins transition-colors duration-500 pt-28 pb-20 px-4 sm:px-8 md:px-16 lg:px-24 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1 className={`text-4xl md:text-6xl font-extrabold mb-4 tracking-tight ${theme === "dark" ? "neon-glow text-white" : "text-gray-900"}`}>
          Pendidikan
        </h1>
        <div className={`h-1 w-20 mx-auto rounded-full ${theme === 'dark' ? 'bg-pink-600 shadow-[0_0_10px_#f50bbb]' : 'bg-pink-500'}`}></div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Timeline Line */}
        <div className={`absolute left-0 md:left-8 top-0 bottom-0 w-[2px] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} hidden sm:block`}></div>

        <div className="flex flex-col gap-12">
          {pendidikan.map((p) => {
            const isExpanded = expanded[p.id];
            const textToShow = isExpanded ? p.deskripsi : p.deskripsi?.length > 150 ? p.deskripsi.substring(0, 150) + "..." : p.deskripsi;
            const fileUrl = normalizeFileUrl(p.file_path);
            const type = getFileType(p.file_path);

            return (
              <div key={p.id} className="pendidikan-card opacity-0 translate-y-10 transition-all duration-1000 relative sm:pl-16 group">
                
                {/* Timeline Dot */}
                <div className={`absolute left-[-5px] sm:left-[27px] top-10 w-4 h-4 rounded-full border-4 z-20 transition-transform duration-300 group-hover:scale-125 ${theme === 'dark' ? 'bg-pink-600 border-gray-950 shadow-[0_0_8px_#f50bbb]' : 'bg-pink-500 border-white shadow-md'}`}></div>

                <div className="neon-border rounded-3xl p-[1px] overflow-hidden relative">
                  <div className={`relative rounded-[23px] p-6 md:p-8 flex flex-col lg:flex-row gap-8 transition-all duration-500 overflow-hidden ${theme === "dark" ? "bg-gray-900/40 backdrop-blur-md group-hover:bg-gray-900/60" : "bg-white shadow-sm border border-gray-100 group-hover:shadow-xl"}`}>
                    
                    {/* LOGO INSTANSI WATERMARK (WARNA ASLI) */}
                    {p.logo && (
                      <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-15 transition-all duration-500 group-hover:opacity-30 group-hover:scale-110">
                        <img 
                          src={p.logo} 
                          alt="" 
                          className="h-60 w-60 md:h-50 md:w-90 object-contain"
                          /* Tidak menggunakan filter grayscale/invert agar warna asli muncul */
                        />
                      </div>
                    )}

                    {/* Content Layer (z-index 10 agar di atas logo) */}
                    <div className="flex-1 relative z-10">
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${theme === 'dark' ? 'bg-pink-600/20 text-pink-400' : 'bg-pink-100 text-pink-600'}`}>
                          {p.tahun_masuk || "TBA"} — {p.tahun_lulus || "TBA"}
                        </span>
                        {p.nilai && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${theme === 'dark' ? 'border-yellow-500/50 text-yellow-500' : 'border-yellow-600 text-yellow-700'}`}>
                            Nilai/IPK: {p.nilai}
                          </span>
                        )}
                      </div>

                      <h2 className={`text-2xl md:text-3xl font-bold mb-2 tracking-tight ${theme === "dark" ? "text-white group-hover:text-pink-400" : "text-gray-900"} transition-colors`}>
                        {p.nama}
                      </h2>
                      
                      <p className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {p.jurusan || "Jurusan belum ditentukan"}
                      </p>

                      {p.deskripsi && (
                        <div className="mb-6 max-w-2xl">
                          <p className={`leading-relaxed text-sm md:text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            {textToShow}
                          </p>
                          {p.deskripsi.length > 150 && (
                            <button
                              onClick={() => toggleExpand(p.id)}
                              className={`mt-2 text-xs font-bold uppercase tracking-widest hover:underline ${theme === "dark" ? "text-pink-500" : "text-pink-600"}`}
                            >
                              {isExpanded ? "Sembunyikan" : "Selengkapnya"}
                            </button>
                          )}
                        </div>
                      )}

                      {fileUrl && type === "pdf" && (
                        <a href={fileUrl} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all ${theme === "dark" ? "bg-pink-600 text-white hover:bg-pink-500" : "bg-pink-500 text-white hover:bg-pink-600 shadow-lg"}`}>
                          <span>📄</span> Lihat Sertifikat / Ijazah
                        </a>
                      )}
                    </div>

                    {/* Right Content (Preview File jika ada) */}
                    {fileUrl && type && (
                      <div className={`relative z-10 w-full lg:w-72 rounded-2xl overflow-hidden border transition-all ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                        {type === "pdf" ? (
                          <object data={fileUrl} type="application/pdf" width="100%" height="200px" className="bg-transparent" />
                        ) : (
                          <img src={fileUrl} alt={p.nama} className="w-full h-48 object-cover cursor-zoom-in" onClick={() => setPopupImage(fileUrl)} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popup Image Viewer */}
      {popupImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-[100] p-4" onClick={() => setPopupImage(null)}>
          <img src={popupImage} alt="Full Preview" className="max-h-[90vh] max-w-[95vw] rounded-lg animate-zoom" />
        </div>
      )}

      <style jsx>{`
        .neon-glow { text-shadow: 0 0 15px rgba(245, 11, 187, 0.4); }
        .pendidikan-card.reveal { opacity: 1; transform: translateY(0); }
        @keyframes animate-zoom { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .neon-border::before {
          content: ""; position: absolute; inset: -2px;
          background: linear-gradient(135deg, #f50bbb, transparent, #f50bbb);
          z-index: -1; opacity: 0; transition: opacity 0.5s;
        }
        .pendidikan-card:hover .neon-border::before { opacity: 0.3; }
      `}</style>
    </main>
  );
}