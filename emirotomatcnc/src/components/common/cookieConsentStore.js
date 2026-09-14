import { useEffect, useState } from "react";

// index.html içindeki Consent Mode betiğiyle aynı anahtar ve sürüm
export const CONSENT_KEY = "cookie_consent";
export const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE = 365 * 24 * 60 * 60 * 1000; // 12 ay sonra tercih yeniden sorulur

const CHANGE_EVENT = "cookie-consent-change";
const OPEN_EVENT = "cookie-preferences-open";

// Kayıtlı ve süresi dolmamış tercih; yoksa null (bant gösterilir)
export function readConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY));
    if (
      saved &&
      saved.version === CONSENT_VERSION &&
      Date.now() - saved.date < CONSENT_MAX_AGE
    ) {
      return saved;
    }
  } catch {
    // bozuk kayıt: yeniden sorulur
  }
  return null;
}

// İzin geri alınınca Google'ın bu alan adına bıraktığı çerezleri temizler
function clearCookies(prefixes) {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie.split(";").forEach((pair) => {
    const name = pair.split("=")[0].trim();
    if (!prefixes.some((p) => name.startsWith(p))) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
    });
  });
}

export function saveConsent({ functional, analytics, ads }) {
  const previous = readConsent();
  const consent = {
    version: CONSENT_VERSION,
    date: Date.now(),
    necessary: true,
    functional: Boolean(functional),
    analytics: Boolean(analytics),
    ads: Boolean(ads),
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // depolama kapalıysa tercih yalnız bu sayfa için geçerli olur
  }

  if (window.applyCookieConsent) window.applyCookieConsent(consent);

  const withdrawn =
    previous &&
    ((previous.analytics && !consent.analytics) || (previous.ads && !consent.ads));
  if (withdrawn) {
    if (!consent.analytics) clearCookies(["_ga"]);
    if (!consent.ads) clearCookies(["_gcl"]);
    // Yüklenmiş Google etiketi ancak sayfa yenilenince tamamen durur
    window.location.reload();
    return;
  }

  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: consent }));
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookiePreferences(handler) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

// Bileşenlerin güncel tercihi izlemesi için (ör. İletişim sayfasındaki harita)
export function useCookieConsent() {
  const [consent, setConsent] = useState(readConsent);

  useEffect(() => {
    const update = (e) => setConsent(e.detail);
    window.addEventListener(CHANGE_EVENT, update);
    return () => window.removeEventListener(CHANGE_EVENT, update);
  }, []);

  return consent;
}
