/** Form utama untuk menambahkan atau mengedit produk/jasa */
const formProduk = document.getElementById('form-produk');
/** Tabel body tempat menampilkan list item */
const tableBody = document.querySelector('#table-produk tbody');

/** Input nama produk/jasa */
const inputName = document.getElementById('nama-produk');
/** Input deskripsi produk/jasa */
const inputDesc = document.getElementById('desc-produk');
/** Input harga produk/jasa */
const inputPrice = document.getElementById('hrg-produk');
/** Input file gambar untuk produk */
const inputGambar = document.getElementById('gbr-produk');
/** Input durasi untuk jasa */
const inputDurasi = document.getElementById('durasi-jasa');
/** Input tipe item (produk/jasa) */
const inputTipe = document.getElementById('tipe-produk');

/** ID item yang sedang diedit */
let editingId = null;

// class Item
class Item {
  /**
   * @param {number} id - ID unik
   * @param {string} nama - Nama item
   * @param {string} deskripsi - Deskripsi item
   */
  constructor(id, nama, deskripsi) {
    this.id = id;
    this.nama = nama;
    this.deskripsi = deskripsi;
  }

  /**
   * Menampilkan item sebagai string.
   * @returns {string}
   */
  tampilkan() {
    return `${this.nama} - ${this.deskripsi}`;
  }

  /**
   * Mendapatkan tipe item.
   * @returns {string}
   */
  getType() {
    return 'item';
  }
}

// class Produk mewarisi class Item
class Produk extends Item {
  /**
   * @param {number} id
   * @param {string} nama
   * @param {string} deskripsi
   * @param {number} harga
   * @param {string} gambar - Gambar produk dalam format base64
   */
  constructor(id, nama, deskripsi, harga, gambar) {
    super(id, nama, deskripsi);
    this.harga = harga;
    this.gambar = gambar;
  }

  /**
   * Menampilkan deskripsi produk.
   * @returns {string}
   */
  tampilkan() {
    return `Produk: ${this.nama} (Rp${this.harga})`;
  }

  /**
   * Mendapatkan tipe item.
   * @returns {string}
   */
  getType() {
    return 'produk';
  }
}

// class Jasa mewarisi class Item
class Jasa extends Item {
  /**
   * @param {number} id
   * @param {string} nama
   * @param {string} deskripsi
   * @param {number} harga
   * @param {number} durasi - Durasi jasa dalam jam
   */
  constructor(id, nama, deskripsi, harga, durasi) {
    super(id, nama, deskripsi, harga);
    this.harga = harga;
    this.durasi = durasi;
  }

  /**
   * Menampilkan deskripsi jasa.
   * @returns {string}
   */
  tampilkan() {
    return `Jasa: ${this.nama} (Rp. ${this.harga}) (${this.durasi} jam)`;
  }

  /**
   * Mendapatkan tipe item.
   * @returns {string}
   */
  getType() {
    return 'jasa';
  }
}

/**
 * Menyimpan item baru atau memperbarui item di localStorage.
 * @param {Object} itemObj - Objek produk/jasa yang akan disimpan
 */
function simpanItemBaru(itemObj) {
  let data = JSON.parse(localStorage.getItem('items')) ?? [];

  if (editingId) {
    data = data.map((item) => (item.id === editingId ? itemObj : item));
    editingId = null;
  } else {
    data.push(itemObj);
  }

  localStorage.setItem('items', JSON.stringify(data));
  renderTable();
}

/**
 * Event listener saat form disubmit.
 * Menyimpan data produk/jasa baru ke localStorage.
 */
formProduk.addEventListener('submit', async (e) => {
  e.preventDefault();
  const tipe = inputTipe.value;
  const id = editingId ?? Math.floor(Math.random() * 1000000);

  if (!inputName.value || !inputDesc.value || !inputPrice.value) {
    alert('Data tidak lengkap');
    return;
  }

  let item;

  if (tipe === 'produk') {
    let base64Image = '';
    if (inputGambar.files.length > 0) {
      base64Image = await toBase64(inputGambar.files[0]);
    } else if (editingId) {
      const data = JSON.parse(localStorage.getItem('items'));
      const lama = data.find((x) => x.id === editingId);
      base64Image = lama?.gambar ?? '';
    }

    item = new Produk(id, inputName.value, inputDesc.value, inputPrice.value, base64Image);
  } else {
    item = new Jasa(id, inputName.value, inputDesc.value, inputPrice.value, inputDurasi.value);
  }

  const dataObj = { ...item, type: item.getType() };
  simpanItemBaru(dataObj);

  formProduk.reset();
  inputDurasi.style.display = 'none';
  inputGambar.style.display = 'block';
});

/**
 * Event listener untuk tombol edit dan hapus di tabel.
 */
tableBody.addEventListener('click', (e) => {
  const id = parseInt(e.target.dataset.id);
  const data = JSON.parse(localStorage.getItem('items')) ?? [];
  const item = data.find((x) => x.id === id);

  if (e.target.classList.contains('hapus-btn')) {
    Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: `${item.nama} akan dihapus permanen.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        const baru = data.filter((x) => x.id !== id);
        localStorage.setItem('items', JSON.stringify(baru));
        renderTable();

        Swal.fire('Berhasil!', 'Item berhasil dihapus.', 'success');
      }
    });
  }

  if (e.target.classList.contains('edit-btn')) {
    editingId = item.id;
    inputName.value = item.nama;
    inputDesc.value = item.deskripsi;
    inputTipe.value = item.type;

    if (item.type === 'produk') {
      inputPrice.value = item.harga;
      inputDurasi.style.display = 'none';
      inputGambar.style.display = 'block';
    } else {
      inputDurasi.value = item.durasi;
      inputDurasi.style.display = 'block';
      inputGambar.style.display = 'none';
    }
  }
});

/**
 * Mengonversi data JSON ke instance class Produk atau Jasa.
 * @param {Object} data - Data dari localStorage
 * @returns {Produk|Jasa|null}
 */
function buatItemDariData(data) {
  if (data.type === 'produk') {
    return new Produk(data.id, data.nama, data.deskripsi, data.harga, data.gambar);
  } else if (data.type === 'jasa') {
    return new Jasa(data.id, data.nama, data.deskripsi, data.harga, data.durasi);
  }
  return null;
}

/**
 * Menampilkan semua item dari localStorage ke tabel HTML.
 */
function renderTable() {
  const data = JSON.parse(localStorage.getItem('items')) ?? [];
  tableBody.innerHTML = '';

  data.forEach((itemData) => {
    const item = buatItemDariData(itemData);
    const tr = document.createElement('tr');

    const gambarTd = item instanceof Produk ? `<td><img src="${item.gambar}" width="60"></td>` : `<td>Durasi: ${item.durasi} Hari</td>`;

    tr.innerHTML = `
            ${gambarTd}
            <td>${item.nama}</td>
            <td>${item.deskripsi}</td>
            <td>${item.harga}</td>
            <td>
                <button class="edit-btn" data-id="${item.id}">Edit</button>
                <button class="hapus-btn" data-id="${item.id}">Hapus</button>
            </td>
        `;
    tableBody.appendChild(tr);
  });

  console.log(data);
}

/**
 * Mengonversi file gambar menjadi base64 string.
 * @param {File} file - File gambar dari input
 * @returns {Promise<string>}
 */
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/** Render data dari localStorage saat halaman dimuat */
window.addEventListener('DOMContentLoaded', renderTable);
