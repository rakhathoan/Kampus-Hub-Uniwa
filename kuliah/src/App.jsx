import { useMemo, useState } from "react";
import dataNilaiMahasiswa from "../data.js";
import logoUniwa from "../assets/uniwa-logo.png";

const pengumuman = [
  { judul: "UTS Pemrograman Web minggu 8", isi: "Ujian dilaksanakan di Fakultas Teknik UNIWA. Mahasiswa wajib membawa laptop.", tanggal: "19 Oktober 2026", dateTime: "2026-10-19", kategori: "akademik" },
  { judul: "Pendaftaran beasiswa prestasi dibuka", isi: "Mahasiswa aktif dapat mengumpulkan transkrip nilai, surat rekomendasi, dan portofolio kegiatan melalui bagian kemahasiswaan (Pak Bahrul).", tanggal: "18 September 2026", dateTime: "2026-09-18", kategori: "beasiswa" },
  { judul: "Jam buka perpustakaan diperpanjang", isi: "Perpustakaan kampus buka sampai pukul 14:00 selama Pak Agus Loading masih ada dikantor.", tanggal: "5 Oktober 2026", dateTime: "2026-10-05", kategori: "layanan" },
];

export default function App() {
  const [kataKunci, setKataKunci] = useState("");
  const [mahasiswaDipilih, setMahasiswaDipilih] = useState(null);
  const hasilPencarian = useMemo(() => {
    const kueri = kataKunci.trim().toLowerCase();
    return kueri ? dataNilaiMahasiswa.filter(({ nama }) => nama.toLowerCase().includes(kueri)) : [];
  }, [kataKunci]);
  const dataTabel = mahasiswaDipilih ? [mahasiswaDipilih] : dataNilaiMahasiswa;

  function pilihMahasiswa(mahasiswa) {
    setKataKunci(mahasiswa.nama);
    setMahasiswaDipilih(mahasiswa);
    document.querySelector("#data-nilai")?.scrollIntoView({ behavior: "smooth" });
  }

  return <>
    <header><div className="container header-layout"><a className="brand" href="#" aria-label="Beranda KampusHub"><img src={logoUniwa} alt="Logo Universitas Wahidiyah" /><span>UNIVERSITAS WAHIDIYAH</span></a><nav aria-label="Navigasi utama"><a href="#daftar-pengumuman">Pengumuman</a><a href="#data-nilai">Data Nilai Mahasiswa</a><a href="#tentang">Tentang</a><a href="#kontak">Kontak</a></nav></div></header>
    <main className="container">
      <section className="intro" aria-labelledby="judul-halaman"><p className="eyebrow">Universitas Wahidiyah</p><h1 id="judul-halaman">Papan Pengumuman UNIWA</h1><p>Informasi terbaru seputar kegiatan akademik, layanan kampus, dan kesempatan mahasiswa tahun ajaran 2026/2027.</p><form className="search-form" role="search" onSubmit={(event) => event.preventDefault()}><label htmlFor="q">Cari nama mahasiswa</label><input id="q" type="search" value={kataKunci} onChange={(event) => { setKataKunci(event.target.value); setMahasiswaDipilih(null); }} placeholder="Ketik nama mahasiswa" autoComplete="off" aria-controls="hasil-pencarian" aria-expanded={Boolean(kataKunci)} />{kataKunci && <ul id="hasil-pencarian" className="search-results">{hasilPencarian.length ? hasilPencarian.map((mahasiswa) => <li key={mahasiswa.nim}><button type="button" onClick={() => pilihMahasiswa(mahasiswa)}>{mahasiswa.nama}</button></li>) : <li>Mahasiswa tidak ditemukan.</li>}</ul>}</form></section>
      <section id="data-nilai" className="nilai-section" aria-labelledby="judul-nilai"><h2 id="judul-nilai" className="section-title">Data Nilai Mahasiswa</h2><div className="table-wrapper"><table><thead><tr><th>NIM</th><th>Nama</th><th>Mata Kuliah</th><th>Nilai</th><th>Grade</th></tr></thead><tbody>{dataTabel.map(({ nim, nama, mataKuliah, nilai, grade }) => <tr key={nim}><td>{nim}</td><td>{nama}</td><td>{mataKuliah}</td><td>{nilai}</td><td>{grade}</td></tr>)}</tbody></table></div></section>
      <section aria-labelledby="judul-daftar"><h2 id="judul-daftar" className="section-title">Pengumuman Terbaru</h2><div id="daftar-pengumuman">{pengumuman.map(({ judul, isi, tanggal, dateTime, kategori }) => <article key={judul} data-category={kategori}><h2>{judul}</h2><p>{isi}</p><p><time dateTime={dateTime}>{tanggal}</time> - {kategori}</p></article>)}</div></section>
      <section id="tentang" className="info-section"><h2>Tentang Universitas Wahidiyah</h2><p>Universitas Wahidiyah Mencetak Wali Yang Intelek dan Intelektual Yang Wali.</p></section>
    </main>
    <footer id="kontak"><div className="container"><p>Rakha Maulana Raditya / 20232210157 - UNIVERSITAS WAHIDIYAH 2026/2027</p></div></footer>
  </>;
}
