"use client";
import { useEffect, useState } from "react";

export default function SertifikatPage() {
  const [sertifikat, setSertifikat] = useState([]);
  const [expanded, setExpanded] = useState({});

  // ✅ Data langsung di frontend (tanpa fetch dari backend)
  const sertifikatData = [
    {
      id: 1,
      nama: "Sertifikat Kompetensi Pemrogram",
      deskripsi: `No. 62019 2514 5 00000439 2025`,
      penerbit: "BNSP LSP Universitas Sebelas Maret",
      tahun: "2025 - 2028",
      tingkat: "",
      hasil: "",
      pdf_file: "uploads/serkom_widi.pdf",
    },
    {
      id: 2,
      nama: "Certificate of Appreciation 1st Place Web desain International Competition GAYATAMA 2024",
      deskripsi: `Bersama dengan Tim Pokpokji berhasil memperoleh juara 1 Web desain International Competition GAYATAMA 2024 UNESA pada 9 Desember 2024`,
      penerbit: "Universitas Negeri Surabaya (UNESA)",
      tahun: "2024",
      tingkat: "Internasional",
      hasil: "Juara 1",
      pdf_file: "uploads/130_Winner_GAYATAMA_compressed.pdf",
    },
    {
      id: 3,
      nama: "Juara 3 - Olimpiade Vokasi Indonesia IX Tahun 2024 Bidang Web Technologies",
      deskripsi: `Bersama dengan tim memperoleh juara 3 dalam gelaran OLIVIA IX Tahun 2024 di Makassar, Sulawesi Selatan pada bidang Web Technologies`,
      penerbit: "Forum Pendidikan Tinggi Vokasi Indonesia",
      tahun: "2024",
      tingkat: "Nasional",
      hasil: "Juara 3",
      pdf_file: "uploads/Sertifikat Juara (Emas, Perak dan Perunggu) OLIVIA IX_page-0069 (1).pdf",
    },

        {
      id: 4,
      nama: "[COMING SOON]]",
      deskripsi: ``,
      penerbit: "",
      tahun: "",
      tingkat: "",
      hasil: "",
      pdf_file: "",
    },
  ];

  useEffect(() => {
    // Simulasikan data dari frontend
    setSertifikat(sertifikatData);
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const normalizePdfUrl = (pdfFile) => {
    if (!pdfFile) return null;
    if (pdfFile.startsWith("http")) return pdfFile;
    return `${pdfFile}`;
  };

  return (
    <main className="p-8 bg-gray-950 min-h-screen text-gray-100 font-poppins">
      <h1
        className="text-4xl md:text-5xl font-bold mb-8 text-center text-white"
        style={{
          textShadow:
            "0 0 10px #65960aff, 0 0 20px #7cbd04ea",
        }}
      >
        Sertifikat
      </h1>

      {sertifikat.length === 0 ? (
        <p className="text-center text-gray-400">
          Memuat data sertifikat...
        </p>
      ) : (
        <div className="flex flex-col gap-10">
          {sertifikat.map((s) => {
            const isExpanded = expanded[s.id];
            const textToShow = isExpanded
              ? s.deskripsi
              : s.deskripsi?.length > 250
              ? s.deskripsi.substring(0, 250) + "..."
              : s.deskripsi;

            const pdfUrl = normalizePdfUrl(s.pdf_file);

            return (
              <div key={s.id} className="relative group">
                <div className="neon-border rounded-2xl p-[2px]">
                  <div className="relative bg-gray-900 rounded-2xl p-6 flex flex-col md:flex-row gap-6 transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_25px_rgba(155,228,20,0.5)]">
                    {/* KIRI: Detail Sertifikat */}
                    <div className="flex-1 min-w-0">
                      <h2
                        className="text-2xl font-bold text-white mb-3 break-words"
                        style={{
                          textShadow:
                            "0 0 10px #65960aff, 0 0 20px #7cbd04ea",
                        }}
                      >
                        {s.nama}
                      </h2>

                      <p className="text-gray-300 mb-3 break-words leading-relaxed whitespace-pre-line">
                        {textToShow}
                      </p>

                      {s.deskripsi?.length > 250 && (
                        <button
                          onClick={() => toggleExpand(s.id)}
                          className="text-[#9be414] hover:underline mb-4"
                        >
                          {isExpanded ? "Sembunyikan" : "Selengkapnya"}
                        </button>
                      )}

                      <p className="text-gray-400 mb-2">
                        <strong>Penerbit:</strong> {s.penerbit || "-"}
                      </p>
                      <p className="text-gray-400 mb-2">
                        <strong>Tahun:</strong> {s.tahun || "-"}
                      </p>

                      {s.tingkat && (
                        <p className="text-gray-400 mb-2">
                          <strong>Tingkat:</strong> {s.tingkat}
                        </p>
                      )}
                      {s.hasil && (
                        <p className="text-gray-400 mb-2">
                          <strong>Hasil:</strong> {s.hasil}
                        </p>
                      )}

                      {pdfUrl && (
                        <div className="mt-4">
                          <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-[#9be414] text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-[#a6f65b] transition"
                          >
                            📄 Lihat PDF
                          </a>
                        </div>
                      )}
                    </div>

                    {/* KANAN: Preview PDF */}
                    {pdfUrl && (
                      <div className="w-full md:w-[400px] lg:w-[450px] border border-gray-700 rounded-xl overflow-hidden shadow-inner bg-gray-950">
                        <object
                          data={pdfUrl}
                          type="application/pdf"
                          width="100%"
                          height="300px"
                        >
                          <p className="text-center text-gray-500 p-2">
                            Tidak dapat menampilkan PDF di browser ini.{" "}
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#9be414] underline"
                            >
                              Klik di sini untuk membuka
                            </a>
                            .
                          </p>
                        </object>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
            #9be414,
            #00ff99,
            #9be414,
            #1effb2
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
