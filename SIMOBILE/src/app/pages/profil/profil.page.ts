import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, IonicModule, AppHeaderComponent],
  templateUrl: './profil.page.html',
})
export class ProfilPage implements OnInit {
  modeGelap = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.modeGelap = this.themeService.isModeGelap();
  }

  toggleModeGelap(event: CustomEvent): void {
    const aktif = (event.detail as { checked: boolean }).checked;
    this.themeService.toggle(aktif);
  }
}
