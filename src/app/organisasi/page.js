"use client";
import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";

export default function OrganisasiPage() {
  const { theme } = useTheme();

  const [organisasi, setOrganisasi] = useState([
    {
      id: 1,
      nama: "D3 Teknik Informatika UNS PSDKU",
      jabatan: "Divisi Dokumentasi Prodi",
      tahun_masuk: "2022",
      tahun_keluar: "2025",
      deskripsi:
        "Melakukan dokumentasi kegiatan prodi menggunakan kamera DSLR atau Mirrorless. Melakukan pengeditan video yang berhubungan dengan kegiatan prodi menggunakan Capcut dan Canva. Melakukan penyimpanan hasil dokumentasi menggunakan Google Drive",
      file_path: "",
    },
    {
      id: 2,
      nama: "Himpunan Mahasiswa PSDKU UNS",
      jabatan: "Staff Divisi Media Komunikasi",
      tahun_masuk: "2023",
      tahun_keluar: "2024",
      deskripsi:
        "Melakukan dokumentasi kegiatan himpunan menggunakan kamera DSLR atau Mirrorless. Melakukan pengeditan video dan foto yang berhubungan dengan kegiatan himpunan menggunakan Capcut dan Canva. Melakukan upload konten press release. Melakukan penyimpanan hasil dokumentasi menggunakan Google Drive.",
      file_path: "",
    },
    {
      id: 3,
      nama: "PT. Garapan Indonesia Sukses",
      jabatan: "Full Stack Developer",
      tahun_masuk: "2024",
      tahun_keluar: "2024",
      deskripsi:
        "Melakukan perancangan dan pembuatan website bersama dengan tim menggunakan teknologi web modern.",
      file_path: "",
    },
    {
      id: 4,
      nama: "PT. Garapan Indonesia Sukses",
      jabatan: "Multimedia Content Creator",
      tahun_masuk: "2025",
      tahun_keluar: "2025",
      deskripsi:
        "Melakukan kegiatan dokumentasi kegiatan meliputi pengambilan gambar dan video serta melakukan pengeditan video.",
      file_path: "",
    },
    {
      id: 5,
      nama: "[COMING SOON]",
    },
  ]);

  const [expanded, setExpanded] = useState({});
  const [popupImage, setPopupImage] = useState(null);

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

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

    const cards = document.querySelectorAll(".organisasi-item");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [organisasi]);

  return (
    <main
      className={`min-h-screen font-poppins transition-colors duration-500 pt-28 pb-20 px-4 sm:px-12 md:px-20 lg:px-32 ${
        theme === "dark" ? "text-gray-100" : "text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1
          className={`text-4xl md:text-6xl font-extrabold mb-4 tracking-tight ${
            theme === "dark" ? "neon-glow text-white" : "text-gray-900"
          }`}
        >
          Pengalaman & Organisasi
        </h1>
        <div className={`h-1 w-24 mx-auto rounded-full ${theme === 'dark' ? 'bg-yellow-500 shadow-[0_0_10px_#f59e0b]' : 'bg-yellow-500'}`}></div>
      </div>

      {organisasi.length === 0 ? (
        <p className="text-center text-gray-500 italic">Belum ada data pengalaman.</p>
      ) : (
        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-[2px] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} hidden md:block`}></div>

          <div className="flex flex-col gap-12">
            {organisasi.map((o, index) => {
              const isEven = index % 2 === 0;
              const isExpanded = expanded[o.id];
              const textToShow = isExpanded
                ? o.deskripsi
                : o.deskripsi?.length > 180
                ? o.deskripsi.substring(0, 180) + "..."
                : o.deskripsi;

              const fileUrl = normalizeFileUrl(o.file_path);
              const type = getFileType(o.file_path);

              return (
                <div
                  key={o.id}
                  className={`organisasi-item opacity-0 transform translate-y-10 transition-all duration-1000 flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Spacer for Desktop Timeline */}
                  <div className="hidden md:block md:w-1/2"></div>

                  {/* Timeline Dot */}
                  <div className={`absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 ${theme === 'dark' ? 'bg-yellow-500 border-gray-900 shadow-[0_0_10px_#f59e0b]' : 'bg-yellow-500 border-white shadow-md'} z-10 hidden md:block`}></div>

                  {/* Card Content */}
                  <div className="w-full md:w-1/2 px-0 md:px-10">
                    <div
                      className={`relative group p-6 rounded-3xl transition-all duration-300 border ${
                        theme === "dark"
                          ? "bg-gray-900/50 border-gray-800 hover:border-yellow-500/50 backdrop-blur-sm"
                          : "bg-white border-gray-100 shadow-xl hover:shadow-2xl hover:border-yellow-400"
                      }`}
                    >
                      {/* Badge Tahun */}
                      {o.tahun_masuk && (
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                          theme === 'dark' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {o.tahun_masuk} — {o.tahun_keluar}
                        </span>
                      )}

                      <h2 className={`text-xl md:text-2xl font-bold mb-1 ${theme === "dark" ? "text-white group-hover:text-yellow-400" : "text-gray-800"} transition-colors`}>
                        {o.nama}
                      </h2>
                      <p className={`font-medium mb-4 text-sm tracking-wide ${theme === 'dark' ? 'text-gray-400' : 'text-yellow-600'}`}>
                        {o.jabatan || "Upcoming Member"}
                      </p>

                      {o.deskripsi && (
                        <div className="relative">
                          <p className={`text-sm leading-relaxed mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            {textToShow}
                          </p>
                          {o.deskripsi.length > 180 && (
                            <button
                              onClick={() => toggleExpand(o.id)}
                              className="text-xs font-bold uppercase tracking-wider text-yellow-500 hover:text-yellow-400 transition-colors"
                            >
                              {isExpanded ? "Show Less" : "Read More"}
                            </button>
                          )}
                        </div>
                      )}

                      {/* File Preview Section */}
                      {fileUrl && (
                        <div className="mt-6 rounded-xl overflow-hidden border border-gray-700/30">
                          {type === "image" ? (
                            <img
                              src={fileUrl}
                              alt={o.nama}
                              className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                              onClick={() => setPopupImage(fileUrl)}
                            />
                          ) : type === "pdf" ? (
                            <a
                              href={fileUrl}
                              target="_blank"
                              className={`flex items-center justify-center gap-2 p-3 text-sm font-bold ${
                                theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                              } transition-colors`}
                            >
                              <span>📄 View Document</span>
                            </a>
                          ) : null}
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

      {/* Lightbox / Popup */}
      {popupImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex justify-center items-center z-[999] p-4 transition-all"
          onClick={() => setPopupImage(null)}
        >
          <img
            src={popupImage}
            alt="Preview Full"
            className="max-h-full max-w-full rounded-lg shadow-2xl scale-in-center"
          />
          <button className="absolute top-8 right-8 text-white text-3xl">&times;</button>
        </div>
      )}

      <style jsx>{`
        .neon-glow {
          text-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
        }
        
        .organisasi-item.reveal {
          opacity: 1;
          transform: translateY(0);
        }

        .scale-in-center {
          animation: scale-in-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }

        @keyframes scale-in-center {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </main>
  );
}