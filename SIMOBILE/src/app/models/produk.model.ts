export interface Produk {
  id: number;
  nama: string;
  kategori: string;
  hargaBeli: number;
  hargaJual: number;
  stok: number;
  gambar?: string; // path/url gambar. undefined = belum ada foto -> tampilkan gambar default
}
