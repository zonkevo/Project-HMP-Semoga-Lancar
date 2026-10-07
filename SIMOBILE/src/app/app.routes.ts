import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  // PENTING: route spesifik (tambah/edit) harus ditaruh SEBELUM 'produk/:id',
  // supaya kata 'tambah' tidak tertangkap sebagai nilai :id.
  {
    path: 'produk/tambah',
    loadComponent: () => import('./pages/produk-form/produk-form.page').then((m) => m.ProdukFormPage),
  },
  {
    path: 'produk/edit/:id',
    loadComponent: () => import('./pages/produk-form/produk-form.page').then((m) => m.ProdukFormPage),
  },
  // Detail produk berada DI LUAR ion-tabs, supaya tampil full-screen
  // dengan tombol back, sesuai kebutuhan "Detail Produk via Route Parameter".
  {
    path: 'produk/:id',
    loadComponent: () => import('./pages/produk-detail/produk-detail.page').then((m) => m.ProdukDetailPage),
  },
  {
    path: 'tentang',
    loadComponent: () => import('./pages/tentang/tentang.page').then((m) => m.TentangPage),
  },
  // Riwayat transaksi (To Do 12) — juga di luar ion-tabs, full-screen dengan tombol back.
  {
    path: 'riwayat',
    loadComponent: () => import('./pages/riwayat/riwayat.page').then((m) => m.RiwayatPage),
  },
  {
    path: 'riwayat/:id',
    loadComponent: () => import('./pages/riwayat-detail/riwayat-detail.page').then((m) => m.RiwayatDetailPage),
  },
];
