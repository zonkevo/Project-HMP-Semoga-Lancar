import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  cubeOutline,
  cartOutline,
  personOutline,
  settingsOutline,
  informationCircleOutline,
  logOutOutline,
  searchOutline,
  imageOutline,
  fileTrayOutline,
  addOutline,
  createOutline,
  alertCircleOutline,
  moonOutline,
  timeOutline,
  removeOutline,
  trashOutline,
  checkmarkDoneOutline,
  storefrontOutline,
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { transisiHalamanKustom } from './app/animations/page-transition';

// Daftarkan semua icon yang dipakai di aplikasi (tabs, menu, komponen)
addIcons({
  'home-outline': homeOutline,
  'cube-outline': cubeOutline,
  'cart-outline': cartOutline,
  'person-outline': personOutline,
  'settings-outline': settingsOutline,
  'information-circle-outline': informationCircleOutline,
  'log-out-outline': logOutOutline,
  'search-outline': searchOutline,
  'image-outline': imageOutline,
  'file-tray-outline': fileTrayOutline,
  'add-outline': addOutline,
  'create-outline': createOutline,
  'alert-circle-outline': alertCircleOutline,
  'moon-outline': moonOutline,
  'time-outline': timeOutline,
  'remove-outline': removeOutline,
  'trash-outline': trashOutline,
  'checkmark-done-outline': checkmarkDoneOutline,
  'storefront-outline': storefrontOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // navAnimation: animasi transisi custom (To Do 10), dipakai di semua
    // perpindahan halaman (bukan animasi default Ionic iOS/Android).
    provideIonicAngular({ navAnimation: transisiHalamanKustom }),
    provideRouter(routes),
  ],
});
