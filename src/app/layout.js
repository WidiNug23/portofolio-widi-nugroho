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
    { href: "/statistic", label: "Statistik" },
  ];

  useEffect(() => {
    const trackView = async () => {
      // Jangan track jika sedang navigasi di dalam halaman statistik itu sendiri agar tidak spam
      if (window.location.pathname === "/statistic") return;

      let locationData = { city: 'Unknown', country: 'Unknown', region: 'Unknown' };

      // Fungsi helper untuk fetch dengan timeout agar tidak stuck "Unknown" kelamaan
      const fetchWithTimeout = async (url, options = {}, timeout = 3000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return response;
      };

      try {
        // Opsi 1: IPWHO.IS (Sangat detail, mendukung HTTPS gratis)
        const res0 = await fetchWithTimeout('https://ipwho.is/');
        const data0 = await res0.json();
        if (data0.success) {
          locationData = {
            city: data0.city || 'Unknown',
            country: data0.country || 'Unknown',
            region: data0.region || 'Unknown'
          };
        } else throw new Error();
      } catch (e) {
        try {
          // Opsi 2: IPAPI.CO
          const res1 = await fetchWithTimeout('https://ipapi.co/json/');
          const data1 = await res1.json();
          locationData = {
            city: data1.city || 'Unknown',
            country: data1.country_name || 'Unknown',
            region: data1.region || 'Unknown'
          };
        } catch (e2) {
          // Opsi 3: Cloudflare Trace (Sangat stabil tapi hanya dapat kode negara/region, bukan kota spesifik)
          try {
            const res2 = await fetchWithTimeout('https://www.cloudflare.com/cdn-cgi/trace');
            const text = await res2.text();
            const data2 = Object.fromEntries(text.split('\n').map(l => l.split('=')));
            if(data2.loc) locationData.country = data2.loc;
          } catch (e3) {
            console.error("Geo-tracking totally failed");
          }
        }
      }

      // Kirim ke Supabase
      try {
        const currentPath = window.location.pathname + window.location.hash;
        await supabase.from('page_views').insert([{ 
          page_path: currentPath || "/", 
          user_agent: navigator.userAgent,
          city: locationData.city,
          country: locationData.country,
          region: locationData.region
        }]);
      } catch (err) {
        console.error("Supabase Error:", err);
      }
    };

    trackView();
    window.addEventListener("hashchange", trackView);
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("hashchange", trackView);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Logika Scroll & Klik Outside tetap sama...
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (floatingRef.current && !floatingRef.current.contains(event.target)) setIsFloatingOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScrollToSection = (e, href) => {
    if (href.startsWith("/statistic")) { setMenuOpen(false); return; }
    if (!href.includes("#") && href !== "/") return;
    e.preventDefault();
    setMenuOpen(false);
    if (href === "/") {
      pathname === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : router.push("/");
      return;
    }
    const cleanId = href.split("#")[1];
    if (pathname === "/") {
      const section = document.getElementById(cleanId);
      if (section) {
        window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
        window.history.pushState(null, null, `#${cleanId}`);
      }
    } else router.push(href);
  };

  return (
    <body className={`min-h-screen flex flex-col transition-colors duration-500 font-poppins ${
      theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
    }`}>
      <div className="fixed top-0 left-0 w-full h-1 z-[110] bg-transparent">
        <div className="h-full bg-blue-500 transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      <nav className={`fixed w-full top-0 z-[100] transition-all duration-300 ${
        scrolled ? (theme === "dark" ? "bg-black/80 backdrop-blur-md py-3 shadow-2xl" : "bg-white/80 backdrop-blur-md py-3 shadow-lg") : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          <Link href="/" className="group">
            <h1 className={`text-2xl font-black tracking-tighter transition-all duration-300 ${theme === "dark" ? "text-white group-hover:text-blue-400" : "text-gray-900 group-hover:text-blue-600"}`}>
              WIDI<span className="text-blue-500">.</span>
            </h1>
          </Link>
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={(e) => handleScrollToSection(e, link.href)} className="relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-blue-500 group">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
            <li className="ml-4 pl-4 border-l border-gray-500/30">
              <button onClick={toggleTheme} className={`p-2.5 rounded-xl transition-all duration-300 ${theme === "dark" ? "bg-gray-800 text-yellow-400 hover:bg-gray-700" : "bg-gray-100 text-yellow-600 hover:bg-gray-200"}`}>
                {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button>
            </li>
          </ul>
          <div className="flex items-center gap-3 lg:hidden">
            <button onClick={toggleTheme} className="p-2 text-yellow-500">{theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">{menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}</button>
          </div>
        </div>
        <div className={`absolute top-full left-0 w-full lg:hidden transition-all duration-500 overflow-hidden ${menuOpen ? "max-h-[600px] border-b shadow-xl" : "max-h-0"} ${theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
          <ul className="flex flex-col p-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={(e) => handleScrollToSection(e, link.href)} className="block px-4 py-4 text-base font-semibold border-b border-gray-500/10 last:border-0 hover:text-blue-500">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="flex-1 pt-20">{children}</main>

      <footer className={`py-12 mt-20 border-t ${theme === "dark" ? "bg-gray-950 border-gray-800" : "bg-gray-50 border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="flex gap-6 mb-8">
            <a href="https://www.instagram.com/widingr23" className="text-2xl hover:text-pink-500"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/widi-suryo-nugroho-a607632a2/" className="text-2xl hover:text-blue-500"><FaLinkedin /></a>
            <a href="https://github.com/WidiNug23" className="text-2xl hover:text-gray-400"><FaGithub /></a>
            <a href="mailto:collabswithwidi@gmail.com" className="text-2xl hover:text-red-500"><MdEmail /></a>
            <a href="https://wa.me/6285727609498" className="text-2xl hover:text-green-500"><FaWhatsapp /></a>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold mb-2">Widi Nugroho</h2>
            <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>© {new Date().getFullYear()} — Portofolio</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons... (tetap sama) */}
      <div ref={floatingRef} className="fixed bottom-6 right-6 z-[999] flex flex-col items-end">
        <div className={`mb-4 transition-all duration-500 ${isFloatingOpen ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"}`}>
           {/* Konten FAB */}
           <div className={`p-6 rounded-[2.5rem] shadow-2xl border min-w-[250px] flex flex-col gap-5 ${theme === "dark" ? "bg-gray-900/90 border-gray-700/50 backdrop-blur-xl" : "bg-white/90 border-gray-200/50 backdrop-blur-xl"}`}>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 px-2 opacity-70">Hubungi Saya</span>
            <div className="flex flex-col gap-4">
              <a href="https://wa.me/6285727609498" className="flex items-center gap-4"><div className="w-11 h-11 flex items-center justify-center bg-green-500 text-white rounded-2xl"><FaWhatsapp size={20} /></div><span className="text-sm font-bold">WhatsApp</span></a>
            </div>
          </div>
        </div>
        <button onClick={() => setIsFloatingOpen(!isFloatingOpen)} className={`w-14 h-14 flex items-center justify-center rounded-full shadow-2xl transition-all ${theme === "dark" ? "bg-white text-blue-500" : "bg-blue-600 text-white"}`}>
          {isFloatingOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
        </button>
      </div>
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