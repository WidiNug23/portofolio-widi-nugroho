"use client";

import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeProvider, useTheme } from "./ThemeContext"; // sesuaikan path
import "./globals.css";

function LayoutContent({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // aman karena di dalam ThemeProvider

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projek", label: "Projek" },
    { href: "/sertifikat", label: "Sertifikat" },
    { href: "/lomba-kompetensi", label: "Lomba & Kompetensi" },
    { href: "/organisasi", label: "Pengalaman & Organisasi" },
    { href: "/pendidikan", label: "Pendidikan" },
  ];

  return (
    <body
      className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* NAVBAR */}
<nav className={`fixed w-full top-0 z-50 transition-colors duration-500 ${
  theme === "dark" ? "bg-black text-white shadow-black" : "bg-white text-black shadow-gray-300"
}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
          <h1
            className={`text-xl md:text-2xl font-bold font-poppins ${
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

          <div className="flex items-center gap-4">
            {/* Toggle Icon Neon */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 text-yellow-400 shadow-[0_0_10px_yellow]"
                  : "bg-gray-200 text-yellow-600 shadow-[0_0_10px_yellow]"
              }`}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            {/* Mobile menu toggle */}
            <button
              className={`md:hidden focus:outline-none ${
                theme === "dark" ? "text-gray-200" : "text-gray-900"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="block w-6 h-0.5 bg-current mb-1"></span>
              <span className="block w-6 h-0.5 bg-current mb-1"></span>
              <span className="block w-6 h-0.5 bg-current"></span>
            </button>
          </div>

          {/* Navbar links */}
          <ul
            className={`flex flex-col md:flex-row md:items-center md:gap-4 absolute md:static top-full left-0 w-full md:w-auto transition-all duration-300 overflow-hidden ${
              menuOpen ? "max-h-60" : "max-h-0"
            } md:max-h-full ${theme === "dark" ? "bg-black" : "bg-white-100"}`}
          >
            {navLinks.map((link) => {
              let glowColor = "#3b82f6,#60a5fa,#38bdf8";
              if (link.label === "Sertifikat") glowColor = "#65960a,#7cbd04";
              if (link.label === "Lomba & Kompetensi") glowColor = "#a855f7,#8b5cf6";
              if (link.label === "Pengalaman & Organisasi") glowColor = "#f59e0b,#facc15";
              if (link.label === "Pendidikan") glowColor = "#f50bbbff,#facc15";

              const textShadow = glowColor
                .split(",")
                .map((c, i) => `0 0 ${5 * (i + 1)}px ${c}`)
                .join(", ");

              return (
                <li key={link.href} className="border-b border-gray-700 md:border-none">
                  <Link
                    href={link.href}
                    className={`block px-4 py-2 md:py-1 font-semibold rounded-md font-poppins transition-colors duration-300 relative ${
                      theme === "dark" ? "text-gray-200" : "text-gray-900"
                    }`}
                    onMouseEnter={(e) => (e.currentTarget.style.textShadow = textShadow)}
                    onMouseLeave={(e) => (e.currentTarget.style.textShadow = "none")}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-8">{children}</main>

      {/* FOOTER */}
      <footer
        className={`py-6 mt-8 w-full border-t transition-colors duration-500 ${
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

// RootLayout membungkus semua children dengan ThemeProvider
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider>
        <LayoutContent>{children}</LayoutContent>
      </ThemeProvider>
    </html>
  );
}
