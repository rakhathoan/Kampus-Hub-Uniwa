const daftarNilai = window.dataNilaiMahasiswa;

console.table(daftarNilai);

function tampilkanNilaiMahasiswa(data = daftarNilai) {
  const isiTabel = document.querySelector("#data-nilai-mahasiswa");

  isiTabel.innerHTML = data
    .map(
      ({ nim, nama, mataKuliah, nilai, grade }) => `
        <tr>
          <td>${nim}</td>
          <td>${nama}</td>
          <td>${mataKuliah}</td>
          <td>${nilai}</td>
          <td>${grade}</td>
        </tr>
      `,
    )
    .join("");
}

function tampilkanHasilPencarian(hasil) {
  const inputCari = document.querySelector("#q");
  const hasilPencarian = document.querySelector("#hasil-pencarian");

  if (hasil.length === 0) {
    hasilPencarian.innerHTML = "<li>Mahasiswa tidak ditemukan.</li>";
  } else {
    hasilPencarian.innerHTML = hasil
      .map(
        ({ nim, nama }) => `
          <li>
            <button type="button" data-nim="${nim}">${nama}</button>
          </li>
        `,
      )
      .join("");
  }

  hasilPencarian.hidden = false;
  inputCari.setAttribute("aria-expanded", "true");
}

function cariMahasiswa() {
  const inputCari = document.querySelector("#q");
  const kataKunci = inputCari.value.trim().toLowerCase();
  const hasilPencarian = document.querySelector("#hasil-pencarian");

  if (!kataKunci) {
    hasilPencarian.hidden = true;
    hasilPencarian.innerHTML = "";
    inputCari.setAttribute("aria-expanded", "false");
    tampilkanNilaiMahasiswa();
    return;
  }

  const hasil = daftarNilai.filter(({ nama }) =>
    nama.toLowerCase().includes(kataKunci),
  );

  tampilkanHasilPencarian(hasil);
}

function pilihMahasiswa(event) {
  const tombol = event.target.closest("button[data-nim]");

  if (!tombol) {
    return;
  }

  const mahasiswa = daftarNilai.find(({ nim }) => nim === tombol.dataset.nim);
  const inputCari = document.querySelector("#q");
  const hasilPencarian = document.querySelector("#hasil-pencarian");

  inputCari.value = mahasiswa.nama;
  hasilPencarian.hidden = true;
  hasilPencarian.innerHTML = "";
  inputCari.setAttribute("aria-expanded", "false");
  tampilkanNilaiMahasiswa([mahasiswa]);
  document.querySelector("#data-nilai").scrollIntoView({ behavior: "smooth" });
}

if (typeof document !== "undefined") {
  tampilkanNilaiMahasiswa();

  document.querySelector(".search-form").addEventListener("submit", (event) => {
    event.preventDefault();
  });
  document.querySelector("#q").addEventListener("input", cariMahasiswa);
  document
    .querySelector("#hasil-pencarian")
    .addEventListener("click", pilihMahasiswa);
}
