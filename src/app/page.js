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
import dynamic from "next/dynamic";
import { SiShutterstock } from "react-icons/si";
import { FiLink } from "react-icons/fi";

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

export default function Home() {
  const { theme } = useTheme();
  const [highlightKontak, setHighlightKontak] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [chartRendered, setChartRendered] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [chartProgress, setChartProgress] = useState(0);
  
  const chartRef = useRef(null);

  // Perbaikan Total untuk Refresh dengan Hash (Mengatasi bug lompat ke posisi salah pada komponen dinamis)
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (window.location.hash) {
      const cleanId = window.location.hash.substring(1);
      window.scrollTo(0, 0);

      const scrollToTarget = () => {
        const section = document.getElementById(cleanId);
        if (section) {
          const offset = 90; // Tinggi offset navbar
          const elementPosition = section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
        }
      };

      // Berikan beberapa tahap jeda waktu karena komponen halaman dimuat secara dinamis (ssr: false)
      const timer1 = setTimeout(scrollToTarget, 200);
      const timer2 = setTimeout(scrollToTarget, 600);
      const timer3 = setTimeout(scrollToTarget, 1200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);

      if (chartRef.current) {
        const rect = chartRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const elementCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        const distanceFromCenter = elementCenter - screenCenter;
        
        const maxDistance = windowHeight * 0.7;
        let progress = 1 - Math.abs(distanceFromCenter) / maxDistance;
        progress = Math.max(0, Math.min(1, progress));
        
        setChartProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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
    { name: "Lightroom", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" },
    { name: "VS Code", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" },
    { name: "HTML", logo: "https://icones.pro/wp-content/uploads/2021/05/icone-html-orange.png" },
    { name: "CSS", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
    { name: "JavaScript", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
    { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
    { name: "PHP", logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
    { name: "XAMPP", logo: "https://upload.wikimedia.org/wikipedia/commons/d/dc/XAMPP_Logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" },
    { name: "React JS", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
    { name: "CodeIgniter", logo: "https://cdn.iconscout.com/icon/free/png-256/free-codeigniter-logo-icon-svg-download-png-1579761.png?f=webp" },
    { name: "Laravel", logo: "https://static.cdnlogo.com/logos/l/23/laravel.svg" },
    { name: "MySQL", logo: "https://images.icon-icons.com/2699/PNG/512/mysql_logo_icon_169940.png" },
    { name: "Next JS", logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nextjs.svg" },
    { name: "Golang", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/go-programming-language-icon.png" },
    { name: "GIT", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg" },
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
    const cx = 350;
    const cy = 350;
    const x1 = cx + outerRadius * Math.cos(startAngle * rad);
    const y1 = cy + outerRadius * Math.sin(startAngle * rad);
    const x2 = cx + outerRadius * Math.cos(endAngle * rad);
    const y2 = cy + outerRadius * Math.sin(endAngle * rad);
    const x3 = cx + innerRadius * Math.cos(endAngle * rad);
    const y3 = cy + innerRadius * Math.sin(endAngle * rad);
    const x4 = cx + innerRadius * Math.cos(startAngle * rad);
    const y4 = cy + innerRadius * Math.sin(startAngle * rad);
    const midAngle = startAngle + anglePerSlice / 2;
    const moveX = Math.cos(midAngle * rad) * 12; 
    const moveY = Math.sin(midAngle * rad) * 12;
    const logoRadius = (innerRadius + outerRadius) / 2;
    const logoX = cx + logoRadius * Math.cos(midAngle * rad);
    const logoY = cy + logoRadius * Math.sin(midAngle * rad);
    const pathData = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;
    return { pathData, logoX, logoY, moveX, moveY, midAngle };
  };

  const services = [
    "Development Website",
    "Videografi",
    "Fotografi",
    "Pembuatan Dokumen",
    "Pengumpulan Data",
  ];

  const scrollCardProgress = Math.min(Math.max((scrollPos - 20) / 300, 0), 1);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&display=swap" rel="stylesheet" media="print" onLoad="this.media='all'" />

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-H9WW8B02DQ" strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-H9WW8B02DQ');`}
      </Script>

      <div className="relative w-full transition-colors duration-500" style={{ backgroundColor: theme === "dark" ? "#000" : "#fff" }}>
        
        {/* Hero Section */}
        <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-10 md:py-0 z-0">
          <div className="max-w-4xl w-full mx-auto text-center flex flex-col items-center">
            
            <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold font-poppins mb-4 sm:mb-6 tracking-tight flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4">
              <span>WIDI</span>
              <span>NUGROHO</span>
            </h1>

            <div className={`transition-all duration-500 max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              <p className="text-sm sm:text-lg md:text-xl leading-relaxed font-normal mb-6 sm:mb-8 px-2">
                Lulusan Teknik Informatika{" "}
                <a 
                  href="https://uns.ac.id/id/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 underline decoration-blue-400/50 underline-offset-4 font-medium hover:text-blue-600 transition-colors"
                >
                  UNS
                </a>{" "}
                (IPK 3.81) yang menyukai perkembangan teknologi. Antusias dalam Development Website atau perangkat lunak, pembuatan alur sistem, dan manajemen data.
              </p>

              {/* Services / Layanan */}
              <div className="mb-8 sm:mb-12">
                <p className="text-xs sm:text-base font-medium mb-3 sm:mb-5 opacity-70">
                  Kebanyakan orang menghubungi saya saat mereka membutuhkan:
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3.5">
                  {services.map((service, index) => {
                    const itemDelayThreshold = index * 0.15;
                    const isActive = scrollCardProgress > itemDelayThreshold;

                    const backgroundStyle = theme === "dark"
                      ? { 
                          backgroundColor: isActive ? "rgba(29, 78, 216, 0.65)" : "transparent", 
                          borderColor: isActive ? "#2563eb" : "transparent",
                          color: "#bfdbfe" 
                        }
                      : { 
                          backgroundColor: isActive ? "#dbeafe" : "transparent", 
                          borderColor: isActive ? "#2563eb" : "transparent",
                          color: "#1d4ed8" 
                        };

                    return (
                      <div 
                        key={index}
                        className="relative overflow-hidden text-xs sm:text-lg md:text-xl px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold transition-all duration-300"
                        style={{ color: theme === "dark" ? "#e5e7eb" : "#1f2937" }}
                      >
                        <div 
                          className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 transition-all duration-700 ease-out z-0 shadow-md"
                          style={{
                            ...backgroundStyle,
                            transform: isActive ? "translateX(0%)" : "translateX(-105%)",
                            opacity: isActive ? 1 : 0,
                          }}
                        />
                        <span className="relative z-10">
                          {service}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <a 
                  href="https://drive.google.com/file/d/1s-ildIIrPXcifuOSgcwJs12aC0Y7-vBh/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-base font-bold text-white rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700"
                >
                  CV
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative z-10 w-full rounded-t-[2rem] sm:rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] py-10 sm:py-20 px-3 sm:px-10"
          style={{ backgroundColor: theme === "dark" ? "#0a0a0a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#000" }}>
          
          {/* Let's Make Collaboration */}
          <div id="kontak" className="max-w-4xl mx-auto px-4 pt-4 pb-8 sm:pb-12">
            <RevealContainer>
              <h2 className={`text-2xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-10 text-center font-poppins transition-all duration-300 ${highlightKontak ? "text-blue-500 scale-105" : ""}`}>
                Let's Make Collaboration
              </h2>
              
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 max-w-2xl mx-auto">
                {[
                  { href: "https://github.com/WidiNug23", icon: <FaGithub className="text-xl sm:text-3xl" /> },
                  { href: "mailto:collabswithwidi@gmail.com", icon: <FaEnvelope className="text-xl sm:text-3xl" /> },
                  { href: "https://www.instagram.com/widingr23", icon: <FaInstagram className="text-xl sm:text-3xl" /> },
                  { href: "https://www.tiktok.com/@widnug23", icon: <FaTiktok className="text-xl sm:text-3xl" /> },
                  { href: "https://www.linkedin.com/in/widi-suryo-nugroho-a607632a2/", icon: <FaLinkedin className="text-xl sm:text-3xl" /> },
                  { href: "https://lynk.id/widinugroho23", icon: <FiLink className="text-xl sm:text-3xl" /> },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center shadow-md group ${
                      theme === "dark" 
                        ? "bg-gray-900 hover:bg-blue-600 text-white border-gray-800 hover:border-blue-500" 
                        : "bg-white hover:bg-blue-600 text-gray-800 hover:text-white border-gray-100 hover:border-blue-500"
                    } border`}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </RevealContainer>
          </div>

          {/* Pie Chart / Tech Stack Section */}
          <div ref={chartRef} className="w-full flex items-center justify-center py-8 sm:py-16 px-2 sm:px-4 mb-10 sm:mb-20 overflow-visible">
            {chartRendered && (
              <div className="relative flex items-center justify-center w-full max-w-[650px] mx-auto select-none scale-90 sm:scale-100">
                <svg viewBox="0 0 700 700" className="w-full h-auto overflow-visible">
                  <g>
                    {toolsData.map((tool, index) => {
                      const isHovered = hoveredIndex === index;
                      const sliceInfo = createPieSlice(index, totalItems, 130, 270);
                      const defaultSliceColor = theme === "dark" 
                        ? (index % 2 === 0 ? "rgba(31, 41, 55, 0.45)" : "rgba(17, 24, 39, 0.6)")
                        : (index % 2 === 0 ? "rgba(241, 245, 249, 0.95)" : "rgba(226, 232, 240, 0.85)");

                      const strokeColor = theme === "dark" ? "#1e293b" : "#cbd5e1";
                      const logoSize = 34; 

                      const rad = (sliceInfo.midAngle * Math.PI) / 180;
                      const scatterDistance = (1 - chartProgress) * 200;
                      const offsetX = Math.cos(rad) * scatterDistance;
                      const offsetY = Math.sin(rad) * scatterDistance;
                      const sliceOpacity = chartProgress;

                      return (
                        <g 
                          key={tool.name}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className="cursor-pointer"
                          style={{
                            transform: isHovered 
                              ? `translate(${sliceInfo.moveX + offsetX}px, ${sliceInfo.moveY + offsetY}px) scale(1.03)` 
                              : `translate(${offsetX}px, ${offsetY}px) scale(1)`,
                            transformOrigin: '350px 350px',
                            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out',
                            opacity: sliceOpacity,
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

                <div 
                  className={`absolute z-30 w-[35%] h-[35%] rounded-full flex flex-col items-center justify-center p-2 sm:p-3 text-center border pointer-events-none backdrop-blur-md shadow-inner transition-all duration-500 ${
                    theme === "dark" ? "bg-black/90 border-gray-800 shadow-black" : "bg-white/95 border-gray-200/60 shadow-gray-200"
                  }`}
                  style={{
                    opacity: chartProgress,
                    transform: `scale(${0.5 + chartProgress * 0.5})`,
                  }}
                >
                  {hoveredIndex !== null ? (
                    <div className="flex flex-col items-center justify-center w-full">
                      <div className="h-8 sm:h-14 flex items-center justify-center mb-1">
                        <img src={toolsData[hoveredIndex].logo} alt={toolsData[hoveredIndex].name} className="w-6 h-6 sm:w-12 sm:h-12 object-contain" />
                      </div>
                      <span className={`text-[8px] sm:text-xs font-black uppercase tracking-widest px-1 sm:px-2 rounded-md ${theme === "dark" ? "text-blue-400 bg-blue-950/40" : "text-blue-600 bg-blue-50"}`}>
                        {toolsData[hoveredIndex].name}
                      </span>
                    </div>
                  ) : (
                    <div className="text-center opacity-70">
                      <span className="text-[3.5vw] sm:text-[3.5vw] md:text-base font-bold uppercase tracking-[0.12em] block text-blue-500 font-poppins">Tech Stack</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sisa Halaman (Projek, Sertifikat, Lomba, Organisasi, Pendidikan) */}
          <div id="projek" className="pt-10 md:pt-20"><ProjekPage /></div>
          <div id="sertifikat" className="pt-10 md:pt-20"><SertifikatPage /></div>
          <div id="lomba" className="pt-10 md:pt-20"><LombaPage /></div>
          <div id="organisasi" className="pt-10 md:pt-20"><OrganisasiPage /></div>
          <div id="pendidikan" className="pt-10 md:pt-20"><PendidikanPage /></div>
        </section>
      </div>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; overflow-x: hidden; width: 100%; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        * { box-sizing: border-box; }

        .reveal-init { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .reveal-active { opacity: 1; transform: translateY(0); }
      `}</style>
    </>
  );
}