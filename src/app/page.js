"use client";

import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { useTheme } from "./ThemeContext"; 
import Script from 'next/script';
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { SiShutterstock } from "react-icons/si";
import { FiLink } from "react-icons/fi";

// Lazy load sub-halaman mumpung filenya banyak agar bundle size halaman utama kecil
const ProjekPage = dynamic(() => import("./projek/page"), { ssr: false });
const SertifikatPage = dynamic(() => import("./sertifikat/page"), { ssr: false });
const LombaPage = dynamic(() => import("./lomba-kompetensi/page"), { ssr: false });
const OrganisasiPage = dynamic(() => import("./organisasi/page"), { ssr: false });
const PendidikanPage = dynamic(() => import("./pendidikan/page"), { ssr: false });

function RevealContainer({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        ref.current?.classList.add("reveal-active");
        observer.disconnect();
      }
    }, { threshold: 0.05 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal-init">
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
      }, 350); 
    }, 4000);
    return () => clearInterval(interval);
  }, [item.labels.length]);

  return (
    <a href={item.href} 
       target="_blank" 
       rel="noopener noreferrer" 
       /* - Mobile (default): w-14 h-14 rounded-full justify-center (jadi lingkaran & hanya logo)
          - Desktop (md): md:w-full md:h-auto md:rounded-2xl md:justify-start (kembali memanjang)
       */
       className={`flex items-center justify-center md:justify-start gap-4 p-3 md:px-5 md:py-3.5 w-14 h-14 md:w-full md:h-auto rounded-full md:rounded-2xl transition-all duration-300 transform md:hover:scale-105 active:scale-95 cursor-pointer relative z-10 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`} 
       style={{ boxShadow: `0 0 12px ${item.color}` }}>
      
      {/* Icon pembungkus tetap rata tengah */}
      <div className="flex-shrink-0 flex justify-center items-center text-center">{item.icon}</div>
      
      {/* Teks hanya muncul di layar desktop (md:flex) dan tersembunyi di mobile (hidden) */}
      <div className="relative flex-1 overflow-hidden h-8 hidden md:flex items-center">
        <span className={`absolute left-0 text-base md:text-lg font-semibold whitespace-nowrap ${theme === "dark" ? "text-white" : "text-black"}`}
          style={{ 
            opacity: fade ? 1 : 0, 
            transform: fade ? "translateX(0)" : "translateX(20px)", 
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease"
          }}>
          {item.labels[currentLabel]}
        </span>
      </div>
    </a>
  );
}

export default function Home() {
  const { theme } = useTheme();
  const [showSuryo, setShowSuryo] = useState(false);
  const [highlightKontak, setHighlightKontak] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [chartRendered, setChartRendered] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowSuryo(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = () => {
      setHighlightKontak(true);
      setTimeout(() => setHighlightKontak(false), 3000);
    };
    window.addEventListener("highlightKontak", handler);
    return () => window.removeEventListener("highlightKontak", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setChartRendered(true); 
        }
      },
      { rootMargin: "200px 0px" } 
    );
    if (chartRef.current) observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, []);

  const toolsData = [
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
    { name: "Supabase", logo: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" },
    { name: "Microsoft", logo: "https://w7.pngwing.com/pngs/719/781/png-transparent-windows-logo-microsoft-windows-scalable-graphics-logo-computer-file-microsoft-logo-icon-angle-text-rectangle.png" },
    { name: "Android", logo: "https://www.freepnglogos.com/uploads/android-logo-png/android-logo-powerful-mobile-apps-for-those-with-disabilities-3.png" },
  ];

  const totalItems = toolsData.length;

  const createPieSlice = (index, total, innerRadius, outerRadius) => {
    const anglePerSlice = 360 / total;
    const startAngle = index * anglePerSlice - 90; 
    const endAngle = startAngle + anglePerSlice;
    const rad = Math.PI / 180;
    const x1 = 250 + outerRadius * Math.cos(startAngle * rad);
    const y1 = 250 + outerRadius * Math.sin(startAngle * rad);
    const x2 = 250 + outerRadius * Math.cos(endAngle * rad);
    const y2 = 250 + outerRadius * Math.sin(endAngle * rad);
    const x3 = 250 + innerRadius * Math.cos(endAngle * rad);
    const y3 = 250 + innerRadius * Math.sin(endAngle * rad);
    const x4 = 250 + innerRadius * Math.cos(startAngle * rad);
    const y4 = 250 + innerRadius * Math.sin(startAngle * rad);
    const midAngle = startAngle + anglePerSlice / 2;
    const moveX = Math.cos(midAngle * rad) * 12; 
    const moveY = Math.sin(midAngle * rad) * 12;
    const logoRadius = (innerRadius + outerRadius) / 2;
    const logoX = 250 + logoRadius * Math.cos(midAngle * rad);
    const logoY = 250 + logoRadius * Math.sin(midAngle * rad);
    const pathData = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;
    return { pathData, logoX, logoY, moveX, moveY };
  };

  return (
    <>
      {/* Google Fonts Poppins di-load secara non-blocking melalui tag link global standar */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&display=swap" rel="stylesheet" media="print" onLoad="this.media='all'" />

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-H9WW8B02DQ" strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-H9WW8B02DQ');`}
      </Script>

      <div className="relative w-full transition-colors duration-500" style={{ backgroundColor: theme === "dark" ? "#000" : "#fff" }}>
        
        {/* --- SECTION 1: STICKY CARD --- */}
        <section className="md:sticky md:top-0 min-h-screen w-full flex items-center justify-center px-4 py-12 md:py-0 z-0">
          <div className={`rounded-[2rem] p-6 md:p-12 max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all duration-1000 
            ${theme === "dark" ? "bg-gray-900/40 border-gray-800" : "bg-white border-gray-100"} border shadow-2xl backdrop-blur-sm`}>
            
            <div className="relative group flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52">
              <div className={`absolute -inset-1 rounded-full blur-lg transition-all duration-700 ${showSuryo ? "bg-blue-500 opacity-30 scale-105" : "bg-transparent opacity-0"}`}></div>
              <Image 
                src="/profile.png" 
                alt="Widi" 
                width={208} 
                height={208} 
                priority
                className={`relative rounded-full object-cover w-full h-full transition-all duration-700 ${showSuryo ? "scale-105" : "scale-100"}`} 
              />
            </div>

            <div className="flex-1 text-center md:text-left w-full">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-poppins mb-4 tracking-tight flex flex-wrap justify-center md:justify-start items-center">
                <span>WIDI</span>
                <span className={`transition-all duration-1000 ease-in-out overflow-hidden flex items-center ${showSuryo ? "max-w-[150px] md:max-w-[300px] opacity-100 mx-2" : "max-w-0 opacity-0 mx-0"}`}>
                  <span className="text-blue-500 uppercase">Suryo</span>
                </span>
                <span className={`transition-all duration-700 ${!showSuryo && "ml-2"}`}>NUGROHO</span>
              </h1>

              <div className={`transition-all duration-500 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                  Lulusan D3 Teknik Informatika Universitas Sebelas Maret (IPK 3.81) dengan fokus dan ketertarikan mendalam pada
                  pengembangan perangkat lunak serta ekosistem bisnis digital. Berpengalaman dalam proyek magang dan freelance yang
                  memperkuat keahlian praktis sebagai Full Stack Developer, Front End Developer, dan System Analyst. Saya adalah
                  seorang problem solver yang dedikatif dalam menciptakan solusi teknologi yang efisien, inovatif, dan berdampak.
                  Saya dapat bekerja baik secara individu maupun dalam tim, serta{" "}
                  <span className={`font-bold transition-all duration-500 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
                    terbuka untuk mempelajari berbagai teknologi baru.
                  </span>
                </p>
              </div>
              <div className={`mt-5 h-1 bg-blue-500 rounded-full transition-all duration-1000 mx-auto md:mx-0 ${showSuryo ? "w-full opacity-100" : "w-16 opacity-50"}`}></div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: CONTENT LAYER --- */}
        <section className="relative z-10 w-full rounded-t-[2.5rem] md:rounded-t-[5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] py-12 md:py-20 px-4 md:px-10"
          style={{ backgroundColor: theme === "dark" ? "#0a0a0a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#000" }}>
          
          {/* PORTOFOLIO */}
          <div className="max-w-6xl mx-auto mb-20 md:mb-24">
            <RevealContainer>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-8 md:mb-12 text-center font-poppins">Portofolio</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  { href: "/#projek", title: "Projek", desc: "Kumpulan projek web & konten video", color: "#3b82f6" },
                  { href: "/#sertifikat", title: "Sertifikat", desc: "Kumpulan Sertifikasi profesional", color: "#22c55e" },
                  { href: "/#lomba", title: "Lomba & Kompetensi", desc: "Prestasi & perlombaan", color: "#a855f7" },
                  { href: "/#organisasi", title: "Pengalaman & Organisasi", desc: "Daftar pengalaman organisasi", color: "#eab308" },
                  { href: "/#pendidikan", title: "Pendidikan", desc: "Daftar pendidikan resmi", color: "#f50bbb" },
                  { href: "https://drive.google.com/file/d/1Csizb5mlVzvNT1ZqfNY2WfktF3iFWPwq/view?usp=sharing", title: "Curriculum Vitae", desc: "Unduh CV terbaru saya", color: "#ef4444" },
                ].map((item) => (
                  <Link key={item.title} href={item.href} className={`group flex flex-col items-center justify-center p-8 md:p-10 h-full rounded-[2rem] transition-all duration-300 border border-transparent md:hover:border-current active:scale-95 ${theme === "dark" ? "bg-gray-800/40" : "bg-white shadow-xl"}`} style={{ color: item.color }}>
                    <span className={`text-lg md:text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>{item.title}</span>
                    <span className="text-xs md:text-sm opacity-70 text-center">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </RevealContainer>
          </div>

          {/* HUBUNGI SAYA */}
          <div id="kontak" className="max-w-4xl mx-auto mb-20 md:mb-24 px-4">
            <RevealContainer>
              <h2 className={`text-3xl md:text-4xl font-extrabold mb-10 md:mb-12 text-center font-poppins transition-all duration-300 ${highlightKontak ? "text-blue-500 scale-110" : ""}`}>Hubungi Saya</h2>
              
              {/* - Mobile: grid-cols-2 dengan item rata tengah (justify-items-center). 
                  - Desktop (md): otomatis menyesuaikan grid layout yang memanjang (md:grid-cols-2 lg:grid-cols-3)
              */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center justify-center max-w-md md:max-w-none mx-auto w-full">
                {[
                  { href: "https://github.com/WidiNug23", icon: <FaGithub className="text-2xl" />, labels: ["Github", "WidiNug23"], color: "#6e7681" },
                  { href: "mailto:collabswithwidi@gmail.com", icon: <FaEnvelope className="text-2xl" />, labels: ["Email", "Gmail"], color: "#EA4335" },
                  { href: "https://www.instagram.com/widingr23", icon: <FaInstagram className="text-2xl" />, labels: ["Follow", "Instagram"], color: "#ec4899" },
                  { href: "https://www.tiktok.com/@widnug23", icon: <FaTiktok className="text-2xl" />, labels: ["Follow", "TikTok"], color: "#6e7681" },
                  { href: "https://www.linkedin.com/in/widi-suryo-nugroho-a607632a2/", icon: <FaLinkedin className="text-2xl" />, labels: ["Connect", "LinkedIn"], color: "#0077b5" },
                  { href: "https://wa.me/6285727609498", icon: <FaWhatsapp className="text-2xl" />, labels: ["Chat", "WhatsApp"], color: "#25D366" },
                  { href: "https://www.shutterstock.com/g/widinugroho23?rid=360011507", icon: <SiShutterstock className="text-2xl" />, labels: ["Assets", "Shutterstock"], color: "#FF3A00" },
                  { href: "https://lynk.id/widinugroho23", icon: <FiLink className="text-2xl" />, labels: ["Links", "Lynk"], color: "#14b8a6" },
                ].map((item, index) => (
                  <RotatingLabelItem key={index} item={item} theme={theme} />
                ))}
              </div>
            </RevealContainer>
          </div>

          {/* AREA INTERACTIVE PIE CHART TOOLS SYSTEM */}
          <div ref={chartRef} className="max-w-6xl mx-auto mb-28 md:mb-36 text-center px-4 overflow-hidden min-h-[400px]">
            {chartRendered && (
              <div className="relative flex items-center justify-center min-h-[350px] sm:min-h-[520px] md:min-h-[640px] lg:min-h-[700px] w-full max-w-[750px] mx-auto select-none content-visibility-auto">
                <svg viewBox="0 0 500 500" className="w-full h-auto max-h-[90vw] overflow-visible animate-[pieRotateIn_1s_ease-out]">
                  <g>
                    {toolsData.map((tool, index) => {
                      const isHovered = hoveredIndex === index;
                      const sliceInfo = createPieSlice(index, totalItems, 115, 245);
                      const defaultSliceColor = theme === "dark" 
                        ? (index % 2 === 0 ? "rgba(31, 41, 55, 0.45)" : "rgba(17, 24, 39, 0.6)")
                        : (index % 2 === 0 ? "rgba(241, 245, 249, 0.95)" : "rgba(226, 232, 240, 0.85)");

                      const strokeColor = theme === "dark" ? "#1e293b" : "#cbd5e1";
                      const logoSize = 32; 

                      return (
                        <g 
                          key={tool.name}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className="cursor-pointer"
                          style={{
                            transform: isHovered ? `translate(${sliceInfo.moveX}px, ${sliceInfo.moveY}px) scale(1.03)` : 'translate(0px, 0px) scale(1)',
                            transformOrigin: '250px 250px',
                            transition: 'transform 0.3s ease-out',
                          }}
                        >
                          <path
                            d={sliceInfo.pathData}
                            fill={isHovered ? "rgba(59, 130, 246, 0.25)" : defaultSliceColor}
                            stroke={isHovered ? "#3b82f6" : strokeColor}
                            strokeWidth={isHovered ? "2.5" : "1"}
                          />
                          <image
                            href={tool.logo}
                            x={sliceInfo.logoX - logoSize / 2}
                            y={sliceInfo.logoY - logoSize / 2}
                            width={logoSize}
                            height={logoSize}
                            className="object-contain pointer-events-none"
                            style={{ 
                              transform: isHovered ? 'scale(1.25)' : 'scale(1)', 
                              transformOrigin: `${sliceInfo.logoX}px ${sliceInfo.logoY}px`,
                              transition: 'transform 0.3s ease-out'
                            }}
                          />
                        </g>
                      );
                    })}
                  </g>
                </svg>

                {/* AREA PUSAT LINGKARAN */}
                <div className={`absolute z-30 w-[38%] h-[38%] rounded-full flex flex-col items-center justify-center p-3 text-center border pointer-events-none backdrop-blur-md shadow-inner ${
                    theme === "dark" ? "bg-black/90 border-gray-800 shadow-black" : "bg-white/95 border-gray-200/60 shadow-gray-200"
                  }`}
                >
                  {hoveredIndex !== null ? (
                    <div className="flex flex-col items-center justify-center w-full">
                      <div className="h-10 sm:h-14 flex items-center justify-center mb-1 sm:mb-2">
                        <img src={toolsData[hoveredIndex].logo} alt={toolsData[hoveredIndex].name} className="w-8 h-8 sm:w-12 sm:h-12 object-contain" />
                      </div>
                      <span className={`text-[9px] sm:text-xs font-black uppercase tracking-widest px-1.5 py-0.5 sm:px-2 rounded-md ${theme === "dark" ? "text-blue-400 bg-blue-950/40" : "text-blue-600 bg-blue-50"}`}>
                        {toolsData[hoveredIndex].name}
                      </span>
                    </div>
                  ) : (
                    <div className="text-center opacity-70">
                      <span className="text-[4vw] sm:text-[3.5vw] md:text-base font-bold uppercase tracking-[0.12em] block text-blue-500 font-poppins">Tech Stack</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* PAGES IMPORT */}
          <div id="projek" className="pt-16 md:pt-24"><ProjekPage /></div>
          <div id="sertifikat" className="pt-16 md:pt-24"><SertifikatPage /></div>
          <div id="lomba" className="pt-16 md:pt-24"><LombaPage /></div>
          <div id="organisasi" className="pt-16 md:pt-24"><OrganisasiPage /></div>
          <div id="pendidikan" className="pt-16 md:pt-24"><PendidikanPage /></div>
        </section>
      </div>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; overflow-x: hidden; width: 100%; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        * { box-sizing: border-box; }

        .reveal-init { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .reveal-active { opacity: 1; transform: translateY(0); }

        @keyframes pieRotateIn {
          from { opacity: 0; transform: scale(0.8) rotate(-90deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </>
  );
}