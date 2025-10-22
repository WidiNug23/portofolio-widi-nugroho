"use client";
import { useState, useEffect } from "react";

export default function OrganisasiPage() {
  // ✅ Data langsung dari frontend
  const [organisasi, setOrganisasi] = useState([
    {
      id: 1,
      nama: "D3 Teknik Informatika UNS PSDKU",
      jabatan: "Divisi Dokumentasi Prodi ",
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
        "Melakukan dokumentasi kegiatan himpunan menggunakan kamera DSLR atau Mirrorless. Melakukan pengeditan video dan foto yang berhubungan dengan kegiatan himpunan menggunakan Capcut dan Canva. Melakukan upload konten press release.Melakukan penyimpanan hasil dokumentasi menggunakan Google Drive.",
      file_path: "",
    },
    {
      id: 3,
      nama: "Garapan ID",
      jabatan: "Full Stack Developer",
      tahun_masuk: "2024",
      tahun_keluar: "2024",
      deskripsi:
        "Melakukan perancangan dan pembuatan website bersama dengan tim",
      file_path: "",
    },
        {
      id: 4,
      nama: "PT. Glace Kreasi Digital",
      jabatan: "Multimedia Content Creator",
      tahun_masuk: "2025",
      tahun_keluar: "2025",
      deskripsi:
        "Melakukan kegiatan dokumentasi kegiatan meliputi pengambilan gambar dan video serta melakukan pengeditan video",
      file_path: "",
    },
            {
      id: 5,
      nama: "[COMING SOON]",
      jabatan: "",
      tahun_masuk: "",
      tahun_keluar: "",
      deskripsi:
        "",
      file_path: "",
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

  return (
    <main className="p-8 bg-gray-950 min-h-screen text-gray-100 font-poppins">
      <h1
        className="text-4xl md:text-5xl font-bold mb-8 text-center text-white"
        style={{
          textShadow: "0 0 10px #f59e0b, 0 0 20px #facc15",
        }}
      >
        Pengalaman & Organisasi
      </h1>

      {organisasi.length === 0 ? (
        <p className="text-center text-gray-400">Tidak ada data organisasi.</p>
      ) : (
        <div className="flex flex-col gap-10">
          {organisasi.map((o) => {
            const isExpanded = expanded[o.id];
            const textToShow = isExpanded
              ? o.deskripsi
              : o.deskripsi?.length > 250
              ? o.deskripsi.substring(0, 250) + "..."
              : o.deskripsi;

            const fileUrl = normalizeFileUrl(o.file_path);
            const type = getFileType(o.file_path);

            return (
              <div key={o.id} className="relative group">
                <div className="neon-border rounded-2xl p-[2px]">
                  <div className="relative bg-gray-900 rounded-2xl p-6 flex flex-col md:flex-row gap-6 transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_25px_rgba(255,255,0,0.5)]">
                    
                    {/* KIRI: Detail Organisasi */}
                    <div className="flex-1 min-w-0">
                      <h2
                        className="text-2xl font-bold text-white mb-3 break-words"
                        style={{
                          textShadow:
                            "0 0 2px #f59e0b, 0 0 10px #facc15",
                        }}
                      >
                        {o.nama}
                      </h2>
                      <p className="text-gray-300 mb-3 break-words leading-relaxed whitespace-pre-line">
                        {textToShow}
                      </p>

                      {o.deskripsi?.length > 250 && (
                        <button
                          onClick={() => toggleExpand(o.id)}
                          className="text-yellow-400 hover:underline mb-4"
                        >
                          {isExpanded ? "Sembunyikan" : "Selengkapnya"}
                        </button>
                      )}

                      <p className="text-gray-400 mb-2">
                        <strong>Jabatan:</strong> {o.jabatan || "-"}
                      </p>
                      <p className="text-gray-400 mb-2">
                        <strong>Tahun Masuk:</strong> {o.tahun_masuk || "-"}
                      </p>
                      <p className="text-gray-400 mb-2">
                        <strong>Tahun Keluar:</strong> {o.tahun_keluar || "-"}
                      </p>

                      {fileUrl && type === "pdf" && (
                        <div className="mt-4">
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-[#f59e0b] text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-[#facc15] transition"
                          >
                            📄 Lihat PDF
                          </a>
                        </div>
                      )}
                    </div>

                    {/* KANAN: Preview PDF / Image */}
                    {fileUrl && type && (
                      <div className="w-full md:w-[400px] lg:w-[450px] border border-gray-700 rounded-xl overflow-hidden shadow-inner bg-gray-950 flex justify-center items-center">
                        {type === "pdf" ? (
                          <object
                            data={fileUrl}
                            type="application/pdf"
                            width="100%"
                            height="300px"
                          >
                            <p className="text-center text-gray-500 p-2">
                              Tidak dapat menampilkan PDF.{" "}
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-yellow-400 underline"
                              >
                                Klik di sini
                              </a>
                            </p>
                          </object>
                        ) : (
                          <img
                            src={fileUrl}
                            alt={o.nama}
                            className="w-full h-64 object-cover cursor-pointer"
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
      )}

      {/* Popup Image */}
      {popupImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setPopupImage(null)}
        >
          <img
            src={popupImage}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] rounded shadow-lg"
          />
        </div>
      )}

      {/* Neon Border CSS */}
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
            #facc15,
            #fde68a,
            #f59e0b,
            #fcd34d
          );
          background-size: 400% 400%;
          animation: spinNeon 18s linear infinite;
          z-index: 0;
          filter: blur(15px);
          opacity: 0.25;
        }
        .neon-border::after {
          inset: -10px;
          filter: blur(25px);
          opacity: 0.5;
        }
        .neon-border > * {
          position: relative;
          z-index: 1;
        }
        @keyframes spinNeon {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </main>
  );
}
