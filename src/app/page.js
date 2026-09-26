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

const ProjekPage = dynamic(() => import("./projek/page"), {
  ssr: false,
});

const SertifikatPage = dynamic(
  () => import("./sertifikat/page"),
  {
    ssr: false,
  }
);

const LombaPage = dynamic(
  () => import("./lomba-kompetensi/page"),
  {
    ssr: false,
  }
);

const OrganisasiPage = dynamic(
  () => import("./organisasi/page"),
  {
    ssr: false,
  }
);

const PendidikanPage = dynamic(
  () => import("./pendidikan/page"),
  {
    ssr: false,
  }
);

// ============================================================
// REVEAL CONTAINER
// ============================================================
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
      {
        threshold: 0.05,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal-init">
      {children}
    </div>
  );
}

// ============================================================
// MAIN HOME
// ============================================================
export default function Home() {
  const { theme } = useTheme();

  const [highlightKontak, setHighlightKontak] =
    useState(false);

  const [scrollPos, setScrollPos] = useState(0);

  // ==========================================================
  // TECH STACK REFS
  // ==========================================================
  const techStackRef = useRef(null);
  const techTrackRef = useRef(null);

  const techProgressRef = useRef(0);
  const animationFrameRef = useRef(null);

  // ==========================================================
  // DATA TECH STACK (Hanya Logo Murni)
  // ==========================================================
  const toolsData = [
    {
      name: "Canon M50",
      logo: "https://image.similarpng.com/file/similarpng/original-picture/2020/06/Logo-canon-transparent-PNG.png",
    },
    {
      name: "CapCut",
      logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/capcut-icon.png",
    },
    {
      name: "Canva",
      logo: "https://freelogopng.com/images/all_img/1656733807canva-icon-png.png",
    },
    {
      name: "Lightroom",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg",
    },
    {
      name: "VS Code",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
    },
    {
      name: "HTML",
      logo: "https://icones.pro/wp-content/uploads/2021/05/icone-html-orange.png",
    },
    {
      name: "CSS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
    },
    {
      name: "JavaScript",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    },
    {
      name: "Python",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    },
    {
      name: "PHP",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
    },
    {
      name: "XAMPP",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/dc/XAMPP_Logo.png",
    },
    {
      name: "React JS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    },
    {
      name: "CodeIgniter",
      logo: "https://cdn.iconscout.com/icon/free/png-256/free-codeigniter-logo-icon-svg-download-png-1579761.png",
    },
    {
      name: "Laravel",
      logo: "https://static.cdnlogo.com/logos/l/23/laravel.svg",
    },
    {
      name: "MySQL",
      logo: "https://images.icon-icons.com/2699/PNG/512/mysql_logo_icon_169940.png",
    },
    {
      name: "Next JS",
      logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nextjs.svg",
    },
    {
      name: "Golang",
      logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/go-programming-language-icon.png",
    },
    {
      name: "GIT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg",
    },
    {
      name: "Google Analytics",
      logo: "https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg",
    },
    {
      name: "Search Console",
      logo: "/uploads/google_search_console_icon-vector_brandlogos.net_hxtfr.png",
    },
    {
      name: "Supabase",
      logo: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg",
    },
    {
      name: "Microsoft",
      logo: "https://w7.pngwing.com/pngs/719/781/png-transparent-windows-logo-microsoft-windows-scalable-graphics-logo-computer-file-microsoft-logo-icon-angle-text-rectangle.png",
    },
    {
      name: "Android",
      logo: "https://www.freepnglogos.com/uploads/android-logo-png/android-logo-powerful-mobile-apps-for-those-with-disabilities-3.png",
    },
  ];

  // Koordinat posisi rapat (2 tingkat: y=0 dan y=1)
  const logoPositions = [
    { x: 0, y: 0 },
    { x: 80, y: 1 },
    { x: 160, y: 0 },
    { x: 240, y: 1 },
    { x: 320, y: 0 },
    { x: 400, y: 1 },
    { x: 480, y: 0 },
    { x: 560, y: 1 },
    { x: 640, y: 0 },
    { x: 720, y: 1 },
    { x: 800, y: 0 },
    { x: 880, y: 1 },
    { x: 960, y: 0 },
    { x: 1040, y: 1 },
    { x: 1120, y: 0 },
    { x: 1200, y: 1 },
    { x: 1280, y: 0 },
    { x: 1360, y: 1 },
    { x: 1440, y: 0 },
    { x: 1520, y: 1 },
    { x: 1600, y: 0 },
    { x: 1680, y: 1 },
    { x: 1760, y: 0 },
  ];

  // ==========================================================
  // HASH / REFRESH HANDLING
  // ==========================================================
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      const cleanId = window.location.hash.substring(1);
      window.scrollTo(0, 0);

      const scrollToTarget = () => {
        const section = document.getElementById(cleanId);
        if (section) {
          const offset = 90;
          const elementPosition =
            section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }
      };

      const timer1 = setTimeout(scrollToTarget, 200);
      const timer2 = setTimeout(scrollToTarget, 600);
      const timer3 = setTimeout(scrollToTarget, 1200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }

    window.scrollTo(0, 0);
  }, []);

  // ==========================================================
  // GENERAL SCROLL
  // ==========================================================
  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ==========================================================
  // HIGHLIGHT KONTAK
  // ==========================================================
  useEffect(() => {
    const handler = () => {
      setHighlightKontak(true);
      setTimeout(() => {
        setHighlightKontak(false);
      }, 3000);
    };

    window.addEventListener("highlightKontak", handler);
    return () => {
      window.removeEventListener("highlightKontak", handler);
    };
  }, []);

  // ==========================================================
  // TECH STACK SCROLL ENGINE (Disesuaikan agar lebih natural & responsif)
  // ==========================================================
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

      // Mulai kalkulasi sedikit lebih awal sebelum section benar-benar masuk penuh
      let progress = (-rect.top + viewportHeight * 0.15) / (totalDistance + viewportHeight * 0.3);
      progress = Math.max(0, Math.min(1, progress));

      const previous = techProgressRef.current;
      const smoothProgress = previous + (progress - previous) * 0.12;
      techProgressRef.current = smoothProgress;

      if (techTrackRef.current) {
        const track = techTrackRef.current;
        const viewportWidth = window.innerWidth;

        const startX = viewportWidth + 30; // Mulai mengintip dari kanan
        const trackWidth = Math.max(1800, viewportWidth * 1.5);
        const endX = -trackWidth + viewportWidth * 0.3; // Keluar lebih cepat ke kiri sebelum halaman habis

        const currentX = startX + (endX - startX) * smoothProgress;
        track.style.transform = `translate3d(${currentX}px, 0, 0)`;

        let opacity = 1;
        if (smoothProgress < 0.02) {
          opacity = smoothProgress / 0.02;
        }
        if (smoothProgress > 0.95) {
          opacity = (1 - smoothProgress) / 0.05;
        }
        opacity = Math.max(0, Math.min(1, opacity));
        track.style.opacity = opacity.toString();
      }

      if (Math.abs(progress - techProgressRef.current) > 0.001) {
        animationFrameRef.current = requestAnimationFrame(updateTechStack);
      } else {
        animationFrameRef.current = null;
      }
    };

    const handleScroll = () => {
      if (animationFrameRef.current) return;
      animationFrameRef.current = requestAnimationFrame(updateTechStack);
    };

    const handleResize = () => {
      techProgressRef.current = 0;
      if (techTrackRef.current) {
        techTrackRef.current.style.transform = "translate3d(0, 0, 0)";
      }
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const services = [
    "Development Website",
    "Videografi",
    "Fotografi",
    "Pembuatan Dokumen",
    "Pengumpulan Data",
  ];

  const scrollCardProgress = Math.min(
    Math.max((scrollPos - 20) / 300, 0),
    1
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-H9WW8B02DQ" strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-H9WW8B02DQ');`}
      </Script>

      <div className="relative w-full transition-colors duration-500" style={{ backgroundColor: theme === "dark" ? "#000" : "#fff" }}>
        
        {/* HERO SECTION */}
        <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-10 md:py-0 z-0">
          <div className="max-w-4xl w-full mx-auto text-center flex flex-col items-center">
            
            <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold font-poppins mb-4 sm:mb-6 tracking-tight flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4">
              <span>WIDI</span>
              <span>NUGROHO</span>
            </h1>

            <div className={`transition-all duration-500 max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              <p className="text-sm sm:text-lg md:text-xl leading-relaxed font-normal mb-6 sm:mb-8 px-2">
                Lulusan Teknik Informatika{" "}
                <a href="https://uns.ac.id/id/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline decoration-blue-400/50 underline-offset-4 font-medium hover:text-blue-600 transition-colors">
                  UNS
                </a>{" "}
                (IPK 3.81) yang menyukai perkembangan teknologi. Antusias dalam Development Website atau perangkat lunak, pembuatan alur sistem, dan manajemen data.
              </p>

              {/* SERVICES */}
              <div className="mb-8 sm:mb-12">
                <p className="text-xs sm:text-base font-medium mb-3 sm:mb-5 opacity-70">
                  Kebanyakan orang menghubungi saya saat mereka membutuhkan:
                </p>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3.5">
                  {services.map((service, index) => {
                    const itemDelayThreshold = index * 0.15;
                    const isActive = scrollCardProgress > itemDelayThreshold;

                    const backgroundStyle = theme === "dark"
                      ? { backgroundColor: isActive ? "rgba(29, 78, 216, 0.65)" : "transparent", borderColor: isActive ? "#2563eb" : "transparent", color: "#bfdbfe" }
                      : { backgroundColor: isActive ? "#dbeafe" : "transparent", borderColor: isActive ? "#2563eb" : "transparent", color: "#1d4ed8" };

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
                        <span className="relative z-10">{service}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <a href="https://drive.google.com/file/d/1s-ildIIrPXcifuOSgcwJs12aC0Y7-vBh/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-base font-bold text-white rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700">
                  CV
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="relative z-10 w-full rounded-t-[2rem] sm:rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] py-10 sm:py-20 px-3 sm:px-10" style={{ backgroundColor: theme === "dark" ? "#0a0a0a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#000" }}>
          
          {/* CONTACT */}
          <div id="kontak" className="max-w-4xl mx-auto px-4 pt-4 pb-1 sm:pb-1">
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
                  <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center shadow-md group border ${theme === "dark" ? "bg-gray-900 hover:bg-blue-600 text-white border-gray-800 hover:border-blue-500" : "bg-white hover:bg-blue-600 text-gray-800 hover:text-white border-gray-100 hover:border-blue-500"}`}>
                    {item.icon}
                  </a>
                ))}
              </div>
            </RevealContainer>
          </div>

          {/* TECH STACK SECTION (Tinggi section dioptimalkan ke 220vh agar jarak atas & bawah pas) */}
{/* TECH STACK SECTION (Jarak atas rapat, bawah ditarik mendekati section projek) */}
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

          {/* SISA HALAMAN DINAMIS */}
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