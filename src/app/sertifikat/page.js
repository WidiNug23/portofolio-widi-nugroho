"use client";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext"; // pastikan path benar

export default function SertifikatPage() {
  const { theme } = useTheme();
  const [sertifikat, setSertifikat] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [modalPDF, setModalPDF] = useState(null);

  // Data sertifikat
  const sertifikatData = [
    {
      id: 1,
      nama: "Sertifikat Kompetensi Pemrogram",
      deskripsi: `No. 62019 2514 5 00000439 2025`,
      penerbit: "BNSP LSP Universitas Sebelas Maret",
      tahun: "2025 - 2028",
      tingkat: "",
      hasil: "",
      pdf_file: "/uploads/serkom_widi.pdf",
    },
    {
      id: 2,
      nama: "Certificate of Appreciation 1st Place Web desain International Competition GAYATAMA 2024",
      deskripsi: `Bersama dengan Tim Pokpokji berhasil memperoleh juara 1 Web desain International Competition GAYATAMA 2024 UNESA pada 9 Desember 2024`,
      penerbit: "Universitas Negeri Surabaya (UNESA)",
      tahun: "2024",
      tingkat: "Internasional",
      hasil: "Juara 1",
      pdf_file: "/uploads/130_Winner_GAYATAMA_compressed.pdf",
    },
    {
      id: 3,
      nama: "Juara 3 - Olimpiade Vokasi Indonesia IX Tahun 2024 Bidang Web Technologies",
      deskripsi: `Bersama dengan tim memperoleh juara 3 dalam gelaran OLIVIA IX Tahun 2024 di Makassar, Sulawesi Selatan pada bidang Web Technologies`,
      penerbit: "Forum Pendidikan Tinggi Vokasi Indonesia",
      tahun: "2024",
      tingkat: "Nasional",
      hasil: "Juara 3",
      pdf_file: "/uploads/Sertifikat Juara (Emas, Perak dan Perunggu) OLIVIA IX_page-0069 (1).pdf",
    },
    {
      id: 4,
      nama: "[COMING SOON]",
      deskripsi: ``,
      penerbit: "",
      tahun: "",
      tingkat: "",
      hasil: "",
      pdf_file: "",
    },
  ];

  useEffect(() => {
    setSertifikat(sertifikatData);
  }, []);

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const normalizePdfUrl = (pdfFile) => {
    if (!pdfFile) return null;
    return pdfFile.startsWith("/") ? pdfFile : `/${pdfFile}`;
  };

  // Update body background sesuai theme
  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "dark" ? "#000000ff" : "#ffffff";
  }, [theme]);

  // Disable scroll saat modal PDF terbuka
  useEffect(() => {
    document.body.style.overflow = modalPDF ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [modalPDF]);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const cards = document.querySelectorAll(".projek-card");
  cards.forEach(card => observer.observe(card));

  return () => observer.disconnect();
}, [sertifikat]); // tambahkan sertifikat sebagai dependency


  return (
    <main
      className={`min-h-screen font-poppins transition-colors duration-500 pt-24 p-8 ${
        theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="text-center mb-8">
<h1
  className={`text-4xl md:text-5xl font-bold mb-12 text-center mt-5 ${
    theme === "dark" ? "neon-glow" : ""
  }`}
>
  Sertifikat
</h1>

        {/* <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          Berikut adalah sertifikat yang saya peroleh dalam berbagai kompetisi
          dan sertifikasi.
        </p> */}
      </div>

      {/* Sertifikat List */}
      {sertifikat.length === 0 ? (
        <p className="text-center text-gray-400">Memuat data sertifikat...</p>
      ) : (
        <div className="flex flex-col gap-10">
          {sertifikat.map((s) => {
            const isExpanded = expanded[s.id];
            const textToShow =
              isExpanded || s.deskripsi.length <= 250
                ? s.deskripsi
                : s.deskripsi.substring(0, 250) + "...";

            const pdfUrl = normalizePdfUrl(s.pdf_file);

            return (
              <div
                key={s.id}
                className="projek-card relative group opacity-0 transform translate-y-8 transition-all duration-700"
              >
                <div className="neon-border rounded-2xl p-[2px]">
<div
  className={`relative rounded-2xl p-6 flex flex-col md:flex-row gap-6 transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] ${
    theme === "dark" ? "bg-gray-900" : "bg-gray-100"
  }`}
>

                    {/* KIRI */}
                    <div className="flex-1 min-w-0">
                      <h2
                        className={`text-2xl font-bold mb-3 break-words ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                        style={
                          theme === "dark"
                            ? { textShadow: "0 0 10px #65960aff, 0 0 20px #7cbd04ea" }
                            : {}
                        }
                      >
                        {s.nama}
                      </h2>

                      <p
                        className={`mb-3 break-words leading-relaxed whitespace-pre-line ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {textToShow}
                      </p>

                      {s.deskripsi?.length > 250 && (
                        <button
                          onClick={() => toggleExpand(s.id)}
                          className={`mb-4 hover:underline font-medium ${
                            theme === "dark" ? "text-blue-400" : "text-blue-500"
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
                        <strong>Penerbit:</strong> {s.penerbit || "-"}
                      </p>
                      <p
                        className={`mb-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <strong>Tahun:</strong> {s.tahun || "-"}
                      </p>
                      {s.tingkat && (
                        <p
                          className={`mb-2 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <strong>Tingkat:</strong> {s.tingkat}
                        </p>
                      )}
                      {s.hasil && (
                        <p
                          className={`mb-2 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <strong>Hasil:</strong> {s.hasil}
                        </p>
                      )}

                      {pdfUrl && (
                        <button
                          onClick={() => setModalPDF(pdfUrl)}
                          className={`inline-block px-4 py-2 rounded-lg mb-4 transition ${
                            theme === "dark"
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-blue-400 text-white hover:bg-blue-500"
                          }`}
                        >
                          📄 Lihat PDF
                        </button>
                      )}
                    </div>

                    {/* KANAN */}
                    {pdfUrl && (
                      <div className="w-full md:w-[400px] lg:w-[450px] border border-gray-700 rounded-xl overflow-hidden shadow-inner bg-gray-950">
                        <object data={pdfUrl} type="application/pdf" width="100%" height="300px">
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

      {/* Modal PDF */}
      {modalPDF && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 p-4"
          onClick={() => setModalPDF(null)}
        >
          <div
            className="relative w-full h-full max-w-[90vw] max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe src={modalPDF} className="w-full h-full" title="PDF Preview"></iframe>
            <button
              onClick={() => setModalPDF(null)}
              className="absolute top-2 right-2 text-white bg-red-600 rounded-full w-8 h-8 flex justify-center items-center font-bold hover:bg-red-700 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Efek Neon */}
      <style jsx>{`
        .neon-glow {
    text-shadow: 0 0 10px #9be414, 0 0 20px #00ff99;
    transition: text-shadow 0.3s ease-in-out;
  }
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
          background: linear-gradient(120deg, #9be414, #00ff99, #9be414, #1effb2);
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

        .slide-in { 
  opacity: 1 !important; 
  transform: translateY(-40) !important; 
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
