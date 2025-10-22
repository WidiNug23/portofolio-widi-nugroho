'use client';
import { useState, useEffect } from 'react';

export default function OrganisasiPage() {
  const [org, setOrg] = useState([]);
  const [form, setForm] = useState({
    nama: '',
    jabatan: '',
    tahun_masuk: '',
    tahun_keluar: '',
    deskripsi: '',
    file: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [popupFile, setPopupFile] = useState(null);

  const loadData = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/organisasi');
      if (!res.ok) throw new Error('Gagal memuat data organisasi');
      const data = await res.json();
      setOrg(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.jabatan || !form.tahun_masuk) {
      alert('Mohon isi Nama, Jabatan, Tahun Masuk');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = editingId
        ? `http://localhost:8080/api/organisasi/${editingId}`
        : 'http://localhost:8080/api/organisasi';
      const method = editingId ? 'PUT' : 'POST';

      const formData = new FormData();
      formData.append('nama', form.nama);
      formData.append('jabatan', form.jabatan);
      formData.append('tahun_masuk', form.tahun_masuk);
      formData.append('tahun_keluar', form.tahun_keluar);
      formData.append('deskripsi', form.deskripsi);
      if (form.file) formData.append('file', form.file);

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error('Gagal menyimpan data');

      const data = await res.json();
      if (editingId) {
        setOrg(prev => prev.map(o => (o.id === editingId ? data : o)));
      } else {
        setOrg(prev => [...prev, data]);
      }

      // reset form & editing
      setForm({ nama: '', jabatan: '', tahun_masuk: '', tahun_keluar: '', deskripsi: '', file: null });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (o) => {
    setForm({
      nama: o.nama,
      jabatan: o.jabatan,
      tahun_masuk: o.tahun_masuk,
      tahun_keluar: o.tahun_keluar,
      deskripsi: o.deskripsi,
      file: null,
    });
    setEditingId(o.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus organisasi ini?')) return;
    try {
      const res = await fetch(`http://localhost:8080/api/organisasi/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus data');
      setOrg(prev => prev.filter(o => o.id !== id));
    } catch (err) { setError(err.message); }
  };

  const normalizeFileUrl = (filePath) => filePath ? `http://localhost:8080/${filePath.replace(/\\/g,'/')}` : null;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manajemen Organisasi</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6 max-w-md">
        <input placeholder="Nama" value={form.nama} onChange={e => setForm({...form, nama:e.target.value})} className="border p-2 rounded" />
        <input placeholder="Jabatan" value={form.jabatan} onChange={e => setForm({...form, jabatan:e.target.value})} className="border p-2 rounded" />
        <input placeholder="Tahun Masuk" value={form.tahun_masuk} onChange={e => setForm({...form, tahun_masuk:e.target.value})} className="border p-2 rounded" />
        <input placeholder="Tahun Keluar" value={form.tahun_keluar} onChange={e => setForm({...form, tahun_keluar:e.target.value})} className="border p-2 rounded" />
        <textarea placeholder="Deskripsi" value={form.deskripsi} onChange={e => setForm({...form, deskripsi:e.target.value})} className="border p-2 rounded" />
        <input type="file" onChange={e => setForm({...form, file:e.target.files[0]})} className="border p-2 rounded" />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Menyimpan...' : editingId ? 'Edit Data' : 'Tambah Organisasi'}
        </button>
      </form>

      {/* Table */}
      <table className="border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nama</th>
            <th className="border p-2">Jabatan</th>
            <th className="border p-2">Tahun Masuk</th>
            <th className="border p-2">Tahun Keluar</th>
            <th className="border p-2">Deskripsi</th>
            <th className="border p-2">File</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {org.map(o => {
            const fileUrl = normalizeFileUrl(o.file_path);
            return (
              <tr key={o.id}>
                <td className="border p-2">{o.nama}</td>
                <td className="border p-2">{o.jabatan}</td>
                <td className="border p-2">{o.tahun_masuk}</td>
                <td className="border p-2">{o.tahun_keluar}</td>
                <td className="border p-2">{o.deskripsi}</td>
                <td className="border p-2">
                  {fileUrl && o.file_type === 'pdf' ? (
                    <a href={fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">PDF</a>
                  ) : fileUrl && o.file_type === 'image' ? (
                    <img src={fileUrl} alt={o.nama} className="h-16 cursor-pointer" onClick={()=>setPopupFile(fileUrl)} />
                  ) : 'Tidak ada'}
                </td>
                <td className="border p-2 flex gap-2">
                  <button type="button" className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onClick={()=>handleEdit(o)}>Edit</button>
                  <button type="button" className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={()=>handleDelete(o.id)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Popup Image */}
      {popupFile && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={()=>setPopupFile(null)}>
          <img src={popupFile} alt="Preview" className="max-h-[90vh] max-w-[90vw] rounded shadow-lg" />
        </div>
      )}
    </main>
  );
}
