"use client";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { useTheme } from "./ThemeContext"; // pastikan path benar
import Head from "next/head";
import Link from "next/link";

function RevealItem({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);
  const cursor = useRef({ x: 0, y: 0 });
  const trail = useRef([]);

  // Update data-theme di root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // // Canvas trail
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");

  //   const resize = () => {
  //     canvas.width = window.innerWidth;
  //     canvas.height = window.innerHeight;
  //   };
  //   window.addEventListener("resize", resize);
  //   resize();

  //   const handleMouseMove = (e) => {
  //     cursor.current = { x: e.clientX, y: e.clientY };
  //   };
  //   window.addEventListener("mousemove", handleMouseMove);

  //   const animate = () => {
  //     trail.current.push({ ...cursor.current });
  //     if (trail.current.length > 50) trail.current.shift();
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     ctx.lineWidth = 2;
  //     ctx.lineJoin = "round";
  //     ctx.lineCap = "round";

  //     for (let i = 1; i < trail.current.length; i++) {
  //       const p1 = trail.current[i - 1];
  //       const p2 = trail.current[i];
  //       const alpha = i / trail.current.length;
  //       const strokeColor =
  //         theme === "dark"
  //           ? `rgba(245,11,187,${alpha})`
  //           : `rgba(59,130,246,${alpha})`;
  //       ctx.strokeStyle = strokeColor;
  //       ctx.shadowBlur = 5;
  //       ctx.shadowColor = strokeColor;
  //       ctx.beginPath();
  //       ctx.moveTo(p1.x, p1.y);
  //       ctx.lineTo(p2.x, p2.y);
  //       ctx.stroke();
  //     }
  //     requestAnimationFrame(animate);
  //   };
  //   animate();

  //   // return () => {
  //   //   window.removeEventListener("resize", resize);
  //   //   window.removeEventListener("mousemove", handleMouseMove);
  //   // };
  // }, [theme]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Canvas jejak kursor */}
      {/* <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      /> */}

      <main
        className="min-h-screen flex flex-col items-center py-16 px-4 gap-16 font-sans transition-colors duration-500"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {/* BUTTON TOGGLE THEME */}
        {/* <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-500 ${
              theme === "dark"
                ? "bg-gray-800 text-yellow-400 shadow-[0_0_10px_yellow]"
                : "bg-gray-200 text-yellow-600 shadow-[0_0_10px_yellow]"
            }`}
          >
            {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div> */}

{/* CARD UTAMA */}
<div
  className={`rounded-xl p-8 max-w-4xl w-full mx-auto flex flex-col md:flex-row items-center gap-6 transition-all duration-500
    ${theme === "dark" ? "bg-gray-800 text-white shadow-lg" : "bg-white text-black shadow-md"}`}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <img
    src="/profile.png"
    alt="Widi Nugroho"
    className={`w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover shadow-md transition-transform duration-500 ${
      isHovered ? "scale-110" : "scale-100"
    }`}
  />
  <div className="flex-1 text-center md:text-left relative overflow-hidden">
    <h1
      className="text-2xl sm:text-3xl md:text-5xl font-bold font-poppins relative inline-flex items-center overflow-hidden transition-all duration-700"
      style={{
        textShadow: isHovered
          ? theme === "dark"
            ? "0 0 10px #3b82f6, 0 0 25px #60a5fa"
            : "0 0 10px #3b82f6, 0 0 25px #60a5fa"
          : theme === "dark"
          ? "0 0 3px rgba(59,130,246,0.3)"
          : "0 0 3px rgba(59,130,246,0.2)",
      }}
    >
      <span
        className={`inline-block transition-transform duration-700 ease-in-out ${
          isHovered ? "translate-x-0" : "translate-x-10 sm:translate-x-14 md:translate-x-16"
        }`}
      >
        WIDI
      </span>
      <span
        className={`inline-block text-blue-400 transition-all duration-700 ease-in-out mx-1 sm:mx-2 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3 sm:-translate-x-4"
        }`}
      >
        SURYO
      </span>
      <span
        className={`inline-block transition-transform duration-700 ease-in-out ${
          isHovered ? "translate-x-0" : "-translate-x-12 sm:-translate-x-20 md:-translate-x-24"
        }`}
      >
        NUGROHO
      </span>
    </h1>

    <p className={`mt-4 text-base sm:text-lg md:text-xl leading-relaxed transition-all duration-500 ${theme === "dark" ? "text-white/80" : "text-black/70"}`}>
      {expanded ? (
        <>
          Saya memiliki ketertarikan mendalam terhadap perancangan
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
          untuk mempelajari berbagai tools dan teknologi baru yang relevan
          dengan perkembangan dunia digital maupun kebutuhan proyek yang
          saya kerjakan.
        </>
      ) : (
        <>Saya memiliki ketertarikan mendalam terhadap perancangan dan pengembangan sistem berbasis web. Saya senang memahami ...</>
      )}
    </p>

    <button
      onClick={() => setExpanded(!expanded)}
      className="mt-2 font-semibold hover:underline"
      style={{
        fontFamily: "Poppins, sans-serif",
        color: theme === "dark" ? "#3b82f6" : "#1e40af",
      }}
    >
      {expanded ? "Tampilkan Lebih Sedikit" : "Selengkapnya ..."}
    </button>
  </div>
</div>

{/* PORTOFOLIO */}
<section className="w-full max-w-4xl mx-auto text-center">
  <RevealItem delay={0}>
    <h2
      className={`text-3xl md:text-4xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}
      style={{
        fontFamily: "Poppins, sans-serif",
        textShadow:
          theme === "dark"
            ? "0 0 10px rgba(255,255,255,0.6)"
            : "0 0 5px rgba(0,0,0,0.3)",
      }}
    >
      Portofolio
    </h2>
  </RevealItem>

  <div className="flex flex-wrap justify-center gap-6 font-poppins">
    {[
      { href: "/projek", title: "Projek", desc: "Kumpulan projek web & konten video", color: "#3b82f6" },
      { href: "/sertifikat", title: "Sertifikat", desc: "Sertifikasi yang telah didapatkan", color: "#22c55e" },
      { href: "/lomba-kompetensi", title: "Lomba & Kompetensi", desc: "Prestasi & perlombaan yang diikuti", color: "#a855f7" },
      { href: "/organisasi", title: "Pengalaman & Organisasi", desc: "Daftar pengalaman yang pernah dijalani", color: "#eab308" },
      { href: "/pendidikan", title: "Pendidikan", desc: "Daftar pendidikan yang ditempuh", color: "#f50bbbff" },
      { href: "https://drive.google.com/file/d/1Kd5D2FGKnzQq7zFAFWd2aksUeG3ENbMA/view?usp=drive_link", title: "Curriculum Vitae", desc: "Lihat dan unduh CV", color: "#3b82f6" },
    ].map((item, index) => (
      <RevealItem key={item.title} delay={150 * (index + 1)}>
        <Link
          href={item.href}
          className={`flex flex-col items-center justify-center px-6 py-4 w-[250px] rounded-2xl transition-all duration-300 transform hover:scale-105 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
          style={{
            boxShadow: `0 0 12px ${item.color}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 25px ${item.color}, 0 0 50px ${item.color}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 0 12px ${item.color}`;
          }}
        >
          <span className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>{item.title}</span>
          <span className={`text-sm mt-1 text-center ${theme === "dark" ? "text-white/80" : "text-black/70"}`}>{item.desc}</span>
        </Link>
      </RevealItem>
    ))}
  </div>
</section>

{/* TOOLS */}
<section className="w-full max-w-4xl mx-auto text-center mt-8">
  <RevealItem delay={0}>
    <h2
      className={`text-3xl md:text-4xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}
      style={{
        fontFamily: "Poppins, sans-serif",
        textShadow: theme === "dark" ? "0 0 10px rgba(255,255,255,0.6)" : "0 0 5px rgba(0,0,0,0.3)",
      }}
    >
      Tools
    </h2>
  </RevealItem>

  <div className="flex flex-wrap justify-center gap-6 font-poppins">
    {[
      { name: "Canon M50", shadow: "#3b82f6", logo: "https://image.similarpng.com/file/similarpng/original-picture/2020/06/Logo-canon-transparent-PNG.png" },
      { name: "CapCut", shadow: "#000", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/capcut-icon.png" },
      { name: "Canva", shadow: "#187cf6", logo: "https://freelogopng.com/images/all_img/1656733807canva-icon-png.png" },
      { name: "Visual Studio Code", shadow: "#60a5fa", logo: "https://chris-ayers.com/assets/images/vscode-logo.png" },
      { name: "HTML", shadow: "#f59e0b", logo: "https://icones.pro/wp-content/uploads/2021/05/icone-html-orange.png" },
      { name: "CSS", shadow: "#3b82f6", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
      { name: "JavaScript", shadow: "#facc15", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
      { name: "Python", shadow: "#3b82f6", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
      { name: "PHP", shadow: "#6e41aa", logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
      { name: "React JS", shadow: "#61dafb", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
      { name: "CodeIgniter", shadow: "#DD4814", logo: "https://cdn.iconscout.com/icon/free/png-256/free-codeigniter-logo-icon-svg-download-png-1579761.png?f=webp" },
      { name: "MySQL", shadow: "#2ac3edff", logo: "https://images.icon-icons.com/2699/PNG/512/mysql_logo_icon_169940.png" },
      { name: "Next JS", shadow: theme === "dark" ? "#fff" : "#111", logo: "https://logo.svgcdn.com/devicon/nextjs-original.png" },
      { name: "Golang", shadow: "#00ADD8", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/go-programming-language-icon.png" },
      { name: "Windows", shadow: "#facc15", logo: "https://w7.pngwing.com/pngs/719/781/png-transparent-windows-logo-microsoft-windows-scalable-graphics-logo-computer-file-microsoft-logo-icon-angle-text-rectangle.png" },
      { name: "Android", shadow: "#2bd800ff", logo: "https://www.freepnglogos.com/uploads/android-logo-png/android-logo-powerful-mobile-apps-for-those-with-disabilities-3.png" },
      { name: "Tools lain segera hadir", shadow:"#ffe600ff", logo: "https://cdn.pixabay.com/photo/2024/01/17/20/03/cartoon-8515557_960_720.png" },
    ].map((tool, index) => (
      <RevealItem key={tool.name} delay={150 * (index + 1)}>
        <div
          className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-500 transform hover:scale-105 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
          style={{ boxShadow: `0 0 12px ${tool.shadow}` }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 25px ${tool.shadow}, 0 0 50px ${tool.shadow}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 0 12px ${tool.shadow}`;
          }}
        >
          <img 
            src={tool.logo} 
            alt={tool.name} 
            className="w-8 h-8 object-contain" 
            style={{ filter: tool.name === "Next JS" && theme === "light" ? "invert(1)" : "none" }}
          />
          <span className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>{tool.name}</span>
        </div>
      </RevealItem>
    ))}
  </div>
</section>


{/* KONTAK */}
<section className="w-full max-w-4xl mx-auto text-center mt-10">
  <RevealItem delay={0}>
    <h2
      className={`text-3xl md:text-4xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}
      style={{
        fontFamily: "Poppins, sans-serif",
        textShadow: theme === "dark" ? "0 0 10px rgba(255,255,255,0.6)" : "0 0 5px rgba(0,0,0,0.3)",
      }}
    >
      Kontak & Media Sosial
    </h2>
  </RevealItem>

  <div className="flex flex-wrap justify-center gap-6 font-poppins">
    {[
      {
        href: "https://github.com/WidiNug23",
        icon: <FaGithub className="text-2xl" style={{ color: theme === "light" ? "#111" : "#fff" }} />,
        label: "Github",
        color: theme === "dark" ? "#fff" : "#111",
      },
      { href: "mailto:collabswithwidi@gmail.com", icon: <FaEnvelope className="text-[#EA4335] text-2xl" />, label: "Gmail", color: "#EA4335" },
      { href: "https://www.instagram.com/widingr23", icon: <FaInstagram className="text-pink-400 text-2xl" />, label: "Instagram", color: "#ec4899" },
      { href: "https://www.linkedin.com/in/widi-suryo-nugroho-a607632a2/", icon: <FaLinkedin className="text-blue-300 text-2xl" />, label: "LinkedIn", color: "#93c5fd" },
      { href: "https://wa.me/6285727609498", icon: <FaWhatsapp className="text-[#25D366] text-2xl" />, label: "WhatsApp", color: "#25D366" },

    ].map((item, index) => (
      <RevealItem key={item.label} delay={150 * (index + 1)}>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
          style={{ boxShadow: `0 0 12px ${item.color}` }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 25px ${item.color}, 0 0 50px ${item.color}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 0 12px ${item.color}`;
          }}
        >
          {item.icon}
          <span className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>{item.label}</span>
        </a>
      </RevealItem>
    ))}
  </div>
</section>



      </main>
    </>
  );
}


