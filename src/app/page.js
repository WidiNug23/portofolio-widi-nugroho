"use client";

import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { useTheme } from "./ThemeContext"; 
import Head from "next/head";
import Script from 'next/script';
import Link from "next/link";
import ProjekPage from "./projek/page";
import SertifikatPage from "./sertifikat/page";
import LombaPage from "./lomba-kompetensi/page";
import OrganisasiPage from "./organisasi/page";
import PendidikanPage from "./pendidikan/page";
import { SiShutterstock } from "react-icons/si";
import { FiLink } from "react-icons/fi";

// Komponen Custom Jam dengan Jarum Berputar
const SpinningClockIcon = () => (
  <svg 
    width="40" 
    height="40" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="text-blue-500"
  >
    {/* Bingkai Jam (Diam) */}
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12" className="origin-center animate-[spin_2s_linear_infinite]" />
    <polyline points="12 12 16 14" className="origin-center animate-[spin_12s_linear_infinite]" />
  </svg>
);

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
      { threshold: 0.1 }
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

function RotatingLabelItem({ item, theme }) {
  const [currentLabel, setCurrentLabel] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentLabel((prev) => (prev + 1) % item.labels.length);
        setFade(true);
      }, 500); 
    }, 3000);
    return () => clearInterval(interval);
  }, [item.labels.length]);

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 transform md:hover:scale-105 active:scale-95 cursor-pointer touch-manipulation relative z-10 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
      style={{
        boxShadow: `0 0 12px ${item.color}`,
        minWidth: "280px",
        justifyContent: "flex-start",
      }}
    >
      <div className="flex-shrink-0 w-8 flex justify-center items-center pointer-events-none">
        {item.icon}
      </div>
      <div className="relative flex-1 overflow-hidden h-8 pointer-events-none">
        <span
          className={`absolute left-0 text-lg font-semibold whitespace-nowrap ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
          style={{
            opacity: fade ? 1 : 0,
            transform: fade ? "translateX(0)" : "translateX(30px)",
            transition: fade 
              ? "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease" 
              : "transform 0.4s ease-in, opacity 0.4s ease",
          }}
        >
          {item.labels[currentLabel]}
        </span>
      </div>
    </a>
  );
}

export default function Home() {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isScrollReachedEnd, setIsScrollReachedEnd] = useState(false);
  const [highlightKontak, setHighlightKontak] = useState(false);
  
  const scrollRef = useRef(null);

  const checkScrollBottom = () => {
    const element = scrollRef.current;
    if (!element) return;
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
    if (isAtBottom) {
      setIsScrollReachedEnd(true);
    } else {
      setIsScrollReachedEnd(false);
    }
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    element.addEventListener("scroll", checkScrollBottom);
    const handleWheel = (e) => {
      const isScrollable = element.scrollHeight > element.clientHeight;
      if (!isScrollable) return;
      const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 2;
      const isAtTop = element.scrollTop <= 0;
      if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
        element.scrollTop += e.deltaY;
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      element.removeEventListener("scroll", checkScrollBottom);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const handler = () => {
      setHighlightKontak(true);
      setTimeout(() => setHighlightKontak(false), 3000);
    };
    window.addEventListener("highlightKontak", handler);
    return () => window.removeEventListener("highlightKontak", handler);
  }, []);

  const showSuryo = isHovered || isScrollReachedEnd;

  return (
    <>
<Head>
        <title>Portofolio - Widi Suryo Nugroho</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Google Analytics Global Site Tag */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-H9WW8B02DQ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-H9WW8B02DQ');
        `}
      </Script>
      <main
        className="min-h-screen flex flex-col items-center py-12 md:py-20 px-4 gap-16 md:gap-24 font-sans transition-colors duration-500 overflow-x-hidden"
        style={{ 
          backgroundColor: theme === "dark" ? "#000" : "#fff", 
          color: theme === "dark" ? "#fff" : "#000" 
        }}
      >
        {/* CARD UTAMA */}
        <div
          className={`rounded-[2rem] p-8 md:p-12 max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all duration-700 relative z-10
            ${theme === "dark" ? "bg-gray-900/40 border border-gray-800 shadow-xl" : "bg-white border border-gray-100 shadow-2xl"}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Foto Profil */}
          <div className="relative group flex-shrink-0">
            <div className={`absolute -inset-1 rounded-full blur-lg transition-all duration-700 ${showSuryo ? "bg-blue-500 opacity-30 scale-105" : "bg-transparent opacity-0"}`}></div>
            <img
              src="/profile.png"
              alt="Widi Nugroho"
              className={`relative w-40 h-40 md:w-52 md:h-52 rounded-full object-cover shadow-xl transition-all duration-700 ${
                showSuryo ? "scale-105" : "scale-100"
              }`}
            />
          </div>

          <div className="flex-1 text-center md:text-left w-full overflow-hidden">
            <h1 className="text-3xl md:text-5xl font-extrabold font-poppins mb-4 tracking-tight flex flex-wrap justify-center md:justify-start items-center">
              <span>WIDI</span>
              <span className={`transition-all duration-1000 ease-in-out overflow-hidden flex items-center ${showSuryo ? "max-w-[300px] opacity-100 mx-2 md:mx-3" : "max-w-0 opacity-0 mx-0"}`}>
                <span className="text-blue-500">SURYO</span>
              </span>
              <span className={`transition-all duration-700 ${!showSuryo && "ml-2 md:ml-3"}`}>NUGROHO</span>
            </h1>

            <div 
              ref={scrollRef}
              className={`relative pr-3 overflow-y-auto custom-scrollbar transition-all duration-500 overscroll-contain touch-auto ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
              style={{ maxHeight: "140px", WebkitOverflowScrolling: "touch" }} 
            >
              <p className="text-base md:text-lg leading-relaxed font-medium">
                Saya memiliki ketertarikan mendalam terhadap perancangan dan pengembangan sistem berbasis web. Saya senang memahami
                bagaimana sebuah website bekerja mulai dari alur sistem hingga pengalaman interaksi pengguna. Dalam pengembangan, saya sering menggunakan React.js untuk frontend dan CodeIgniter 4 untuk
                backend. Saya menikmati proses menerjemahkan kebutuhan pengguna menjadi sistem yang fungsional dan efisien. Selain kemampuan
                teknis, saya memiliki kepekaan visual dari pengalaman di bidang fotografi dan videografi. Saya dapat bekerja baik secara individu maupun dalam tim, serta{" "}
                <span className={`font-bold transition-all duration-500 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
                  terbuka untuk mempelajari berbagai teknologi baru.
                </span>
              </p>
            </div>
            
            <div className={`mt-5 h-1 bg-blue-500 rounded-full transition-all duration-1000 ${showSuryo ? "w-full opacity-100" : "w-16 opacity-50"}`}></div>
          </div>
        </div>

        {/* PORTOFOLIO */}
        <section className="w-full max-w-6xl mx-auto text-center px-4">
          <RevealItem delay={0}>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-10 font-poppins">Portofolio</h2>
          </RevealItem>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { href: "/#projek", title: "Projek", desc: "Kumpulan projek web & konten video", color: "#3b82f6" },
              { href: "/#sertifikat", title: "Sertifikat", desc: "Kumpulan Sertifikasi profesional", color: "#22c55e" },
              { href: "/#lomba", title: "Lomba & Kompetensi", desc: "Prestasi & perlombaan", color: "#a855f7" },
              { href: "/#organisasi", title: "Pengalaman & Organisasi", desc: "Daftar pengalaman organisasi", color: "#eab308" },
              { href: "/#pendidikan", title: "Pendidikan", desc: "Daftar pendidikan resmi", color: "#f50bbb" },
              { href: "https://drive.google.com/file/d/1sW7Bt4YlodMoGm5FnBj6WFdbw0h94T7W/view?usp=sharing", title: "Curriculum Vitae", desc: "Unduh CV terbaru saya", color: "#ef4444" },
            ].map((item, index) => (
              <RevealItem key={item.title} delay={100 * (index + 1)}>
                <Link
                  href={item.href}
                  className={`group flex flex-col items-center justify-center p-8 h-full rounded-[1.5rem] transition-all duration-300 border border-transparent md:hover:border-current active:scale-95 ${theme === "dark" ? "bg-gray-800/40" : "bg-white shadow-lg"}`}
                  style={{ boxShadow: `0 8px 30px -12px ${item.color}44`, color: item.color }}
                >
                  <span className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>{item.title}</span>
                  <span className="text-sm opacity-70 text-center">{item.desc}</span>
                </Link>
              </RevealItem>
            ))}
          </div>
        </section>

        {/* KONTAK */}
        <section id="kontak" className="w-full max-w-6xl mx-auto text-center px-4">
          <RevealItem delay={0}>
            <h2 className={`text-3xl md:text-4xl font-extrabold mb-10 font-poppins ${highlightKontak ? "text-blue-500 neon-glow" : ""}`}>Hubungi Saya</h2>
          </RevealItem>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {[
              { href: "https://github.com/WidiNug23", icon: <FaGithub className="text-2xl" />, labels: ["Github", "WidiNug23"], color: "#6e7681" },
              { href: "mailto:collabswithwidi@gmail.com", icon: <FaEnvelope className="text-2xl" />, labels: ["Email", "Gmail"], color: "#EA4335" },
              { href: "https://www.instagram.com/widingr23", icon: <FaInstagram className="text-2xl" />, labels: ["Follow", "Instagram"], color: "#ec4899" },
              { href: "https://www.linkedin.com/in/widi-suryo-nugroho-a607632a2/", icon: <FaLinkedin className="text-2xl" />, labels: ["Connect", "LinkedIn"], color: "#0077b5" },
              { href: "https://wa.me/6285727609498", icon: <FaWhatsapp className="text-2xl" />, labels: ["Chat", "WhatsApp"], color: "#25D366" },
              { href: "https://www.shutterstock.com/g/widinugroho23?rid=360011507", icon: <SiShutterstock className="text-2xl" />, labels: ["Assets", "Shutterstock"], color: "#FF3A00" },
              { href: "https://lynk.id/widinugroho23", icon: <FiLink className="text-2xl" />, labels: ["Links", "Lynk"], color: "#14b8a6" },
            ].map((item, index) => (
              <RevealItem key={index} delay={100 * (index + 1)}>
                <RotatingLabelItem item={item} theme={theme} />
              </RevealItem>
            ))}
          </div>
        </section>

        {/* TECH STACK */}
        <section className="w-full max-w-6xl mx-auto text-center px-4">
          <RevealItem delay={0}>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-10 font-poppins">Tools</h2>
          </RevealItem>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Canon M50", logo: "https://image.similarpng.com/file/similarpng/original-picture/2020/06/Logo-canon-transparent-PNG.png" },
              { name: "CapCut", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/capcut-icon.png" },
              { name: "Canva", logo: "https://freelogopng.com/images/all_img/1656733807canva-icon-png.png" },
              { name: "Lightroom", logo: "https://logo.svgcdn.com/logos/adobe-lightroom.png" },
              { name: "VS Code", logo: "https://logo.svgcdn.com/logos/visual-studio-code.png" },
              { name: "HTML", logo: "https://icones.pro/wp-content/uploads/2021/05/icone-html-orange.png" },
              { name: "CSS", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
              { name: "JavaScript", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
              { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
              { name: "PHP", logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
              { name: "XAMPP", logo: "https://logo.svgcdn.com/logos/xampp.png" },
              { name: "React JS", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
              { name: "CodeIgniter", logo: "https://cdn.iconscout.com/icon/free/png-256/free-codeigniter-logo-icon-svg-download-png-1579761.png?f=webp" },
              { name: "Laravel", logo: "https://logo.svgcdn.com/logos/laravel.png" },
              { name: "MySQL", logo: "https://images.icon-icons.com/2699/PNG/512/mysql_logo_icon_169940.png" },
              { name: "Next JS", logo: "https://logo.svgcdn.com/devicon/nextjs-original.png" },
              { name: "Golang", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/go-programming-language-icon.png" },
              { name: "Google Analytics", logo: "https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg" },
              { name: "Search Console", logo: "/uploads/google_search_console_icon-vector_brandlogos.net_hxtfr.png" },
              { name: "Microsoft", logo: "https://w7.pngwing.com/pngs/719/781/png-transparent-windows-logo-microsoft-windows-scalable-graphics-logo-computer-file-microsoft-logo-icon-angle-text-rectangle.png" },
              { name: "Android", logo: "https://www.freepnglogos.com/uploads/android-logo-png/android-logo-powerful-mobile-apps-for-those-with-disabilities-3.png" },
              // PERBAIKAN: Menggunakan komponen SpinningClockIcon
              { name: "Lainnya", customIcon: <SpinningClockIcon /> }, 
            ].map((tool, index) => (
              <RevealItem key={tool.name} delay={50 * index}>
                <div
                  className={`group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300 border ${theme === "dark" ? "bg-gray-800/20 border-gray-700 md:hover:bg-gray-800" : "bg-gray-50 border-gray-100 md:hover:bg-white md:hover:shadow-lg"}`}
                >
                  {tool.customIcon ? (
                    tool.customIcon
                  ) : (
                    <img src={tool.logo} alt={tool.name} className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110" />
                  )}
                  <span className="text-xs font-bold opacity-60 group-hover:opacity-100">{tool.name}</span>
                </div>
              </RevealItem>
            ))}
          </div>
        </section>

        <section id="projek" className="w-full"><ProjekPage /></section>
        <section id="sertifikat" className="w-full"><SertifikatPage /></section>
        <section id="lomba" className="w-full"><LombaPage /></section>
        <section id="organisasi" className="w-full"><OrganisasiPage /></section>
        <section id="pendidikan" className="w-full"><PendidikanPage /></section>
      </main>

      <style jsx global>{`
        html { scroll-behavior: smooth; -webkit-tap-highlight-color: transparent; }
        body { touch-action: pan-x pan-y; }
        .neon-glow { text-shadow: 0 0 15px rgba(59, 130, 246, 0.6); }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
      `}</style>
    </>
  );
}