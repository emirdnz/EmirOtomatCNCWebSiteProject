import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LegalPage, { Callout, InfoGrid, LegalList, LegalTable } from "@/components/common/LegalPage";
import { openCookiePreferences } from "@/components/common/cookieConsentStore";

// Dayanak: 6698 sayılı KVKK md. 5, 9, 10, 11, 13, 14 · Aydınlatma Tebliği (RG 10.03.2018/30356)
// · Başvuru Usul ve Esasları Tebliği (RG 10.03.2018/30356) · Yurt Dışı Aktarım Yönetmeliği (RG 10.07.2024/32598)

const COMPANY = "Emir Otomat CNC Makina Sanayi ve Ticaret Limited Şirketi";
const ADDRESS = "İkitelli OSB Mahallesi, İkitelli Demirciler Sanayi Sitesi, B6 Blok Sokak No: 134, Başakşehir/İstanbul";
const EMAIL = "info@emirotomatcnc.com";

const linkClass = "font-semibold text-primary-blue hover:text-primary-blue-dark underline-offset-2 hover:underline";

// Hukuki sebep: madde numarası rozet, açıklaması altında
const Basis = ({ items }) => (
  <span className="flex flex-col gap-2">
    {items.map(([article, label]) => (
      <span key={article} className="block">
        <span className="inline-block whitespace-nowrap rounded-md bg-primary-blue-light px-2 py-0.5 text-[12px] font-bold text-primary-blue-dark">
          {article}
        </span>
        <span className="mt-0.5 block text-[12px] leading-5 text-text-muted">{label}</span>
      </span>
    ))}
  </span>
);

Basis.propTypes = { items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired };

const CONTRACT = ["md. 5/2-c", "Sözleşmenin kurulması veya ifası"];
const LEGAL_OBLIGATION = ["md. 5/2-ç", "Hukuki yükümlülük"];
const LEGITIMATE_INTEREST = ["md. 5/2-f", "Meşru menfaat"];
const CONSENT = ["md. 5/1", "Açık rıza"];

const ACTIVITIES = [
  {
    activity: "Online teklif formu",
    method: "Web sitesi formu · otomatik",
    data: "Kimlik (ad soyad), mesleki bilgi (unvan, firma adı), iletişim (telefon, e-posta, adres), talep bilgileri (yüklediğiniz teknik resim ve dosyalar, adet, malzeme, teslim tarihi, not)",
    purpose: "Talep ettiğiniz parça için fiyat teklifi hazırlamak, sizinle iletişime geçmek ve talebinizin alındığını e-posta ile bildirmek",
    basis: [CONTRACT],
  },
  {
    activity: "Telefon, WhatsApp ve e-posta ile iletişim",
    method: "Telefon, WhatsApp, e-posta · kısmen otomatik",
    data: "Kimlik, iletişim bilgileri, görüşme ve yazışma içeriği",
    purpose: "Soru ve taleplerinizi yanıtlamak, teklif ve sipariş süreçlerini yürütmek",
    basis: [CONTRACT, LEGITIMATE_INTEREST],
  },
  {
    activity: "Sipariş, teslimat ve faturalama",
    method: "E-posta, telefon, basılı belge · otomatik ve otomatik olmayan",
    data: "Kimlik, iletişim, firma ve fatura bilgileri, sipariş ve teslimat bilgileri",
    purpose: "Siparişi yerine getirmek, faturalamak, ticari defter ve belge yükümlülüklerimizi yerine getirmek",
    basis: [CONTRACT, LEGAL_OBLIGATION],
  },
  {
    activity: "İş ve staj başvurusu",
    method: "Jotform altyapılı web formu · otomatik",
    data: "Kimlik, iletişim, eğitim ve iş deneyimi bilgileri ile formda paylaştığınız diğer bilgi ve belgeler",
    purpose: "Başvurunuzu değerlendirmek ve sizinle iletişime geçmek",
    basis: [CONTRACT],
  },
  {
    activity: "Web sitesinin sunulması ve güvenliği",
    method: "Sunucu kayıtları · otomatik",
    data: "IP adresi, tarayıcı ve cihaz bilgisi, erişim tarihi ve saati, görüntülenen sayfa",
    purpose: "Siteyi size ulaştırmak, güvenliğini sağlamak ve teknik hataları tespit etmek",
    basis: [LEGITIMATE_INTEREST],
  },
  {
    activity: "Zorunlu çerezler",
    method: "Tarayıcı yerel depolaması · otomatik",
    data: "Dil tercihi, çerez tercihleriniz",
    purpose: "Sitenin çalışması ve tercihlerinizin hatırlanması",
    basis: [LEGITIMATE_INTEREST],
  },
  {
    activity: "Google Haritalar (İletişim sayfası)",
    method: "Çerez ve benzeri teknolojiler · otomatik",
    data: "IP adresi, tarayıcı ve cihaz bilgisi, Google çerez tanımlayıcıları",
    purpose: "Adresimizin harita üzerinde gösterilmesi",
    basis: [CONSENT],
  },
  {
    activity: "Site istatistikleri (Google Analytics)",
    method: "Çerez ve benzeri teknolojiler · otomatik",
    data: "Çerez tanımlayıcıları, IP adresi, tarayıcı ve cihaz bilgisi, görüntülenen sayfalar, telefon · WhatsApp · e-posta bağlantılarına tıklama ve teklif formunun gönderildiği bilgisi (formun içeriği gönderilmez)",
    purpose: "Sitenin nasıl kullanıldığını ölçmek ve siteyi geliştirmek",
    basis: [CONSENT],
  },
  {
    activity: "Reklam ölçümü (Google Ads)",
    method: "Çerez ve benzeri teknolojiler · otomatik",
    data: "Çerez tanımlayıcıları, reklam tıklama bilgisi, reklamdan sonra sitede gerçekleşen işlemler",
    purpose: "Reklamlarımızın siteye getirdiği ziyaretleri ve sonuçlarını ölçmek",
    basis: [CONSENT],
  },
];

const ACTIVITY_ROWS = ACTIVITIES.map((row) => [
  <span key="a" className="block">
    {row.activity}
    <span className="mt-1 block text-[12px] font-normal leading-5 text-text-subtle">Toplama: {row.method}</span>
  </span>,
  row.data,
  row.purpose,
  <Basis key="b" items={row.basis} />,
]);

const TRANSFER_ROWS = [
  [
    "Barındırma, sunucu ve e-posta hizmeti sağlayıcıları",
    "Form bilgileri ve yüklenen dosyalar, e-posta yazışmaları, sunucu kayıtları",
    "Web sitesinin yayınlanması, form bilgilerinin e-posta ile tarafımıza ulaştırılması ve saklanması",
  ],
  [
    "Jotform (başvuru formu altyapısı)",
    "İş ve staj başvuru formunda paylaştığınız bilgi ve belgeler",
    "Başvuru formunun sunulması ve başvurunuzun tarafımıza iletilmesi",
  ],
  [
    "Google (Analytics, Ads, Haritalar)",
    "Yalnızca izin verdiğiniz çerez kategorilerindeki çevrimiçi tanımlayıcılar ve kullanım bilgileri",
    "Site istatistikleri, reklam ölçümü ve haritanın gösterilmesi",
  ],
  [
    "WhatsApp (Meta)",
    "WhatsApp ile bize yazmanız hâlinde telefon numaranız ve mesaj içeriği",
    "Mesajlaşma hizmetinin sağlanması",
  ],
  [
    "Yetkili kamu kurum ve kuruluşları",
    "Talep edilen ve mevzuatın gerektirdiği bilgiler",
    "Hukuki yükümlülüklerin yerine getirilmesi ve yetkili makamların taleplerinin karşılanması",
  ],
];

const RIGHTS = [
  "Kişisel verilerinizin işlenip işlenmediğini öğrenme,",
  "Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,",
  "Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,",
  "Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,",
  "Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,",
  "KVKK md. 7'de öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme,",
  "Düzeltme, silme veya yok etme işlemlerinin, kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,",
  "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,",
  "Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
];

const sections = [
  {
    id: "veri-sorumlusu",
    heading: "Veri Sorumlusu",
    content: (
      <>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında kişisel verileriniz, veri sorumlusu sıfatıyla{" "}
          <strong className="text-text-main">{COMPANY}</strong> (&quot;Şirket&quot;) tarafından işlenmektedir.
        </p>
        <InfoGrid
          items={[
            { label: "Unvan", value: COMPANY, wide: true },
            { label: "Adres", value: ADDRESS, wide: true },
            { label: "Telefon", value: "+90 (212) 671 17 40", href: "tel:+902126711740" },
            { label: "E-posta", value: EMAIL, href: `mailto:${EMAIL}` },
          ]}
        />
      </>
    ),
  },
  {
    id: "islenen-veriler",
    heading: "İşlenen Veriler, Amaçlar ve Hukuki Sebepler",
    content: (
      <>
        <p>
          Kişisel verilerinizi, aşağıda her faaliyet için ayrı ayrı belirtilen amaçlarla, KVKK md. 5&apos;te sayılan hukuki sebeplere
          dayanarak ve yalnızca bu amaçlar için gerekli olduğu ölçüde işliyoruz.
        </p>
        <LegalTable columns={["Faaliyet ve toplama yöntemi", "İşlenen veriler", "Amaç", "Hukuki sebep"]} rows={ACTIVITY_ROWS} widths={["24%", "28%", "27%", "21%"]} />
        <Callout>
          Açık rızaya dayanan işlemler (Google Haritalar, Google Analytics, Google Ads) için rızanız bu metinle değil,{" "}
          <button type="button" onClick={openCookiePreferences} className={linkClass}>
            çerez tercih paneli
          </button>{" "}
          üzerinden ayrıca alınır. Rıza vermemeniz sitenin kullanımını engellemez; verdiğiniz rızayı dilediğiniz an geri alabilirsiniz.
        </Callout>
        <p>
          Teklif ve başvuru formlarında ırk, etnik köken, sağlık, din, dernek veya sendika üyeliği gibi{" "}
          <strong className="text-text-main">özel nitelikli kişisel verilerinizi paylaşmamanızı</strong> rica ederiz; bu veriler
          taleplerinizin değerlendirilmesi için gerekli değildir.
        </p>
      </>
    ),
  },
  {
    id: "aktarim",
    heading: "Kişisel Verilerin Aktarılması",
    content: (
      <>
        <p>
          Kişisel verileriniz, KVKK md. 8 ve 9&apos;da öngörülen şartlar çerçevesinde ve yukarıdaki amaçlarla sınırlı olarak aşağıdaki
          alıcı gruplarına aktarılabilir.
        </p>
        <LegalTable columns={["Alıcı grubu", "Aktarılan veriler", "Aktarım amacı"]} rows={TRANSFER_ROWS} widths={["26%", "37%", "37%"]} />
        <h3 className="pt-2 text-base font-bold text-text-main">Yurt dışına aktarım</h3>
        <p>
          Hizmet aldığımız sağlayıcıların bir kısmının (ör. Google, Jotform, barındırma ve e-posta hizmeti sağlayıcıları) sunucuları
          yurt dışında bulunabilir. Yurt dışına aktarım; KVKK md. 9 ve Kişisel Verilerin Yurt Dışına Aktarılmasına İlişkin Usul ve
          Esaslar Hakkında Yönetmelik uyarınca yeterlilik kararı, uygun güvenceler (ör. standart sözleşme) veya kanunda sayılan
          istisnai hâller çerçevesinde gerçekleştirilir.
        </p>
      </>
    ),
  },
  {
    id: "saklama",
    heading: "Saklama Süresi",
    content: (
      <>
        <p>
          Kişisel verilerinizi, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen süreler boyunca saklarız. Bu sürelerin
          sonunda verileriniz, Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi Hakkında Yönetmelik uyarınca
          silinir, yok edilir veya anonim hâle getirilir.
        </p>
        <LegalList
          items={[
            "Siparişe dönüşen işlemlere ait ticari defter ve belgeler, Türk Ticaret Kanunu md. 82 uyarınca 10 yıl saklanır.",
            <>
              Çerezlerin saklama süreleri{" "}
              <Link to="/cerez-politikasi" className={linkClass}>
                Çerez Politikası
              </Link>
              &apos;nda tek tek belirtilmiştir.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "haklariniz",
    heading: "KVKK Madde 11 Kapsamındaki Haklarınız",
    content: (
      <>
        <p>KVKK md. 11 uyarınca Şirketimize başvurarak;</p>
        <LegalList items={RIGHTS} />
      </>
    ),
  },
  {
    id: "basvuru",
    heading: "Başvuru Yöntemi",
    content: (
      <>
        <p>
          Haklarınıza ilişkin taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ md. 5 uyarınca Türkçe olarak
          aşağıdaki yollardan biriyle iletebilirsiniz:
        </p>
        <InfoGrid
          items={[
            {
              label: "Yazılı başvuru",
              value: `Islak imzalı dilekçe ile şahsen veya posta yoluyla: ${ADDRESS}`,
              wide: true,
            },
            {
              label: "Güvenli elektronik imza veya mobil imza",
              value: `İmzalı başvurunuzu ${EMAIL} adresine gönderebilirsiniz.`,
            },
            {
              label: "Kayıtlı e-posta adresiniz",
              value: `Daha önce bize bildirdiğiniz ve sistemimizde kayıtlı e-posta adresinizden ${EMAIL} adresine.`,
            },
          ]}
        />
        <p className="font-semibold text-text-main">Başvurunuzda bulunması zorunlu bilgiler:</p>
        <LegalList
          items={[
            "Ad, soyad ve başvuru yazılı ise imza,",
            "T.C. vatandaşları için T.C. kimlik numarası; yabancılar için uyruk, pasaport numarası veya varsa kimlik numarası,",
            "Tebligata esas yerleşim yeri veya iş yeri adresi,",
            "Varsa bildirime esas e-posta adresi, telefon ve faks numarası,",
            "Talep konusu.",
          ]}
        />
        <p>Talebinize ilişkin bilgi ve belgeleri başvurunuza eklemeniz gerekir.</p>
        <Callout>
          Başvurunuz, talebin niteliğine göre en kısa sürede ve en geç <strong>30 gün</strong> içinde ücretsiz olarak sonuçlandırılır.
          Yazılı cevap 10 sayfayı aşarsa her ek sayfa için 1 TL, cevap CD veya flash bellek gibi bir kayıt ortamında verilirse kayıt
          ortamının maliyeti kadar ücret alınabilir.
        </Callout>
        <p>
          Başvurunuzun reddedilmesi, cevabın yetersiz bulunması veya süresinde cevap verilmemesi hâllerinde; cevabı öğrendiğiniz
          tarihten itibaren 30 gün ve her hâlde başvuru tarihinden itibaren 60 gün içinde Kişisel Verileri Koruma Kurulu&apos;na şikâyette
          bulunabilirsiniz (KVKK md. 14).
        </p>
      </>
    ),
  },
  {
    id: "degisiklikler",
    heading: "Metindeki Değişiklikler",
    content: (
      <p>
        Bu metin, mevzuattaki veya veri işleme faaliyetlerimizdeki değişikliklere göre güncellenebilir. Güncel metin her zaman bu
        sayfada yayımlanır.
      </p>
    ),
  },
];

function Kvkk() {
  return (
    <LegalPage
      title="KVKK Aydınlatma Metni"
      intro={`${COMPANY} olarak, 6698 sayılı KVKK md. 10 ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca; web sitemiz, teklif ve başvuru formlarımız ile iletişim kanallarımız üzerinden işlenen kişisel verileriniz hakkında sizi bilgilendiriyoruz.`}
      updated="Son güncelleme: 14 Eylül 2026"
      badges={["6698 sayılı KVKK md. 10", "Aydınlatma Tebliği"]}
      sections={sections}
      current="/kvkk"
    />
  );
}

export default Kvkk;
