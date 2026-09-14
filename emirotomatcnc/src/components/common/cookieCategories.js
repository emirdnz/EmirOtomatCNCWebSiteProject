// Sitede kullanılan çerezler — çerez paneli ve Çerez Politikası sayfası aynı listeyi kullanır.
// Süreler Google'ın kendi belgelerinden alındı (Eylül 2026):
// support.google.com/analytics/answer/11397207 · business.safety.google/adscookies · policies.google.com/technologies/cookies

export const COOKIE_CATEGORIES = {
  tr: [
    {
      key: "necessary",
      title: "Zorunlu Çerezler",
      alwaysOn: true,
      description:
        "Sitenin temel işlevleri ve tercihlerinizin hatırlanması için gereklidir. Kapatılamaz; açık rızaya dayanmaz.",
      legalBasis: "KVKK md. 5/2-f — meşru menfaat",
      cookies: [
        {
          name: "cookie_consent",
          provider: "Emir Otomat CNC · birinci taraf",
          purpose: "Çerez tercihlerinizi saklar.",
          duration: "12 ay (yerel depolama)",
        },
        {
          name: "language",
          provider: "Emir Otomat CNC · birinci taraf",
          purpose: "Seçtiğiniz site dilini hatırlar.",
          duration: "Siz silene kadar (yerel depolama)",
        },
      ],
    },
    {
      key: "functional",
      title: "İşlevsel Çerezler",
      description:
        "İletişim sayfasındaki Google Haritalar haritasının gösterilmesini sağlar. Harita Google tarafından sunulur ve Google kendi çerezlerini kullanabilir.",
      legalBasis: "KVKK md. 5/1 — açık rıza",
      cookies: [
        {
          name: "NID ve benzeri",
          provider: "Google · üçüncü taraf",
          purpose: "Haritanın gösterilmesi ve harita tercihlerinin hatırlanması.",
          duration: "NID: son kullanımdan itibaren 6 ay",
        },
      ],
    },
    {
      key: "analytics",
      title: "Analitik Çerezler",
      description:
        "Siteyi kaç kişinin ziyaret ettiğini, hangi sayfalara bakıldığını ve hangi iletişim bağlantılarına tıklandığını ölçmemizi sağlar (Google Analytics).",
      legalBasis: "KVKK md. 5/1 — açık rıza",
      cookies: [
        {
          name: "_ga",
          provider: "Google Analytics · veriler Google'a iletilir",
          purpose: "Ziyaretçileri birbirinden ayırt eder.",
          duration: "2 yıl",
        },
        {
          name: "_ga_71YPDP9N7T",
          provider: "Google Analytics · veriler Google'a iletilir",
          purpose: "Oturum durumunu korur.",
          duration: "2 yıl",
        },
      ],
    },
    {
      key: "ads",
      title: "Reklam Çerezleri",
      description:
        "Google Ads reklamlarımızdan siteye gelen ziyaretleri ve reklamların sonuçlarını ölçmemizi sağlar.",
      legalBasis: "KVKK md. 5/1 — açık rıza",
      cookies: [
        {
          name: "_gcl_au",
          provider: "Google Ads · veriler Google'a iletilir",
          purpose: "Reklamlardan gelen ziyaretleri ve dönüşümleri ölçer.",
          duration: "90 gün",
        },
        {
          name: "_gcl_aw, _gcl_gs",
          provider: "Google Ads · veriler Google'a iletilir",
          purpose: "Reklam tıklamasına ait bilgiyi saklar.",
          duration: "90 gün",
        },
      ],
    },
  ],
  en: [
    {
      key: "necessary",
      title: "Strictly Necessary Cookies",
      alwaysOn: true,
      description:
        "Required for the core functions of the site and to remember your choices. They cannot be switched off and do not rely on consent.",
      legalBasis: "KVKK Art. 5/2-f — legitimate interest",
      cookies: [
        {
          name: "cookie_consent",
          provider: "Emir Otomat CNC · first party",
          purpose: "Stores your cookie preferences.",
          duration: "12 months (local storage)",
        },
        {
          name: "language",
          provider: "Emir Otomat CNC · first party",
          purpose: "Remembers the site language you selected.",
          duration: "Until you delete it (local storage)",
        },
      ],
    },
    {
      key: "functional",
      title: "Functional Cookies",
      description:
        "Allow the Google Maps map on the Contact page to be displayed. The map is provided by Google, which may use its own cookies.",
      legalBasis: "KVKK Art. 5/1 — explicit consent",
      cookies: [
        {
          name: "NID and similar",
          provider: "Google · third party",
          purpose: "Displaying the map and remembering map preferences.",
          duration: "NID: 6 months from last use",
        },
      ],
    },
    {
      key: "analytics",
      title: "Analytics Cookies",
      description:
        "Help us measure how many people visit the site, which pages are viewed and which contact links are clicked (Google Analytics).",
      legalBasis: "KVKK Art. 5/1 — explicit consent",
      cookies: [
        {
          name: "_ga",
          provider: "Google Analytics · data sent to Google",
          purpose: "Distinguishes visitors.",
          duration: "2 years",
        },
        {
          name: "_ga_71YPDP9N7T",
          provider: "Google Analytics · data sent to Google",
          purpose: "Persists session state.",
          duration: "2 years",
        },
      ],
    },
    {
      key: "ads",
      title: "Advertising Cookies",
      description:
        "Help us measure visits that come from our Google Ads adverts and the results of those adverts.",
      legalBasis: "KVKK Art. 5/1 — explicit consent",
      cookies: [
        {
          name: "_gcl_au",
          provider: "Google Ads · data sent to Google",
          purpose: "Measures visits and conversions from adverts.",
          duration: "90 days",
        },
        {
          name: "_gcl_aw, _gcl_gs",
          provider: "Google Ads · data sent to Google",
          purpose: "Stores information about the advert click.",
          duration: "90 days",
        },
      ],
    },
  ],
};
