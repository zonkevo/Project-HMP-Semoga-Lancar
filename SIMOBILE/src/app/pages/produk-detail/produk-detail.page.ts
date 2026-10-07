import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdukService } from '../../services/produk.service';
import { Produk } from '../../models/produk.model';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';

@Component({
  selector: 'app-produk-detail',
  standalone: true,
  imports: [CommonModule, IonicModule, AppHeaderComponent, EmptyStateComponent],
  templateUrl: './produk-detail.page.html',
  styleUrls: ['./produk-detail.page.scss'],
})
export class ProdukDetailPage implements OnInit {
  produk: Produk | undefined;
  keuntunganPerItem = 0;

  gambarGagal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produkService: ProdukService
  ) {}

  ngOnInit(): void {
    this.muatProduk();
  }

  ionViewWillEnter(): void {
    this.muatProduk();
  }

  private muatProduk(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produk = this.produkService.getById(id);
    this.gambarGagal = false;
    if (this.produk) {
      this.keuntunganPerItem = this.produk.hargaJual - this.produk.hargaBeli;
    }
  }

  onGambarError(): void {
    this.gambarGagal = true;
  }

  bukaEdit(): void {
    if (this.produk) {
      this.router.navigate(['/produk/edit', this.produk.id]);
    }
  }
}