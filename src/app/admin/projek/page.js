"use client";
import { useState, useEffect } from "react";

export default function ProjekPage() {
  const [projek, setProjek] = useState([]);
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    link_demo: "",
    link_github: "",
    pdf_file: null,
    images: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/projek");
      const data = await res.json();
      setProjek(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const ensureProtocol = (url) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("judul", form.judul);
      formData.append("deskripsi", form.deskripsi);
      formData.append("link_demo", ensureProtocol(form.link_demo));
      formData.append("link_github", ensureProtocol(form.link_github));
      if (form.pdf_file) formData.append("pdf_file", form.pdf_file);
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i]);
      }

      const url = editingId
        ? `http://localhost:8080/api/projek/${editingId}`
        : "http://localhost:8080/api/projek";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error(await res.text());

      setForm({
        judul: "",
        deskripsi: "",
        link_demo: "",
        link_github: "",
        pdf_file: null,
        images: [],
      });
      setEditingId(null);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleEdit = (p) => {
    setForm({
      judul: p.judul,
      deskripsi: p.deskripsi,
      link_demo: p.link_demo || "",
      link_github: p.link_github || "",
      pdf_file: null,
      images: [],
    });
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus projek ini?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/projek/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus data");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manajemen Projek</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6 max-w-md" encType="multipart/form-data">
        <input
          placeholder="Judul"
          value={form.judul}
          onChange={(e) => setForm({ ...form, judul: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Deskripsi"
          value={form.deskripsi}
          onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          placeholder="Link Demo (YouTube atau Website)"
          value={form.link_demo}
          onChange={(e) => setForm({ ...form, link_demo: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Link GitHub"
          value={form.link_github}
          onChange={(e) => setForm({ ...form, link_github: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setForm({ ...form, pdf_file: e.target.files ? e.target.files[0] : null })}
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setForm({ ...form, images: Array.from(e.target.files) })}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : editingId ? "Edit Data" : "Tambah Projek"}
        </button>
      </form>

      <table className="border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">Judul</th>
            <th className="border p-2">Deskripsi</th>
            <th className="border p-2">Preview</th>
            <th className="border p-2">Link Demo</th>
            <th className="border p-2">Link GitHub</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {projek.map((p) => {
            const videoId = getYouTubeId(p.link_demo);
            const demoUrl = ensureProtocol(p.link_demo);
            const images = p.images ? JSON.parse(p.images) : [];

            return (
              <tr key={p.id}>
                <td className="border p-2">{p.judul}</td>
                <td className="border p-2">{p.deskripsi}</td>
                <td className="border p-2 text-center">
                  {p.pdf_file && (
                    <a href={`http://localhost:8080/uploads/${p.pdf_file}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                      Lihat PDF
                    </a>
                  )}
                  {videoId && !p.pdf_file && (
                    <a href={demoUrl} target="_blank" rel="noreferrer">
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt="YouTube thumbnail"
                        className="w-40 h-auto rounded shadow-md hover:scale-105 transition-transform"
                      />
                    </a>
                  )}
                  {images.length > 0 && (
                    <div className="flex overflow-x-auto gap-2 mt-2">
                      {images.map((img, idx) => (
                        <img
                          key={idx}
                          src={`http://localhost:8080/uploads/${img}`}
                          alt={`Image ${idx + 1}`}
                          className="w-32 h-32 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                  {!p.pdf_file && !videoId && images.length === 0 && "-"}
                </td>
                <td className="border p-2">
                  {p.link_demo ? <a href={demoUrl} target="_blank" rel="noreferrer">Demo</a> : "-"}
                </td>
                <td className="border p-2">
                  {p.link_github ? <a href={ensureProtocol(p.link_github)} target="_blank" rel="noreferrer">GitHub</a> : "-"}
                </td>
                <td className="border p-2 flex gap-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
