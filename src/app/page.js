"use client";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="bg-black min-h-screen flex flex-col items-center py-16 px-4 gap-16 font-sans">
        
        {/* CARD UTAMA */}
        <div className="bg-gray-800 rounded-xl p-8 max-w-4xl w-full mx-auto text-white shadow-lg flex flex-col md:flex-row items-center gap-6">
          <img
            src="/profile.png"
            alt="Widi Nugroho"
            className="w-40 h-40 rounded-full object-cover shadow-md"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold font-poppins">
              WIDI <span className="text-blue-400">SURYO</span> NUGROHO
            </h1>

            <p className="mt-4 text-lg md:text-xl leading-relaxed">
              {expanded ? (
                <>
                  Saya merupakan mahasiswa Teknik Informatika Universitas Sebelas
                  Maret yang memiliki ketertarikan mendalam terhadap perancangan
                  dan pengembangan sistem berbasis web. Saya senang memahami
                  bagaimana sebuah website bekerja mulai dari alur sistem,
                  segmentasi pengguna, perancangan layout dan warna, hingga
                  pengalaman interaksi pengguna. Dalam pengembangan, saya sering
                  menggunakan React.js untuk frontend dan CodeIgniter 4 untuk
                  backend. Saya menikmati proses menerjemahkan kebutuhan pengguna
                  menjadi sistem yang fungsional dan efisien. Selain kemampuan
                  teknis, saya juga memiliki kepekaan visual dari pengalaman di
                  bidang fotografi dan videografi, yang membantu saya menciptakan
                  tampilan antarmuka yang menarik dan mudah digunakan. Saya dapat
                  bekerja baik secara individu maupun dalam tim, serta terbuka
                  untuk mempelajari berbagai tools dan teknologi baru yang
                  relevan dengan perkembangan dunia digital maupun kebutuhan proyek
                  yang saya kerjakan.
                </>
              ) : (
                <>
                  Saya merupakan mahasiswa Teknik Informatika Universitas Sebelas
                  Maret yang memiliki ketertarikan mendalam terhadap perancangan
                  dan pengembangan sistem berbasis web...
                </>
              )}
            </p>

            <button
              onClick={toggleExpanded}
              className="mt-2 text-blue-400 font-semibold hover:underline"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {expanded ? "Tampilkan Lebih Sedikit" : "Selengkapnya ..."}
            </button>
          </div>
        </div>

        {/* PORTOFOLIO */}
        <section className="w-full max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{
              fontFamily: "Poppins, sans-serif",
              textShadow: "0 0 10px rgba(255,255,255,0.6)",
            }}
          >
            Portofolio
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                href: "/projek",
                title: "Projek",
                desc: "Kumpulan projek web & konten video",
                color: "#3b82f6",
              },
              {
                href: "/sertifikat",
                title: "Sertifikat",
                desc: "Sertifikasi yang telah didapatkan",
                color: "#22c55e",
              },
              {
                href: "/lomba-kompetensi",
                title: "Lomba & Kompetensi",
                desc: "Prestasi & perlombaan yang diikuti",
                color: "#a855f7",
              },
              {
                href: "/organisasi",
                title: "Pengalaman & Organisasi",
                desc: "Daftar pengalaman yang pernah dijalani",
                color: "#eab308",
              },
              {
                href: "https://drive.google.com/file/d/1Kd5D2FGKnzQq7zFAFWd2aksUeG3ENbMA/view?usp=drive_link",
                title: "Curriculum Vitae",
                desc: "Lihat dan unduh CV",
                color: "#3b82f6",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex flex-col items-center justify-center px-6 py-4 w-[250px] rounded-2xl bg-gray-800 transition-all duration-300 transform hover:scale-105"
                style={{
                  boxShadow: `0 0 12px ${item.color}`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 12px ${item.color}, 0 0 30px ${item.color}`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 12px ${item.color}`)
                }
              >
                <span className="text-lg font-semibold text-white">
                  {item.title}
                </span>
                <span className="text-sm text-white/80 mt-1 text-center">
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* TOOLS */}
        <section className="w-full max-w-4xl mx-auto text-center mt-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{
              fontFamily: "Poppins, sans-serif",
              textShadow: "0 0 10px rgba(255,255,255,0.6)",
            }}
          >
            Tools
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: "Canon M50", shadow: "#3b82f6", logo: "https://image.similarpng.com/file/similarpng/original-picture/2020/06/Logo-canon-transparent-PNG.png" },
              { name: "CapCut", shadow: "#fff", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/capcut-icon.png" },
              { name: "Canva", shadow: "#187cf6", logo: "https://freelogopng.com/images/all_img/1656733807canva-icon-png.png" },
              { name: "Visual Studio Code", shadow: "#60a5fa", logo: "https://chris-ayers.com/assets/images/vscode-logo.png" },
              { name: "HTML", shadow: "#f59e0b", logo: "https://icones.pro/wp-content/uploads/2021/05/icone-html-orange.png" },
              { name: "CSS", shadow: "#3b82f6", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
              { name: "JavaScript", shadow: "#facc15", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
              { name: "Python", shadow: "#3b82f6", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
              { name: "PHP", shadow: "#6e41aa", logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
              { name: "React JS", shadow: "#61dafb", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
              { name: "CodeIgniter", shadow: "#DD4814", logo: "https://cdn.iconscout.com/icon/free/png-256/free-codeigniter-logo-icon-svg-download-png-1579761.png?f=webp" },
              { name: "Next JS", shadow: "#fff", logo: "https://logo.svgcdn.com/devicon/nextjs-original.png" },
              { name: "Golang", shadow: "#00ADD8", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/go-programming-language-icon.png" },
              { name: "Tools lain segera hadir", shadow: "#ffe600ff", logo: "https://cdn.pixabay.com/photo/2024/01/17/20/03/cartoon-8515557_960_720.png" },

            ].map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gray-800 transition-all duration-300 transform hover:scale-105"
                style={{ boxShadow: `0 0 12px ${tool.shadow}` }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 12px ${tool.shadow}, 0 0 30px ${tool.shadow}`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 12px ${tool.shadow}`)
                }
              >
                <img src={tool.logo} alt={tool.name} className="w-8 h-8 object-contain" />
                <span className="text-lg font-semibold text-white">{tool.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* KONTAK */}
        <section className="w-full max-w-4xl mx-auto text-center mt-10">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{
              fontFamily: "Poppins, sans-serif",
              textShadow: "0 0 10px rgba(255,255,255,0.6)",
            }}
          >
            Kontak & Media Sosial
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                href: "https://wa.me/6285727609498",
                icon: <FaWhatsapp className="text-[#25D366] text-2xl" />,
                label: "WhatsApp",
                color: "#25D366",
              },
              {
                href: "mailto:collabswithwidi@gmail.com",
                icon: <FaEnvelope className="text-[#EA4335] text-2xl" />,
                label: "Gmail",
                color: "#EA4335",
              },
              {
                href: "https://www.instagram.com/widingr23",
                icon: <FaInstagram className="text-pink-400 text-2xl" />,
                label: "Instagram",
                color: "#ec4899",
              },
              {
                href: "https://www.linkedin.com/in/widi-suryo-nugroho-a607632a2/",
                icon: <FaLinkedin className="text-blue-300 text-2xl" />,
                label: "LinkedIn",
                color: "#93c5fd",
              },
              {
                href: "https://github.com/WidiNug23",
                icon: <FaGithub className="text-white text-2xl" />,
                label: "Github",
                color: "#fff",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gray-800 transition-all duration-300 transform hover:scale-105"
                style={{ boxShadow: `0 0 12px ${item.color}` }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 12px ${item.color}, 0 0 30px ${item.color}`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 12px ${item.color}`)
                }
              >
                {item.icon}
                <span className="text-lg font-semibold text-white">{item.label}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
