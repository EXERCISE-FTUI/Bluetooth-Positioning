# Dokumentasi Petunjuk Pengembangan Software

Dokumentasi ini dibuat dengan tujuan untuk memberikan petunjuk yang jelas mengenai bagaimana cara untuk melanjutkan aplikasi ini.

## Tech Stack

Berikut adalah Tech Stack yang digunakan dalam pembangunan aplikasi ini:

- React Native
- Expo
- EAS Client
- MapBox

## Kebutuhan

Untuk dapat melanjutkan :

- Node.js (Versi terbaru atau LTS)
- Package Manager (NPM, Yarn, dll.)
- Virtual Device (ADB untuk Android)
- Akun MapBox
- Akun Expo.dev

## Awal Mula

Untuk melanjutkan pengembangan, berikut adalah langkah-langkah yang perlu dilakukan.

### Repository

1. Clone Repository:

```bash
git clone https://github.com/EXERCISE-FTUI/Bluetooth-Positioning.git
```

2. Buka Proyek pada IDE Favorit Anda:

```bash
cd Bluetooth-Positioning
```

3. Melakukan Instalasi Package:

```bash
npm install
```

\*note: Package-Package yang digunakan memiliki versi yang tidak up-to-date sehingga akan ada warning pada saat instalasi Package, akan tetapi tidak akan berpengaruh pada pengembangan.

### MapBox

Setelah instalasi selesai, buka website [MapBox](https://account.mapbox.com/) dan buat buat akun (jika belum ada). Kemudian login ke akun Anda.

1. Map Box Token

Copy Paste "Default Public Token" pada Map Box dan masukkan ke dalam Access Token pada file [constants](/software/app/constants/).

2. Access Token

Pada laman MapBox, tekan button "Create a Token" berada paling atas. Lalu kemudian masukkan nama token dan centang box "DOWNLOADS:READ". Kemudian copy token tersebut dan paste pada file [build.gradle](/software/android/build.gradle) pada variabel "password".

3.  Buat Map Styles

Buat Map Styles sesuai dengan denah bangunan yang Anda ingin buat dan masukkan path-path dari Map Styles tersebut ke dalam file [constants](/software/app/constants/).

### Expo.dev

1. Login ke [Expo](https://expo.dev/accounts/) atau buat akun baru jika belum ada.

2. Buka Projects pada sidebar.

3. Tekan button Create a Project di pojok kanan atas.

4. Buka proyek tersebut dan copy ID proyek.

5. Masukkan ID proyek tersebut pada file [app.json](/software/app.json)

## Build

Aplikasi ini dapat di-build untuk dua platform yaitu IOS dan Android. Seluruh proses build dilakukan dengan menggunakan EAS melalui cloud. Berikut adalah persiapan untuk melakukan Build:

1. Buka terminal pada direktori proyek.

2. Login untuk autentikasi EAS:

```bash
eas login
```

3. Masukkan perintah di bawah untuk melakukan Build:

```bash
eas build --profile production --platform [android|ios]
```

! PENTING: Pembuatan Build untuk platform Android tidak dikenakan biaya. Berbeda dengan IOS yang harus memiliki lisensi Apple Developer yang dapat dibayar dengan harga 99 USD.

## Pengembangan ke Depan

## Pengembangan ke Depan

Berikut adalah beberapa hal yang dapat dikembangkan lebih lanjut dalam aplikasi ini:

1. Beacon Dinamis: Anda dapat membuat pengaturan kustom terhadap beacon melalui aplikasi ini seperti perubahan nama, perizinan, dll.

2. Peningkatan Fitur Pemetaan: Anda dapat memperluas kemampuan pemetaan dengan menambahkan fitur seperti penandaan lokasi, rute navigasi, Wi-Fi Finding, atau tampilan peta 3D.

3. Kalkulasi Posisi: Anda dapat menggunakan metode lain untuk melakukan kalkulasi posisi pengguna selain menggunakan GPS.
