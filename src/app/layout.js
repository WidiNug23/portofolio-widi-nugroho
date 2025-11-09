"use client";

import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeProvider, useTheme } from "./ThemeContext";
import "./globals.css";

function LayoutContent({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [highlightKontak, setHighlightKontak] = useState(false);


  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/projek", label: "Projek" },
    { href: "/sertifikat", label: "Sertifikat" },
    { href: "/lomba-kompetensi", label: "Lomba & Kompetisi" },
    { href: "/organisasi", label: "Pengalaman & Organisasi" },
    { href: "/pendidikan", label: "Pendidikan" },
    { href: "#kontak", label: "Kontak" }, // Pindah ke posisi terakhir
  ];

  // Scroll otomatis jika hash #kontak ada di URL
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#kontak") {
      const section = document.querySelector("#kontak");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [pathname]);

  // Efek neon lintas halaman
useEffect(() => {
  if (sessionStorage.getItem("triggerHighlightKontak") === "true") {
    sessionStorage.removeItem("triggerHighlightKontak");

    // Pastikan halaman benar-benar selesai dimuat
    const timer = setTimeout(() => {
      // Tambahkan delay tambahan agar muncul lebih pelan
      const delayTimer = setTimeout(() => {
        window.dispatchEvent(new Event("highlightKontak"));
      }, 1000); // jeda 1.2 detik sebelum neon muncul

      return () => clearTimeout(delayTimer);
    }, 400); // pastikan elemen DOM sudah stabil terlebih dahulu

    return () => clearTimeout(timer);
  }
}, [pathname]);


const handleScrollToSection = (e, targetId) => {
  if (targetId.startsWith("#")) {
    e.preventDefault();

    // Jika klik Kontak, aktifkan efek neon
    if (targetId === "#kontak") {
  // Tandai agar efek neon aktif di halaman tujuan
  sessionStorage.setItem("triggerHighlightKontak", "true");
}

if (pathname === "/") {
  const section = document.querySelector(targetId);
  if (section) section.scrollIntoView({ behavior: "smooth" });
  window.dispatchEvent(new Event("highlightKontak"));
} else {
  router.push("/#kontak");
}


    setMenuOpen(false);
  }
};

  return (
    <body
      className={`min-h-screen flex flex-col transition-colors duration-500 font-poppins ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* NAVBAR */}
      <nav
        className={`fixed w-full top-0 z-50 transition-colors duration-500 ${
          theme === "dark"
            ? "bg-black text-white shadow-black"
            : "bg-white text-black shadow-gray-300"
        }`}
      >
        <div className="max-w-[90rem] mx-auto flex items-center justify-between px-6 py-4 md:py-5 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <h1
            className={`text-xl md:text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
            style={{
              fontFamily: "Poppins, sans-serif",
              textShadow:
                theme === "dark"
                  ? "0 0 8px #3b82f6, 0 0 16px #3b82f6"
                  : "0 0 8px #60a5fa, 0 0 16px #3b82f6",
            }}
          >
            Widi Nugroho
          </h1>

          <div className="flex items-center gap-4">
            {/* Toggle Tema */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 text-yellow-400 shadow-[0_0_10px_yellow]"
                  : "bg-gray-200 text-yellow-600 shadow-[0_0_10px_yellow]"
              }`}
              title={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >
              {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            {/* Toggle Menu Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className={`relative w-8 h-8 flex flex-col justify-center items-center gap-[6px] md:hidden transition-all duration-300 ${
                theme === "dark" ? "text-gray-200" : "text-gray-900"
              }`}
            >
              <span
                className={`block w-6 h-[2.5px] rounded-sm bg-current transition-all duration-300 ${
                  menuOpen
                    ? "rotate-45 translate-y-[8px] opacity-90"
                    : "rotate-0 translate-y-0"
                }`}
              ></span>
              <span
                className={`block w-6 h-[2.5px] rounded-sm bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block w-6 h-[2.5px] rounded-sm bg-current transition-all duration-300 ${
                  menuOpen
                    ? "-rotate-45 -translate-y-[8px] opacity-90"
                    : "rotate-0 translate-y-0"
                }`}
              ></span>
            </button>
          </div>

          {/* Navigasi */}
          <ul
            className={`flex flex-col md:flex-row md:items-center md:gap-4 absolute md:static top-full left-0 w-full md:w-auto
              transition-all duration-500 ease-in-out transform
              ${
                menuOpen
                  ? "opacity-100 translate-y-0 max-h-96"
                  : "opacity-0 -translate-y-4 max-h-0 md:opacity-100 md:translate-y-0 md:max-h-full"
              }
              ${
                theme === "dark"
                  ? "bg-black text-white"
                  : "bg-white text-gray-900"
              }
              md:flex overflow-hidden
            `}
          >
            {navLinks.map((link) => {
              let glowColor = "#3b82f6,#60a5fa,#38bdf8";
              if (link.label === "Sertifikat") glowColor = "#65960a,#7cbd04";
              if (link.label === "Lomba & Kompetensi")
                glowColor = "#a855f7,#8b5cf6";
              if (link.label === "Pengalaman & Organisasi")
                glowColor = "#f59e0b,#facc15";
              if (link.label === "Pendidikan")
                glowColor = "#f50bbbff,#facc15";
              if (link.label === "Kontak") glowColor = "#3b82f6,#60a5fa";

              const textShadow = glowColor
                .split(",")
                .map((c, i) => `0 0 ${5 * (i + 1)}px ${c}`)
                .join(", ");

              return (
                <li
                  key={link.href}
                  className="border-b border-gray-300 md:border-none"
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollToSection(e, link.href)}
                    className="block px-4 py-2 md:py-1 font-semibold font-poppins transition-all duration-300 relative"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textShadow = textShadow)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textShadow = "none")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* KONTEN */}
      <main className="flex-1 p-6 md:p-8 font-poppins">{children}</main>

      {/* FOOTER */}
      <footer
        className={`py-6 mt-8 w-full border-t transition-colors duration-500 font-poppins ${
          theme === "dark"
            ? "bg-black text-gray-200 border-gray-700"
            : "bg-gray-100 text-gray-900 border-gray-300"
        }`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p
            className="text-sm md:text-base font-semibold"
            style={{
              textShadow:
                theme === "dark"
                  ? "0 0 5px #3b82f6, 0 0 10px #60a5fa"
                  : "0 0 5px #60a5fa, 0 0 10px #3b82f6",
            }}
          >
            © {new Date().getFullYear()} Widi Nugroho. Semua hak dilindungi.
          </p>
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
        {/* Script ini mencegah flicker tema */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.backgroundColor = '#111827';
                    document.documentElement.style.color = '#f3f4f6';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.backgroundColor = '#f9fafb';
                    document.documentElement.style.color = '#111827';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <style>{`
          * {
            font-family: 'Poppins', sans-serif !important;
          }
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </Head>
      <ThemeProvider>
        <LayoutContent>{children}</LayoutContent>
      </ThemeProvider>
    </html>
  );
}
