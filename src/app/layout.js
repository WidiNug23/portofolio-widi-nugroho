// app/layout.js
"use client";

import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeProvider, useTheme } from "./ThemeContext";
import "./globals.css";
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md"; // untuk Gmail

function LayoutContent({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/#projek", label: "Projek" },
    { href: "/#sertifikat", label: "Sertifikat" },
    { href: "/#lomba", label: "Lomba & Kompetensi" },
    { href: "/#organisasi", label: "Pengalaman & Organisasi" },
    { href: "/#pendidikan", label: "Pendidikan" },
    { href: "/#kontak", label: "Kontak" },
  ];

  // Auto-scroll jika URL memiliki hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [pathname]);

  // Highlight kontak lintas halaman
  useEffect(() => {
    if (sessionStorage.getItem("triggerHighlightKontak") === "true") {
      sessionStorage.removeItem("triggerHighlightKontak");

      setTimeout(() => {
        setTimeout(() => {
          window.dispatchEvent(new Event("highlightKontak"));
        }, 1000);
      }, 400);
    }
  }, [pathname]);

  // Scroll ke target setelah pindah halaman
  useEffect(() => {
    const target = sessionStorage.getItem("scrollToTarget");
    if (!target) return;

    sessionStorage.removeItem("scrollToTarget");

    const t = setTimeout(() => {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);

    return () => clearTimeout(t);
  }, [pathname]);

  // --- FIX BERANDA DITAMBAHKAN DI SINI ---
const handleScrollToSection = (e, targetId, href) => {
  e.preventDefault();

  const offset = 120; // hanya dipakai untuk kontak

  // Klik Beranda
  if (href === "/") {
    router.push("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
    return;
  }

  // Validasi hash
  if (!targetId || !targetId.startsWith("#")) return;

  const isKontak = targetId === "#kontak";

  // Simpan flag highlight untuk kontak
  if (isKontak) {
    sessionStorage.setItem("triggerHighlightKontak", "true");
  }

  // Jika sudah berada di halaman Home
  if (pathname === "/") {
    const section = document.querySelector(targetId);
    if (section) {
      setTimeout(() => {
        // Jika KONTak → pakai offset
        if (isKontak) {
          const y =
            section.getBoundingClientRect().top +
            window.pageYOffset -
            offset;

          window.scrollTo({ top: y, behavior: "smooth" });
        } else {
          // Selain kontak → scroll normal
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }

    if (isKontak) {
      setTimeout(() => {
        window.dispatchEvent(new Event("highlightKontak"));
      }, 650);
    }

    setMenuOpen(false);
    return;
  }

  // Jika bukan di halaman Home
  sessionStorage.setItem("scrollToTarget", targetId);

  // Untuk kontak → kirim offset, lainnya → kosong
  if (isKontak) {
    sessionStorage.setItem("scrollOffset", offset);
  } else {
    sessionStorage.removeItem("scrollOffset");
  }

  router.push("/");
  setMenuOpen(false);
};

  // --- END FIX BERANDA ---

  return (
    <body
      className={`min-h-screen flex flex-col transition-colors duration-500 font-poppins ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
<nav
  className={`fixed w-full top-0 z-50 transition-colors duration-500 ${
    theme === "dark"
      ? "bg-black text-white shadow-black"
      : "bg-white text-black shadow-gray-300"
  }`}
>
  <div className="max-w-[90rem] mx-auto flex items-center justify-between px-6 py-4 md:py-5">

    {/* LEFT: Nama */}
    <h1
      className={`text-xl md:text-2xl font-bold ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
      style={{
        textShadow:
          theme === "dark"
            ? "0 0 8px #3b82f6, 0 0 16px #3b82f6"
            : "0 0 8px #60a5fa, 0 0 16px #3b82f6",
      }}
    >
      Widi Nugroho
    </h1>

    {/* RIGHT: Theme Icon (mobile visible), Hamburger */}
    <div className="flex items-center gap-3 md:hidden">
      {/* Theme Icon mobile */}
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-full transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-800 text-yellow-400"
            : "bg-gray-200 text-yellow-600"
        }`}
      >
        {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      {/* Hamburger menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-3xl"
      >
        ☰
      </button>
    </div>

    {/* NAV LINKS + Theme Icon (desktop only) */}
    <ul
      className={`hidden md:flex items-center gap-2`}
    >
      {navLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={(e) =>
              handleScrollToSection(
                e,
                link.href.replace(/^\/?#?/, "#"),
                link.href
              )
            }
            className="px-4 py-2 font-semibold transition"
          >
            {link.label}
          </a>
        </li>
      ))}

      {/* Theme Icon desktop */}
      <li className="ml-2">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-800 text-yellow-400"
              : "bg-gray-200 text-yellow-600"
          }`}
        >
          {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </li>
    </ul>

    {/* DROPDOWN MENU FOR MOBILE */}
    <ul
      className={`md:hidden absolute top-full left-0 w-full transition-all duration-500 ${
        menuOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      } ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      {navLinks.map((link) => (
        <li key={link.href} className="border-b">
          <a
            href={link.href}
            onClick={(e) =>
              handleScrollToSection(
                e,
                link.href.replace(/^\/?#?/, "#"),
                link.href
              )
            }
            className="block px-4 py-2 font-semibold"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>

  </div>
</nav>


<main className="flex-1 p-6 md:p-8">{children}</main>

<footer
  className={`py-6 mt-8 w-full border-t transition ${
    theme === "dark"
      ? "bg-black text-gray-200 border-gray-700"
      : "bg-gray-100 text-gray-900 border-gray-300"
  }`}
>
  <div className="max-w-7xl mx-auto text-center flex flex-col md:flex-row justify-center items-center gap-4">
    <p className="mb-2 md:mb-0">© {new Date().getFullYear()} Widi Nugroho.</p>

    <div className="flex gap-4 text-xl">
      <a
        href="https://www.instagram.com/widingr23" // ganti dengan username Instagram kamu
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-pink-500 transition-colors"
      >
        <FaInstagram />
      </a>
      <a
        href="https://www.linkedin.com/in/widi-suryo-nugroho-a607632a2/" // ganti dengan LinkedIn kamu
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-600 transition-colors"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://github.com/WidiNug23" // ganti dengan GitHub kamu
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-700 transition-colors"
      >
        <FaGithub />
      </a>
      <a
        href="mailto:collabswithwidi@gmail.com" // ganti dengan email kamu
        className="hover:text-red-500 transition-colors"
      >
        <MdEmail />
      </a>
      <a
        href="https://wa.me/6285727609498" // ganti dengan nomor WhatsApp kamu (format internasional tanpa +)
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-green-500 transition-colors"
      >
        <FaWhatsapp />
      </a>
    </div>
  </div>
</footer>
    </body>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider>
        <LayoutContent>{children}</LayoutContent>
      </ThemeProvider>
    </html>
  );
}