import { Injectable } from '@angular/core';

export interface ItemTransaksi {
  produkId: number;
  nama: string;
  qty: number;
  hargaJual: number;
}

export interface Transaksi {
  id: number;
  tanggal: Date;
  items: ItemTransaksi[];
  total: number;
}

/**
 * Menyimpan seluruh riwayat transaksi yang sudah dikonfirmasi lewat
 * halaman Keranjang (To Do 11), dan menyediakan datanya untuk
 * Dashboard (To Do 2) & halaman Riwayat Transaksi (To Do 12).
 */
@Injectable({
  providedIn: 'root',
})
export class TransaksiService {
  private riwayat: Transaksi[] = [];

  constructor() {}

  getAll(): Transaksi[] {
    return this.riwayat;
  }

  getTotalTransaksiHariIni(): number {
    const hariIni = new Date().toDateString();
    return this.riwayat.filter((t) => new Date(t.tanggal).toDateString() === hariIni).length;
  }

  simpanTransaksi(transaksi: Transaksi): void {
    const idBaru = this.riwayat.length ? Math.max(...this.riwayat.map((t) => t.id)) + 1 : 1;
    transaksi.id = idBaru;
    this.riwayat.push(transaksi);
  }
}
