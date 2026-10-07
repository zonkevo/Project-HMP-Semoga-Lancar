import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';

@Component({
  selector: 'app-tentang',
  standalone: true,
  imports: [CommonModule, IonicModule, AppHeaderComponent],
  templateUrl: './tentang.page.html',
})
export class TentangPage {}
