import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { TransaksiService, Transaksi } from '../../services/transaksi.service';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';

@Component({
  selector: 'app-riwayat',
  standalone: true,
  imports: [CommonModule, IonicModule, AppHeaderComponent, EmptyStateComponent],
  templateUrl: './riwayat.page.html',
})
export class RiwayatPage implements OnInit {
  daftarTransaksi: Transaksi[] = [];

  constructor(
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
    // Tampilkan transaksi terbaru dulu di paling atas
    this.daftarTransaksi = [...this.transaksiService.getAll()].reverse();
  }

  bukaDetail(transaksi: Transaksi): void {
    this.router.navigate(['/riwayat', transaksi.id]);
  }
}
