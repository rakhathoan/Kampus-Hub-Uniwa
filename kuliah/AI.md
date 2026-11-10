# Penggunaan AI

Tanggal: 1 November 2026

AI digunakan untuk membantu menyusun struktur halaman awal, menyesuaikan warna dengan flyer Universitas Wahidiyah, menambahkan logo kampus, membuat CSS responsif, dan menyiapkan README.

Untuk Praktik 6, AI membantu mengubah aplikasi React menjadi SPA ringan memakai History API, membuat halaman `/berita` dan `/berita/:id`, serta menambahkan pencarian judul, filter penulis, dan detail berita.

Atas permintaan pengguna, sumber berita JSONPlaceholder diganti dengan 10 data dummy bertema Universitas Wahidiyah. Tiga berita awal mengikuti contoh yang diberikan pengguna; tujuh berita lain ditambahkan sebagai data latihan. Perubahan diperiksa dengan `npm run build` dan lint CSS/JS.

Untuk pembaruan repo, AI membantu membuat bukti tampilan berita berisi data, halaman berita tidak ditemukan, dan layout lebar 360 px. Integrasi API serta bukti Network `GET 200` tidak dibuat karena sumber berita telah diganti menjadi data dummy atas permintaan pengguna.

Pada pengujian ulang, AI menemukan dependency Vite dengan kerentanan high dan warna tanggal yang kurang kontras. Vite diperbarui ke `8.3.7`, warna tanggal digelapkan, kemudian diperiksa kembali menggunakan `npm run build`, `npm audit --omit=dev`, pengujian route SPA, serta inspeksi lebar 390 px.
