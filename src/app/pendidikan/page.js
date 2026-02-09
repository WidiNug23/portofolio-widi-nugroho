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
    document.body.style.backgroundColor =
      theme === "dark" ? "#0a0a0a" : "#f8fafc";
  }, [theme]);

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
    <main
      className={`min-h-screen font-poppins transition-colors duration-500 pt-28 pb-20 px-4 sm:px-8 md:px-16 lg:px-24 ${
        theme === "dark" ? "text-gray-100" : "text-gray-900"
      }`}
    >
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1
          className={`text-4xl md:text-6xl font-extrabold mb-4 tracking-tight ${
            theme === "dark" ? "neon-glow text-white" : "text-gray-900"
          }`}
        >
          Pendidikan
        </h1>
        <div className={`h-1 w-20 mx-auto rounded-full ${theme === 'dark' ? 'bg-pink-600 shadow-[0_0_10px_#f50bbb]' : 'bg-pink-500'}`}></div>
      </div>

      {pendidikan.length === 0 ? (
        <p className="text-center text-gray-500 italic">Tidak ada data pendidikan.</p>
      ) : (
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className={`absolute left-0 md:left-8 top-0 bottom-0 w-[2px] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} hidden sm:block`}></div>

          <div className="flex flex-col gap-12">
            {pendidikan.map((p) => {
              const isExpanded = expanded[p.id];
              const textToShow = isExpanded
                ? p.deskripsi
                : p.deskripsi?.length > 150
                ? p.deskripsi.substring(0, 150) + "..."
                : p.deskripsi;

              const fileUrl = normalizeFileUrl(p.file_path);
              const type = getFileType(p.file_path);

              return (
                <div
                  key={p.id}
                  className="pendidikan-card opacity-0 translate-y-10 transition-all duration-1000 relative sm:pl-16 group"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-[-5px] sm:left-[27px] top-10 w-4 h-4 rounded-full border-4 z-10 transition-transform duration-300 group-hover:scale-125 ${
                    theme === 'dark' ? 'bg-pink-600 border-gray-950 shadow-[0_0_8px_#f50bbb]' : 'bg-pink-500 border-white shadow-md'
                  }`}></div>

                  <div className="neon-border rounded-3xl p-[1px] overflow-hidden">
                    <div
                      className={`relative rounded-[23px] p-6 md:p-8 flex flex-col lg:flex-row gap-8 transition-all duration-500 ${
                        theme === "dark"
                          ? "bg-gray-900/40 backdrop-blur-md group-hover:bg-gray-900/60"
                          : "bg-white shadow-sm border border-gray-100 group-hover:shadow-xl"
                      }`}
                    >
                      {/* Left Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                           <div className="flex flex-wrap items-center gap-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                                theme === 'dark' ? 'bg-pink-600/10 text-pink-500' : 'bg-pink-100 text-pink-600'
                              }`}>
                                {p.tahun_masuk || "TBA"} — {p.tahun_lulus || "TBA"}
                              </span>
                              {p.nilai && (
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                  theme === 'dark' ? 'border-yellow-500/50 text-yellow-500' : 'border-yellow-600 text-yellow-700'
                                }`}>
                                  Nilai: {p.nilai}
                                </span>
                              )}
                           </div>
                           
                           {/* LOGO INSTANSI */}
                           {p.logo && (
                             <div className={`p-2 rounded-xl bg-white/10 backdrop-blur-sm border ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                               <img src={p.logo} alt="Logo" className="h-10 w-auto object-contain" />
                             </div>
                           )}
                        </div>

                        <h2 className={`text-2xl md:text-3xl font-bold mb-2 tracking-tight ${
                          theme === "dark" ? "text-white group-hover:text-pink-400" : "text-gray-900"
                        } transition-colors`}>
                          {p.nama}
                        </h2>
                        
                        <p className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {p.jurusan || "Jurusan belum ditentukan"}
                        </p>

                        {p.deskripsi && (
                          <div className="mb-6">
                            <p className={`leading-relaxed text-sm md:text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                              {textToShow}
                            </p>
                            {p.deskripsi.length > 150 && (
                              <button
                                onClick={() => toggleExpand(p.id)}
                                className={`mt-2 text-xs font-bold uppercase tracking-widest hover:underline ${
                                  theme === "dark" ? "text-pink-500" : "text-pink-600"
                                }`}
                              >
                                {isExpanded ? "Sembunyikan" : "Selengkapnya"}
                              </button>
                            )}
                          </div>
                        )}

                        {fileUrl && type === "pdf" && (
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all ${
                              theme === "dark"
                                ? "bg-pink-600 text-white hover:bg-pink-500 hover:shadow-[0_0_15px_rgba(245,11,187,0.4)]"
                                : "bg-pink-500 text-white hover:bg-pink-600 shadow-lg shadow-pink-200"
                            }`}
                          >
                            <span>📄</span> Lihat Sertifikat / Ijazah
                          </a>
                        )}
                      </div>

                      {/* Right Content (Preview) */}
                      {fileUrl && type && (
                        <div className={`w-full lg:w-80 xl:w-96 rounded-2xl overflow-hidden border transition-transform duration-500 group-hover:scale-[1.03] ${
                          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                        }`}>
                          {type === "pdf" ? (
                            <object
                              data={fileUrl}
                              type="application/pdf"
                              width="100%"
                              height="250px"
                              className="bg-transparent"
                            >
                              <div className="p-4 text-center">
                                <a href={fileUrl} className="text-pink-500 underline">Unduh PDF</a>
                              </div>
                            </object>
                          ) : (
                            <img
                              src={fileUrl}
                              alt={p.nama}
                              className="w-full h-full min-h-[200px] object-cover cursor-zoom-in"
                              onClick={() => setPopupImage(fileUrl)}
                            />
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
      )}

      {/* Popup Image Viewer */}
      {popupImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-[100] p-4 transition-all duration-300"
          onClick={() => setPopupImage(null)}
        >
          <img
            src={popupImage}
            alt="Full Preview"
            className="max-h-[90vh] max-w-[95vw] rounded-lg shadow-2xl animate-zoom"
          />
          <button className="absolute top-10 right-10 text-white text-4xl hover:text-pink-500 transition-colors">&times;</button>
        </div>
      )}

      <style jsx>{`
        .neon-border { position: relative; }
        
        .neon-glow {
          text-shadow: 0 0 15px rgba(245, 11, 187, 0.4);
        }

        .pendidikan-card.reveal {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes animate-zoom {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .neon-border::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #f50bbb, transparent, #f50bbb);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .pendidikan-card:hover .neon-border::before {
          opacity: 0.3;
        }

        @media (max-width: 640px) {
          .pendidikan-card { padding-left: 0; }
        }
      `}</style>
    </main>
  );
}