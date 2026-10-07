import { Injectable } from '@angular/core';

const KUNCI_MODE_GELAP = 'simobile-mode-gelap';

/**
 * Mengelola preferensi mode gelap/terang secara manual (toggle),
 * disimpan di localStorage supaya tetap tersimpan walau browser ditutup.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private modeGelap = false;

  constructor() {
    this.muatPreferensi();
  }

  private muatPreferensi(): void {
    const tersimpan = localStorage.getItem(KUNCI_MODE_GELAP);
    this.modeGelap = tersimpan === 'true';
    this.terapkan();
  }

  isModeGelap(): boolean {
    return this.modeGelap;
  }

  toggle(aktif: boolean): void {
    this.modeGelap = aktif;
    localStorage.setItem(KUNCI_MODE_GELAP, String(aktif));
    this.terapkan();
  }

  private terapkan(): void {
    document.body.classList.toggle('dark-theme', this.modeGelap);
  }
}
