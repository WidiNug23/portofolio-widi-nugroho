"use client";

import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTiktok,
} from "react-icons/fa";

import { useState, useEffect, useRef } from "react";
import React from "react";
import { useTheme } from "./ThemeContext";
import Script from "next/script";
import dynamic from "next/dynamic";
import { FiLink } from "react-icons/fi";

const ProjekPage = dynamic(() => import("./projek/page"), { ssr: false });
const SertifikatPage = dynamic(() => import("./sertifikat/page"), { ssr: false });
const LombaPage = dynamic(() => import("./lomba-kompetensi/page"), { ssr: false });
const OrganisasiPage = dynamic(() => import("./organisasi/page"), { ssr: false });
const PendidikanPage = dynamic(() => import("./pendidikan/page"), { ssr: false });

function RevealContainer({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add("reveal-active");
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="reveal-init">{children}</div>;
}

export default function Home() {
  const { theme } = useTheme();

  const [highlightKontak, setHighlightKontak] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  // State untuk mengontrol status animasi (false = diam, true = animasi 3 kali)
  const [isWidiAnimating, setIsWidiAnimating] = useState(false);

  const heroSectionRef = useRef(null);
  const techStackRef = useRef(null);
  const techTrackRef = useRef(null);
  const techProgressRef = useRef(0);
  const animationFrameRef = useRef(null);

  const toolsData = [
    { name: "Canon M50", logo: "https://image.similarpng.com/file/similarpng/original-picture/2020/06/Logo-canon-transparent-PNG.png" },
    { name: "CapCut", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/capcut-icon.png" },
    { name: "Canva", logo: "https://freelogopng.com/images/all_img/1656733807canva-icon-png.png" },
    { name: "Lightroom", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg" },
    { name: "VS Code", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" },
    { name: "HTML", logo: "https://icones.pro/wp-content/uploads/2021/05/icone-html-orange.png" },
    { name: "CSS", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
    { name: "JavaScript", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
    { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
    { name: "PHP", logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
    { name: "XAMPP", logo: "https://upload.wikimedia.org/wikipedia/commons/d/dc/XAMPP_Logo.png" },
    { name: "React JS", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
    { name: "CodeIgniter", logo: "https://cdn.iconscout.com/icon/free/png-256/free-codeigniter-logo-icon-svg-download-png-1579761.png" },
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

  const logoPositions = [
    { x: 0, y: 0 }, { x: 80, y: 1 }, { x: 160, y: 0 }, { x: 240, y: 1 },
    { x: 320, y: 0 }, { x: 400, y: 1 }, { x: 480, y: 0 }, { x: 560, y: 1 },
    { x: 640, y: 0 }, { x: 720, y: 1 }, { x: 800, y: 0 }, { x: 880, y: 1 },
    { x: 960, y: 0 }, { x: 1040, y: 1 }, { x: 1120, y: 0 }, { x: 1200, y: 1 },
    { x: 1280, y: 0 }, { x: 1360, y: 1 }, { x: 1440, y: 0 }, { x: 1520, y: 1 },
    { x: 1600, y: 0 }, { x: 1680, y: 1 }, { x: 1760, y: 0 },
  ];

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    if (window.location.hash) {
      const cleanId = window.location.hash.substring(1);
      window.scrollTo(0, 0);
      const scrollToTarget = () => {
        const section = document.getElementById(cleanId);
        if (section) {
          const offset = 90;
          const elementPosition = section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
        }
      };
      setTimeout(scrollToTarget, 200);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Efek untuk mengelola siklus idle (diam 3 detik -> animasi 3 detik (3x putaran) -> ulang)
  useEffect(() => {
    let idleTimeout = null;
    let animTimeout = null;

    const startCycle = () => {
      setIsWidiAnimating(false);
      
      idleTimeout = setTimeout(() => {
        setIsWidiAnimating(true);

        animTimeout = setTimeout(() => {
          startCycle();
        }, 3000); 
      }, 3000); 
    };

    startCycle();

    const handleScroll = () => {
      setScrollPos(window.scrollY);
      
      setIsWidiAnimating(false);
      if (idleTimeout) clearTimeout(idleTimeout);
      if (animTimeout) clearTimeout(animTimeout);

      idleTimeout = setTimeout(() => {
        startCycle();
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimeout) clearTimeout(idleTimeout);
      if (animTimeout) clearTimeout(animTimeout);
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

  useEffect(() => {
    const updateTechStack = () => {
      if (!techStackRef.current) {
        animationFrameRef.current = null;
        return;
      }

      const section = techStackRef.current;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalDistance = section.offsetHeight - viewportHeight;

      if (totalDistance <= 0) {
        animationFrameRef.current = null;
        return;
      }

      let progress = (-rect.top + viewportHeight * 0.15) / (totalDistance + viewportHeight * 0.3);
      progress = Math.max(0, Math.min(1, progress));

      const previous = techProgressRef.current;
      const smoothProgress = previous + (progress - previous) * 0.12;
      techProgressRef.current = smoothProgress;

      if (techTrackRef.current) {
        const track = techTrackRef.current;
        const viewportWidth = window.innerWidth;

        const startX = viewportWidth + 30; 
        const trackWidth = Math.max(1800, viewportWidth * 1.5);
        const endX = -trackWidth + viewportWidth * 0.3; 

        const currentX = startX + (endX - startX) * smoothProgress;
        track.style.transform = `translate3d(${currentX}px, 0, 0)`;

        let opacity = 1;
        if (smoothProgress < 0.02) {
          opacity = smoothProgress / 0.02;
        }
        if (smoothProgress > 0.95) {
          opacity = (1 - smoothProgress) / 0.05;
        }
        track.style.opacity = Math.max(0, Math.min(1, opacity)).toString();
      }

      if (Math.abs(progress - techProgressRef.current) > 0.001) {
        animationFrameRef.current = requestAnimationFrame(updateTechStack);
      } else {
        animationFrameRef.current = null;
      }
    };

    const handleScrollAnim = () => {
      if (animationFrameRef.current) return;
      animationFrameRef.current = requestAnimationFrame(updateTechStack);
    };

    const handleResize = () => {
      techProgressRef.current = 0;
      if (techTrackRef.current) {
        techTrackRef.current.style.transform = "translate3d(0, 0, 0)";
      }
      handleScrollAnim();
    };

    window.addEventListener("scroll", handleScrollAnim, { passive: true });
    window.addEventListener("resize", handleResize);
    handleScrollAnim();

    return () => {
      window.removeEventListener("scroll", handleScrollAnim);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  let heroProgress = 0;
  if (heroSectionRef.current) {
    const rect = heroSectionRef.current.getBoundingClientRect();
    const sectionHeight = heroSectionRef.current.offsetHeight - window.innerHeight;
    if (sectionHeight > 0) {
      heroProgress = Math.min(Math.max(-rect.top / sectionHeight, 0), 1);
    }
  }

  const showBio = heroProgress > 0.15;
  const bioProgress = Math.min(Math.max((heroProgress - 0.15) / 0.25, 0), 1);

  const showServicesTitle = heroProgress > 0.42;
  const serviceTitleProgress = Math.min(Math.max((heroProgress - 0.42) / 0.12, 0), 1);

  const serviceItemProgress = (index) => {
    const start = 0.54 + (index * 0.06);
    return Math.min(Math.max((heroProgress - start) / 0.08, 0), 1);
  };

  const showCvButton = heroProgress > 0.88;

  const services = [
    "Development Website",
    "Videografi",
    "Fotografi",
    "Pembuatan Dokumen",
    "Pengumpulan Data",
  ];

  const bioWords = "Lulusan Teknik Informatika UNS (IPK 3.81) yang menyukai perkembangan teknologi. Antusias dalam Development Website atau perangkat lunak, pembuatan alur sistem, dan manajemen data.".split(" ");

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-H9WW8B02DQ" strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-H9WW8B02DQ');`}
      </Script>

      <div className="relative w-full transition-colors duration-500" style={{ backgroundColor: theme === "dark" ? "#000" : "#fff" }}>
        
        {/* PINNED HERO SECTION INTERAKTIF (400vh) */}
        <section ref={heroSectionRef} className="relative w-full h-[400vh]">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-6 pt-16 overflow-hidden">
            <div className="max-w-4xl w-full mx-auto text-center flex flex-col items-center justify-center">
              
              {/* NAMA WIDI NUGROHO */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-poppins tracking-tight flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4">
  <span>WIDI</span>
  <span>NUGROHO</span>
</h1>

              <div className={`transition-all duration-500 max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                
                <div 
                  className={`transition-all duration-500 mb-6 sm:mb-8 px-2 ${
                    showBio ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="text-sm sm:text-lg md:text-xl leading-relaxed font-normal flex flex-wrap justify-center gap-x-1.5 gap-y-1">
                    {bioWords.map((word, i) => {
                      const wordThreshold = i / bioWords.length;
                      const isWordVisible = bioProgress > wordThreshold;
                      return (
                        <span 
                          key={i} 
                          className="transition-all duration-300 inline-block"
                          style={{
                            opacity: isWordVisible ? 1 : 0.15,
                            transform: isWordVisible ? "translateY(0px)" : "translateY(10px)"
                          }}
                        >
                          {word === "UNS" ? (
                            <a href="https://uns.ac.id/id/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline decoration-blue-400/50 underline-offset-4 font-medium hover:text-blue-600 transition-colors">
                              UNS
                            </a>
                          ) : word}
                        </span>
                      );
                    })}
                  </p>
                </div>

                <div className="mb-6 sm:mb-10">
                  <div 
                    className="transition-all duration-500 text-xs sm:text-base font-medium mb-3 sm:mb-5"
                    style={{
                      opacity: showServicesTitle ? serviceTitleProgress : 0,
                      transform: showServicesTitle ? `translateY(${(1 - serviceTitleProgress) * 15}px)` : "translateY(15px)"
                    }}
                  >
                    Kebanyakan orang menghubungi saya saat mereka membutuhkan:
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3.5">
                    {services.map((service, index) => {
                      const itemProg = serviceItemProgress(index);
                      const isVisible = itemProg > 0;

                      const backgroundStyle = theme === "dark"
                        ? { backgroundColor: itemProg > 0.5 ? "rgba(29, 78, 216, 0.65)" : "transparent", borderColor: itemProg > 0.5 ? "#2563eb" : "transparent", color: "#bfdbfe" }
                        : { backgroundColor: itemProg > 0.5 ? "#dbeafe" : "transparent", borderColor: itemProg > 0.5 ? "#2563eb" : "transparent", color: "#1d4ed8" };

                      return (
                        <div 
                          key={index}
                          className="relative overflow-hidden text-xs sm:text-lg md:text-xl px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold transition-all duration-300"
                          style={{ 
                            color: theme === "dark" ? "#e5e7eb" : "#1f2937",
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0px)" : "translateY(20px)"
                          }}
                        >
                          <div 
                            className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 transition-all duration-500 ease-out z-0 shadow-md"
                            style={{
                              ...backgroundStyle,
                              transform: itemProg > 0.2 ? "translateX(0%)" : "translateX(-105%)",
                              opacity: itemProg > 0.2 ? 1 : 0,
                            }}
                          />
                          <span className="relative z-10">{service}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div 
                  className={`transition-all duration-700 transform ${
                    showCvButton ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
                  }`}
                >
                  <a 
                    href="https://drive.google.com/file/d/1rTpfl4BvLvQh4JRl3yQG1b6a8LZfHM5J/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group inline-flex items-center justify-center px-5 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-white rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 overflow-hidden"
                  >
                    <span className="inline-flex items-center">
                      <span className="text-base sm:text-lg font-extrabold tracking-wide">C</span>
                      <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out group-hover:max-w-[100px] text-xs sm:text-base font-bold opacity-0 group-hover:opacity-100">
                        urriculum&nbsp;
                      </span>
                    </span>

                    <span className="inline-flex items-center">
                      <span className="text-base sm:text-lg font-extrabold tracking-wide">V</span>
                      <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out group-hover:max-w-[60px] text-xs sm:text-base font-bold opacity-0 group-hover:opacity-100">
                        itae
                      </span>
                    </span>
                  </a>
                </div>

              </div>
            </div>



          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="relative z-10 w-full rounded-t-[2rem] sm:rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] py-10 sm:py-20 px-3 sm:px-10" style={{ backgroundColor: theme === "dark" ? "#0a0a0a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#000" }}>
          
          <div id="kontak" className="max-w-4xl mx-auto px-4 pt-4 pb-1 sm:pb-1">
            <RevealContainer>
              <h2 className={`text-2xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-10 text-center font-poppins transition-all duration-300 ${highlightKontak ? "text-blue-500 scale-105" : ""}`}>
                Let's Make Collaboration
              </h2>
              
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 max-w-2xl mx-auto">
                {[
                  { name: "GitHub", label: "WidiNug23", href: "https://github.com/WidiNug23", icon: <FaGithub className="text-xl sm:text-3xl shrink-0" /> },
                  { name: "Email", label: "collabswithwidi@gmail.com", href: "mailto:collabswithwidi@gmail.com", icon: <FaEnvelope className="text-xl sm:text-3xl shrink-0" /> },
                  { name: "Instagram", label: "widingr23", href: "https://www.instagram.com/widingr23", icon: <FaInstagram className="text-xl sm:text-3xl shrink-0" /> },
                  // { name: "TikTok", label: "@widnug23", href: "https://www.tiktok.com/@widnug23", icon: <FaTiktok className="text-xl sm:text-3xl shrink-0" /> },
                  { name: "LinkedIn", label: "Widi Suryo Nugroho", href: "https://www.linkedin.com/in/widi-suryo-nugroho-a607632a2/", icon: <FaLinkedin className="text-xl sm:text-3xl shrink-0" /> },
                  { name: "Lynk.id", label: "widinugroho23", href: "https://lynk.id/widinugroho23", icon: <FiLink className="text-xl sm:text-3xl shrink-0" /> },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex items-center p-3.5 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md border overflow-visible ${
                      theme === "dark"
                        ? "bg-gray-900 hover:bg-blue-600 text-white border-gray-800 hover:border-blue-500"
                        : "bg-white hover:bg-blue-600 text-gray-800 hover:text-white border-gray-100 hover:border-blue-500"
                    }`}
                  >
                    {/* Tooltip di bagian atas button */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-35 border border-gray-700">
                      {item.label}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></span>
                    </span>

                    {item.icon}
                    <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out group-hover:max-w-[150px] group-hover:ml-2.5 text-xs sm:text-base font-bold opacity-0 group-hover:opacity-100">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </RevealContainer>
          </div>

          <section ref={techStackRef} className="relative w-full h-[190vh] pt-0 -mb-32 sm:-mb-48 overflow-visible">
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
              
              <div ref={techTrackRef} className="absolute left-0 top-1/2 -translate-y-1/2 h-[180px] sm:h-[220px] will-change-transform pointer-events-none" style={{ width: "2200px" }}>
                {toolsData.map((tool, index) => {
                  const position = logoPositions[index % logoPositions.length];
                  const topPosition = position.y === 0 ? "20%" : "65%";
                  const rotations = [-3, 2, -2, 3, -4, 2, -3, 4];
                  const rotation = rotations[index % rotations.length];

                  return (
                    <div key={`${tool.name}-${index}`} className="absolute w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] md:w-[85px] md:h-[85px] flex items-center justify-center" style={{ left: `${position.x}px`, top: topPosition, transform: `rotate(${rotation}deg)` }}>
                      <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain pointer-events-none drop-shadow-lg transition-transform duration-300 hover:scale-110" />
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

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

        /* Keyframes Animasi Naik Turun Widi Nugroho sebanyak 3 kali */
        @keyframes widiAnimThreeTimes {
          0% {
            transform: translateY(0px);
          }
          16.66% {
            transform: translateY(-20px);
          }
          33.33% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
          66.66% {
            transform: translateY(0px);
          }
          83.33% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-widi-three-times {
          animation: widiAnimThreeTimes 3s ease-in-out forwards;
        }

        /* Animasi scroll wheel pada indikator mouse */
        @keyframes scrollWheel {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(10px);
            opacity: 0;
          }
        }

        .animate-scroll-wheel {
          animation: scrollWheel 1.5s infinite;
        }
      `}</style>
    </>
  );
}