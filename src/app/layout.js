"use client";

import Link from "next/link";
import { useState } from "react";
import Head from "next/head";
import "./globals.css";

export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projek", label: "Projek" },
    { href: "/sertifikat", label: "Sertifikat" },
    { href: "/lomba-kompetensi", label: "Lomba & Kompetensi" },
    { href: "/organisasi", label: "Pengalaman & Organisasi" },
  ];

  return (
    <html lang="id">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-gray-900 text-gray-100 min-h-screen font-sans">
        <nav className="bg-black shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
            <h1
              className="text-xl md:text-2xl font-bold text-white font-poppins"
              style={{ textShadow: '0 0 8px #3b82f6, 0 0 16px #3b82f6' }}
            >
              Widi Nugroho
            </h1>

            <button
              className="md:hidden text-gray-200 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="block w-6 h-0.5 bg-gray-200 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-200 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-200"></span>
            </button>

            <ul
              className={`flex flex-col md:flex-row md:items-center md:gap-4 absolute md:static top-full left-0 w-full md:w-auto bg-black md:bg-transparent transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-60" : "max-h-0"} md:max-h-full`}
            >
{navLinks.map((link) => {
  let glowColor = "#3b82f6,#60a5fa,#38bdf8"; // biru neon lebih terang
  if (link.label === "Sertifikat") glowColor = "#65960a,#7cbd04";
  if (link.label === "Lomba & Kompetensi") glowColor = "#a855f7,#8b5cf6";
  if (link.label === "Pengalaman & Organisasi") glowColor = "#f59e0b,#facc15";

  const textShadow = glowColor
    .split(",")
    .map((c, i) => `0 0 ${5 * (i+1)}px ${c}`)
    .join(", ");

  return (
    <li key={link.href} className="border-b border-gray-700 md:border-none">
      <Link
        href={link.href}
        className="block px-4 py-2 md:py-1 text-gray-200 font-semibold rounded-md font-poppins transition-colors duration-300 relative"
        onMouseEnter={(e) => e.currentTarget.style.textShadow = textShadow}
        onMouseLeave={(e) => e.currentTarget.style.textShadow = "none"}
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

        <main className="p-6 md:p-8">{children}</main>
      </body>
    </html>
  );
}
