# Emir Otomat CNC — Kurumsal Web Sitesi

> **EN —** The current public website of a CNC automatic-lathe parts manufacturer: bilingual (TR/EN)
> React + Vite single-page app on Netlify, plus a small Node.js/Express service that e-mails quote
> requests with attached technical drawings.

CNC otomat torna parçası üreten Emir Otomat CNC'nin yayındaki kurumsal sitesi. Firmayı, ürünleri,
makine parkurunu ve kalite belgelerini tanıtır; müşteriler teknik resimlerini yükleyerek teklif ister.
Site eski WordPress kurulumunun yerine React ile yeniden yazıldı.

## Sayfalar

| Adres | Sayfa |
|---|---|
| `/` | Anasayfa |
| `/hakkimizda` | Hakkımızda |
| `/calismalarimiz/urunler` | Ürünler |
| `/calismalarimiz/makine-parkuru` | Makine parkuru |
| `/sertifikalar` | Sertifikalar ve kalite |
| `/kariyer` · `/staj` | İş ve staj başvurusu |
| `/upload-model` | Teklif: teknik resim yükleme |
| `/iletisim` | İletişim |
| `/kvkk` · `/cerez-politikasi` | Yasal metinler |

Bütün metinler Türkçe ve İngilizce (`emirotomatcnc/src/locales/tr`, `en`); dil sayfadan değiştirilir.

## Mimari

```
Tarayıcı ──► Netlify (statik React uygulaması, emirotomatcnc/)
   │
   └─ teklif formu ──► Node.js e-posta servisi (backend/) ──► SMTP ──► firma e-postası
                        Express · Multer · Nodemailer
```

- **Ön yüz:** React 18, Vite 5, React Router, Tailwind CSS, Material Tailwind ve Flowbite bileşenleri,
  i18next, Swiper, Framer Motion
- **E-posta servisi:** `POST /send-mail` — en çok 5 dosya, dosya başına en çok 25 MB, dosyalar diske
  yazılmadan bellekte tutulup e-postaya eklenir; CORS yalnız sitenin adreslerine açık

## Çalıştırma

**Gerekenler:** Node.js 18+.

```bash
git clone https://github.com/emirdnz/EmirOtomatCNCWebSiteProject.git
cd EmirOtomatCNCWebSiteProject

# Site
cd emirotomatcnc
npm install --legacy-peer-deps
npm run dev                      # http://localhost:5173

# E-posta servisi (ayrı terminalde)
cd ../backend
npm install
npm run dev                      # .env dosyası gerekir, aşağıya bakın
```

### E-posta servisinin ortam değişkenleri

| Değişken | Ne |
|---|---|
| `EMAIL_HOST` · `EMAIL_PORT` · `EMAIL_SECURE` | SMTP sunucusu |
| `EMAIL_USER` · `EMAIL_PASSWORD` · `EMAIL_FROM` | Gönderen hesap |
| `EMAIL_TO` | Teklif e-postalarının gideceği adres |
| `COMPANY_EMAIL` · `COMPANY_PHONE` · `COMPANY_ADDRESS` | E-posta altbilgisi |
| `PORT` | Servis portu |

`.env` depoya girmez.

## Yayına alma

- **Site:** Netlify — `netlify.toml` hazır (taban klasör `emirotomatcnc`, `npm run build`, `dist`;
  tek sayfa uygulaması için bütün adresler `index.html`'e yönlenir).
- **E-posta servisi:** Herhangi bir Node.js sunucusu (`npm start`); sitenin adresi CORS listesinde olmalı.

## Ekip

- Emir Engin Deniz — proje lideri, e-posta servisi
- Ozan Ali Kayacı — ön yüz geliştirme

> Sitenin yeni sürümü (Next.js 16) ayrı olarak geliştiriliyor.
