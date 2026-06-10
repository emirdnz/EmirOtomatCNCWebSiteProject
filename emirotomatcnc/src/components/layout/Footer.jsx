import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-footer-bg text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-10 lg:px-0">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 flex flex-col md:block">
            <div>
              <div className="w-64 md:w-80 text-gray-300 text-base font-medium m-2 mt-2 leading-relaxed">
                <Trans i18nKey="footer.address"></Trans>
              </div>
              <div className="w-64 md:w-80 text-gray-400 text-sm mx-2 mt-4 hover:underline">
                Tel:
                <a href="tel:02126711740">
                  <span className="text-white ml-2 hover:text-primary-blue transition-colors duration-200">{t("footer.tel")}</span>
                </a>
              </div>
              <div className="w-64 md:w-80 text-gray-400 text-sm mx-2 mt-2 hover:underline">
                WhatsApp:
                <a href="https://wa.me/905011066206" target="_blank" rel="noopener noreferrer">
                  <span className="text-white ml-2 hover:text-[#25D366] transition-colors duration-200">
                    +90 501 106 62 06 (Görkem Deniz)
                  </span>
                </a>
              </div>
              <div className="w-64 md:w-80 text-gray-400 text-sm m-2 mb-0 hover:underline">
                Mail:
                <a href="mailto:info@emirotomatcnc.com">
                  <span className="text-white ml-2 hover:text-primary-blue transition-colors duration-200">
                    {t("footer.email")}
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div></div>
          <div className="grid grid-cols-3 gap-8 md:gap-6 md:grid-cols-3">
            <div className="border-r border-white/15 pr-6">
              <h2 className="mb-6 text-sm font-semibold pb-1 border-b-2 border-primary-blue uppercase tracking-wide text-gray-300">
                {t("footer.corporate")}
              </h2>
              <ul className="font-medium space-y-3">
                <li>
                  <Link to="/hakkimizda" className="text-gray-400 hover:text-white text-xs transition-colors duration-200">
                    {t("footer.about")}
                  </Link>
                </li>
                <li>
                  <Link to="/iletisim" className="text-gray-400 hover:text-white text-xs transition-colors duration-200">
                    {t("footer.contact")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="border-r border-white/15 pr-6">
              <h2 className="mb-6 text-sm font-semibold pb-1 border-b-2 border-primary-blue uppercase tracking-wide text-gray-300">
                {t("footer.production")}
              </h2>
              <ul className="font-medium space-y-3">
                <li>
                  <Link to="/calismalarimiz/urunler" className="text-gray-400 hover:text-white text-xs transition-colors duration-200">
                    {t("footer.ourWorks")}
                  </Link>
                </li>
                <li>
                  <Link to="/sertifikalar" className="text-gray-400 hover:text-white text-xs transition-colors duration-200">
                    {t("footer.certificates")}
                  </Link>
                </li>
                <li>
                  <Link to="/calismalarimiz/makine-parkuru" className="text-gray-400 hover:text-white text-xs transition-colors duration-200">
                    {t("footer.machinePark")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold pb-1 border-b-2 border-primary-blue uppercase tracking-wide text-gray-300">
                {t("footer.career")}
              </h2>
              <ul className="font-medium space-y-3">
                <li>
                  <Link to="/kariyer" className="text-gray-400 hover:text-white text-xs transition-colors duration-200">
                    {t("footer.jobApplication")}
                  </Link>
                </li>
                <li>
                  <Link to="/staj" className="text-gray-400 hover:text-white text-xs transition-colors duration-200">
                    {t("footer.internshipApplication")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-white/10 sm:mx-auto lg:my-6" />
        <div className="sm:flex sm:items-center sm:justify-between px-2">
          <span className="text-xs text-gray-400 sm:text-center">
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://emirotomatcnc.com/" className="hover:underline hover:text-white transition-colors duration-200">
              EMİR OTOMAT CNC MAKİNA SANAYİ VE TİCARET LİMİTED ŞİRKETİ
            </a>
          </span>
          <div className="flex mt-4 items-center gap-3 sm:mt-0">
            <a
              href="https://www.linkedin.com/company/emirotomatcnc/"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-all duration-300"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
