import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Produk } from '../../models/produk.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() produk!: Produk;
  @Output() tap = new EventEmitter<Produk>();
  @Output() tambahKeranjang = new EventEmitter<Produk>();

  gambarGagal = false;

  onTap(): void {
    this.tap.emit(this.produk);
  }

  onGambarError(): void {
    this.gambarGagal = true;
  }

  onTambahKeranjang(event: Event): void {
    event.stopPropagation();
    this.tambahKeranjang.emit(this.produk);
  }
}