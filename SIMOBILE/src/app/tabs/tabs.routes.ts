import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
      },
      {
        path: 'produk',
        loadComponent: () => import('../pages/produk/produk.page').then((m) => m.ProdukPage),
      },
      {
        path: 'transaksi',
        loadComponent: () => import('../pages/transaksi/transaksi.page').then((m) => m.TransaksiPage),
      },
      {
        path: 'profil',
        loadComponent: () => import('../pages/profil/profil.page').then((m) => m.ProfilPage),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
