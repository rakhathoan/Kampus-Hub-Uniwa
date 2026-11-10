# KampusHub

Nama: Rakha Maulana Raditya  
NIM: 20232210157

Repo: [Kampus-Hub-Uniwa](https://github.com/rakhathoan/Kampus-Hub-Uniwa)

## Menjalankan aplikasi

```bash
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite, biasanya `http://localhost:5173`.

## Menu dan data berita

- `/` - Dashboard KampusHub: pencarian dan data nilai mahasiswa.
- `/berita` - Berita: sepuluh berita dummy Universitas Wahidiyah.
- `/berita/:id` - Detail berita; tetap tersedia setelah halaman di-refresh.

Navigasi memakai History API. Menu berubah tanpa memuat ulang dokumen; Back, Forward, dan refresh pada `/berita` tetap membuka halaman sesuai URL.

Dashboard dan halaman Berita memakai data dummy yang sama, berisi 10 pengumuman bertema Universitas Wahidiyah. Pencarian judul serta filter penulis bekerja langsung pada data tersebut.

## Hasil pengujian

| Kondisi | Hasil |
| --- | --- |
| Data berita | Sepuluh berita dummy UNIWA menampilkan judul, isi, tanggal, kategori, dan penulis. |
| Pencarian | Aplikasi menampilkan “Belum ada berita yang cocok.” bila judul atau penulis tidak cocok. |
| Navigasi SPA | Dashboard dan Berita memiliki URL berbeda; Back/Forward menyelaraskan isi halaman. |
| Layar kecil | Layout header membungkus menu pada lebar kecil, tabel dapat digeser horizontal. |
| Tantangan tambahan | Pencarian judul, filter penulis, dan detail berita tersedia. |
| Audit dependency | `npm audit --omit=dev` selesai tanpa kerentanan. |

## Bukti tampilan

- [Berita berisi data](bukti/berita-data.png)
- [Tampilan Berita lebar 360 px](bukti/berita-360px.png)
- [Pesan berita tidak ditemukan](bukti/berita-tidak-ditemukan.png)

Catatan: aplikasi memakai data dummy Universitas Wahidiyah sesuai perubahan terakhir. Karena itu, tidak ada request `GET` ke API eksternal dan bukti Network status `200` untuk API tidak dapat disediakan tanpa mengembalikan integrasi API.
