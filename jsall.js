let users = {}; // Objek kosong untuk menyimpan data pengguna

// Fungsi untuk buat akun
function createAccount() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validasi sederhana (perlu validasi yang lebih kuat di aplikasi nyata)
    if (email === "" || password === "") {
        alert("Email dan kata sandi harus diisi");
        return;
    }

    // Periksa apakah ada pengguna yang terdaftar di localStorage
    let storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }

    // Periksa apakah email sudah ada
    if (users[email]) {
        alert("Email sudah terdaftar");
        window.location.href = "/MasukAkun/Masuk.html";
        return;
    }

    // Simpan data pengguna ke localStorage
    users[email] = password;
    localStorage.setItem('users', JSON.stringify(users));

    alert("Akun berhasil dibuat!");
    window.location.href = "/MasukAkun/Masuk.html";
}

// Fungsi untuk masuk akun
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Muat data pengguna dari localStorage
    let storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }

    // Periksa apakah email dan kata sandi cocok
    if (users[email] && users[email] === password) {
        alert("Login berhasil!");
        window.location.href = "/Beranda After/index.html";
    } else {
        alert("Email atau kata sandi salah");
    }
}

// Fungsi untuk pencarian dan filter
document.getElementById('searchButton').addEventListener('click', function () {
    let searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let filterTerm = document.getElementById('filterSelect').value;
    let cards = document.querySelectorAll('.card');

    cards.forEach(function (card) {
        let title = card.querySelector('.title').textContent.toLowerCase();
        let category = card.querySelector('.category').textContent.trim();

        if (title.includes(searchTerm) && (filterTerm === "" || category.includes(filterTerm))) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

document.getElementById('filterSelect').addEventListener('change', function () {
    let filterTerm = document.getElementById('filterSelect').value;
    let searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.querySelectorAll('.card');

    cards.forEach(function (card) {
        let title = card.querySelector('.title').textContent.toLowerCase();
        let category = card.querySelector('.category').textContent.trim();

        if (category.includes(filterTerm) && title.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// Muat data pengguna dari localStorage saat halaman dimuat
window.onload = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }
};

// Mendapatkan elemen yang diperlukan
const fileUpload = document.getElementById('fileUpload');
const fileInfo = document.getElementById('file-info');
const fileNameElement = document.getElementById('fileName');
const fileSizeElement = document.getElementById('fileSize');
const removeFile = document.getElementById('removeFile');
const uploadBox = document.getElementById('upload-box');

// Event listener untuk unggah berkas
fileUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        // Menampilkan nama file dan ukuran
        fileNameElement.textContent = file.name;
        fileSizeElement.textContent = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

        // Menampilkan elemen file-info
        fileInfo.style.display = 'flex';
    }
});

// Menghapus berkas yang diunggah
removeFile.addEventListener('click', () => {
    fileUpload.value = ""; // Reset input file
    fileInfo.style.display = 'none'; // Sembunyikan info file
});

// Fungsi untuk mengunggah berkas
function uploadFile() {
    const file = fileUpload.files[0];

    if (!file) {
        alert('Pilih berkas terlebih dahulu!');
        return;
    }

    // Validasi ukuran berkas
    if (file.size > 25 * 1024 * 1024) { // 25 MB
        alert('Ukuran berkas melebihi batas 25MB');
        return;
    }

    // Validasi format berkas
    const allowedFormats = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!allowedFormats.includes(file.type)) {
        alert('Format berkas tidak didukung!');
        return;
    }

    // Proses unggah (simulasi unggah berkas)
    alert(`Berkas ${file.name} berhasil diunggah!`);
}

// Fungsi untuk reset form
function resetForm() {
    fileUpload.value = ""; // Reset input file
    fileInfo.style.display = 'none'; // Sembunyikan info file
}

function showRatingPopup(event) {
    event.stopPropagation();
    resetRating(); // Reset bintang saat pop-up ditampilkan
    document.getElementById('ratingPopup').style.display = 'block';
}

function closeRatingPopup() {
    document.getElementById('ratingPopup').style.display = 'none';
}

function setRating(rating) {
    // Ambil semua bintang dan reset warna
    const stars = document.querySelectorAll('.stars i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active'); // Tambahkan kelas aktif untuk bintang yang diklik
        } else {
            star.classList.remove('active'); // Hapus kelas aktif untuk bintang yang tidak diklik
        }
    });

    document.getElementById('ratingValue').innerText = "Kamu memberikan rating: " + rating + " bintang";
}

function resetRating() {
    const stars = document.querySelectorAll('.stars i');
    stars.forEach(star => {
        star.classList.remove('active'); // Hapus kelas aktif dari semua bintang
    });
    document.getElementById('ratingValue').innerText = "Kamu memberikan rating: "; // Reset teks rating
}