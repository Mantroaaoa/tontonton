const savedListString = localStorage.getItem('myList');
let myMovieList = []; // Defaultnya array kosong

if (savedListString) {
    try {
        myMovieList = JSON.parse(savedListString);
        console.log('✅ My List berhasil dimuat:', myMovieList);
    } catch (error) {
        console.error('❌ Error parsing My List:', error);
        localStorage.removeItem('myList'); // Hapus data rusak
    }
} else {
    console.log('ℹ️ Belum ada My List di localStorage.');
}

// 💾 Fungsi untuk MENYIMPAN myMovieList ke localStorage
function saveMyListToStorage() {
    localStorage.setItem('myList', JSON.stringify(myMovieList));
    console.log('💾 My List disimpan:', myMovieList);
}

// 💾 Cek dan Muat 'userProfiles' dari localStorage saat halaman dibuka
const savedProfilesString = localStorage.getItem('userProfiles');
let userProfiles = []; // Defaultnya array kosong

if (savedProfilesString) {
    try {
        userProfiles = JSON.parse(savedProfilesString);
        console.log('✅ Profil pengguna berhasil dimuat:', userProfiles);
    } catch (error) {
        console.error('❌ Error parsing Profil Pengguna:', error);
        localStorage.removeItem('userProfiles'); // Hapus data rusak
    }
} else {
    console.log('ℹ️ Belum ada Profil Pengguna di localStorage.');
}

// 💾 Fungsi untuk MENYIMPAN userProfiles ke localStorage
function saveProfilesToStorage() {
    localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
    console.log('💾 Profil pengguna disimpan:', userProfiles);
}



const body = document.body;
const daftar = document.querySelector(".daftar");
const tombolMulai = document.getElementById("tombolMulai");
const cari = document.getElementById("Search");
// let myMovieList = [];


// if(document.documentElement.scrollTop = 0 ){
    // nav.style.backgroundColor = 'white'
// }


    window.addEventListener('DOMContentLoaded', () => {

        const hamburgerBtn = document.getElementById('hamburger-toggle');
        const navLinks = document.getElementById('nav-links');

        if (hamburgerBtn && navLinks) {
            hamburgerBtn.addEventListener('click', () => {
                // Toggle class 'open' pada div nav-links
                navLinks.classList.toggle('open');
                
                // (Opsional) Ubah ikon hamburger menjadi 'X' saat terbuka
                const icon = hamburgerBtn.querySelector('i');
                if (navLinks.classList.contains('open')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times'); // 'fa-times' adalah ikon 'X'
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }




        const video = document.querySelector("#video")
        console.log("halo")
        const nav = document.querySelector(".navBar")

        if (nav) {
        

        // 2. Buat fungsi untuk cek scroll
        function handleScroll() {
            // Cek posisi scroll vertikal
            if (window.scrollY > 500) {
                console.log("Dwi Femboy")
                // Jika sudah di-scroll (lebih dari 0px)
                // Tambahkan class .nav-scrolled
                nav.classList.add('nav-scrolled');
                video.muted = true
            } else {
                console.log("lebih dari 0")
                // Jika kembali ke puncak (tepat di 0px)
                // Hapus class .nav-scrolled
                nav.classList.remove('nav-scrolled');
                video.muted = false
            }
        }

        // 3. Jalankan fungsi di atas setiap kali user melakukan 'scroll'
        window.addEventListener('scroll', handleScroll);
    }

    });
    


    // Fungsi untuk menampilkan profil yang sudah ada di localStorage
function displaySavedProfiles() {
    const daftarElement = document.querySelector(".daftar");
    if (!daftarElement) return;

    const existingProfiles = daftarElement.querySelectorAll('.profilCard');
    existingProfiles.forEach(card => card.remove());

    userProfiles.forEach((profile, index) => { // Tambahkan 'index'
        // Buat elemen card profil
        const profilContainer = document.createElement("div");
        profilContainer.classList.add('profilCard'); // Style wadah profil

        const nama = document.createElement("p");
        const ahref = document.createElement("a");
        const newImg = document.createElement("img");

        nama.textContent = profile.name;
        nama.classList = 'nama';

        if (profile.ageGroup === "Dewasa") {
            newImg.src = 'img/profile.png';
            ahref.href = 'HalamanAwal/index.html';
        } else {
            newImg.src = 'img/babyPP.png';
            ahref.href = 'HalamanAwalA/index.html';
        }

        newImg.classList.add('profilIcon');
        nama.classList.add('profilNama');

        // --- MULAI TAMBAHAN TOMBOL HAPUS ---
        const deleteProfileBtn = document.createElement('button');
        deleteProfileBtn.classList.add('delete-profile-btn');
        deleteProfileBtn.innerHTML = '&times;'; // Simbol 'x'
        // Simpan index profil ini di tombol untuk referensi
        deleteProfileBtn.dataset.index = index;

        deleteProfileBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Hentikan klik agar tidak pindah halaman

            const indexToDelete = parseInt(event.target.dataset.index); // Ambil index

            // Hapus profil dari array userProfiles berdasarkan index
            if (indexToDelete >= 0 && indexToDelete < userProfiles.length) {
                userProfiles.splice(indexToDelete, 1); // Hapus 1 elemen di index tsb
                saveProfilesToStorage(); // Simpan perubahan ke localStorage
                profilContainer.remove(); // Hapus card dari tampilan
                console.log('Profil dihapus. Sisa:', userProfiles);

                // Re-render display untuk update index di tombol lain (opsional tapi aman)
                displaySavedProfiles();
            } else {
                console.error("Index profil tidak valid:", indexToDelete);
            }
        });
        // --- AKHIR TAMBAHAN TOMBOL HAPUS ---

        ahref.append(newImg);
        // Tambahkan tombol HAPUS ke container SEBELUM elemen lain jika ingin di atas
        profilContainer.append(deleteProfileBtn, ahref, nama); // Tombol hapus ditambahkan

        daftarElement.append(profilContainer);
    });
}

// Panggil fungsi ini SETELAH DOM siap (di dalam event listener DOMContentLoaded)
window.addEventListener('DOMContentLoaded', () => {
    // ... (kode Anda yang lain untuk nav scroll) ...

    // Tampilkan profil yang tersimpan
    displaySavedProfiles();
});



function menuPP() {
    const daftar = document.querySelector(".daftar"); // Ambil .daftar di dalam fungsi jika perlu
    if (!daftar) {
        console.error("Elemen .daftar tidak ditemukan saat menuPP dipanggil.");
        return;
    }

    // Buat elemen form (seperti kode Anda sebelumnya)
    const daftarContain = document.querySelector(".daftarContain")
    const newDiv = document.createElement("div");
    const newJudul = document.createElement("h3");
    const newInput = document.createElement("input");
    newInput.type = 'text';
    const newInput2 = document.createElement("select");
    const newOpt = document.createElement("option");
    const newOpt2 = document.createElement("option");
    const newBtn = document.createElement("button");

    newInput.placeholder = 'Masukan Nama';
    newInput2.name = 'umur';
    newOpt.textContent = "Dewasa";
    newOpt2.textContent = "Anak-anak";
    newOpt.value = 'Dewasa';
    newOpt2.value = 'Anak';
    newBtn.textContent = "Buat";
    newJudul.textContent = "Menu";

    newDiv.classList.add('newDiv');
    newJudul.classList.add('newJudul');
    newInput.classList.add('newInput');
    newInput2.classList.add('newInput2');
    newBtn.classList.add('newBtn');

    daftar.append(newDiv);
    newDiv.append(newJudul, newInput, newInput2, newBtn);
    newInput2.append(newOpt, newOpt2);

    // Fungsi internal untuk menangani penambahan profil
    // Di dalam function menuPP() { ... }

    function addBtn() {
        const pesanErrorLama = newDiv.querySelector('.pesan-error');
        if (pesanErrorLama) {
            pesanErrorLama.remove();
        }

        const namaValue = newInput.value;
        const umurValue = newInput2.value;



        if (namaValue.trim() === '') { /* ... */ return; }

        newDiv.remove(); // Hapus form

        const newProfile = { name: namaValue, ageGroup: umurValue };

        // Tambahkan ke array & simpan
        userProfiles.push(newProfile);
        saveProfilesToStorage();

        // Tampilkan card profil baru
        const profilContainer = document.createElement("div");
        profilContainer.classList.add('profilCard'); // Style wadah

        const nama = document.createElement("p");
        const ahref = document.createElement("a");
        const newImg = document.createElement("img");

        nama.textContent = newProfile.name;
        nama.classList = 'nama';

        if (newProfile.ageGroup === "Dewasa") { newImg.src = 'img/Profile.png' } else { newImg.src = 'babyPP.png' }

        newImg.classList.add('profilIcon');
        nama.classList.add('profilNama');

        // --- MULAI TAMBAHAN TOMBOL HAPUS ---
        const deleteProfileBtn = document.createElement('button');
        deleteProfileBtn.classList.add('delete-profile-btn');
        deleteProfileBtn.innerHTML = '&times;';
        // Dapatkan index dari profil yang BARU saja ditambahkan
        const newIndex = userProfiles.length - 1;
        deleteProfileBtn.dataset.index = newIndex;

        deleteProfileBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            const indexToDelete = parseInt(event.target.dataset.index);

            if (indexToDelete >= 0 && indexToDelete < userProfiles.length) {
                userProfiles.splice(indexToDelete, 1);
                saveProfilesToStorage();
                profilContainer.remove();
                 console.log('Profil dihapus. Sisa:', userProfiles);
                 // Re-render untuk update index (opsional)
                 displaySavedProfiles();
            } else {
                 console.error("Index profil tidak valid:", indexToDelete);
            }
        });
        // --- AKHIR TAMBAHAN TOMBOL HAPUS ---

        ahref.append(newImg);
        profilContainer.append(ahref, nama); // Tambahkan tombol hapus

        // Tambahkan ke DOM
        const daftarElement = document.querySelector(".daftar");
        daftarElement.append(profilContainer);
        daftarContain.append(daftarElement)
    }
    // ...

    // Tambahkan event listener ke tombol "Buat" di form
    newBtn.addEventListener('click', addBtn);
}

// 5. Panggil displaySavedProfiles saat halaman selesai dimuat
window.addEventListener('DOMContentLoaded', () => {
    // Tampilkan profil yang sudah tersimpan
    displaySavedProfiles();

    // Pasang event listener ke tombol "Tambah Pengguna" (jika belum)
    const tombolTambah = document.querySelector('.addBtn'); // Asumsi class tombol tambah
    if (tombolTambah) {
        tombolTambah.addEventListener('click', menuPP);
    } else {
        console.warn("Tombol .addBtn tidak ditemukan untuk memasang event listener menuPP.");
    }

    // ... (Kode Anda yang lain untuk nav scroll, dll bisa ditaruh di sini juga) ...
});

tombolMulai.addEventListener('click', menuPP);

cari.addEventListener('click', search);
function search(){
    alert("Maaf Belum Bisa Menambahkan Program Search :) @by Mantra")
    console.log("dwi Femboy")
}
function notif(){
    alert("Maaf Belum Bisa Menambahkan Program Notif, Makasi:) @by Mantra")
}


// My List Click

function listMenu() {
    console.log("Membuka My List. Isi:", myMovieList);

    const newDiv = document.createElement("div");
    const imgDiv = document.createElement("div");
    const xButton = document.createElement("p"); // Tombol X untuk menutup menu
    const judul = document.createElement("h1");

    judul.textContent = 'My List';
    xButton.textContent = 'x';
    newDiv.classList = 'listDiv';
    judul.classList = 'judulList';
    xButton.classList = 'xBtn';
    imgDiv.classList = 'imgDiv'; // Pastikan class ini punya style flex/grid

    imgDiv.innerHTML = '';

    if (myMovieList.length === 0) {
        const pesanKosong = document.createElement('p');
        pesanKosong.textContent = "My List masih kosong.";
        pesanKosong.style.color = 'grey';
        pesanKosong.classList = 'psnKosong'
        imgDiv.append(pesanKosong);
    } else {
        myMovieList.forEach(movieValue => {
            // --- MULAI PERUBAHAN ---

            // A. Buat Wadah untuk Gambar & Tombol Hapus
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('list-item-container');

            // B. Buat Gambar (seperti sebelumnya)
            const listItemImg = document.createElement('img');
            listItemImg.classList.add('img');
            listItemImg.dataset.value = movieValue; // Simpan value untuk klik ke moC
            listItemImg.style.cursor = 'pointer';

            // C. Buat Tombol Hapus (X kecil)
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-list-btn');
            deleteBtn.innerHTML = '&times;'; // Simbol 'x'
            deleteBtn.dataset.value = movieValue; // Simpan value untuk hapus

            // Tentukan src gambar (switch case Anda)
            switch (movieValue) {
                case "F1": listItemImg.src = 'images/F1.jpg'; break;
                case "F2": listItemImg.src = 'images/F2.jpg'; break;
                case "F3": listItemImg.src = 'images/F3.jpg'; break;
                case "F4": listItemImg.src = 'images/F4.jpg'; break;
                case "F5": listItemImg.src = 'images/F5.jpg'; break;
                case "F6": listItemImg.src = 'images/F6.jpg'; break;
                case "F7": listItemImg.src = 'images/F7.jpg'; break;
                case "F8": listItemImg.src = 'images/F8.jpg'; break;
                case "F9": listItemImg.src = 'images/F9.jpg'; break; // The Conjuring
                case "F10": listItemImg.src = 'images/F10.jpg'; break; // Annabelle
                case "F11": listItemImg.src = 'images/F11.jpg'; break; // Insidious
                case "F12": listItemImg.src = 'images/F12.jpg'; break; // Final Destination 5
                case "F13": listItemImg.src = 'images/F13.jpeg'; break; // Inception (Perhatikan .jpeg)
                case "F14": listItemImg.src = 'images/F14.jpeg'; break; // The Martian
                case "F15": listItemImg.src = 'images/F15.jpeg'; break; // Dune (Perhatikan .jpeg)
                case "F16": listItemImg.src = 'images/F16.jpeg'; break; // Dark Knight
                case "F17": listItemImg.src = 'images/F17.jpeg'; break; // Mission Impossible
                case "F18": listItemImg.src = 'images/F18.jpeg'; break; // A Quiet Place
                case "F19": listItemImg.src = 'images/F19.jpg'; break; // Oppenheimer
                case "F20": listItemImg.src = 'images/F20.jpeg'; break; // Parasite
                case "F21": listItemImg.src = 'images/F21.jpeg'; break; // Forrest Gump
                case "F22": listItemImg.src = 'images/F22.jpeg'; break; // Laskar Pelangi
                case "F23": listItemImg.src = 'images/F23.jpeg'; break; // Cek Toko Sebelah
                case "F24": listItemImg.src = 'images/F24.jpeg'; break; // Mencuri Raden Saleh
                case "F25": listItemImg.src = 'images/F25.jpeg'; break; // Iron Man 2 (Perhatikan .jpeg)
                case "F26": listItemImg.src = 'images/F26.jpg'; break; // Iron Man 1
                case "F27": listItemImg.src = 'images/F27.jpeg'; break; // Iron Man 3 (Perhatikan .jpeg)
                case "F28": listItemImg.src = 'images/F28.jpeg'; break; // Captain America BNW (Perhatikan .jpeg)
                case "F29": listItemImg.src = 'images/F29.jpeg'; break; // Hulk (Perhatikan .jpeg)
                case "F30": listItemImg.src = 'images/F30.jpeg'; break; // Ant-Man (Perhatikan .jpeg)
                case "F31": listItemImg.src = 'images/F31.jpeg'; break; // Thor Dark World (Perhatikan .jpeg)
                case "F32": listItemImg.src = 'images/F32.jpeg'; break; // Guardians Galaxy (Perhatikan .jpeg)
                case "F33": listItemImg.src = 'images/F33.jpg'; break; // Agak Laen
                case "F34": listItemImg.src = 'images/F34.jpg'; break; // Sekawan Limo
                case "F35": listItemImg.src = 'images/F35.jpeg'; break; // Kang Mak
                case "F36": listItemImg.src = 'images/F36.jpg'; break; // Abadi Nan Jaya
                case "F37": listItemImg.src = 'images/F37.webp'; break; // Siksa Neraka (Perhatikan .webp)
                case "F38": listItemImg.src = 'images/F38.jpg'; break; // Siksa Kubur
                case "F39": listItemImg.src = 'images/F39.webp'; break; // KKN (Perhatikan .webp)
                case "F40": listItemImg.src = 'images/F40.jpg'; break; // Rumah Kentang
                default:
                    console.warn("Path gambar tidak ditemukan untuk:", movieValue);
                    // listItemImg.src = 'images/placeholder.png'; // Opsional: gambar pengganti
            }

            // D. Event Listener untuk klik gambar (menuju moC)
            listItemImg.addEventListener('click', (event) => {
                const clickedValue = event.target.dataset.value;
                const originalElement = document.querySelector(`#scroll img[data-value="${clickedValue}"]`);
                if (originalElement) {
                    moC(originalElement);
                    newDiv.remove();
                } else {
                    console.error("Elemen asli untuk", clickedValue, "tidak ditemukan.");
                }
            });

            // E. Event Listener untuk Tombol Hapus
            deleteBtn.addEventListener('click', (event) => {
                event.stopPropagation(); // Hentikan event agar tidak memicu klik gambar

                const valueToDelete = event.target.dataset.value;
                console.log("Mencoba menghapus:", valueToDelete);

                // Cari index item di array
                const indexToRemove = myMovieList.indexOf(valueToDelete);
                if (indexToRemove > -1) {
                    // Hapus item dari array myMovieList
                    myMovieList.splice(indexToRemove, 1);
                    console.log("My List setelah dihapus:", myMovieList);

                    // Hapus elemen wadah dari tampilan
                    itemContainer.remove();

                    saveMyListToStorage();

                    // Jika list menjadi kosong, tampilkan pesan
                    if (myMovieList.length === 0) {
                        const pesanKosong = document.createElement('p');
                        pesanKosong.textContent = "My List Anda sudah kosong.";
                        pesanKosong.style.color = 'grey';
                        imgDiv.append(pesanKosong);
                    }
                } else {
                    console.error("Item tidak ditemukan di myMovieList:", valueToDelete);
                }
            });
            

            // F. Event Listener untuk Hover pada Wadah (tampilkan/sembunyikan X)
            itemContainer.addEventListener('mouseenter', () => {
                deleteBtn.style.display = 'flex'; // Tampilkan tombol X
            });
            itemContainer.addEventListener('mouseleave', () => {
                deleteBtn.style.display = 'none'; // Sembunyikan tombol X
            });

            // G. Susun elemen: Gambar & Tombol Hapus ke dalam Wadah
            itemContainer.append(listItemImg, deleteBtn);

            // H. Masukkan Wadah ke imgDiv
            if (listItemImg.src) {
                imgDiv.append(itemContainer);
            }

            // --- AKHIR PERUBAHAN ---
        });
    }

    document.documentElement.scrollTop = 0; 
    document.body.scrollTop = 0;

    newDiv.append(judul, xButton, imgDiv);
    body.append(newDiv);

    xButton.addEventListener('click', () => {
        newDiv.remove();
    });
}







// Ini Movie Click nya


function moC(elemen){
    const movie = document.querySelectorAll ('.F1, .F2, .F3, .F4, .F5, .F6, .F7, .F8')
    const movieV = elemen.dataset.value

    const div = document.createElement("div")
    const newDiv = document.createElement("div");
    const btnDiv = document.createElement("div")
    // const btnCntn = document.createElement("p");
    const button = document.createElement("a")
    const vid = document.createElement("iframe")
    const button2 = document.createElement("button")
    const xButton = document.createElement("p")
    const fa = document.createElement("i")
    const faPlus = document.createElement("i")
    const watchText = document.createElement("span")
    watchText.classList = 'watchText'
    watchText.textContent = 'Watch on YouTube'
    const listText = document.createElement("span")
    listText.classList = 'listText'
    listText.textContent = 'Add List'

    div.classList = 'movContainer'
    newDiv.classList = 'movDiv'
    vid.classList = 'vid'
    fa.classList = 'fas fa-play'
    faPlus.classList = 'fas fa-plus'
    button.classList = 'watchButton'
    button2.classList = 'addList'
    
    xButton.classList = 'xButton'
    xButton.textContent = "x"
    
    button.addEventListener('mouseover', () => {
        button.classList.add('btnHover');
    });
    button.addEventListener('mouseout', () => {
        button.classList.remove('btnHover');
    });

    button2.addEventListener('mouseover', () => {
        button2.classList.add('listHover');
    });
    button2.addEventListener('mouseout', () => {
        button2.classList.remove('listHover');
    });


    function addList(){
        const currentMovieValue = movieV; 

        if (!myMovieList.includes(currentMovieValue)) {
            myMovieList.push(currentMovieValue);
            alert("Film '" + currentMovieValue + "' ditambahkan.");
            
            // PANGGIL SIMPAN DI SINI 👇
            saveMyListToStorage(); 

        } else {
            alert("Film '" + currentMovieValue + "' sudah ada.");
        }
    }

    button2.addEventListener('click', addList);




    if(movieV == "F1"){
        vid.src = 'https://www.youtube.com/embed/FUK2kdPsBws'
        button.href = 'https://www.youtube.com/embed/FUK2kdPsBws'
    }else if(movieV == "F2"){
        vid.src = 'https://www.youtube.com/embed/siNr47WV0Wk'
        button.href = 'https://youtu.be/GiK6lZPQNyM?si=XO41ZB8d5ZmbtL-B'
    }else if(movieV == "F3"){
        vid.src = 'https://www.youtube.com/embed/BmllggGO4pM'
        button.href = 'https://www.youtube.com/embed/BmllggGO4pM'
    }else if(movieV == "F4"){
        vid.src = 'https://www.youtube.com/embed/dfXRud1AIiw'
        button.href = 'https://www.youtube.com/embed/dfXRud1AIiw'
    }else if(movieV == "F5"){
        vid.src = 'https://www.youtube.com/embed/RYI-WG_HFV8'
        button.href = 'https://www.youtube.com/embed/RYI-WG_HFV8'
    }else if(movieV == "F6"){
        vid.src = 'https://www.youtube.com/embed/0VH9WCFV6XQ'
        button.href = 'https://www.youtube.com/embed/0VH9WCFV6XQ'
    }else if(movieV == "F7"){
        vid.src = 'https://www.youtube.com/embed/F6jPobzz-ag'
        button.href = 'https://www.youtube.com/embed/F6jPobzz-ag'
    }else if(movieV == "F8"){
        vid.src = 'https://www.youtube.com/embed/AzCAwdp1uIQ'
        button.href = 'https://www.youtube.com/embed/AzCAwdp1uIQ'
    }else if(movieV == "F9"){
        vid.src = 'https://www.youtube.com/embed/h9Q4zZS2v1k'
        button.href = 'https://www.youtube.com/embed/h9Q4zZS2v1k'
    }else if(movieV == "F10"){
        vid.src = 'https://www.youtube.com/embed/xabuZwG3XyM'
        button.href = 'https://www.youtube.com/embed/xabuZwG3XyM'
    }else if(movieV == "F11"){
        vid.src = 'https://www.youtube.com/embed/ZuQuOnYnr3Q'
        button.href = 'https://www.youtube.com/embed/ZuQuOnYnr3Q'
    }else if(movieV == "F12"){
        vid.src = 'https://www.youtube.com/embed/PI87-0g_SI8'
        button.href = 'https://www.youtube.com/embed/PI87-0g_SI8'
    }else if(movieV == "F13"){
        vid.src = 'https://www.youtube.com/embed/YoHD9XEInc0'
        button.href = 'https://www.youtube.com/embed/YoHD9XEInc0'
    }else if(movieV == "F14"){
        vid.src = 'https://www.youtube.com/embed/ej3ioOneR8g'
        button.href = 'https://www.youtube.com/embed/ej3ioOneR8g'
    }else if(movieV == "F15"){
        vid.src = 'https://www.youtube.com/embed/n9xhJrPXop4'
        button.href = 'https://www.youtube.com/embed/n9xhJrPXop4'
    }else if(movieV == "F16"){
        vid.src = 'https://www.youtube.com/embed/EXeTwQWrcwY'
        button.href = 'https://www.youtube.com/embed/EXeTwQWrcwY'
    }else if(movieV == "F17"){
        vid.src = 'https://www.youtube.com/embed/wb49-oV0F78'
        button.href = 'https://www.youtube.com/embed/wb49-oV0F78'
    }else if(movieV == "F18"){
        vid.src = 'https://www.youtube.com/embed/WR7cc5t7tv8'
        button.href = 'https://www.youtube.com/embed/WR7cc5t7tv8'
    }else if(movieV == "F19"){
        vid.src = 'https://www.youtube.com/embed/bK6ldnjE3Y0'
        button.href = 'https://www.youtube.com/embed/bK6ldnjE3Y0'
    }else if(movieV == "F20"){
        vid.src = 'https://www.youtube.com/embed/5xH0HfJHsaY'
        button.href = 'https://www.youtube.com/embed/5xH0HfJHsaY'
    }else if(movieV == "F21"){
        vid.src = 'https://www.youtube.com/embed/bLvqoHBptjg'
        button.href = 'https://www.youtube.com/embed/bLvqoHBptjg'
    }else if(movieV == "F22"){
        vid.src = 'https://www.youtube.com/embed/m2gfuI2oNmI'
        button.href = 'https://www.youtube.com/embed/m2gfuI2oNmI'
    }else if(movieV == "F23"){
        vid.src = 'https://www.youtube.com/embed/n4Y0gM-E7-A'
        button.href = 'https://www.youtube.com/embed/n4Y0gM-E7-A'
    }else if(movieV == "F24"){
        vid.src = 'https://www.youtube.com/embed/G0b-a019-vE'
        button.href = 'https://www.youtube.com/embed/G0b-a019-vE'
    }else if(movieV == "F25"){
        vid.src = 'https://www.youtube.com/embed/oOzuBOefL8I'
        button.href = 'https://www.youtube.com/embed/oOzuBOefL8I'
    }else if(movieV == "26"){
        vid.src = 'https://www.youtube.com/embed/8ugaeA-nMTc'
        button.href = 'https://www.youtube.com/embed/8ugaeA-nMTc'
    }else if(movieV == "27"){
        vid.src = 'https://www.youtube.com/embed/YLorLVa95Xo'
        button.href = 'https://www.youtube.com/embed/YLorLVa95Xo'
    }else if(movieV == "F28"){
        vid.src = 'https://www.youtube.com/embed/1pHDWnXmK7Y'
        button.href = 'https://www.youtube.com/embed/1pHDWnXmK7Y'
    }else if(movieV == "F29"){
        vid.src = 'https://www.youtube.com/embed/hp1RmLBsSZs'
        button.href = 'https://www.youtube.com/embed/hp1RmLBsSZs'
    }else if(movieV == "F30"){
        vid.src = 'https://www.youtube.com/embed/xInh3VhAWs8'
        button.href = 'https://www.youtube.com/embed/xInh3VhAWs8'
    }else if(movieV == "F31"){
        vid.src = 'https://www.youtube.com/embed/npvJ9FTgZbM'
        button.href = 'https://www.youtube.com/embed/npvJ9FTgZbM'
    }else if(movieV == "F32"){
        vid.src = 'https://www.youtube.com/embed/d96cjJhvlMA'
        button.href = 'https://www.youtube.com/embed/d96cjJhvlMA'
    }else if(movieV == "F33"){
        vid.src = 'https://www.youtube.com/embed/0YLSPyGA4h0'
        button.href = 'https://www.youtube.com/embed/0YLSPyGA4h0'
    }else if(movieV == "F34"){
        vid.src = 'https://www.youtube.com/embed/ERZncVUuKlk'
        button.href = 'https://www.youtube.com/embed/ERZncVUuKlk'
    }else if(movieV == "F35"){
        vid.src = 'https://www.youtube.com/embed/K2KM_C_m8hA'
        button.href = 'https://www.youtube.com/embed/K2KM_C_m8hA'
    }else if(movieV == "F36"){
        vid.src = 'https://www.youtube.com/embed/Uvp2ZBK7Vnc'
        button.href = 'https://www.youtube.com/embed/Uvp2ZBK7Vnc'
    }else if(movieV == "F37"){
        vid.src = 'https://www.youtube.com/embed/EFMb_1c-1jw'
        button.href = 'https://www.youtube.com/embed/EFMb_1c-1jw'
    }else if(movieV == "F38"){
        vid.src = 'https://www.youtube.com/embed/C-iH2aQ-ewY'
        button.href = 'https://www.youtube.com/embed/C-iH2aQ-ewY'
    }else if(movieV == "F39"){
        vid.src = 'https://www.youtube.com/embed/jtDRXPTZT-M'
        button.href = 'https://www.youtube.com/embed/jtDRXPTZT-M'
    }else if(movieV == "F40"){
        vid.src = 'https://www.youtube.com/embed/kuoqwVzRuhI'
        button.href = 'https://www.youtube.com/embed/kuoqwVzRuhI'
    }


    document.documentElement.scrollTop = 0; 
    document.body.scrollTop = 0;

    body.classList.add('body-no-scroll');

    button.append(fa, watchText)
    button2.append(faPlus, listText)

    btnDiv.append(button, button2)
    newDiv.append(xButton, vid, btnDiv) 
    div.append(newDiv) 
    body.append(div)   

    
    xButton.addEventListener('click', () => {
        div.remove(); 
        
        body.classList.remove('body-no-scroll');
    });
    

    console.log ("halo")





}


    



