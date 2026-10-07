import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Menu tambahan di Drawer/Side Menu, di luar 4 tab utama
  menuTambahan = [
    { judul: 'Pengaturan', icon: 'settings-outline', url: '/tabs/profil' },
    { judul: 'Tentang Aplikasi', icon: 'information-circle-outline', url: '/tentang' },
  ];

  // Inject ThemeService di sini (walau tidak dipakai langsung) supaya
  // preferensi mode gelap langsung diterapkan begitu aplikasi dibuka,
  // tidak menunggu user membuka halaman Profil dulu.
  constructor(private themeService: ThemeService) {}

  logout(): void {
    // Logika logout (hapus sesi, dsb.) menyusul saat modul autentikasi dibuat.
    console.log('Logout ditekan');
  }
}
