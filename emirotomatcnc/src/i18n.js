import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import trTranslation from './locales/tr/translation.json';
import enOrderPopup from './locales/en/orderPopup.json';
import trOrderPopup from './locales/tr/orderPopup.json';

const savedLanguage = localStorage.getItem('language') || 'tr'; // Eğer yoksa varsayılan dil olarak 'tr' kullan


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
        orderPopup: enOrderPopup
      },
      tr: {
        translation: trTranslation,
        orderPopup: trOrderPopup
      }
    },
    lng: savedLanguage,  // Varsayılan dili belirle
    fallbackLng: 'tr',  // Eğer çeviri bulunmazsa yedek dil
    interpolation: {
      escapeValue: false  // React zaten XSS koruması sağlar
    }
  });

// Dil değiştiğinde gerçekleşecek olay
i18n.on('languageChanged', (lng) => {
  // Dil değiştiğinde localStorage'a kaydet
  localStorage.setItem('language', lng);
  
  // Gerekli DOM olaylarını tetikleyelim, böylece bileşenler güncellenir
  document.dispatchEvent(new Event('languageChanged'));
  
  // Sayfa yenilemesinden kaçınmak için burada dil değişim işlemlerini yapabiliriz
  // Fakat tema (dark/light mode) ayarını değiştirmeyelim
});

export default i18n;
