'use client';
import { useState, useEffect } from 'react';

export default function LombaPage() {
  const [lomba, setLomba] = useState([]);
  const [form, setForm] = useState({ nama: '', tingkat: '', tahun: '', hasil: '', penyelenggara: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);

  const loadData = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/lomba');
      if (!res.ok) throw new Error('Gagal memuat data');
      const data = await res.json();
      setLomba(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.tahun || !form.tingkat) {
      alert('Mohon isi semua field penting!');
      return;
    }
    setLoading(true); setError('');

    try {
      const url = editingId
        ? `http://localhost:8080/api/lomba/${editingId}`
        : 'http://localhost:8080/api/lomba';
      const method = editingId ? 'PUT' : 'POST';

      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
      }

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error('Gagal menyimpan data');
      const data = await res.json();

      if (editingId) setLomba(prev => prev.map(l => (l.id === editingId ? data : l)));
      else setLomba(prev => [...prev, data]);

      setForm({ nama: '', tingkat: '', tahun: '', hasil: '', penyelenggara: '' });
      setFiles([]); setEditingId(null);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleEdit = (l) => {
    setForm({ nama: l.nama, tingkat: l.tingkat, tahun: l.tahun, hasil: l.hasil, penyelenggara: l.penyelenggara });
    setEditingId(l.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus lomba ini?')) return;
    try {
      const res = await fetch(`http://localhost:8080/api/lomba/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus data');
      setLomba(prev => prev.filter(l => l.id !== id));
    } catch (err) { setError(err.message); }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manajemen Lomba</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6 max-w-md" encType="multipart/form-data">
        <input placeholder="Nama Lomba" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} className="border p-2 rounded" />
        <input placeholder="Tingkat" value={form.tingkat} onChange={e => setForm({ ...form, tingkat: e.target.value })} className="border p-2 rounded" />
        <input placeholder="Tahun" value={form.tahun} onChange={e => setForm({ ...form, tahun: e.target.value })} className="border p-2 rounded" />
        <input placeholder="Hasil" value={form.hasil} onChange={e => setForm({ ...form, hasil: e.target.value })} className="border p-2 rounded" />
        <input placeholder="Penyelenggara" value={form.penyelenggara} onChange={e => setForm({ ...form, penyelenggara: e.target.value })} className="border p-2 rounded" />
        <input type="file" multiple onChange={e => setFiles(e.target.files)} className="border p-2 rounded" />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Menyimpan...' : editingId ? 'Edit Data' : 'Tambah Lomba'}
        </button>
      </form>

      <table className="border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">Nama</th>
            <th className="border p-2">Tingkat</th>
            <th className="border p-2">Tahun</th>
            <th className="border p-2">Hasil</th>
            <th className="border p-2">Penyelenggara</th>
            <th className="border p-2">File</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {lomba.map(l => (
            <tr key={l.id}>
              <td className="border p-2">{l.nama}</td>
              <td className="border p-2">{l.tingkat}</td>
              <td className="border p-2">{l.tahun}</td>
              <td className="border p-2">{l.hasil || "-"}</td>
              <td className="border p-2">{l.penyelenggara || "-"}</td>
              <td className="border p-2 flex flex-wrap gap-1">
                {l.files?.map((f, idx) => (
                  f.fileType === "image" ? (
                    <img key={idx} src={`http://localhost:8080/${f.filePath}`} className="w-20 h-20 object-cover rounded" />
                  ) : (
                    <a key={idx} href={`http://localhost:8080/${f.filePath}`} target="_blank" className="text-blue-600 underline">PDF</a>
                  )
                ))}
              </td>
              <td className="border p-2 flex gap-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onClick={() => handleEdit(l)}>Edit</button>
                <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(l.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
