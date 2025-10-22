"use client";
import { useState, useEffect } from "react";

export default function PendidikanPage() {
  const [pendidikan, setPendidikan] = useState([
    {
      id: 1,
      nama: "SMA Negeri 1 Mejayan",
      jurusan: "IPA",
      tahun_masuk: "2019",
      tahun_lulus: "2022",
      nilai: "88.13", // nilai kursus
      deskripsi:
        "",
      file_path: "",
    },
    {
      id: 2,
      nama: "Universitas Sebelas Maret",
      jurusan: "D3Teknik Informatika",
      tahun_masuk: "2022",
      tahun_lulus: "2025",
      nilai: "3.81", // IPK atau nilai
      deskripsi:
        "",
      file_path: "",
    },
    {
      id: 3,
      nama: "[COMING SOON]",
      jurusan: "",
      tahun_masuk: "",
      tahun_lulus: "",
      nilai: "",
      deskripsi: "",
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
    textShadow: "0 0 10px #f50bbbff, 0 0 20px #f50bbbff",
  }}
>
  Pendidikan & Pelatihan
</h1>

      {pendidikan.length === 0 ? (
        <p className="text-center text-gray-400">Tidak ada data pendidikan.</p>
      ) : (
        <div className="flex flex-col gap-10">
          {pendidikan.map((p) => {
            const isExpanded = expanded[p.id];
            const textToShow = isExpanded
              ? p.deskripsi
              : p.deskripsi?.length > 250
              ? p.deskripsi.substring(0, 250) + "..."
              : p.deskripsi;

            const fileUrl = normalizeFileUrl(p.file_path);
            const type = getFileType(p.file_path);

            return (
              <div key={p.id} className="relative group">
                <div className="neon-border rounded-2xl p-[2px]">
                  <div className="relative bg-gray-900 rounded-2xl p-6 flex flex-col md:flex-row gap-6 transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_25px_rgba(255,255,0,0.5)]">
                    
                    {/* KIRI: Detail Pendidikan */}
                    <div className="flex-1 min-w-0">
<h2
  className="text-2xl font-bold text-white mb-3 break-words"
  style={{
    textShadow: "0 0 2px #f50bbbff, 0 0 10px #f50bbbff",
  }}
>
  {p.nama}
</h2>
                      <p className="text-gray-300 mb-3 break-words leading-relaxed whitespace-pre-line">
                        {textToShow}
                      </p>

                      {p.deskripsi?.length > 250 && (
                        <button
                          onClick={() => toggleExpand(p.id)}
                          className="text-yellow-400 hover:underline mb-4"
                        >
                          {isExpanded ? "Sembunyikan" : "Selengkapnya"}
                        </button>
                      )}

                      <p className="text-gray-400 mb-2">
                        <strong>Jurusan:</strong> {p.jurusan || "-"}
                      </p>
                      <p className="text-gray-400 mb-2">
                        <strong>Tahun Masuk:</strong> {p.tahun_masuk || "-"}
                      </p>
                      <p className="text-gray-400 mb-2">
                        <strong>Tahun Lulus:</strong> {p.tahun_lulus || "-"}
                      </p>
                      <p className="text-gray-400 mb-2">
                        <strong>Nilai/IPK:</strong> {p.nilai || "-"}
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
                            alt={p.nama}
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
    #f50bbbff,
    #f50bbbff,
    #f50bbbff,
    #f50bbbff
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
