import { Link } from "react-router-dom";
import LegalPage, { Callout, LegalList, LegalTable } from "@/components/common/LegalPage";
import { COOKIE_CATEGORIES } from "@/components/common/cookieCategories";
import { openCookiePreferences } from "@/components/common/cookieConsentStore";

// Yapı: KVKK Çerez Uygulamaları Hakkında Rehber (Temmuz 2025) EK-4 örneği
// Tarayıcı bağlantıları: Chrome, Safari, Edge, Opera Eylül 2026'da açılarak kontrol edildi; Firefox bağlantısı rehberdeki bağlantıdır.

const linkClass = "font-semibold text-primary-blue hover:text-primary-blue-dark underline-offset-2 hover:underline";

const BROWSERS = [
  { name: "Google Chrome", href: "https://support.google.com/chrome/answer/95647?hl=tr" },
  { name: "Mozilla Firefox", href: "https://support.mozilla.org/tr/kb/masaustu-firefox-surumunde-gelismis-izlenme-koruma" },
  { name: "Safari", href: "https://support.apple.com/tr-tr/guide/safari/sfri11471/mac" },
  { name: "Microsoft Edge", href: "https://support.microsoft.com/tr-tr/microsoft-edge/microsoft-edge-de-tanımlama-bilgilerini-silme-63947406-40ac-c3b8-57b9-2a946a29ae09" },
  { name: "Opera", href: "https://help.opera.com/en/latest/web-preferences/" },
];

const categorySections = COOKIE_CATEGORIES.tr.map((category) => ({
  id: `cerez-${category.key}`,
  heading: category.title,
  content: (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-primary-blue-light px-2.5 py-0.5 text-[12px] font-semibold text-primary-blue-dark">
          Hukuki sebep: {category.legalBasis}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${
            category.alwaysOn ? "bg-gray-100 text-text-main" : "bg-amber-50 text-amber-800"
          }`}
        >
          {category.alwaysOn ? "Her zaman etkin" : "Varsayılan olarak kapalı · izninizle çalışır"}
        </span>
      </div>
      <p>{category.description}</p>
      <LegalTable
        columns={["Çerez", "Sağlayıcı", "Amaç", "Saklama süresi"]}
        widths={["22%", "26%", "34%", "18%"]}
        rows={category.cookies.map((cookie) => [
          <code key="n" className="font-mono text-[13px]">
            {cookie.name}
          </code>,
          cookie.provider,
          cookie.purpose,
          cookie.duration,
        ])}
      />
    </>
  ),
}));

const sections = [
  {
    id: "cerez-nedir",
    heading: "Çerez Nedir?",
    content: (
      <>
        <p>
          Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır.
          Aynı amaçla tarayıcının yerel depolama alanı da kullanılabilir; bu politikada her ikisi birlikte &quot;çerez&quot; olarak anılır.
        </p>
        <LegalTable
          columns={["Tür", "Açıklama"]}
          widths={["28%", "72%"]}
          rows={[
            ["Oturum çerezi", "Tarayıcınızı kapattığınızda silinir."],
            ["Kalıcı çerez", "Belirtilen süre boyunca veya siz silene kadar cihazınızda kalır."],
            ["Birinci taraf çerez", "Doğrudan emirotomatcnc.com tarafından yerleştirilir."],
            ["Üçüncü taraf çerez", "Sitede kullanılan hizmetlerin sağlayıcıları (ör. Google) tarafından yerleştirilir."],
          ]}
        />
      </>
    ),
  },
  {
    id: "nasil-kullaniyoruz",
    heading: "Çerezleri Nasıl Kullanıyoruz?",
    content: (
      <>
        <p>
          Sitemizde yalnızca zorunlu çerezler kendiliğinden çalışır. İşlevsel, analitik ve reklam çerezleri{" "}
          <strong className="text-text-main">varsayılan olarak kapalıdır</strong> ve ancak çerez panelinden izin vermeniz hâlinde
          çalışır. İzin vermediğiniz sürece Google Analytics ve Google Ads etiketleri yüklenmez, İletişim sayfasındaki harita da siz
          istemedikçe gösterilmez.
        </p>
        <Callout>
          İzin vermemeniz sitenin kullanımını engellemez. Teklif formu, iletişim bağlantıları ve tüm sayfalar çerezlere izin vermeden de
          çalışır.
        </Callout>
        <p>
          Kişisel verilerinizin işlenmesine ilişkin ayrıntılı bilgi (veri sorumlusu, amaçlar, aktarım ve haklarınız) için{" "}
          <Link to="/kvkk" className={linkClass}>
            KVKK Aydınlatma Metni
          </Link>
          &apos;ni inceleyebilirsiniz.
        </p>
      </>
    ),
  },
  ...categorySections,
  {
    id: "yurt-disi",
    heading: "Yurt Dışına Aktarım",
    content: (
      <p>
        İşlevsel, analitik ve reklam çerezleri aracılığıyla elde edilen veriler Google tarafından işlenir ve Google&apos;ın yurt dışındaki
        sunucularına aktarılabilir. Bu aktarım, KVKK md. 9 ve Kişisel Verilerin Yurt Dışına Aktarılmasına İlişkin Usul ve Esaslar
        Hakkında Yönetmelik çerçevesinde gerçekleştirilir. Google&apos;ın verileri nasıl işlediğini{" "}
        <a href="https://policies.google.com/privacy?hl=tr" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Google Gizlilik Politikası
        </a>
        &apos;ndan okuyabilirsiniz.
      </p>
    ),
  },
  {
    id: "tercihler",
    heading: "Çerez Tercihlerinizi Nasıl Yönetebilirsiniz?",
    content: (
      <>
        <p>
          Tercihlerinizi dilediğiniz an değiştirebilir, verdiğiniz izni geri alabilirsiniz. Sayfanın sol alt köşesindeki çerez simgesine
          veya aşağıdaki düğmeye tıklayarak Çerez Tercih Merkezi&apos;ni açın; kategorileri açıp kapatarak &quot;Seçimlerimi Kaydet&quot;
          düğmesine basın. İzni geri aldığınızda ilgili Google çerezleri silinir ve sayfa yenilenir.
        </p>
        <div>
          <button
            type="button"
            onClick={openCookiePreferences}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-btn bg-primary-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-blue-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-blue"
          >
            Çerez Tercihlerini Yönet
          </button>
        </div>
        <p>
          Çerezleri tarayıcı ayarlarınızdan da silebilir veya engelleyebilirsiniz. Sık kullanılan tarayıcılar için bilgiye aşağıdaki
          bağlantılardan ulaşabilirsiniz:
        </p>
        <LegalList
          items={BROWSERS.map((browser) => (
            <a key={browser.name} href={browser.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {browser.name}
            </a>
          ))}
        />
        <p>
          Google Analytics ölçümünü tüm sitelerde kapatmak için Google&apos;ın{" "}
          <a href="https://tools.google.com/dlpage/gaoptout?hl=tr" target="_blank" rel="noopener noreferrer" className={linkClass}>
            Google Analytics Devre Dışı Bırakma Eklentisi
          </a>
          &apos;ni de kullanabilirsiniz.
        </p>
      </>
    ),
  },
  {
    id: "basvuru",
    heading: "Haklarınız ve Başvuru",
    content: (
      <p>
        KVKK md. 11 kapsamındaki haklarınızı ve başvuru yöntemlerini{" "}
        <Link to="/kvkk" className={linkClass}>
          KVKK Aydınlatma Metni
        </Link>
        &apos;nin &quot;Başvuru Yöntemi&quot; bölümünde bulabilirsiniz. Sorularınız için{" "}
        <a href="mailto:info@emirotomatcnc.com" className={linkClass}>
          info@emirotomatcnc.com
        </a>{" "}
        adresine yazabilirsiniz.
      </p>
    ),
  },
];

function CookiePolicy() {
  return (
    <LegalPage
      title="Çerez Politikası"
      intro="Emir Otomat CNC Makina Sanayi ve Ticaret Limited Şirketi olarak emirotomatcnc.com'da hangi çerezleri, hangi amaçla ve ne kadar süreyle kullandığımızı; tercihlerinizi nasıl yönetebileceğinizi bu politikada açıklıyoruz."
      updated="Son güncelleme: 14 Eylül 2026"
      badges={["KVKK Çerez Rehberi", "Açık rıza ile çalışır"]}
      sections={sections}
      current="/cerez-politikasi"
    />
  );
}

export default CookiePolicy;
