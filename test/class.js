// class Item
class Item {
  constructor(id, nama, deskripsi) {
    this.id = id;
    this.nama = nama;
    this.deskripsi = deskripsi;
  }

  tampilkan() {
    return `${this.nama} - ${this.deskripsi}`;
  }

  getType() {
    return 'item';
  }
}

// class Produk mewarisi class Item
class Produk extends Item {
  constructor(id, nama, deskripsi, harga, gambar) {
    super(id, nama, deskripsi);
    this.harga = harga;
    this.gambar = gambar;
  }

  tampilkan() {
    return `Produk: ${this.nama} (Rp${this.harga})`;
  }

  getType() {
    return 'produk';
  }
}

// class Jasa mewarisi class Item
class Jasa extends Item {
  constructor(id, nama, deskripsi, harga, durasi) {
    super(id, nama, deskripsi, harga);
    this.harga = harga;
    this.durasi = durasi;
  }

  tampilkan() {
    return `Jasa: ${this.nama} (Rp. ${this.harga}) (${this.durasi} jam)`;
  }

  getType() {
    return 'jasa';
  }
}

module.exports = { Item, Produk, Jasa };
