const { Item, Produk, Jasa } = require('./test/class');

describe('Kelas Item', () => {
  test('tampilkan() mengembalikan format yang benar', () => {
    const item = new Item(1, 'Item A', 'Deskripsi A');
    expect(item.tampilkan()).toBe('Item A - Deskripsi A');
  });

  test('getType() mengembalikan "item"', () => {
    const item = new Item(1, 'Item A', 'Deskripsi A');
    expect(item.getType()).toBe('item');
  });
});

describe('Kelas Produk', () => {
  test('tampilkan() mengembalikan format produk', () => {
    const produk = new Produk(2, 'Produk B', 'Deskripsi B', 10000, 'gambar.jpg');
    expect(produk.tampilkan()).toBe('Produk: Produk B (Rp10000)');
  });

  test('getType() mengembalikan "produk"', () => {
    const produk = new Produk(2, 'Produk B', 'Deskripsi B', 10000, 'gambar.jpg');
    expect(produk.getType()).toBe('produk');
  });
});

describe('Kelas Jasa', () => {
  test('tampilkan() mengembalikan format jasa', () => {
    const jasa = new Jasa(3, 'Jasa C', 'Deskripsi C', 20000, 3);
    expect(jasa.tampilkan()).toBe('Jasa: Jasa C (Rp. 20000) (3 jam)');
  });

  test('getType() mengembalikan "jasa"', () => {
    const jasa = new Jasa(3, 'Jasa C', 'Deskripsi C', 20000, 3);
    expect(jasa.getType()).toBe('jasa');
  });
});
