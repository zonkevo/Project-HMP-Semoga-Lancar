# SIMOBILE

Aplikasi kasir mobile untuk **Toko Makmur Jaya** (Bu Marni) — dibangun dengan **Ionic Angular** sebagai tugas UAS mata kuliah Hybrid Mobile Programming.

---

## Deskripsi Singkat

SIMOBILE membantu Bu Marni mencatat transaksi penjualan langsung dari HP tanpa perlu koneksi internet (semua data disimpan di dalam aplikasi, tidak pakai database eksternal/API), dengan fitur pencarian produk cepat, pengelolaan stok, dan riwayat transaksi.

---

## Cara Instalasi

**Yang dibutuhkan:**
- Node.js versi 18 LTS atau 20 LTS ([download di sini](https://nodejs.org))
- Ionic CLI (akan otomatis ditawarkan untuk diinstall saat pertama kali menjalankan `ionic serve`, atau install manual dengan `npm install -g @ionic/cli`)

**Langkah instalasi:**

1. Ekstrak/clone proyek ini, lalu masuk ke foldernya:
   ```bash
   cd SIMOBILE
   ```
2. Install seluruh dependency (Angular, Ionic, Capacitor, dll):
   ```bash
   npm install
   ```
   *(butuh koneksi internet, proses ini mengunduh package dari npm registry — cukup dilakukan sekali di awal)*

---

## Cara Menjalankan Aplikasi

Setelah instalasi selesai, jalankan salah satu perintah berikut dari dalam folder `SIMOBILE`:

```bash
ionic serve
```
atau
```bash
npm start
```

Aplikasi akan otomatis terbuka di browser pada `http://localhost:8100` (atau `http://localhost:4200` kalau pakai `npm start`).

> 💡 Setiap kali membuka ulang proyek ini di lain waktu (folder sama, dependency sudah pernah di-install), **tidak perlu `npm install` lagi** — langsung `ionic serve` saja.

---

## Daftar Fitur yang Berhasil Diimplementasikan (To Do 1–12)

| # | Fitur | Keterangan |
|---|---|---|
| 1 | **Struktur Navigasi** | Tab utama (Dashboard, Produk, Transaksi, Profil) dibungkus Drawer/Side Menu berisi Pengaturan, Tentang Aplikasi, dan Logout |
| 2 | **Halaman Dashboard** | Ringkasan jumlah produk, jumlah transaksi hari ini, dan produk paling laku (dihitung otomatis dari data transaksi asli) |
| 3 | **Pencarian Produk Real-Time** | List produk langsung ter-filter saat mengetik (two-way binding `ngModel`), tanpa tombol cari |
| 4 | **Detail Produk via Route Parameter** | Klik produk → halaman detail berdasarkan ID di URL, menampilkan stok, harga beli, dan harga jual |
| 5 | **Property & Event Binding** | Gambar produk default kalau belum ada foto; tombol "Tambah ke Keranjang" otomatis nonaktif saat stok = 0 |
| 6 | **Form Tambah & Edit Produk** | Reactive Form dengan validasi lengkap (nama, kategori, harga, stok) dan pesan error informatif per kolom |
| 7 | **Reusable Component** | `product-card`, `empty-state`, dan `app-header` dipakai berulang di banyak halaman |
| 8 | **Pemisahan Angular Service** | Logic dipisah ke 3 service: `ProdukService`, `KeranjangService`, `TransaksiService` — tidak ada logic data langsung di komponen |
| 9 | **Custom Theme & Dark Mode** | Palet warna hijau-kuning (identitas toko), toggle mode gelap/terang manual di halaman Profil (tersimpan di localStorage) |
| 10 | **Animasi** | Transisi halaman custom (fade + slide) di semua navigasi, dan swipe-to-delete (`ion-item-sliding`) di halaman Keranjang |
| 11 | **Keranjang & Checkout (Simulasi)** | Tambah/kurangi qty, hapus item, hitung total, tombol "Konfirmasi Transaksi" yang menyimpan riwayat & mengurangi stok |
| 12 | **Riwayat Transaksi** | Daftar transaksi yang pernah dilakukan (ikon jam ⏱ di halaman Keranjang), setiap transaksi bisa diklik untuk lihat detail lengkap |

### Custom Styling Tambahan
Sesuai ketentuan *"Ionic component wajib di-custom style sendiri"*, tampilan sudah dikustomisasi lebih dari sekadar warna:
- Font custom (Poppins)
- Kartu produk dengan shadow + efek hover, badge stok berbentuk pill
- Kartu ringkasan Dashboard pakai gradient
- Tombol, search bar, FAB, form input, dan item keranjang semua di-custom radius & shadow-nya
- Side Menu dengan ikon toko sebagai identitas brand

---

## Struktur Folder

```
SIMOBILE/
  src/
    app/
      animations/page-transition.ts    <- animasi transisi halaman custom (To Do 10)
      app.component.ts / .html / .scss  <- shell aplikasi + Drawer/Side Menu
      app.routes.ts                     <- routing utama
      models/
        produk.model.ts
      services/
        produk.service.ts
        keranjang.service.ts
        transaksi.service.ts
        theme.service.ts                <- dark mode (To Do 9)
      components/
        product-card/
        empty-state/
        app-header/
      pages/
        dashboard/
        produk/
        produk-detail/
        produk-form/                    <- Reactive Form (To Do 6)
        transaksi/                      <- Keranjang & Checkout (To Do 11)
        riwayat/                        <- Riwayat Transaksi (To Do 12)
        riwayat-detail/
        profil/                         <- toggle dark mode (To Do 9)
        tentang/
      tabs/
```

---


## Teknologi yang Digunakan

- **Framework**: Ionic 7 + Angular 17 (standalone components)
- **Bahasa**: TypeScript, SCSS, HTML
- **State/Data**: In-memory (tanpa database eksternal/API, sesuai ketentuan tugas), preferensi dark mode disimpan di `localStorage`

## Catatan
- Data produk & transaksi bersifat sementara (reset saat browser di-refresh), kecuali preferensi dark mode.
- Font custom (Poppins) dimuat dari Google Fonts — butuh koneksi internet saat menjalankan aplikasi agar font tampil sempurna (kalau offline, otomatis fallback ke font sistem, tidak error).
