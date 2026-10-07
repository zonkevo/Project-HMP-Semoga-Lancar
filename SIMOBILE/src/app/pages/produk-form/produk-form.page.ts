import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdukService } from '../../services/produk.service';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';

@Component({
  selector: 'app-produk-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule, AppHeaderComponent],
  templateUrl: './produk-form.page.html',
  styleUrls: ['./produk-form.page.scss'],
})
export class ProdukFormPage implements OnInit {
  form!: FormGroup;
  modeEdit = false;
  produkId: number | null = null;

  daftarKategori = ['Makanan', 'Minuman', 'Sembako', 'Kebutuhan Rumah', 'Lainnya'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produkService: ProdukService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit(): void {
    this.buatForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modeEdit = true;
      this.produkId = Number(idParam);
      const produk = this.produkService.getById(this.produkId);
      if (produk) {
        this.form.patchValue({
          nama: produk.nama,
          kategori: produk.kategori,
          hargaBeli: String(produk.hargaBeli),
          hargaJual: String(produk.hargaJual),
          stok: String(produk.stok),
          gambar: produk.gambar ?? '',
        });
      }
    }
  }


  private buatForm(): void {
    this.form = this.fb.group({
      nama: ['', [Validators.required, Validators.minLength(3)]],
      kategori: ['', Validators.required],
      hargaBeli: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)]],
      hargaJual: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)]],
      stok: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      gambar: [''],
    });
  }

  get f() {
    return this.form.controls;
  }

  async simpan(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      await this.tampilkanToast('Form belum lengkap / masih ada isian yang salah.', 'danger');
      return;
    }

    const nilaiForm = this.form.value;

    const produkBaru = {
      nama: nilaiForm.nama,
      kategori: nilaiForm.kategori,
      hargaBeli: Number(nilaiForm.hargaBeli),
      hargaJual: Number(nilaiForm.hargaJual),
      stok: Number(nilaiForm.stok),
      gambar: nilaiForm.gambar,
    };

    if (this.modeEdit && this.produkId !== null) {
      this.produkService.updateProduk({ id: this.produkId, ...produkBaru });
      await this.tampilkanToast('Produk berhasil diperbarui.', 'success');
    } else {
      this.produkService.tambahProduk({ id: 0, ...produkBaru });
      await this.tampilkanToast('Produk berhasil ditambahkan.', 'success');
    }

    this.router.navigate(['/tabs/produk']);
  }

  private async tampilkanToast(pesan: string, warna: 'success' | 'danger'): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: pesan,
      duration: 1800,
      color: warna,
      position: 'bottom',
    });
    await toast.present();
  }
}