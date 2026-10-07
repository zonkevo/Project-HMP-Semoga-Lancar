import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { KeranjangService, ItemKeranjang } from '../../services/keranjang.service';
import { TransaksiService } from '../../services/transaksi.service';
import { ProdukService } from '../../services/produk.service';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';

@Component({
  selector: 'app-transaksi',
  standalone: true,
  imports: [CommonModule, IonicModule, AppHeaderComponent, EmptyStateComponent],
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
})
export class TransaksiPage implements OnInit {
  items: ItemKeranjang[] = [];

  constructor(
    private keranjangService: KeranjangService,
    private transaksiService: TransaksiService,
    private produkService: ProdukService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.muatKeranjang();
  }

  ionViewWillEnter(): void {
    this.muatKeranjang();
  }

  private muatKeranjang(): void {
    this.items = this.keranjangService.getItems();
  }

  tambahQty(produkId: number): void {
    const item = this.items.find((i) => i.produk.id === produkId);
    // Batasi penambahan qty di keranjang supaya tidak melebihi stok tersedia
    if (item && item.qty < item.produk.stok) {
      this.keranjangService.tambah(item.produk);
    }
    this.muatKeranjang();
  }

  kurangiQty(produkId: number): void {
    this.keranjangService.kurangi(produkId);
    this.muatKeranjang();
  }

  hapusItem(produkId: number): void {
    this.keranjangService.hapus(produkId);
    this.muatKeranjang();
  }

  getTotalHarga(): number {
    return this.keranjangService.getTotalHarga();
  }

  async konfirmasiTransaksi(): Promise<void> {
    if (this.items.length === 0) return;

    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi Transaksi',
      message: `Total belanja Rp ${this.getTotalHarga().toLocaleString('id-ID')}. Simpan transaksi ini?`,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: 'Konfirmasi', handler: () => this.prosesTransaksi() },
      ],
    });
    await alert.present();
  }

  bukaRiwayat(): void {
    this.router.navigate(['/riwayat']);
  }

  private async prosesTransaksi(): Promise<void> {
    const itemsTransaksi = this.items.map((i) => ({
      produkId: i.produk.id,
      nama: i.produk.nama,
      qty: i.qty,
      hargaJual: i.produk.hargaJual,
    }));

    this.transaksiService.simpanTransaksi({
      id: 0,
      tanggal: new Date(),
      items: itemsTransaksi,
      total: this.getTotalHarga(),
    });

    // Kurangi stok masing-masing produk yang baru saja terjual
    this.items.forEach((i) => this.produkService.kurangiStok(i.produk.id, i.qty));

    this.keranjangService.kosongkan();
    this.muatKeranjang();

    const toast = await this.toastCtrl.create({
      message: 'Transaksi berhasil disimpan!',
      duration: 1800,
      color: 'success',
      position: 'bottom',
    });
    await toast.present();
  }
}
