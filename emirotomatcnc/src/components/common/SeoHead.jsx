import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SITE = "Emir Otomat CNC";

// Sayfa başına başlık ve açıklama (Google arama sonucunda görünen metin)
const PAGES = {
  "/": {
    tr: {
      title: "Emir Otomat CNC – Endüstriyel Yedek Parça Üretimi",
      description:
        "Emir Otomat CNC: 1986'dan beri İstanbul İkitelli'de CNC otomat, index ve revolver tezgâhlarıyla endüstriyel yedek parça üretimi. ISO 9001 sertifikalı.",
    },
    en: {
      title: "Emir Otomat CNC – Industrial Spare Parts Manufacturing",
      description:
        "Emir Otomat CNC: industrial spare parts manufacturing with CNC automatic, index and revolver lathes in Istanbul since 1986. ISO 9001 certified.",
    },
  },
  "/hakkimizda": {
    tr: {
      title: `Hakkımızda | ${SITE}`,
      description:
        "1986'da kurulan Emir Otomat CNC; otomotiv, beyaz eşya, tıbbi malzeme, aydınlatma, doğalgaz ve savunma sanayisine parça tedarik ediyor.",
    },
    en: {
      title: `About Us | ${SITE}`,
      description:
        "Founded in 1986, Emir Otomat CNC supplies parts to the automotive, home appliance, medical, lighting, natural gas and defense industries.",
    },
  },
  "/calismalarimiz/urunler": {
    tr: {
      title: `Ürünlerimiz | ${SITE}`,
      description:
        "Pirinç, otomat çeliği, alüminyum, paslanmaz, yüksek karbonlu çelik ve plastikten ürettiğimiz CNC parça örnekleri.",
    },
    en: {
      title: `Our Products | ${SITE}`,
      description:
        "CNC parts we manufacture from brass, free-cutting steel, aluminium, stainless steel, high-carbon steel and plastics.",
    },
  },
  "/calismalarimiz/makine-parkuru": {
    tr: {
      title: `Makine Parkuru | ${SITE}`,
      description:
        "Index, revolver ve CNC otomat tezgâhlarından oluşan makine parkurumuz.",
    },
    en: {
      title: `Machine Park | ${SITE}`,
      description:
        "Our machine park of index, revolver and CNC automatic lathes.",
    },
  },
  "/sertifikalar": {
    tr: {
      title: `Sertifikalar | ${SITE}`,
      description:
        "ISO 9001:2015, ISO 14001:2015, TS ISO 10002:2018 ve ISO 31000 sertifikalarımız ile malzeme sertifikaları.",
    },
    en: {
      title: `Certificates | ${SITE}`,
      description:
        "Our ISO 9001:2015, ISO 14001:2015, TS ISO 10002:2018 and ISO 31000 certificates and material certificates.",
    },
  },
  "/kariyer": {
    tr: {
      title: `Kariyer – İş Başvurusu | ${SITE}`,
      description: "Emir Otomat CNC ekibine katılmak için iş başvurusu formu.",
    },
    en: {
      title: `Careers – Job Application | ${SITE}`,
      description: "Job application form to join the Emir Otomat CNC team.",
    },
  },
  "/staj": {
    tr: {
      title: `Staj Başvurusu | ${SITE}`,
      description: "Emir Otomat CNC'de staj yapmak için başvuru formu.",
    },
    en: {
      title: `Internship Application | ${SITE}`,
      description: "Application form for an internship at Emir Otomat CNC.",
    },
  },
  "/iletisim": {
    tr: {
      title: `İletişim | ${SITE}`,
      description:
        "İkitelli OSB, Başakşehir/İstanbul. Telefon +90 212 671 17 40, WhatsApp ve e-posta ile bize ulaşın.",
    },
    en: {
      title: `Contact | ${SITE}`,
      description:
        "İkitelli OSB, Başakşehir/Istanbul. Reach us by phone +90 212 671 17 40, WhatsApp or e-mail.",
    },
  },
  "/upload-model": {
    tr: {
      title: `Online Teklif – Teknik Resim Yükleyin | ${SITE}`,
      description:
        "Teknik resminizi yükleyin, adet, malzeme ve teslim tarihini girin; parçanız için fiyat teklifi alın.",
    },
    en: {
      title: `Online Quote – Upload Your Drawing | ${SITE}`,
      description:
        "Upload your technical drawing, enter quantity, material and delivery date, and get a quote for your part.",
    },
  },
  "/kvkk": {
    tr: {
      title: `KVKK Aydınlatma Metni | ${SITE}`,
      description: "Emir Otomat CNC kişisel verilerin korunması aydınlatma metni.",
    },
    en: {
      title: `Personal Data Notice (KVKK) | ${SITE}`,
      description: "Emir Otomat CNC personal data protection notice.",
    },
  },
  "/cerez-politikasi": {
    tr: {
      title: `Çerez Politikası | ${SITE}`,
      description: "emirotomatcnc.com sitesinde kullanılan çerezler ve nasıl yönetileceği.",
    },
    en: {
      title: `Cookie Policy | ${SITE}`,
      description: "Cookies used on emirotomatcnc.com and how to manage them.",
    },
  },
};

PAGES["/anasayfa"] = PAGES["/"];

const SeoHead = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language === "en" ? "en" : "tr";
    const page = (PAGES[pathname] || PAGES["/"])[lang];

    document.documentElement.lang = lang;
    document.title = page.title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = page.description;
  }, [pathname, i18n.language]);

  return null;
};

export default SeoHead;
