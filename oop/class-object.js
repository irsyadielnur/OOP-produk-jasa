class Rumah {
  constructor(warna, lebar, tinggi, jumlah_kamar, jumlah_pintu) {
    this.warna = warna;
    this.lebar = lebar;
    this.tinggi = tinggi;
    this.jumlah_kamar = jumlah_kamar;
    this.jumlah_pintu = jumlah_pintu;
  }

  bukaPintu() {
    console.log('Pintu dibuka');
  }

  bukaJendela() {
    console.log('Jendela dibuka');
  }

  nyalakanLampu() {
    console.log('Lampu menyala');
  }
}
