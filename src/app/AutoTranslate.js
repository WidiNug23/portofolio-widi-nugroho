"use client";
import { useEffect } from "react";

export default function AutoTranslate() {
  useEffect(() => {
    // Cek kalau sudah ada script-nya, jangan duplikat
    if (window.google && window.google.translate) return;

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Definisikan fungsi global callback
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "id",
          includedLanguages: "id,en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Elemen tersembunyi untuk inisialisasi translate
  return <div id="google_translate_element" style={{ display: "none" }} />;
}
