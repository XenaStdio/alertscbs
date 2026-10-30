# Moo Choco Cherry — Custom Alert Theme (Sociabuzz + Saweria)

Tema alert & widget donor **Sociabuzz** dan **Saweria** dengan nuansa cokelat
choco beret + pita pink ala maskot MOO (senada foto karakter): maroon gelap,
krem, pink pita `#E798AE`, aksen krem-gold `#F6E7B8`, spots maroon, dan hati
pink berjatuhan. Badge softmax: "MOO · CHERRY".

Struktur paket:

```
assets/moo.png | moo.gif        → foto maskot (sumber alert; gif ditanam otomatis)
prep-moo.ps1                    → proses foto raw -> assets (crop, transparan, resize)
sociabuzz-alert.html / .css     → potongan HTML + CSS untuk kolom Custom Alert Sociabuzz
saweria-alert.html / .css       → idem untuk Saweria
widgets/*.css                   → 12 skin widget + 12 varian -obs (browser source OBS)
preview-moo-cherry.html          → buka di browser untuk melihat semua komponen
build.mjs                       → generator produksi (node build.mjs)
```

## 1. Pasang alert

**Sociabuzz** (Dashboard → My Page → Alert Widget/Pop-up → Custom Theme):
1. field **Custom HTML**: isi dengan isi `sociabuzz-alert.html`
2. field **Custom CSS**: isi dengan isi `sociabuzz-alert.css`

Varian `{supporter} {amount} {message} {from_text}` akan diganti platform otomatis.

**Saweria** (Dashboard → Alert Page → Custom):
1. field HTML: isi dari `saweria-alert.html` (placeholder `{donator} {amount} {message}`)

CSS alert dibuat ≤ 5120 byte agar aman pada limit kolom CSS kedua platform.
Jangan tambah spasi/baris baru ke file HTML saat dipasang.

Kartu alert: maskot/foto kamu ditampilkan **di sisi kanan** (`sk-char`,
anchor kanan-bawah, bob pelan) sementara teks (kicker, nominal, nama, pesan)
di sisi kiri. Kelopak hati 💗 jatuh di belakang karakter.

## 2. Pasang widget di OBS

1. Di dashboard platformmu, ambil URL widget (Top Donator, Milestone, dst).
2. Di OBS: Sources → Browser → masukkan URL.
3. Kolom **Custom CSS** browser source: salin isi `widgets/<nama-widget>-obs.css`
   (varian `-obs` tanpa scope `.w-xx`, body transparan).

Daftar widget: `top-donator`, `queue`, `milestone`, `subathon`,
`top-donator-runningtext` (hanya Sociabuzz), `mediashare`, `mediashare-video`.

Selector CSS menarget DOM asli platform: Sociabuzz
(`.card .show_donate`, `.progress`, `.sub_timer`, `#ms_container`) dan Saweria
(`#__next > div`, `.chakra-heading`, kelas chakra runtime). Jika platform
mengubah DOM-nya, sesuaikan selector, struktur file tidak berubah.

## 3. Foto maskot sebagai sumber alert

Foto chibi MOO sudah **tertanam langsung** di `*-alert.html` sebagai
`data:image/gif;base64` — tidak butuh URL hosting, kolom tetap kecil
(±46 KB). Rantai pembuatannya:

1. foto asli (`MOO (2).png`) → `prep-moo.ps1` memotong margin, resize →
   `assets/moo.png` (kualitas penuh)
2. `node make-gif.mjs 420` mengubah PNG menjadi GIF transparan asli via
   encoder `gifenc` (encoder GDI+ mem-flat alpha!) → `assets/moo.gif`
3. `build.mjs` otomatis membaca `assets/moo.gif` dan menanamkannya ke
   slot `.sk-char` di sisi kanan alert

Jalankan ulang kapanpun ganti foto:

```
powershell -ExecutionPolicy Bypass -File prep-moo.ps1 -Src "<path\foto-baru.png>"
node make-gif.mjs 420
node build.mjs
```

Ternyata kolom HTML platform menolak ukuran tertanam? Host file
`assets/moo.png`, lalu isi `RAW_TOP` di `build.mjs` dan jalankan lagi.
