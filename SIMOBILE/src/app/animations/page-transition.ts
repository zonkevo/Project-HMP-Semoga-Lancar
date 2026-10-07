import { createAnimation, Animation } from '@ionic/angular';

/**
 * Animasi transisi halaman custom (To Do 10), menggantikan animasi
 * bawaan Ionic (geser platform iOS/Android) dengan efek fade + slide-up
 * yang lebih halus, dipakai untuk SEMUA perpindahan halaman di aplikasi.
 */
export const transisiHalamanKustom = (_baseEl: HTMLElement, opts: any): Animation => {
  const enteringEl: HTMLElement = opts.enteringEl;
  const leavingEl: HTMLElement | undefined = opts.leavingEl;

  const animasiMasuk = createAnimation()
    .addElement(enteringEl)
    .duration(280)
    .easing('cubic-bezier(0.36, 0.66, 0.04, 1)')
    .fromTo('opacity', '0', '1')
    .fromTo('transform', 'translateY(24px)', 'translateY(0px)');

  const animasiRoot = createAnimation().addAnimation(animasiMasuk);

  if (leavingEl) {
    const animasiKeluar = createAnimation()
      .addElement(leavingEl)
      .duration(220)
      .easing('ease-in')
      .fromTo('opacity', '1', '0.5');

    animasiRoot.addAnimation(animasiKeluar);
  }

  return animasiRoot;
};
