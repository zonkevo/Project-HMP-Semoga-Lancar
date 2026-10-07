import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProdukService } from '../../services/produk.service';
import { TransaksiService } from '../../services/transaksi.service';
import { Produk } from '../../models/produk.model';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonicModule, AppHeaderComponent, ProductCardComponent],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  totalProduk = 0;
  totalTransaksiHariIni = 0;
  produkTerlaris: Produk | null = null;
  tanggalHariIni = new Date();

  constructor(
    private produkService: ProdukService,
    private transaksiService: TransaksiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.muatData();
  }

  ionViewWillEnter(): void {
    this.muatData();
  }

  private muatData(): void {
    this.totalProduk = this.produkService.getTotalProduk();
    this.totalTransaksiHariIni = this.transaksiService.getTotalTransaksiHariIni();
    this.produkTerlaris = this.produkService.getProdukTerlaris();
  }

  bukaDetailTerlaris(produk: Produk): void {
    this.router.navigate(['/produk', produk.id]);
  }
}
