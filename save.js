// File: storageScript.js

// Ambil data 'myList' dari localStorage saat script dimuat
const savedListString = localStorage.getItem('myList');
let myMovieList = []; // Defaultnya array kosong

if (savedListString) {
    try {
        // Coba parse data yang tersimpan
        myMovieList = JSON.parse(savedListString);
        console.log('My List berhasil dimuat:', myMovieList);
    } catch (error) {
        // Jika data corrupt (bukan JSON valid), hapus saja
        console.error('Error parsing My List dari localStorage:', error);
        localStorage.removeItem('myList'); 
    }
} else {
    console.log('Belum ada My List di localStorage.');
}

// --- Fungsi untuk MENYIMPAN My List (panggil ini setiap kali list berubah) ---
function saveMyList() {
    localStorage.setItem('myList', JSON.stringify(myMovieList));
    console.log('My List disimpan ke localStorage.');
}


// --- Contoh Modifikasi Fungsi addList (di script.js lama Anda) ---
// function addList() {
//     // ... (kode Anda untuk cek duplikat dan push) ...
//     if (!myMovieList.includes(currentMovieValue)) {
//         myMovieList.push(currentMovieValue);
//         alert("...");
        
//         // PANGGIL FUNGSI SIMPAN SETELAH MENAMBAH
//         saveMyList(); 
//     } else {
//         alert("...");
//     }
// }

// --- Contoh Modifikasi Tombol Hapus (di listMenu Anda) ---
// deleteBtn.addEventListener('click', (event) => {
//    // ... (kode Anda untuk splice) ...
//    if (indexToRemove > -1) {
//        myMovieList.splice(indexToRemove, 1);
//        itemContainer.remove();
        
//        // PANGGIL FUNGSI SIMPAN SETELAH MENGHAPUS
//        saveMyList(); 

//        // ... (cek jika kosong) ...
//    } 
// });

// --- Anda bisa tambahkan fungsi lain di sini ---
// Misalnya, fungsi untuk menyimpan tema, dll.