import { Injectable } from '@angular/core';
import { Produk } from '../models/produk.model';

export interface ItemKeranjang {
  produk: Produk;
  qty: number;
}

/**
 * Seluruh logika pengelolaan keranjang belanja dipisah ke sini,
 * supaya komponen (halaman) tidak menyimpan logic sendiri.
 * Ini adalah service ke-3 (selain ProdukService & TransaksiService)
 * sesuai ketentuan To Do 8.
 */
@Injectable({
  providedIn: 'root',
})
export class KeranjangService {
  private items: ItemKeranjang[] = [];

  getItems(): ItemKeranjang[] {
    return this.items;
  }

  tambah(produk: Produk): void {
    if (produk.stok <= 0) return; // pengaman tambahan, walau tombol sudah di-disable

    const existing = this.items.find((i) => i.produk.id === produk.id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ produk, qty: 1 });
    }
  }

  kurangi(produkId: number): void {
    const existing = this.items.find((i) => i.produk.id === produkId);
    if (!existing) return;

    existing.qty -= 1;
    if (existing.qty <= 0) {
      this.hapus(produkId);
    }
  }

  hapus(produkId: number): void {
    this.items = this.items.filter((i) => i.produk.id !== produkId);
  }

  getTotalItem(): number {
    return this.items.reduce((total, i) => total + i.qty, 0);
  }

  getTotalHarga(): number {
    return this.items.reduce((total, i) => total + i.qty * i.produk.hargaJual, 0);
  }

  kosongkan(): void {
    this.items = [];
  }
}
