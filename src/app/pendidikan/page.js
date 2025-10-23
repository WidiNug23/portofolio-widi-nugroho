"use client";
import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext"; // pastikan path benar

export default function PendidikanPage() {
  const { theme } = useTheme();

  const [pendidikan, setPendidikan] = useState([
    {
      id: 1,
      nama: "SMA Negeri 1 Mejayan",
      jurusan: "IPA",
      tahun_masuk: "2019",
      tahun_lulus: "2022",
      nilai: "88.13",
      deskripsi: "",
      file_path: "",
    },
    {
      id: 2,
      nama: "Universitas Sebelas Maret",
      jurusan: "D3Teknik Informatika",
      tahun_masuk: "2022",
      tahun_lulus: "2025",
      nilai: "3.81",
      deskripsi: "",
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
    document.body.style.backgroundColor = theme === "dark" ? "#000000ff" : "#ffffff"; // bg-gray-950 / putih
  }, [theme]);

  // Slide-in observer
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

    const cards = document.querySelectorAll(".pendidikan-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [pendidikan]);

  return (
    <main
      className={`min-h-screen font-poppins transition-colors duration-500 pt-28 p-8 ${
        theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
<h1
  className={`text-4xl md:text-5xl font-bold mb-12 text-center mt-1 ${
    theme === "dark" ? "neon-glow" : ""
  }`}
>
  Pendidikan
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
              <div
                key={p.id}
                className="pendidikan-card opacity-0 transform translate-y-8 transition-all duration-700 relative group"
              >
                <div className="neon-border rounded-2xl p-[2px]">
                  <div
                    className={`relative rounded-2xl p-6 flex flex-col md:flex-row gap-6 transition-transform duration-500 group-hover:scale-[1.02] ${
                      theme === "dark"
                        ? "bg-gray-900 group-hover:shadow-[0_0_25px_rgba(255,0,187,0.5)]"
                        : "bg-gray-100 group-hover:shadow-[0_0_25px_rgba(251,182,206,0.5)]"
                    }`}
                  >
                    {/* Kiri */}
                    <div className="flex-1 min-w-0">
                      <h2
                        className={`text-2xl font-bold mb-3 break-words ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                        style={
                          theme === "dark"
                            ? { textShadow: "0 0 2px #f50bbbff, 0 0 10px #f50bbbff" }
                            : {}
                        }
                      >
                        {p.nama}
                      </h2>
                      <p
                        className={`mb-3 break-words leading-relaxed whitespace-pre-line ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {textToShow}
                      </p>

                      {p.deskripsi?.length > 250 && (
                        <button
                          onClick={() => toggleExpand(p.id)}
                          className={`mb-4 hover:underline font-medium ${
                            theme === "dark" ? "text-yellow-400" : "text-yellow-600"
                          }`}
                        >
                          {isExpanded ? "Sembunyikan" : "Selengkapnya"}
                        </button>
                      )}

                      <p
                        className={`mb-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <strong>Jurusan:</strong> {p.jurusan || "-"}
                      </p>
                      <p
                        className={`mb-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <strong>Tahun Masuk:</strong> {p.tahun_masuk || "-"}
                      </p>
                      <p
                        className={`mb-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <strong>Tahun Lulus:</strong> {p.tahun_lulus || "-"}
                      </p>
                      <p
                        className={`mb-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <strong>Nilai/IPK:</strong> {p.nilai || "-"}
                      </p>

                      {fileUrl && type === "pdf" && (
                        <div className="mt-4">
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-block font-semibold px-4 py-2 rounded-lg transition ${
                              theme === "dark"
                                ? "bg-pink-600 text-gray-900 hover:bg-pink-500"
                                : "bg-pink-400 text-gray-900 hover:bg-pink-300"
                            }`}
                          >
                            📄 Lihat PDF
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Kanan */}
                    {fileUrl && type && (
                      <div className="w-full md:w-[400px] lg:w-[450px] border border-gray-700 rounded-xl overflow-hidden shadow-inner flex justify-center items-center">
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

      {/* Popup */}
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

      {/* Neon & slide-in */}
      <style jsx>{`
        .neon-border {
          position: relative;
          overflow: visible;
        }

          .neon-glow {
    text-shadow: 0 0 10px #f50bbbff, 0 0 20px #f50bbbff;
    transition: text-shadow 0.3s ease-in-out;
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

        .pendidikan-card.slide-in {
          opacity: 1 !important;
          transform: translateY(-40) !important;
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
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
