/* ============================================================
    LOGIKA NAVIGASI & SISTEM UJIAN (VERSI FINAL AMAN)
   ============================================================ */

// Variabel Global untuk Ujian
let currentSoalIdx = 0;
let sisaWaktu = 60 * 60; 
let jawabanUser = new Array(30).fill(null); 

/* ============================================================
    DATABASE AKUN PESERTA (Tambahkan sesuai kebutuhan)
   ============================================================ */
const dataPeserta = [
    { username: "C30030001-1", password: "B15V2H5", nama: "SUN HAJI", nik: "B0001" },
    { username: "C30030001-2", password: "B15V2H5", nama: "Muhammad Rizki Ramadhon", nik: "B0002" },
    { username: "C30030001-3", password: "B15V2H5", nama: "Muhammad Izzat Alfayyadh", nik: "B0003" },
    { username: "C30030001-4", password: "B15V2H5", nama: "maulana Yusuf", nik: "B0004" },
    { username: "C30030001-5", password: "B15V2H5", nama: "Muhammad Erlangga Alamsyah Putra", nik: "B0005" },
    { username: "C30030001-6", password: "B15V2H5", nama: "Muhammad Fahri Ali", nik: "B0006" },
    { username: "C30030001-7", password: "B15V2H5", nama: "Alfitra Suhaimi", nik: "B0007" },
    { username: "C30030001-8", password: "B15V2H5", nama: "Jumanah", nik: "B0008" },
    { username: "C30030001-9", password: "B15V2H5", nama: "Siti Fitriyah", nik: "B0009" },
    { username: "C30030001-10", password: "B15V2H5", nama: "Asmi", nik: "B00010" },
    { username: "C30030001-11", password: "B15V2H5", nama: "Muhamad Azril Al Fathri", nik: "B00011" },
    { username: "C30030001-12", password: "B15V2H5", nama: "Julfikar", nik: "B00012" },
    { username: "C30030001-13", password: "B15V2H5", nama: "Hidayatullah", nik: "B00013" },
    { username: "C30030001-14", password: "B15V2H5", nama: "Risma Pebriana", nik: "B00014" },
    { username: "C30030001-15", password: "B15V2H5", nama: "Ria Sintia Aulia", nik: "B00015" },
    { username: "C30030001-16", password: "B15V2H5", nama: "Irawan", nik: "B00016" },
    { username: "C30030001-17", password: "B15V2H5", nama: "Efan Cahyono", nik: "B00017" },
    { username: "C30030001-18", password: "B15V2H5", nama: "Muhamad Adli Zaidan", nik: "B00018" }
];

/* ============================================================
    FUNGSI VALIDASI LOGIN
   ============================================================ */
function validasiLogin() {
    const userInp = document.getElementById('username').value;
    const passInp = document.getElementById('password').value;

    // Cari apakah ada username dan password yang cocok di database
    const userValid = dataPeserta.find(u => u.username === userInp && u.password === passInp);

    if (userValid) {
        // Jika cocok, simpan nama peserta ke localStorage agar bisa tampil di halaman berikutnya
        localStorage.setItem("nikPeserta", userValid.nik);
        localStorage.setItem("namaPeserta", userValid.nama);
        
        // Arahkan ke halaman Konfirmasi Data Peserta (KDP)
        window.location.href = "./kdp.html";
    } else {
        // Jika salah
        alert("Username atau Password salah! Silakan cek kembali data yang diberikan.");
    }
}

// 1. DATA SOAL (30 Soal per Mapel)
// 1. DATA SOAL (30 Soal per Mapel dengan Kunci Jawaban)
const databaseSoal = {
    "Matematika": [
        { teks: "Jika $f(x) = 3x + 5$, tentukan nilai dari $f(2)$.", tanya: "Berapakah hasil akhirnya?", opsi: ["A. 11", "B. 10", "C. 9", "D. 12", "E. 13"], kunci: 0 },
        { teks: "Sebuah segitiga memiliki alas 10 cm dan tinggi 8 cm.", tanya: "Berapakah luas segitiga tersebut?", opsi: ["A. 40 cm²", "B. 80 cm²", "C. 20 cm²", "D. 50 cm²", "E. 60 cm²"], kunci: 0 },
        { teks: "Akar-akar dari persamaan $x^2 - 5x + 6 = 0$ adalah...", tanya: "Tentukan nilai x1 dan x2.", opsi: ["A. 2 dan 3", "B. -2 dan -3", "C. 1 dan 6", "D. -1 dan -6", "E. 0 dan 5"], kunci: 0 },
        { teks: "Hasil dari $2^3 \\times 2^2$ adalah...", tanya: "Gunakan sifat eksponen.", opsi: ["A. 32", "B. 16", "C. 64", "D. 8", "E. 12"], kunci: 0 },
        { teks: "Berapakah turunan pertama dari $f(x) = x^2$?", tanya: "Gunakan aturan pangkat.", opsi: ["A. 2x", "B. x", "C. 2", "D. x^2", "E. 1"], kunci: 0 },
        { teks: "Volume kubus dengan rusuk 5 cm adalah...", tanya: "Hitung volume Sisi x Sisi x Sisi.", opsi: ["A. 125 cm³", "B. 25 cm³", "C. 150 cm³", "D. 75 cm³", "E. 100 cm³"], kunci: 0 },
        { teks: "Median dari data: 2, 4, 6, 8, 10 adalah...", tanya: "Cari nilai tengah.", opsi: ["A. 6", "B. 4", "C. 8", "D. 5", "E. 7"], kunci: 0 },
        { teks: "Berapakah nilai dari $\\log_{10} 100$?", tanya: "Hitung basis logaritma.", opsi: ["A. 2", "B. 1", "C. 10", "D. 100", "E. 0"], kunci: 0 },
        { teks: "Jika $2x + 4 = 10$, maka nilai x adalah...", tanya: "Selesaikan persamaan linear.", opsi: ["A. 3", "B. 2", "C. 4", "D. 5", "E. 6"], kunci: 0 },
        { teks: "Berapakah sin 90 derajat?", tanya: "Nilai trigonometri dasar.", opsi: ["A. 1", "B. 0", "C. 0.5", "D. -1", "E. tak terhingga"], kunci: 0 },
        { teks: "Hasil dari $15 + ( -5 \\times 2 )$ adalah...", tanya: "Operasi campuran.", opsi: ["A. 5", "B. 20", "C. 10", "D. -5", "E. 25"], kunci: 0 },
        { teks: "Berapakah luas lingkaran dengan jari-jari 7 cm? (pi = 22/7)", tanya: "Gunakan rumus Luas.", opsi: ["A. 154 cm²", "B. 44 cm²", "C. 49 cm²", "D. 145 cm²", "E. 77 cm²"], kunci: 0 },
        { teks: "Suku ke-10 dari barisan aritmatika 2, 5, 8, ... adalah...", tanya: "Cari nilai U10.", opsi: ["A. 29", "B. 30", "C. 27", "D. 32", "E. 26"], kunci: 0 },
        { teks: "Sebuah dadu dilempar sekali.", tanya: "Peluang muncul mata dadu genap adalah...", opsi: ["A. 1/2", "B. 1/3", "C. 1/6", "D. 2/3", "E. 1/4"], kunci: 0 },
        { teks: "Himpunan penyelesaian $|x - 1| = 2$ adalah...", tanya: "Cari nilai mutlak.", opsi: ["A. {3, -1}", "B. {3, 1}", "C. {-3, 1}", "D. {2, -2}", "E. {1, 0"], kunci: 0 },
        { teks: "Diagonal bidang kubus dengan rusuk 6 cm adalah...", tanya: "Gunakan Pythagoras.", opsi: ["A. 6√2", "B. 6√3", "C. 12", "D. 36", "E. 6"], kunci: 0 },
        { teks: "Integral dari $2x$ adalah...", tanya: "Integralkan fungsi linear.", opsi: ["A. x^2 + C", "B. 2x^2 + C", "C. x + C", "D. 2 + C", "E. x^2"], kunci: 0 },
        { teks: "Nilai limit $x$ mendekati 2 dari $x + 3$ adalah...", tanya: "Substitusi nilai limit.", opsi: ["A. 5", "B. 2", "C. 3", "D. 6", "E. 0"], kunci: 0 },
        { teks: "Sisi miring segitiga siku-siku dengan alas 3 dan tinggi 4 adalah...", tanya: "Tripel Pythagoras.", opsi: ["A. 5", "B. 7", "C. 6", "D. 12", "E. 25"], kunci: 0 },
        { teks: "Modus dari data: 5, 5, 6, 7, 8 adalah...", tanya: "Nilai yang sering muncul.", opsi: ["A. 5", "B. 6", "C. 7", "D. 8", "E. Tidak ada"], kunci: 0 },
        { teks: "Berapakah derajat sudut dalam satu lingkaran penuh?", tanya: "Geometri dasar.", opsi: ["A. 360", "B. 180", "C. 90", "D. 270", "E. 400"], kunci: 0 },
        { teks: "Bentuk sederhana dari $\\sqrt{75}$ adalah...", tanya: "Sederhanakan akar.", opsi: ["A. 5√3", "B. 3√5", "C. 15", "D. 25√3", "E. 5√5"], kunci: 0 },
        { teks: "Determinan matriks [[2, 1], [4, 3]] adalah...", tanya: "ad - bc.", opsi: ["A. 2", "B. 3", "C. 4", "D. 5", "E. 6"], kunci: 0 },
        { teks: "Persamaan garis melalui (0,0) dengan gradien 2 adalah...", tanya: "y = mx + c.", opsi: ["A. y = 2x", "B. y = x + 2", "C. y = 2", "D. x = 2y", "E. y = -2x"], kunci: 0 },
        { teks: "Berapakah 20% dari 500.000?", tanya: "Persentase ekonomi.", opsi: ["A. 100.000", "B. 50.000", "C. 10.000", "D. 200.000", "E. 150.000"], kunci: 0 },
        { teks: "Deret geometri: 1 + 2 + 4 + 8 + ...", tanya: "Jumlah 4 suku pertama.", opsi: ["A. 15", "B. 16", "C. 31", "D. 14", "E. 7"], kunci: 0 },
        { teks: "Jika sebuah mesin mencetak 10 lembar dalam 2 detik.", tanya: "Berapa lembar dalam 1 menit?", opsi: ["A. 300", "B. 200", "C. 600", "D. 100", "E. 120"], kunci: 0 },
        { teks: "Sudut yang besarnya antara 90 dan 180 derajat disebut...", tanya: "Nama sudut.", opsi: ["A. Tumpul", "B. Lancip", "C. Siku-siku", "D. Refleks", "E. Lurus"], kunci: 0 },
        { teks: "Hasil dari $3!$ (3 faktorial) adalah...", tanya: "3 x 2 x 1.", opsi: ["A. 6", "B. 3", "C. 9", "D. 12", "E. 1"], kunci: 0 },
        { teks: "Bayangan titik (1,2) oleh translasi (3,4) adalah...", tanya: "Penjumlahan vektor.", opsi: ["A. (4,6)", "B. (2,2)", "C. (4,4)", "D. (6,4)", "E. (3,3)"], kunci: 0 }
    ],
    "Bahasa Indonesia": [
        { teks: "Banjir melanda Jakarta akibat curah hujan yang tinggi dan saluran air yang tersumbat.", tanya: "Apa penyebab utama banjir menurut teks?", opsi: ["A. Hujan & saluran air", "B. Sampah plastik", "C. Kurangnya pohon", "D. Laut pasang", "E. Gempa bumi"], kunci: 0 },
        { teks: "Andi adalah anak yang sangat ringan tangan di sekolahnya.", tanya: "Makna ungkapan 'ringan tangan' adalah...", opsi: ["A. Suka membantu", "B. Suka memukul", "C. Cepat mencuri", "D. Malas bekerja", "E. Suka jajan"], kunci: 0 },
        { teks: "Pemerintah sedang menggalakkan program literasi digital di pelosok desa.", tanya: "Sinonim kata 'menggalakkan' adalah...", opsi: ["A. Mendorong", "B. Menghentikan", "C. Membeli", "D. Melihat", "E. Menunda"], kunci: 0 },
        { teks: "Ibu membeli buah, sayur, dan ikan di pasar tradisional.", tanya: "Penulisan tanda baca koma di atas sudah benar?", opsi: ["A. Ya, sudah benar", "B. Tidak, harus titik", "C. Tidak perlu koma", "D. Koma hanya satu", "E. Pakai titik dua"], kunci: 0 },
        { teks: "Kalimat efektif adalah kalimat yang mudah dipahami pembaca.", tanya: "Manakah ciri kalimat efektif?", opsi: ["A. Logis & hemat kata", "B. Bertele-tele", "C. Sangat panjang", "D. Banyak majas", "E. Sulit dibaca"], kunci: 0 },
        { teks: "Siswa itu rajin belajar agar lulus ujian dengan nilai memuaskan.", tanya: "Konjungsi tujuan dalam kalimat tersebut adalah...", opsi: ["A. agar", "B. itu", "C. belajar", "D. lulus", "E. rajin"], kunci: 0 },
        { teks: "Buku itu dibaca oleh kakak kemarin pagi.", tanya: "Ubah menjadi kalimat aktif!", opsi: ["A. Kakak membaca buku", "B. Buku membaca kakak", "C. Kakak dibaca buku", "D. Kemarin kakak buku", "E. Pagi kakak baca"], kunci: 0 },
        { teks: "Laporan hasil observasi harus bersifat objektif.", tanya: "Apa arti 'objektif'?", opsi: ["A. Sesuai kenyataan", "B. Menurut perasaan", "C. Mengikuti opini", "D. Bersifat rahasia", "E. Indah bahasanya"], kunci: 0 },
        { teks: "Pantun terdiri dari sampiran dan isi.", tanya: "Bagian sampiran ada di baris nomor...", opsi: ["A. 1 dan 2", "B. 3 dan 4", "C. 1 saja", "D. 4 saja", "E. Semua baris"], kunci: 0 },
        { teks: "Majas personifikasi memberikan sifat manusia pada benda mati.", tanya: "Contoh majas personifikasi adalah...", opsi: ["A. Nyiur melambai", "B. Wajahnya cantik", "C. Dia lari cepat", "D. Rumah itu besar", "E. Ibu makan nasi"], kunci: 0 },
        { teks: "Penulisan judul yang benar di bawah ini adalah...", opsi: ["A. Laskar Pelangi", "B. laskar pelangi", "C. LASKAR pelangi", "D. laskar PELANGI", "E. Laskar pelangi"], kunci: 0 },
        { teks: "Teks prosedur berisi langkah-langkah melakukan sesuatu.", tanya: "Ciri khas teks prosedur adalah...", opsi: ["A. Kata perintah", "B. Banyak dialog", "C. Cerita masa lalu", "D. Opini penulis", "E. Sajak berirama"], kunci: 0 },
        { teks: "Antonim dari kata 'Prolog' adalah...", opsi: ["A. Epilog", "B. Dialog", "C. Monolog", "D. Katalog", "E. Logika"], kunci: 0 },
        { teks: "Kalimat tanya harus diakhiri dengan tanda...", opsi: ["A. Tanya (?)", "B. Seru (!)", "C. Titik (.)", "D. Koma (,)", "E. Titik dua (:)"], kunci: 0 },
        { teks: "Surat resmi biasanya menggunakan bahasa...", opsi: ["A. Baku", "B. Gaul", "C. Daerah", "D. Isyarat", "E. Rahasia"], kunci: 0 },
        { teks: "Paragraf induktif adalah paragraf yang kalimat utamanya di...", opsi: ["A. Akhir", "B. Awal", "C. Tengah", "D. Awal & Akhir", "E. Judul"], kunci: 0 },
        { teks: "Kata dasar dari 'Mempertanggungjawabkan' adalah...", opsi: ["A. Tanggung jawab", "B. Tanggung", "C. Jawab", "D. Pertanggung", "E. Jawabkan"], kunci: 0 },
        { teks: "Fungsi dari teras berita (lead) adalah...", opsi: ["A. Inti informasi", "B. Penutup berita", "C. Nama penulis", "D. Tanggal berita", "E. Iklan"], kunci: 0 },
        { teks: "Puisi lama yang berasal dari Arab dengan rima a-a-a-a adalah...", opsi: ["A. Syair", "B. Gurindam", "C. Pantun", "D. Karmina", "E. Soneta"], kunci: 0 },
        { teks: "Ideologi adalah kumpulan ide atau gagasan.", tanya: "Serapan kata 'ideologi' berasal dari...", opsi: ["A. Inggris", "B. Belanda", "C. Yunani", "D. Arab", "E. Sanskerta"], kunci: 2 },
        { teks: "Si Kancil mencuri timun milik Pak Tani.", tanya: "Tokoh utama cerita tersebut adalah...", opsi: ["A. Kancil", "B. Pak Tani", "C. Timun", "D. Kancil & Tani", "E. Penulis"], kunci: 0 },
        { teks: "Manakah kata yang baku?", opsi: ["A. Apotek", "B. Apotik", "C. Apotik", "D. Apotit", "E. Apoték"], kunci: 0 },
        { teks: "Sajak dalam satu bait pantun biasanya berirama...", opsi: ["A. a-b-a-b", "B. a-a-a-a", "C. a-a-b-b", "D. b-b-a-a", "E. bebas"], kunci: 0 },
        { teks: "Tujuan teks eksposisi adalah...", opsi: ["A. Menjelaskan", "B. Menghibur", "C. Menceritakan", "D. Merayu", "E. Menghina"], kunci: 0 },
        { teks: "Karya tulis yang menyajikan argumen pribadi disebut...", opsi: ["A. Esai", "B. Kamus", "C. Ensiklopedia", "D. Bibliografi", "E. Skripsi"], kunci: 0 },
        { teks: "Dina tidak masuk sekolah ... sakit.", tanya: "Kata hubung sebab yang tepat adalah...", opsi: ["A. karena", "B. meskipun", "C. dan", "D. tetapi", "E. kemudian"], kunci: 0 },
        { teks: "Penerbitan buku itu dilakukan setahun sekali.", tanya: "Makna kata 'setahun sekali' adalah...", opsi: ["A. Tahunan", "B. Bulanan", "C. Harian", "D. Mingguan", "E. Abadi"], kunci: 0 },
        { teks: "Simpulan adalah hasil akhir dari suatu pembicaraan.", tanya: "Simpulan harus mencakup...", opsi: ["A. Seluruh isi", "B. Nama penulis", "C. Daftar pustaka", "D. Kritik saja", "E. Kata pengantar"], kunci: 0 },
        { teks: "Majas hiperbola adalah majas yang...", opsi: ["A. Melebih-lebihkan", "B. Mengecilkan", "C. Menyindir halus", "D. Menyamakan", "E. Bertanya"], kunci: 0 },
        { teks: "Ayah membaca koran di teras rumah.", tanya: "Subjek kalimat tersebut adalah...", opsi: ["A. Ayah", "B. Membaca", "C. Koran", "D. Teras", "E. Rumah"], kunci: 0 }
    ]
};

// 2. FUNGSI NAVIGASI ANTAR HALAMAN (Aman & Tidak Merusak)
//function goLogin() {
  //  const jenjang = document.getElementById('select-jenjang').value;
    //const mapel = document.getElementById('select-mapel').value;
    //if (!jenjang || !mapel) {
      //  alert("Silakan pilih Jenjang dan Mata Pelajaran!");
    //} else {
      //  localStorage.setItem("selectedMapel", mapel);
        //window.location.href = "login.html";
    //}
//}

// =============== YANG DI PERBAIKI BARUSAN ================
function goLogin() {
    const jenjang = document.getElementById('select-jenjang').value;
    const mapel = document.getElementById('select-mapel').value;

    if (!jenjang || !mapel) {
        alert("Silakan pilih Jenjang dan Mata Pelajaran!");
        return;
    }

    localStorage.setItem("selectedMapel", mapel);
    window.location.href = "./login.html";
}
//====================== END =============================

function submitKDP() {
    const inputMapel = document.getElementById('input-mapel');
    if (inputMapel && inputMapel.value !== "") {
        localStorage.setItem("selectedMapel", inputMapel.value);
    }
    window.location.href = "./kt.html";
}

function mulaiUjian() {
    window.location.href = "./soal.html";
}

// 3. LOGIKA HALAMAN SOAL (Daftar Soal & Info Soal)
function updateTampilanSoal() {
    const mapel = localStorage.getItem("selectedMapel") || "Bahasa Indonesia";
    const soalSet = databaseSoal[mapel] || databaseSoal["Bahasa Indonesia"];
    const data = soalSet[currentSoalIdx];

    const elNum = document.getElementById("current-number");
    const elTeks = document.getElementById("soal-teks");
    const elTanya = document.getElementById("soal-pertanyaan");
    const elLabel = document.getElementById("bottom-mapel");

    if (elNum) elNum.innerText = currentSoalIdx + 1;
    if (elTeks) elTeks.innerText = data.teks;
    if (elTanya) elTanya.innerText = data.tanya;
    if (elLabel) elLabel.innerText = mapel;

    const container = document.getElementById("options-container");
    if (container) {
        container.innerHTML = "";
        data.opsi.forEach((opt, idx) => {
            const isChecked = jawabanUser[currentSoalIdx] === idx ? "checked" : "";
            container.innerHTML += `
                <div class="option-item" onclick="pilihJawaban(${idx})">
                    <input type="radio" name="jawaban" ${isChecked}> ${opt}
                </div>`;
        });
    }
}

function pilihJawaban(idx) {
    jawabanUser[currentSoalIdx] = idx;
    // Simpan ke storage agar tidak hilang saat pindah halaman
    localStorage.setItem("jawabanSimulasi", JSON.stringify(jawabanUser));
    updateTampilanSoal();
}

/* PERUBAHAN DISINI: Fungsi NextSoal diarahkan ke kts.html jika sudah di nomor 30 */
function nextSoal() {
    if (currentSoalIdx === 29) { 
        window.location.href = "./kts.html"; 
    } else { 
        currentSoalIdx++; 
        updateTampilanSoal(); 
    }
}

function prevSoal() {
    if (currentSoalIdx > 0) { currentSoalIdx--; updateTampilanSoal(); }
}

// Fitur Modal Daftar Soal
function bukaDaftarSoal() {
    const grid = document.getElementById("grid-nomor");
    if (!grid) return;
    grid.innerHTML = "";
    for (let i = 0; i < 30; i++) {
        let status = "belum";
        if (i === currentSoalIdx) status = "sedang";
        else if (jawabanUser[i] !== null) status = "sudah";
        grid.innerHTML += `<div class="nomor-item ${status}" onclick="lompatSoal(${i})">${i + 1}</div>`;
    }
    document.getElementById("modal-daftar").style.display = "block";
}

function lompatSoal(idx) {
    currentSoalIdx = idx;
    updateTampilanSoal();
    tutupModal('modal-daftar');
}

// Fitur Modal Informasi Soal
function bukaInfo() {
    const mapel = localStorage.getItem("selectedMapel") || "Bahasa Indonesia";
    const infoBody = document.getElementById("info-body");
    if (infoBody) {
        infoBody.innerHTML = `
            <p><strong>Mata Ujian:</strong> ${mapel}</p>
            <p><strong>Jumlah Soal:</strong> 30</p>
            <p><strong>Status:</strong> ${jawabanUser[currentSoalIdx] !== null ? "Terjawab" : "Belum Dijawab"}</p>
        `;
    }
    document.getElementById("modal-info").style.display = "block";
    document.getElementById('input-mapel').value = localStorage.getItem("selectedMapel");
}

function tutupModal(id) {
    document.getElementById(id).style.display = "none";
}

/* TAMBAHAN DISINI: Fungsi khusus untuk tombol di kts.html */
function goBack() {
    window.location.href = "./soal.html";
}

function finishTes() {
    const mapel = localStorage.getItem("selectedMapel") || "Bahasa Indonesia";
    const soalSet = databaseSoal[mapel];
    
    // Ambil jawaban yang tersimpan
    const savedJawaban = JSON.parse(localStorage.getItem("jawabanSimulasi")) || new Array(30).fill(null);
    
    let benar = 0;
    let salah = 0;
    let kosong = 0;

    soalSet.forEach((soal, index) => {
        if (savedJawaban[index] === null) {
            kosong++;
        } else if (savedJawaban[index] === soal.kunci) {
            benar++;
        } else {
            salah++;
        }
    });

    let totalNilai = Math.round((benar / soalSet.length) * 100);

    localStorage.setItem("hasil_benar", benar);
    localStorage.setItem("hasil_salah", salah);
    localStorage.setItem("hasil_kosong", kosong);
    localStorage.setItem("hasil_nilai", totalNilai);

    alert("Tes telah selesai. Menghitung hasil...");
    location.reload(); 
}

// ====== YANG DI TAMBAH BARUSAN =====

function goToKDP() {
    window.location.href = "./kdp.html";
}

// ====== END ========

// 4. OTOMATISASI SAAT HALAMAN DIMUAT
document.addEventListener("DOMContentLoaded", function() {

    // Ambil kembali jawaban yang tersimpan jika ada
    const saved = localStorage.getItem("jawabanSimulasi");
    if (saved) {
        jawabanUser = JSON.parse(saved);
    }

    // --- Logika Khusus Halaman KDP.html ---
    const inputNIK = document.getElementById("nik");
    // Karena kdp.html punya dua input Nama Peserta (berdasarkan kodingan Anda sebelumnya)
    const inputNamaSemua = document.querySelectorAll('input[placeholder="Ketikkan Nama Peserta"]');
    
    // Ambil data dari localStorage
    const savedNama = localStorage.getItem("namaPeserta");
    const savedNIK = localStorage.getItem("nikPeserta");

    // Jika elemen ada di halaman, isi nilainya
    if (savedNIK && inputNIK) {
        inputNIK.value = savedNIK;
        inputNIK.readOnly = true; // Opsional: agar NIK tidak bisa diubah-ubah
    }

    if (savedNama && inputNamaSemua.length > 0) {
        inputNamaSemua.forEach(input => {
            input.value = savedNama;
            input.readOnly = true; // Opsional: agar Nama tidak bisa diubah-ubah
        });
    }

    // Tampilkan Hasil di kts.html jika elemennya ada
    const ktsMessage = document.querySelector(".kts-message");
    if (ktsMessage && localStorage.getItem("hasil_nilai") !== null) {
        const benar = localStorage.getItem("hasil_benar");
        const salah = localStorage.getItem("hasil_salah");
        const kosong = localStorage.getItem("hasil_kosong");
        const nilai = localStorage.getItem("hasil_nilai");

        ktsMessage.innerHTML = `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 5px solid #007bff; margin-bottom: 20px;">
                <h4 style="margin-bottom: 15px; color: #333;">HASIL SIMULASI ANDA:</h4>
                <p>Benar: <strong>${benar}</strong></p>
                <p>Salah: <strong>${salah}</strong></p>
                <p>Tidak Dijawab: <strong>${kosong}</strong></p>
                <hr style="margin: 10px 0;">
                <p style="font-size: 18px;">Nilai Akhir: <span class="text-green-bold" style="font-size: 24px;">${nilai}</span></p>
            </div>
            <p>Silahkan tekan tombol <span class="text-red-bold">KELUAR</span> untuk mengakhiri sesi simulasi.</p>
        `;

        // Ubah tombol "SELESAI TES" menjadi "KELUAR" agar tidak bingung
        const btnSelesai = document.querySelector(".btn-kts-selesai");
        if (btnSelesai) {
            btnSelesai.innerText = "KELUAR";
            btnSelesai.onclick = function() {
                localStorage.clear(); // Bersihkan data saat keluar
                window.location.href = "index.html";
            };
        }
    }

    // ================= TAMBAHAN UNTUK KDP =================
const inputMapel = document.getElementById("input-mapel");
if (inputMapel) {
    const mapel = localStorage.getItem("selectedMapel");
    if (mapel) {
        inputMapel.value = mapel;
    }
}
// ================= END =================
    // Dropdown Tanggal di kdp.html
    const hari = document.getElementById('hari');
    const bulan = document.getElementById('bulan');
    const tahun = document.getElementById('tahun');

    if (hari && bulan && tahun) {
        for (let i = 1; i <= 31; i++) hari.options[hari.options.length] = new Option(i, i);
        const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        namaBulan.forEach((b, i) => bulan.options[bulan.options.length] = new Option(b, i + 1));
        const y = new Date().getFullYear();
        for (let i = y; i >= 1980; i--) tahun.options[tahun.options.length] = new Option(i, i);
    }

    // Tampilan Data di kt.html
    const displayNamaTes = document.getElementById('kt-nama-tes');
    const displayWaktuTes = document.getElementById('kt-waktu-tes');
    if (displayNamaTes && displayWaktuTes) {
        displayNamaTes.innerText = localStorage.getItem("selectedMapel") || "Mata Pelajaran Wajib";
        const n = new Date();
        displayWaktuTes.innerText = `${(n.getMonth()+1).toString().padStart(2,'0')}/${n.getDate().toString().padStart(2,'0')}/${n.getFullYear()} ${n.getHours().toString().padStart(2,'0')}:${n.getMinutes().toString().padStart(2,'0')}`;
    }

    // Jalankan Ujian jika di halaman soal.html
    if (document.getElementById("soal-teks")) {
        updateTampilanSoal();
        // Timer
        setInterval(() => {
            if (sisaWaktu <= 0) return;
            sisaWaktu--;
            let m = Math.floor(sisaWaktu / 60).toString().padStart(2, '0');
            let s = (sisaWaktu % 60).toString().padStart(2, '0');
            const timerEl = document.getElementById("timer");
            if (timerEl) timerEl.innerText = `00:${m}:${s}`;
        }, 1000);
    }
});

console.log("Redirect ke:", window.location.href);
