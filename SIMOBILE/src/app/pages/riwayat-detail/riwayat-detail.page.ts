import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TransaksiService, Transaksi } from '../../services/transaksi.service';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';

@Component({
  selector: 'app-riwayat-detail',
  standalone: true,
  imports: [CommonModule, IonicModule, AppHeaderComponent, EmptyStateComponent],
  templateUrl: './riwayat-detail.page.html',
})
export class RiwayatDetailPage implements OnInit {
  transaksi: Transaksi | undefined;

  constructor(
    private route: ActivatedRoute,
    private transaksiService: TransaksiService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.transaksi = this.transaksiService.getAll().find((t) => t.id === id);
  }
}
