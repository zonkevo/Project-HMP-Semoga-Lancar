import { Injectable } from '@angular/core';
import { Produk } from '../models/produk.model';
import { TransaksiService } from './transaksi.service';

/**
 * Service ini memegang seluruh logika & data produk.
 * Untuk UAS, data disimpan sebagai dummy in-memory (tanpa DB/API).
 */
@Injectable({
  providedIn: 'root',
})
export class ProdukService {
  private daftarProduk: Produk[] = [
    { id: 1, nama: 'Indomie Goreng', kategori: 'Makanan', hargaBeli: 2500, hargaJual: 3000, stok: 50, gambar: 'assets/produk/indomie.jpg' },
    { id: 2, nama: 'Aqua Botol 600ml', kategori: 'Minuman', hargaBeli: 2800, hargaJual: 3500, stok: 40, gambar: 'assets/produk/aqua.jpg' },
    { id: 3, nama: 'Teh Pucuk Harum', kategori: 'Minuman', hargaBeli: 3000, hargaJual: 4000, stok: 0, gambar: 'assets/produk/tehpucuk.jpg' },
    { id: 4, nama: 'Beras Rojolele 5kg', kategori: 'Sembako', hargaBeli: 60000, hargaJual: 68000, stok: 15, gambar: 'assets/produk/beras.jpg' },
    { id: 5, nama: 'Minyak Goreng 1L', kategori: 'Sembako', hargaBeli: 15000, hargaJual: 17500, stok: 25, gambar: 'assets/produk/minyakgoreng.jpg' },
    { id: 6, nama: 'Gula Pasir 1kg', kategori: 'Sembako', hargaBeli: 12000, hargaJual: 14000, stok: 30, gambar: 'assets/produk/gulapasir.jpg' },
    { id: 7, nama: 'Sabun Mandi Lifebuoy', kategori: 'Kebutuhan Rumah', hargaBeli: 3200, hargaJual: 4000, stok: 20, gambar: 'assets/produk/sabun.jpg' },
    { id: 8, nama: 'Sikat Gigi Formula', kategori: 'Kebutuhan Rumah', hargaBeli: 4500, hargaJual: 6000, stok: 0, gambar: 'assets/produk/sikatgigi.jpg' },
    { id: 9, nama: 'Kopi Kapal Api Sachet', kategori: 'Minuman', hargaBeli: 1000, hargaJual: 1500, stok: 100, gambar: 'assets/produk/kopi.jpg' },
    { id: 10, nama: 'Roti Tawar Sari Roti', kategori: 'Makanan', hargaBeli: 12000, hargaJual: 14500, stok: 10, gambar: 'assets/produk/roti.jpg' },
    { id: 11, nama: 'Telur Ayam 1kg', kategori: 'Sembako', hargaBeli: 26000, hargaJual: 29000, stok: 18, gambar: 'assets/produk/telur.jpg' },
    { id: 12, nama: 'Deterjen Rinso 800gr', kategori: 'Kebutuhan Rumah', hargaBeli: 9000, hargaJual: 11000, stok: 12, gambar: 'assets/produk/rinso.jpg' },
  ];

  constructor(private transaksiService: TransaksiService) {}

  getAll(): Produk[] {
    return this.daftarProduk;
  }

  getById(id: number): Produk | undefined {
    return this.daftarProduk.find((p) => p.id === id);
  }

  /** Filter produk berdasarkan nama, dipakai untuk fitur pencarian real-time */
  search(keyword: string): Produk[] {
    const k = (keyword || '').trim().toLowerCase();
    if (!k) return this.daftarProduk;
    return this.daftarProduk.filter((p) => p.nama.toLowerCase().includes(k));
  }

  getTotalProduk(): number {
    return this.daftarProduk.length;
  }

  /** Produk terlaris dihitung dari riwayat transaksi asli (jumlah qty terjual
   *  terbanyak). Kalau belum ada transaksi sama sekali, tampilkan produk
   *  pertama sebagai fallback supaya Dashboard tidak kosong. */
  getProdukTerlaris(): Produk | null {
    const semuaTransaksi = this.transaksiService.getAll();

    if (semuaTransaksi.length === 0) {
      return this.daftarProduk.length ? this.daftarProduk[0] : null;
    }

    const totalTerjual = new Map<number, number>();
    semuaTransaksi.forEach((t) => {
      t.items.forEach((item) => {
        totalTerjual.set(item.produkId, (totalTerjual.get(item.produkId) || 0) + item.qty);
      });
    });

    let idTerlaris: number | null = null;
    let qtyTertinggi = 0;
    totalTerjual.forEach((qty, produkId) => {
      if (qty > qtyTertinggi) {
        qtyTertinggi = qty;
        idTerlaris = produkId;
      }
    });

    if (idTerlaris === null) {
      return this.daftarProduk[0] ?? null;
    }
    return this.getById(idTerlaris) ?? null;
  }

  tambahProduk(produk: Produk): void {
    const idBaru = this.daftarProduk.length ? Math.max(...this.daftarProduk.map((p) => p.id)) + 1 : 1;
    produk.id = idBaru;
    this.daftarProduk.push(produk);
  }

  updateProduk(produk: Produk): void {
    const index = this.daftarProduk.findIndex((p) => p.id === produk.id);
    if (index !== -1) this.daftarProduk[index] = produk;
  }

  hapusProduk(id: number): void {
    this.daftarProduk = this.daftarProduk.filter((p) => p.id !== id);
  }

  /** Dipanggil saat checkout berhasil (To Do 11), mengurangi stok produk
   *  sesuai jumlah yang terjual. */
  kurangiStok(id: number, qty: number): void {
    const produk = this.getById(id);
    if (produk) {
      produk.stok = Math.max(0, produk.stok - qty);
    }
  }
}
