import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { COOKIE_CATEGORIES } from "@/components/common/cookieCategories";
import {
  onOpenCookiePreferences,
  readConsent,
  saveConsent,
} from "@/components/common/cookieConsentStore";

const TEXT = {
  tr: {
    bannerTitle: "Çerez Tercihleriniz",
    bannerText:
      "Sitemizin çalışması için zorunlu çerezler kullanıyoruz. İzin vermeniz hâlinde ziyaret istatistiklerini ölçmek (Google Analytics), reklamlarımızın sonuçlarını ölçmek (Google Ads) ve İletişim sayfasındaki haritayı göstermek (Google Haritalar) için birinci ve üçüncü taraf çerezler de kullanılır; bu çerezlerle toplanan veriler Google'ın yurt dışındaki sunucularına iletilebilir. İzin vermediğiniz çerezler çalışmaz. Tercihinizi dilediğiniz zaman sol alttaki çerez simgesinden değiştirebilirsiniz.",
    acceptAll: "Tümünü Kabul Et",
    necessaryOnly: "Yalnızca Zorunlu Çerezler",
    manage: "Tercihleri Yönet",
    save: "Seçimlerimi Kaydet",
    panelTitle: "Çerez Tercih Merkezi",
    panelIntro:
      "Aşağıdaki kategorileri tek tek açıp kapatabilirsiniz. Zorunlu çerezler dışındaki tüm çerezler varsayılan olarak kapalıdır ve yalnızca sizin onayınızla çalışır. Verdiğiniz izni aynı panelden istediğiniz an geri alabilirsiniz.",
    alwaysOn: "Her zaman etkin",
    showCookies: "Çerezleri göster",
    hideCookies: "Çerezleri gizle",
    colName: "Çerez",
    colProvider: "Sağlayıcı",
    colPurpose: "Amaç",
    colDuration: "Süre",
    policy: "Çerez Politikası",
    kvkk: "KVKK Aydınlatma Metni",
    close: "Kapat",
    reopen: "Çerez Tercihleri",
  },
  en: {
    bannerTitle: "Your Cookie Preferences",
    bannerText:
      "We use strictly necessary cookies to run our website. With your permission, we also use first- and third-party cookies to measure visit statistics (Google Analytics), measure the results of our adverts (Google Ads) and display the map on the Contact page (Google Maps); data collected by these cookies may be sent to Google's servers abroad. Cookies you do not allow will not run. You can change your choice at any time using the cookie icon at the bottom left.",
    acceptAll: "Accept All",
    necessaryOnly: "Strictly Necessary Only",
    manage: "Manage Preferences",
    save: "Save My Choices",
    panelTitle: "Cookie Preference Center",
    panelIntro:
      "You can switch each category on or off. All cookies other than strictly necessary cookies are off by default and only run with your consent. You can withdraw your consent from this panel at any time.",
    alwaysOn: "Always active",
    showCookies: "Show cookies",
    hideCookies: "Hide cookies",
    colName: "Cookie",
    colProvider: "Provider",
    colPurpose: "Purpose",
    colDuration: "Duration",
    policy: "Cookie Policy",
    kvkk: "Personal Data Notice (KVKK)",
    close: "Close",
    reopen: "Cookie Preferences",
  },
};

// Rehber gereği üç ana düğme aynı renk, boyut ve yazı tipinde
const BUTTON =
  "w-full min-h-[44px] px-4 py-2.5 rounded-btn bg-primary-blue hover:bg-primary-blue-dark text-white text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-blue";

function ShieldIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7.5 3v5.25c0 4.6-3.2 8.63-7.5 9.75-4.3-1.12-7.5-5.15-7.5-9.75V6L12 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2.1 2.1L15.5 9.7" />
    </svg>
  );
}

ShieldIcon.propTypes = { className: PropTypes.string };

function CookieIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1111.2 3a3 3 0 003.8 3.8 3 3 0 006 6z" />
      <circle cx="8.5" cy="10.5" r="1" fill="currentColor" />
      <circle cx="12.5" cy="15.5" r="1" fill="currentColor" />
      <circle cx="8" cy="15" r="0.8" fill="currentColor" />
      <circle cx="16.5" cy="14.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

CookieIcon.propTypes = { className: PropTypes.string };

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-blue ${
        checked ? "bg-primary-blue" : "bg-border-strong"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

function CategoryRow({ category, checked, onChange, text }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border-soft rounded-card bg-white">
      <div className="p-4 flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-text-main">{category.title}</h3>
          <p className="mt-1 text-[13px] leading-6 text-text-muted">{category.description}</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-text-subtle">
            {category.legalBasis}
          </p>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-blue hover:text-primary-blue-dark"
          >
            {open ? text.hideCookies : text.showCookies} ({category.cookies.length})
            <svg className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="pt-0.5">
          {category.alwaysOn ? (
            <span className="inline-block whitespace-nowrap rounded-full bg-primary-blue-light px-2.5 py-1 text-[11px] font-semibold text-primary-blue-dark">
              {text.alwaysOn}
            </span>
          ) : (
            <Switch checked={checked} onChange={onChange} label={category.title} />
          )}
        </div>
      </div>

      {open && (
        <div className="border-t border-border-soft bg-surface-muted px-4 py-3 space-y-3">
          {category.cookies.map((cookie) => (
            <dl key={cookie.name} className="grid grid-cols-[88px_1fr] gap-x-3 gap-y-1 text-xs leading-5">
              <dt className="text-text-subtle">{text.colName}</dt>
              <dd className="font-mono font-semibold text-text-main break-all">{cookie.name}</dd>
              <dt className="text-text-subtle">{text.colProvider}</dt>
              <dd className="text-text-muted">{cookie.provider}</dd>
              <dt className="text-text-subtle">{text.colPurpose}</dt>
              <dd className="text-text-muted">{cookie.purpose}</dd>
              <dt className="text-text-subtle">{text.colDuration}</dt>
              <dd className="text-text-muted">{cookie.duration}</dd>
            </dl>
          ))}
        </div>
      )}
    </div>
  );
}

CategoryRow.propTypes = {
  category: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired,
};

function CookieConsent() {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "tr";
  const text = TEXT[lang];
  const categories = COOKIE_CATEGORIES[lang];

  const [decided, setDecided] = useState(() => readConsent() !== null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [choice, setChoice] = useState({ functional: false, analytics: false, ads: false });

  const openPanel = () => {
    const saved = readConsent();
    setChoice({
      functional: Boolean(saved?.functional),
      analytics: Boolean(saved?.analytics),
      ads: Boolean(saved?.ads),
    });
    setPanelOpen(true);
  };

  useEffect(() => onOpenCookiePreferences(openPanel), []);

  useEffect(() => {
    if (!panelOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setPanelOpen(false);
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [panelOpen]);

  const decide = (consent) => {
    saveConsent(consent);
    setDecided(true);
    setPanelOpen(false);
  };

  const acceptAll = () => decide({ functional: true, analytics: true, ads: true });
  const necessaryOnly = () => decide({ functional: false, analytics: false, ads: false });

  const links = (
    <>
      <Link to="/cerez-politikasi" onClick={() => setPanelOpen(false)} className="font-semibold text-primary-blue hover:text-primary-blue-dark underline underline-offset-2">
        {text.policy}
      </Link>
      <span className="text-border-strong" aria-hidden="true">|</span>
      <Link to="/kvkk" onClick={() => setPanelOpen(false)} className="font-semibold text-primary-blue hover:text-primary-blue-dark underline underline-offset-2">
        {text.kvkk}
      </Link>
    </>
  );

  return (
    <>
      {!decided && !panelOpen && (
        <div
          role="region"
          aria-labelledby="cookie-banner-title"
          className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 md:px-5 md:pb-5"
        >
          <div className="mx-auto max-w-screen-xl overflow-hidden rounded-card border border-border-soft bg-white shadow-[0_-8px_40px_rgba(15,23,42,0.18)]">
            <div className="h-1 bg-primary-blue" />
            <div className="p-4 md:p-6 lg:flex lg:items-center lg:gap-10">
              <div className="flex gap-4 flex-1">
                <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-blue-light text-primary-blue">
                  <ShieldIcon className="h-6 w-6" />
                </div>
                <div>
                  <h2 id="cookie-banner-title" className="text-base font-bold text-text-main">
                    {text.bannerTitle}
                  </h2>
                  <p className="mt-1.5 text-[12.5px] md:text-[13px] leading-6 text-text-muted">
                    {text.bannerText}
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">{links}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:mt-0 lg:w-72 lg:grid-cols-1 shrink-0">
                <button type="button" className={BUTTON} onClick={acceptAll}>
                  {text.acceptAll}
                </button>
                <button type="button" className={BUTTON} onClick={necessaryOnly}>
                  {text.necessaryOnly}
                </button>
                <button type="button" className={BUTTON} onClick={openPanel}>
                  {text.manage}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {decided && !panelOpen && (
        <button
          type="button"
          onClick={openPanel}
          aria-label={text.reopen}
          title={text.reopen}
          className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-white text-primary-blue shadow-card-hover transition-colors duration-200 hover:bg-primary-blue hover:text-white"
        >
          <CookieIcon className="h-6 w-6" />
        </button>
      )}

      {panelOpen && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-panel-title"
            className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-card sm:rounded-card bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border-soft px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-blue-light text-primary-blue">
                <ShieldIcon className="h-5 w-5" />
              </div>
              <h2 id="cookie-panel-title" className="flex-1 text-lg font-bold text-text-main">
                {text.panelTitle}
              </h2>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label={text.close}
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-subtle hover:bg-surface-accent hover:text-text-main"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              <p className="text-[13px] leading-6 text-text-muted">{text.panelIntro}</p>
              {categories.map((category) => (
                <CategoryRow
                  key={category.key}
                  category={category}
                  checked={category.alwaysOn ? true : choice[category.key]}
                  onChange={(value) => setChoice({ ...choice, [category.key]: value })}
                  text={text}
                />
              ))}
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-xs">{links}</p>
            </div>

            <div className="grid gap-2 border-t border-border-soft bg-surface-muted px-5 py-4 sm:grid-cols-3">
              <button type="button" className={BUTTON} onClick={necessaryOnly}>
                {text.necessaryOnly}
              </button>
              <button type="button" className={BUTTON} onClick={() => decide(choice)}>
                {text.save}
              </button>
              <button type="button" className={BUTTON} onClick={acceptAll}>
                {text.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CookieConsent;
