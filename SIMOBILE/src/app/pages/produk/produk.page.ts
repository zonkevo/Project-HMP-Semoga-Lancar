import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProdukService } from '../../services/produk.service';
import { KeranjangService } from '../../services/keranjang.service';
import { Produk } from '../../models/produk.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';

@Component({
  selector: 'app-produk',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCardComponent,
    EmptyStateComponent,
    AppHeaderComponent,
  ],
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
})
export class ProdukPage implements OnInit {
  keyword = '';
  daftarProduk: Produk[] = [];

  constructor(
    private produkService: ProdukService,
    private keranjangService: KeranjangService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit(): void {
    this.daftarProduk = this.produkService.getAll();
  }

  ionViewWillEnter(): void {
    this.filterProduk();
  }

  /** Dipanggil setiap keyword berubah (two-way binding via ngModel).
   *  Tanpa tombol cari -> list langsung ter-filter saat mengetik. */
  filterProduk(): void {
    this.daftarProduk = this.produkService.search(this.keyword);
  }

  bukaDetail(produk: Produk): void {
    this.router.navigate(['/produk', produk.id]);
  }

  bukaTambahProduk(): void {
    this.router.navigate(['/produk/tambah']);
  }

  async tambahKeKeranjang(produk: Produk): Promise<void> {
    this.keranjangService.tambah(produk);
    const toast = await this.toastCtrl.create({
      message: `${produk.nama} ditambahkan ke keranjang`,
      duration: 1200,
      color: 'success',
      position: 'bottom',
    });
    await toast.present();
  }
}
