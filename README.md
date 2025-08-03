# 💬 WAJS + Cloudflare Launcher

Sistem ini menghubungkan WhatsApp bot lokal (dibuat dengan `whatsapp-web.js`) dan membuka akses online menggunakan **Cloudflare Tunnel**. Cocok digunakan untuk sistem absensi berbasis web di sekolah.

---

## 📦 Fitur Utama

- Bot WhatsApp otomatis terhubung saat PC dinyalakan
- QR Code muncul di browser (bukan terminal)
- Tidak ada jendela terminal yang mengganggu
- Dashboard bisa diakses online via subdomain (`wa.domainkamu.sch.id`) menggunakan Cloudflare Tunnel

---

## 🚀 Cara Instalasi di Komputer Baru

### 1. 📥 Persiapan

- **Install Node.js** → [https://nodejs.org](https://nodejs.org)
- **Cloudflared** → Download `cloudflared.exe` dari:  
  [https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation#windows](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation#windows)

> Simpan semua file di satu folder, misalnya `C:\wajs-web-bot\`

---

### 2. 📦 Install Dependency Bot

Buka terminal di folder tersebut, lalu jalankan:

```bash
npm install
```

---

### 3. 🌐 Setup Cloudflare Tunnel

> **Langkah ini hanya dilakukan oleh developer atau admin teknis sekali saja**

```bash
cloudflared login
cloudflared tunnel create wa-bot
```

Buat file `config.yml` di folder:

```
C:\Users\<username>\.cloudflared\config.yml
```

Isi contoh:

```yaml
tunnel: wa-bot
credentials-file: C:\Users\<username>\.cloudflared\wa-bot.json
ingress:
  - hostname: wa.domainanda.sch.id
    service: http://localhost:3000
  - service: http_status:404
```

Lalu jalankan:

```bash
cloudflared tunnel route dns wa-bot wa.domainanda.sch.id
```

---

### 4. ✅ Jalankan Bot & Tunnel Sekaligus

Tinggal klik:

```text
launch.vbs
```

Hasilnya:
- WA bot berjalan di background
- Tunnel aktif tanpa jendela terminal
- Browser terbuka otomatis ke dashboard

---

## 🔐 Keamanan & Privasi

- File `cloudflared.exe` dan folder `.cloudflared/` tidak diunggah ke GitHub
- Tidak ada token, session, atau kredensial yang dibagikan
- Hanya file umum dan tampilan dashboard yang dipublikasikan

---

## 👨‍💻 Dibuat oleh

MaeOfficial (2025)  
Digunakan untuk sistem absensi sekolah dengan WhatsApp Bot