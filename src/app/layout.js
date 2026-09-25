"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  FaSun, FaMoon, FaInstagram, FaLinkedin, 
  FaGithub, FaWhatsapp, FaBars, FaTimes, FaComments
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { supabase } from "../lib/supabase";
import "./globals.css";

function LayoutContent({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imageAspectRatios, setImageAspectRatios] = useState({});
  const floatingRef = useRef(null);
  
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/#projek", label: "Projek" },
    { href: "/#sertifikat", label: "Sertifikat" },
    { href: "/#lomba", label: "Lomba" },
    { href: "/#organisasi", label: "Pengalaman & Organisasi" },
    { href: "/#pendidikan", label: "Pendidikan" },
    { href: "/#kontak", label: "Kontak" },
    { href: "https://drive.google.com/file/d/1s-ildIIrPXcifuOSgcwJs12aC0Y7-vBh/view?usp=sharing", label: "Curriculum Vitae", external: true },
  ];

  // Daftar path foto preview
  const latestPreviews = [
    { image: "/uploads/width_378.png", link: "/#lomba" },
    { image: "/uploads/width_800.png", link: "/#lomba" },
    { image: "/uploads/width_750.png", link: "/#lomba" },
    { image: "/uploads/width_600.png", link: "/#lomba" }
  ];

  // Fungsi untuk mendeteksi rasio asli foto secara otomatis & aman dari cache refresh
  const handleImageLoad = (idx, imgElement) => {
    if (imgElement && imgElement.naturalWidth && imgElement.naturalHeight) {
      const ratio = imgElement.naturalWidth / imgElement.naturalHeight;
      setImageAspectRatios(prev => {
        if (prev[idx] === ratio) return prev;
        return {
          ...prev,
          [idx]: ratio
        };
      });
    }
  };

  useEffect(() => {
    const trackView = async () => {
      setIsLoading(true);
      let locationData = { city: 'Unknown', country: 'Unknown', region: 'Unknown' };

      try {
        const res0 = await fetch('https://ipwho.is/');
        const data0 = await res0.json();
        if (data0.success) {
          locationData = { city: data0.city || 'Unknown', country: data0.country || 'Unknown', region: data0.region || 'Unknown' };
        } else {
          throw new Error('ipwho.is failed');
        }
      } catch (err0) {
        try {
          const res1 = await fetch('https://ipapi.co/json/');
          if (res1.ok) {
            const data1 = await res1.json();
            locationData = { city: data1.city || 'Unknown', country: data1.country_name || 'Unknown', region: data1.region || 'Unknown' };
          } else {
            throw new Error('ipapi.co failed');
          }
        } catch (err1) {
          try {
            const res2 = await fetch('http://ip-api.com/json/');
            const data2 = await res2.json();
            if (data2.status === 'success') {
              locationData = { city: data2.city, country: data2.country, region: data2.regionName };
            }
          } catch (err2) {
            console.error("Geolocation failed:", err2);
          }
        }
      }

      try {
        const currentFullPath = window.location.pathname + window.location.hash;
        await supabase.from('page_views').insert([
          { 
            page_path: currentFullPath || "/", 
            user_agent: navigator.userAgent,
            city: locationData.city,
            country: locationData.country,
            region: locationData.region,
          }
        ]);
      } catch (dbError) {
        console.error("Database Insert Error:", dbError);
      } finally {
        setIsLoading(false);
      }
    };

    trackView();

    const handleHashChange = () => trackView();
    window.addEventListener("hashchange", handleHashChange);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(currentProgress);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Solusi tuntas untuk menangani refresh pada URL ber-hash (Projek, Sertifikat, Lomba, Organisasi, dll)
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      const cleanId = hash.substring(1);

      // Cegah browser melakukan lompatan scroll kacau saat refresh
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      window.scrollTo(0, 0);

      // Beri jeda agar DOM ter-render sempurna, lalu arahkan pas ke seksi tujuan dengan offset navbar
      const timer = setTimeout(() => {
        const section = document.getElementById(cleanId);
        if (section) {
          const offset = 90; // Tinggi offset navbar
          const elementPosition = section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
        }
      }, 250);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (floatingRef.current && !floatingRef.current.contains(event.target)) {
        setIsFloatingOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScrollToSection = (e, href, external) => {
    if (external) {
      setMenuOpen(false);
      return;
    }

    e.preventDefault();
    setMenuOpen(false);

    if (href === "/") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
      return;
    }

    const cleanId = href.split("#")[1];
    if (pathname === "/") {
      const section = document.getElementById(cleanId);
      if (section) {
        const offset = 90;
        const elementPosition = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
        window.history.pushState(null, null, `#${cleanId}`);
      }
    } else {
      router.push(href);
      setTimeout(() => {
        const section = document.getElementById(cleanId);
        if (section) {
          const offset = 90;
          const elementPosition = section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
        }
      }, 300);
    }
  };

  return (
    <body className={`min-h-screen flex flex-col transition-colors duration-500 font-poppins relative ${
      theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
    }`}>
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[110] bg-transparent">
        <div 
          className="h-full bg-blue-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className={`fixed w-full top-0 z-[100] transition-all duration-300 ${
        scrolled 
          ? (theme === "dark" ? "bg-black/80 backdrop-blur-md py-3 shadow-2xl" : "bg-white/80 backdrop-blur-md py-3 shadow-lg")
          : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          
          {/* LOGO & LOADING */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="group">
              <h1 className={`text-2xl font-black tracking-tighter transition-all duration-300 ${
                theme === "dark" ? "text-white group-hover:text-blue-400" : "text-gray-900 group-hover:text-blue-600"
              }`}>
                WIDI<span className="text-blue-500">.</span>
              </h1>
            </Link>

            <div className={`flex items-center gap-1.5 sm:gap-2 transition-all duration-500 transform ${
              isLoading ? "opacity-100 scale-100 w-auto" : "opacity-0 scale-0 w-0 overflow-hidden"
            }`}>
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin"></div>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-blue-500 uppercase animate-pulse inline">
                Loading
              </span>
            </div>
          </div>

          {/* Right Action: Theme Toggle & Burger Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                theme === "dark" ? "bg-gray-800 text-yellow-400 hover:bg-gray-700" : "bg-gray-100 text-yellow-600 hover:bg-gray-200"
              }`}
            >
              {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className={`p-3 rounded-2xl transition-all duration-300 flex items-center justify-center border ${
                theme === "dark" ? "bg-gray-900 border-gray-800 text-white hover:bg-gray-800" : "bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200"
              }`}
              aria-label="Menu"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Fullscreen Overlay Menu */}
        <div className={`fixed inset-0 top-0 left-0 w-full h-screen z-[200] transition-all duration-500 ease-in-out flex flex-col justify-between overflow-y-auto ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-[-20px]"
        } ${theme === "dark" ? "bg-[#0b0b0b]" : "bg-[#f8fafc]"}`}>
          
          {/* Top Bar inside Overlay */}
          <div className="w-full flex items-center justify-between p-6 max-w-7xl mx-auto z-25">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-2xl font-black tracking-tighter">
              WIDI<span className="text-blue-500">.</span>
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  theme === "dark" ? "bg-gray-800 text-yellow-400" : "bg-white text-yellow-600 shadow-sm"
                }`}
              >
                {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button>
              <button 
                onClick={() => setMenuOpen(false)} 
                className={`p-3 rounded-2xl transition-all duration-300 flex items-center justify-center border shadow-lg ${
                  theme === "dark" ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700" : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                }`}
              >
                <FaTimes size={22} />
              </button>
            </div>
          </div>

          {/* Main Content Grid: Kiri (Smart Fan-out Card Deck) & Kanan (Navigasi) */}
          <div className="max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
            
            {/* Sisi Kiri: Default 9:16 penuh, berubah mulus ke rasio asli foto saat di-hover */}
            <div className="lg:col-span-6 hidden lg:flex items-center justify-center h-[420px] relative">
              <div 
                className="relative flex items-center justify-center w-full max-w-[500px] h-full"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {latestPreviews.map((item, idx) => {
                  const isHovered = hoveredIndex === idx;
                  let translateX = (idx - 1.5) * 55; 
                  let translateY = Math.abs(idx - 1.5) * 10; 
                  let rotate = (idx - 1.5) * 8; 

                  if (hoveredIndex !== null) {
                    if (idx < hoveredIndex) {
                      translateX -= 80;
                      rotate -= 4;
                    } else if (idx > hoveredIndex) {
                      translateX += 80;
                      rotate += 4;
                    } else {
                      translateX = (idx - 1.5) * 15;
                      translateY = -10;
                      rotate = 0;
                    }
                  }

                  // Rasio aspek natural foto (fallback ke 9/16 jika belum termuat)
                  const aspectRatio = imageAspectRatios[idx] || (9 / 16);

                  // Kalkulasi ukuran fleksibel saat di-hover berdasarkan rasio aslinya
                  let cardWidth = '130px';
                  let cardHeight = '230px'; // Default 9:16 penuh tanpa warna abu-abu

                  if (isHovered) {
                    const baseHeight = 260; // Tinggi dasar saat di-hover
                    let calcWidth = baseHeight * aspectRatio;
                    
                    // Batasi lebar agar tidak terlalu ekstrem (terlalu panjang/lebar)
                    if (calcWidth > 340) {
                      calcWidth = 340;
                    } else if (calcWidth < 140) {
                      calcWidth = 140;
                    }

                    cardWidth = `${calcWidth}px`;
                    cardHeight = `${calcWidth / aspectRatio}px`;
                  }

                  return (
                    <a 
                      key={idx} 
                      href={item.link}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onClick={(e) => handleScrollToSection(e, item.link)}
                      className={`absolute rounded-2xl overflow-hidden border-2 border-white/25 bg-gray-900 transition-all duration-500 ease-out origin-bottom ${
                        isHovered 
                          ? "z-40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-2 ring-blue-500/60" 
                          : "z-10 shadow-xl hover:z-20"
                      }`}
                      style={{
                        transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
                        width: cardWidth,
                        height: cardHeight,
                      }}
                    >
                      <img 
                        src={item.image} 
                        alt="Preview" 
                        ref={(el) => {
                          if (el && el.complete) {
                            handleImageLoad(idx, el);
                          }
                        }}
                        onLoad={(e) => handleImageLoad(idx, e.target)}
                        className={`w-full h-full transition-all duration-500 ${
                          isHovered ? "object-cover" : "object-cover"
                        }`}
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Sisi Kanan: Daftar Menu Navigasi Besar */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-2 sm:space-y-3 text-left">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={(e) => handleScrollToSection(e, link.href, link.external)}
                    className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight transition-all duration-300 hover:text-blue-500 hover:translate-x-3 inline-block ${
                      theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>

          </div>

          {/* Footer di dalam Menu Overlay (Posisi Paling Bawah) */}
          <div className="py-6 px-6 border-t border-gray-700/20 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className={theme === "dark" ? "text-gray-400 font-medium" : "text-gray-600 font-medium"}>
              © {new Date().getFullYear()} Widi Nugroho. All Rights Reserved.
            </p>
            <div className="flex gap-6 font-bold">
              <a href="https://github.com/WidiNug23" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/widi-suryo-nugroho-a607632a2/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">LinkedIn</a>
              <a href="https://www.instagram.com/widingr23" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Instagram</a>
              <a href="mailto:collabswithwidi@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Email</a>
            </div>
          </div>

        </div>
      </nav>

      <main className="flex-1 pt-20">{children}</main>

      <footer className={`py-12 mt-20 border-t transition-all duration-500 ${
        theme === "dark" ? "bg-gray-950 border-gray-800" : "bg-gray-50 border-gray-200"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="flex gap-6 mb-8">
            {[
              { icon: <FaInstagram />, href: "https://www.instagram.com/widingr23", color: "hover:text-pink-500" },
              { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/widi-suryo-nugroho-a607632a2/", color: "hover:text-blue-500" },
              { icon: <FaGithub />, href: "https://github.com/WidiNug23", color: "hover:text-gray-400" },
              { icon: <MdEmail />, href: "mailto:collabswithwidi@gmail.com", color: "hover:text-red-500" },
            ].map((soc, i) => (
              <a 
                key={i} href={soc.href} target="_blank" rel="noopener noreferrer"
                className={`text-2xl transition-all duration-300 hover:scale-125 ${soc.color} ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {soc.icon}
              </a>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold mb-2">Widi Nugroho</h2>
            <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
              © {new Date().getFullYear()} — Portofolio
            </p>
          </div>
        </div>
      </footer>
    </body>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <ThemeProvider>
        <LayoutContent>{children}</LayoutContent>
      </ThemeProvider>
    </html>
  );
}