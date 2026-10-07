import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

/**
 * Header reusable yang dipakai di hampir semua halaman (Dashboard, Produk,
 * Detail Produk, Form Produk, Transaksi, Profil, Tentang), supaya tampilan
 * konsisten dan tidak menulis ulang <ion-header> di setiap halaman.
 * Mendukung 2 mode: tombol menu (untuk halaman tab utama) atau tombol back
 * (untuk halaman detail/form).
 * Toolbar tambahan (misal search bar) bisa disisipkan lewat <ng-content>.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  @Input() title = '';
  @Input() showMenuButton = false;
  @Input() showBackButton = false;
  @Input() defaultHref = '/tabs/dashboard';
}
