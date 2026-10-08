"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  FaSun, FaMoon, FaInstagram, FaLinkedin, 
  FaGithub, FaBars, FaTimes
} from "react-icons/fa";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { supabase } from "../lib/supabase";
import "./globals.css";

function LayoutContent({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imageAspectRatios, setImageAspectRatios] = useState({});
  
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

  const latestPreviews = [
    { image: "/uploads/width_378.png", link: "/#lomba" },
    { image: "/uploads/width_800.png", link: "/#lomba" },
    { image: "/uploads/width_750.png", link: "/#lomba" },
    { image: "/uploads/width_600.png", link: "/#lomba" }
  ];

  const handleImageLoad = (idx, imgElement) => {
    if (imgElement && imgElement.naturalWidth && imgElement.naturalHeight) {
      const ratio = imgElement.naturalWidth / imgElement.naturalHeight;
      setImageAspectRatios(prev => {
        if (prev[idx] === ratio) return prev;
        return { ...prev, [idx]: ratio };
      });
    }
  };

  // Mengunci scroll halaman utama secara total saat menu terbuka
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const trackView = async () => {
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
          }
        } catch (err1) {
          try {
            const res2 = await fetch('http://ip-api.com/json/');
            const data2 = await res2.json();
            if (data2.status === 'success') {
              locationData = { city: data2.city, country: data2.country, region: data2.regionName };
            }
          } catch (err2) {}
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
      } catch (dbError) {}
    };

    trackView();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      const cleanId = hash.substring(1);

      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      window.scrollTo(0, 0);

      const timer = setTimeout(() => {
        const section = document.getElementById(cleanId);
        if (section) {
          const offset = 90;
          const elementPosition = section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
        }
      }, 250);

      return () => clearTimeout(timer);
    }
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
    <body className={`min-h-screen flex flex-col transition-colors duration-500 font-poppins relative hide-scrollbar ${
      theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
    }`}>

      {/* Navbar Utama (Fixed Full Width) */}
      <nav className={`fixed inset-x-0 top-0 z-[300] transition-all duration-300 ${
        scrolled 
          ? (theme === "dark" ? "bg-black/80 backdrop-blur-md py-3 shadow-2xl" : "bg-white/80 backdrop-blur-md py-3 shadow-lg")
          : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 w-full">
          
          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              href="/" 
              className={`group transition-all duration-500 transform ${
                scrolled 
                  ? "opacity-100 translate-x-0 scale-100 pointer-events-auto" 
                  : "opacity-0 -translate-x-4 scale-95 pointer-events-none"
              }`}
            >
              <h1 className={`text-2xl font-semibold tracking-tighter transition-all duration-300 ${
                theme === "dark" ? "text-white group-hover:text-blue-400" : "text-gray-900 group-hover:text-blue-600"
              }`}>
                WIDI<span className="text-blue-500">.</span>
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-300 ${
                theme === "dark" ? "text-yellow-400 hover:opacity-80" : "text-yellow-600 hover:opacity-80"
              }`}
            >
              {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className={`w-10 h-10 rounded-2xl transition-all duration-300 flex items-center justify-center ${
                theme === "dark" ? "text-white hover:opacity-80" : "text-gray-900 hover:opacity-80"
              }`}
              aria-label="Menu"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu (z-[200]) */}
      <div className={`fixed inset-0 w-full h-[100dvh] z-[200] transition-transform duration-500 ease-in-out flex flex-col justify-between pt-24 sm:pt-28 pb-6 px-4 sm:px-6 hide-scrollbar overflow-y-auto ${
        menuOpen 
          ? "translate-y-0 pointer-events-auto" 
          : "-translate-y-full pointer-events-none"
      } ${theme === "dark" ? "bg-[#0b0b0b]" : "bg-[#f8fafc]"}`}>
        
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          <div className="lg:col-span-6 hidden lg:flex items-center justify-center h-[420px] relative">
            <div 
              className="relative flex items-center justify-center w-full max-w-[500px] h-full"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {latestPreviews.map((item, idx) => {
                const isHovered = hoveredIndex === idx;
                let translateX = (idx - 1.5) * 65; 
                let translateY = Math.abs(idx - 1.5) * 15; 
                let rotate = (idx - 1.5) * 8; 

                if (hoveredIndex !== null) {
                  if (idx < hoveredIndex) {
                    translateX -= 70;
                    rotate -= 4;
                  } else if (idx > hoveredIndex) {
                    translateX += 70;
                    rotate += 4;
                  } else {
                    translateX = (idx - 1.5) * 15;
                    translateY = -15;
                    rotate = 0;
                  }
                }

                const aspectRatio = imageAspectRatios[idx] || (9 / 16);
                let cardWidth = '140px';
                let cardHeight = '240px';

                if (isHovered) {
                  const baseHeight = 270;
                  let calcWidth = baseHeight * aspectRatio;
                  if (calcWidth > 320) calcWidth = 320;
                  else if (calcWidth < 140) calcWidth = 140;

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
                        ? "z-40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-2 ring-blue-500/60 scale-105" 
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
                      className="w-full h-full object-cover"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center space-y-1.5 sm:space-y-3 text-left">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={(e) => handleScrollToSection(e, link.href, link.external)}
                  className={`text-xl sm:text-4xl md:text-5xl font-semibold tracking-tight transition-all duration-300 hover:text-blue-500 hover:translate-x-3 inline-block ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

        </div>

        <div className="py-3 sm:py-4 px-2 sm:px-6 border-t border-gray-700/20 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs">
          <p className={`text-center sm:text-left ${theme === "dark" ? "text-gray-400 font-medium" : "text-gray-600 font-medium"}`}>
            © {new Date().getFullYear()} Widi Nugroho. Semua Hak Cipta Dilindungi.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 font-bold">
            <a href="https://github.com/WidiNug23" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/widi-suryo-nugroho-a607632a2/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">LinkedIn</a>
            <a href="https://www.instagram.com/widingr23" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Instagram</a>
            <a href="mailto:collabswithwidi@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">collabswithwidi@gmail.com</a>
          </div>
        </div>

      </div>

      <main className="flex-1 pt-20">{children}</main>

      {/* Footer Utama Website */}
      <footer className={`pt-12 md:pt-20 pb-8 md:pb-12 mt-20 border-t transition-all duration-500 ${
        theme === "dark" ? "bg-gray-950 border-gray-800 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-700"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-12 pb-12 md:pb-16 border-b border-gray-700/20">
          
          <div className="flex flex-col space-y-2">
            <h2 className={`text-2xl font-semibold tracking-tighter ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              WIDI<span className="text-blue-500">.</span>
            </h2>
          </div>

          <div className="flex flex-col space-y-4 w-full md:w-auto">
            <h3 className={`text-sm font-bold uppercase tracking-wider ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Contacts
            </h3>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
              {[
                { label: "Instagram", href: "https://www.instagram.com/widingr23", icon: <FaInstagram /> },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/widi-suryo-nugroho-a607632a2/", icon: <FaLinkedin /> },
                { label: "GitHub", href: "https://github.com/WidiNug23", icon: <FaGithub /> },
              ].map((soc, i) => (
                <a 
                  key={i} 
                  href={soc.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                >
                  <span className="text-base">{soc.icon}</span>
                  <span>{soc.label}</span>
                </a>
              ))}
            </div>
            <div>
              <a 
                href="mailto:collabswithwidi@gmail.com" 
                className={`text-lg sm:text-[21px] font-bold inline-block hover:text-blue-500 transition-colors break-all sm:break-normal ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                collabswithwidi@gmail.com
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className={theme === "dark" ? "text-gray-500" : "text-gray-500"}>
            © {new Date().getFullYear()} Widi Nugroho. Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>

      {/* Custom CSS Global untuk Menghilangkan Scrollbar Sepenuhnya */}
      <style jsx global>{`
        /* Sembunyikan scrollbar untuk Webkit, Firefox, dan IE/Edge */
        .hide-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0px !important;
          background: transparent !important;
        }
        .hide-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }

        /* Sembunyikan scrollbar global halaman */
        ::-webkit-scrollbar {
          display: none !important;
          width: 0px !important;
          background: transparent !important;
        }
        html {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>
    </body>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth hide-scrollbar">
      <ThemeProvider>
        <LayoutContent>{children}</LayoutContent>
      </ThemeProvider>
    </html>
  );
}