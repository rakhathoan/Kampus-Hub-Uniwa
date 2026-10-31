import { useEffect, useMemo, useState } from "react";
import dataNilaiMahasiswa from "../data.js";
import logoUniwa from "../assets/uniwa-logo.png";

const beritaUniwa = [
  { id: 1, judul: "UTS Pemrograman Web minggu 8", isi: "Ujian dilaksanakan di Fakultas Teknik UNIWA. Mahasiswa wajib membawa laptop.", tanggal: "19 Oktober 2026", dateTime: "2026-10-19", kategori: "akademik", penulis: "Fakultas Teknik" },
  { id: 2, judul: "Pendaftaran beasiswa prestasi dibuka", isi: "Mahasiswa aktif dapat mengumpulkan transkrip nilai, surat rekomendasi, dan portofolio kegiatan melalui bagian kemahasiswaan (Pak Bahrul).", tanggal: "18 September 2026", dateTime: "2026-09-18", kategori: "beasiswa", penulis: "Kemahasiswaan" },
  { id: 3, judul: "Jam buka perpustakaan diperpanjang", isi: "Perpustakaan kampus buka sampai pukul 14:00 selama Pak Agus Loading masih ada di kantor.", tanggal: "5 Oktober 2026", dateTime: "2026-10-05", kategori: "layanan", penulis: "Perpustakaan UNIWA" },
  { id: 4, judul: "KRS semester genap dibuka", isi: "Mahasiswa dapat melakukan pengisian KRS melalui sistem akademik sesuai jadwal program studi masing-masing.", tanggal: "12 Januari 2027", dateTime: "2027-01-12", kategori: "akademik", penulis: "Biro Akademik" },
  { id: 5, judul: "Seminar karier untuk mahasiswa tingkat akhir", isi: "Pusat Karier UNIWA mengundang mahasiswa tingkat akhir mengikuti seminar persiapan CV, wawancara, dan dunia kerja.", tanggal: "2 Februari 2027", dateTime: "2027-02-02", kategori: "kemahasiswaan", penulis: "Pusat Karier" },
  { id: 6, judul: "Pendaftaran UKM kampus semester baru", isi: "Mahasiswa baru dan mahasiswa aktif dapat mendaftar Unit Kegiatan Mahasiswa melalui bagian kemahasiswaan.", tanggal: "8 Februari 2027", dateTime: "2027-02-08", kategori: "kemahasiswaan", penulis: "Kemahasiswaan" },
  { id: 7, judul: "Pelatihan literasi digital di perpustakaan", isi: "Perpustakaan UNIWA menyelenggarakan pelatihan pencarian referensi ilmiah dan penggunaan jurnal digital.", tanggal: "15 Februari 2027", dateTime: "2027-02-15", kategori: "layanan", penulis: "Perpustakaan UNIWA" },
  { id: 8, judul: "Jadwal pembayaran UKT diumumkan", isi: "Informasi jadwal dan tata cara pembayaran UKT semester genap tersedia di bagian keuangan kampus.", tanggal: "20 Januari 2027", dateTime: "2027-01-20", kategori: "keuangan", penulis: "Bagian Keuangan" },
  { id: 9, judul: "Lomba inovasi mahasiswa UNIWA", isi: "Fakultas Teknik membuka pendaftaran lomba inovasi untuk karya teknologi dan solusi bagi masyarakat.", tanggal: "25 Februari 2027", dateTime: "2027-02-25", kategori: "prestasi", penulis: "Fakultas Teknik" },
  { id: 10, judul: "Kerja bakti lingkungan kampus", isi: "Seluruh civitas akademika diajak menjaga kebersihan lingkungan kampus melalui kerja bakti bersama.", tanggal: "5 Maret 2027", dateTime: "2027-03-05", kategori: "kampus", penulis: "Humas UNIWA" },
];

function pathSaatIni() {
  const detail = window.location.pathname.match(/^\/berita\/(\d+)$/);
  if (detail) return { nama: "detail", id: detail[1] };
  if (window.location.pathname === "/berita") return { nama: "berita" };
  return { nama: "dashboard" };
}

function NavLink({ aktif, href, children, onNavigate }) {
  return <a className={aktif ? "active" : undefined} href={href} aria-current={aktif ? "page" : undefined} onClick={(event) => { event.preventDefault(); onNavigate(href); }}>{children}</a>;
}

function Dashboard() {
  const [kataKunci, setKataKunci] = useState("");
  const [mahasiswaDipilih, setMahasiswaDipilih] = useState(null);
  const hasilPencarian = useMemo(() => {
    const kueri = kataKunci.trim().toLowerCase();
    return kueri ? dataNilaiMahasiswa.filter(({ nama }) => nama.toLowerCase().includes(kueri)) : [];
  }, [kataKunci]);
  const dataTabel = mahasiswaDipilih ? [mahasiswaDipilih] : dataNilaiMahasiswa;
  function pilihMahasiswa(mahasiswa) { setKataKunci(mahasiswa.nama); setMahasiswaDipilih(mahasiswa); document.querySelector("#data-nilai")?.scrollIntoView({ behavior: "smooth" }); }
  return <main className="container">
    <section className="intro" aria-labelledby="judul-halaman"><h1 id="judul-halaman">Papan Pengumuman UNIWA</h1><p>Informasi terbaru seputar kegiatan akademik, layanan kampus, dan kesempatan mahasiswa tahun ajaran 2026/2027.</p><form className="search-form" role="search" onSubmit={(event) => event.preventDefault()}><label htmlFor="q">Cari nama mahasiswa</label><input id="q" type="search" value={kataKunci} onChange={(event) => { setKataKunci(event.target.value); setMahasiswaDipilih(null); }} placeholder="Ketik nama mahasiswa" autoComplete="off" aria-controls="hasil-pencarian" aria-expanded={Boolean(kataKunci)} />{kataKunci && <ul id="hasil-pencarian" className="search-results">{hasilPencarian.length ? hasilPencarian.map((mahasiswa) => <li key={mahasiswa.nim}><button type="button" onClick={() => pilihMahasiswa(mahasiswa)}>{mahasiswa.nama}</button></li>) : <li>Mahasiswa tidak ditemukan.</li>}</ul>}</form></section>
    <section id="data-nilai" className="nilai-section" aria-labelledby="judul-nilai"><h2 id="judul-nilai" className="section-title">Data Nilai Mahasiswa</h2><div className="table-wrapper"><table><thead><tr><th>NIM</th><th>Nama</th><th>Mata Kuliah</th><th>Nilai</th><th>Grade</th></tr></thead><tbody>{dataTabel.map(({ nim, nama, mataKuliah, nilai, grade }) => <tr key={nim}><td>{nim}</td><td>{nama}</td><td>{mataKuliah}</td><td>{nilai}</td><td>{grade}</td></tr>)}</tbody></table></div></section>
    <section aria-labelledby="judul-daftar"><h2 id="judul-daftar" className="section-title">Pengumuman Kampus</h2><div id="daftar-pengumuman">{beritaUniwa.map(({ id, judul, isi, tanggal, dateTime, kategori }) => <article key={id} data-category={kategori}><h3>{judul}</h3><p>{isi}</p><p><time dateTime={dateTime}>{tanggal}</time> - {kategori}</p></article>)}</div></section>
    <section id="tentang" className="info-section"><h2>Tentang Universitas Wahidiyah</h2><p>Universitas Wahidiyah mencetak wali yang intelek dan intelektual yang wali.</p></section>
  </main>;
}

function Berita({ onNavigate }) {
  const [kataKunci, setKataKunci] = useState(""); const [penulis, setPenulis] = useState("");
  const daftarPenulis = [...new Set(beritaUniwa.map((berita) => berita.penulis))];
  const hasilPencarian = useMemo(() => beritaUniwa.filter((berita) => berita.judul.toLowerCase().includes(kataKunci.trim().toLowerCase()) && (!penulis || berita.penulis === penulis)), [kataKunci, penulis]);
  return <main className="container berita-page"><section className="intro" aria-labelledby="judul-berita"><h1 id="judul-berita">Berita UNIWA</h1><p>Sepuluh berita dan pengumuman terbaru Universitas Wahidiyah.</p><p className="sumber-api">Data dummy Universitas Wahidiyah</p></section><section aria-labelledby="daftar-berita"><h2 id="daftar-berita" className="section-title">Daftar Berita</h2><div className="filter-berita"><label htmlFor="cari-berita">Cari judul</label><input id="cari-berita" type="search" value={kataKunci} onChange={(event) => setKataKunci(event.target.value)} placeholder="Ketik judul berita" /><label htmlFor="penulis">Filter penulis</label><select id="penulis" value={penulis} onChange={(event) => setPenulis(event.target.value)}><option value="">Semua penulis</option>{daftarPenulis.map((nama) => <option key={nama} value={nama}>{nama}</option>)}</select></div>{hasilPencarian.length === 0 && <p className="status" role="status">Belum ada berita yang cocok.</p>}{hasilPencarian.length > 0 && <div className="news-list">{hasilPencarian.map((berita) => <article className="news-item" key={berita.id}><h3><a href={`/berita/${berita.id}`} onClick={(event) => { event.preventDefault(); onNavigate(`/berita/${berita.id}`); }}>{berita.judul}</a></h3><p>{berita.isi}</p><p><time dateTime={berita.dateTime}>{berita.tanggal}</time> - {berita.kategori}</p></article>)}</div>}</section></main>;
}

function DetailBerita({ id, onNavigate }) {
  const berita = beritaUniwa.find((item) => item.id === Number(id));
  return <main className="container berita-page"><section className="intro" aria-labelledby="judul-detail"><h1 id="judul-detail">Detail Berita</h1><p className="sumber-api">Data dummy Universitas Wahidiyah</p></section><section aria-label="Isi berita"><button className="back-button" type="button" onClick={() => onNavigate("/berita")}>Kembali ke Berita</button>{!berita && <p className="status status-error" role="alert">Berita tidak ditemukan.</p>}{berita && <article className="news-item detail-item"><h2>{berita.judul}</h2><p>{berita.isi}</p><p><time dateTime={berita.dateTime}>{berita.tanggal}</time> - {berita.kategori}</p><p>Penulis: {berita.penulis}</p></article>}</section></main>;
}

export default function App() {
  const [route, setRoute] = useState(pathSaatIni);
  useEffect(() => { const sinkronkanPath = () => setRoute(pathSaatIni()); window.addEventListener("popstate", sinkronkanPath); return () => window.removeEventListener("popstate", sinkronkanPath); }, []);
  function navigasiKe(tujuan) { if (tujuan === window.location.pathname) return; window.history.pushState({}, "", tujuan); setRoute(pathSaatIni()); window.scrollTo({ top: 0, behavior: "smooth" }); }
  const halaman = route.nama === "berita" ? <Berita onNavigate={navigasiKe} /> : route.nama === "detail" ? <DetailBerita id={route.id} onNavigate={navigasiKe} /> : <Dashboard />;
  return <><header><div className="container header-layout"><a className="brand" href="/" onClick={(event) => { event.preventDefault(); navigasiKe("/"); }} aria-label="Beranda KampusHub"><img src={logoUniwa} alt="Logo Universitas Wahidiyah" /><span>UNIVERSITAS WAHIDIYAH</span></a><nav aria-label="Navigasi utama"><NavLink href="/" aktif={route.nama === "dashboard"} onNavigate={navigasiKe}>Dashboard</NavLink><NavLink href="/berita" aktif={route.nama === "berita" || route.nama === "detail"} onNavigate={navigasiKe}>Berita</NavLink></nav></div></header>{halaman}<footer><div className="container"><p>Rakha Maulana Raditya / 20232210157 - UNIVERSITAS WAHIDIYAH 2026/2027</p></div></footer></>;
}
