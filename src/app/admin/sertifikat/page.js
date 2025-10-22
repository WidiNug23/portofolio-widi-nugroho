'use client';
import { useState, useEffect } from 'react';

export default function SertifikatPage() {
  const [sertifikat, setSertifikat] = useState([]);
  const [form, setForm] = useState({
    nama: '',
    penerbit: '',
    tahun: '',
    deskripsi: '',
    pdf: null
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/sertifikat');
      if (!res.ok) throw new Error('Gagal memuat data');
      const data = await res.json();
      setSertifikat(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.penerbit || !form.tahun) {
      alert('Mohon isi semua field penting!');
      return;
    }

    setLoading(true);
    try {
      const url = editingId
        ? `http://localhost:8080/api/sertifikat/${editingId}`
        : 'http://localhost:8080/api/sertifikat';
      const method = editingId ? 'PUT' : 'POST';

      const fd = new FormData();
      fd.append('nama', form.nama);
      fd.append('penerbit', form.penerbit);
      fd.append('tahun', form.tahun);
      fd.append('deskripsi', form.deskripsi);
      if (form.pdf) fd.append('pdf', form.pdf);

      const res = await fetch(url, { method, body: fd });
      if (!res.ok) throw new Error('Gagal menyimpan data');

      setForm({ nama: '', penerbit: '', tahun: '', deskripsi: '', pdf: null });
      setEditingId(null);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleEdit = (s) => {
    setForm({
      nama: s.nama,
      penerbit: s.penerbit,
      tahun: s.tahun,
      deskripsi: s.deskripsi || '',
      pdf: null
    });
    setEditingId(s.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus sertifikat ini?')) return;
    try {
      const res = await fetch(`http://localhost:8080/api/sertifikat/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus data');
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manajemen Sertifikat</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6 max-w-md">
        <input placeholder="Nama Sertifikat" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="border p-2 rounded" required />
        <input placeholder="Penerbit" value={form.penerbit} onChange={(e) => setForm({ ...form, penerbit: e.target.value })} className="border p-2 rounded" required />
        <input placeholder="Tahun" value={form.tahun} onChange={(e) => setForm({ ...form, tahun: e.target.value })} className="border p-2 rounded" required />
        <textarea placeholder="Deskripsi" value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="border p-2 rounded" />
        <input type="file" accept="application/pdf" onChange={(e) => setForm({ ...form, pdf: e.target.files[0] })} className="border p-2 rounded" />
        <button type="submit" disabled={loading} className="bg-green-700 text-white p-2 rounded hover:bg-green-800 disabled:opacity-50">
          {loading ? 'Menyimpan...' : editingId ? 'Edit Data' : 'Tambah Sertifikat'}
        </button>
      </form>

      <table className="border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">Nama</th>
            <th className="border p-2">Penerbit</th>
            <th className="border p-2">Tahun</th>
            <th className="border p-2">Deskripsi</th>
            <th className="border p-2">PDF</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sertifikat.map((s) => (
            <tr key={s.id}>
              <td className="border p-2">{s.nama}</td>
              <td className="border p-2">{s.penerbit}</td>
              <td className="border p-2">{s.tahun}</td>
              <td className="border p-2">{s.deskripsi}</td>
              <td className="border p-2">
                {s.pdf ? (
                  <a href={`http://localhost:8080${s.pdf}`} target="_blank" className="text-blue-600 underline">
                    Lihat PDF
                  </a>
                ) : (
                  '-'
                )}
              </td>
              <td className="border p-2 flex gap-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onClick={() => handleEdit(s)}>Edit</button>
                <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
