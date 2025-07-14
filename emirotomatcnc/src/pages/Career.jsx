import cover from "../assets/2006.jpg";
import { motion } from "framer-motion";
import image from "../assets/career.jpg";
import "./Career.css";
import TitleComponent from "../components/TitleComponent";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { useEffect, useState } from "react";

function Career() {
  const { t, i18n } = useTranslation();
  const location = window.location.pathname;
  const { isDarkMode } = useTheme();
  const [formUrl, setFormUrl] = useState("");
  
  // İş başvuru ve staj başvuru formlarının ID'leri - Türkçe
  const jobFormIdTR = process.env.REACT_APP_JOB_FORM_ID_TR || "240595114447053";
  const internshipFormIdTR = process.env.REACT_APP_INTERNSHIP_FORM_ID_TR || "240595114447053"; // Şu an aynı form kullanılıyor, farklı ise değiştirin
  
  // İş başvuru ve staj başvuru formlarının ID'leri - İngilizce
  // NOT: Şu anda İngilizce formlar oluşturulmadığından Türkçe formların ID'leri kullanılıyor
  // İngilizce formlar oluşturulduktan sonra bu ID'leri güncellemeniz gerekecek
  const jobFormIdEN = process.env.REACT_APP_JOB_FORM_ID_EN || jobFormIdTR; 
  const internshipFormIdEN = process.env.REACT_APP_INTERNSHIP_FORM_ID_EN || internshipFormIdTR;
  
  useEffect(() => {
    // Hangi dil seçili?
    const isEnglish = i18n.language === "en";
    
    // Hangi sayfa görüntüleniyor?
    const isJobApplication = location === "/kariyer" || location === "/career";
    
    // Uygun form ID'sini seç
    let formId;
    if (isEnglish) {
      formId = isJobApplication ? jobFormIdEN : internshipFormIdEN;
    } else {
      formId = isJobApplication ? jobFormIdTR : internshipFormIdTR;
    }
    
    // Form URL'ini güncelle (dil parametresi eklendi)
    // Jotform'un dil desteği için URL'e language parametresi eklendi
    const langParam = isEnglish ? "&language=en" : "";
    setFormUrl(`https://form.jotform.com/${formId}${langParam}`);
  }, [location, i18n.language, jobFormIdEN, jobFormIdTR, internshipFormIdEN, internshipFormIdTR]);

  // Dil değiştiğinde iframe'i yeniden yükle
  useEffect(() => {
    // JotForm iframe'ini seçin
    const iframe = document.getElementById("jotform-iframe");
    
    // iframe varsa ve formUrl doluysa
    if (iframe && formUrl) {
      // iframe'in src'sini yeni URL ile güncelle
      iframe.src = formUrl;
    }
  }, [i18n.language, formUrl]);

  return (
    <div className="mt-10 bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-dark-text">
      {/* title */}
      <TitleComponent
        title={location === "/kariyer" ? t("career.title") : t("career.internshipTitle")}
        cover={cover}
      />
      {/* title */}
      <div className="flex justify-center ">
        <div className=" max-w-screen-lg flex justify-center items-center">
          <div className="max-w-[480px] hidden md:block">
            <img src={image} alt="" />
          </div>
          <div className="m-10 md:my-10 text-gray-700 dark:text-gray-300">
            {t("career.description")}
            <h3 className="text-sm font-bold my-4 w-full">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeInOut", duration: 1 }}
                className="w-full"
              >
                <span className="text-black dark:text-dark-text">
                  {t("career.qualitiesTitle")}
                </span>
              </motion.div>
            </h3>
            {t("career.qualitiesDescription")}
            <br />
            <br />
            {t("career.applyDescription")}
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold mb-8 text-primary-blue w-full mt-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 1 }}
            className="w-full text-center"
          >
            <span className="text-black dark:text-white">
              {location === "/kariyer"
                ? t("career.jobFormTitle")
                : t("career.internshipFormTitle")}
            </span>
          </motion.div>
        </h1>
      </div>
      <div className="jotform-form">
        {i18n.language === "en" && (jobFormIdEN === jobFormIdTR) && (
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-md mb-4 mx-4 max-w-3xl md:mx-auto">
            <p className="text-yellow-800 dark:text-yellow-200">
              {t("career.englishFormNotice")}
            </p>
          </div>
        )}
        <iframe
          id="jotform-iframe"
          title={t("career.jobFormTitle")}
          onLoad="window.parent.scrollTo(0,0)"
          // eslint-disable-next-line react/no-unknown-property
          allowTransparency="true"
          allowFullScreen="true"
          src={formUrl}
          style={{
            width: "1px",
            minWidth: "100%",
            height: "100%",
            border: "none",
            backgroundColor: isDarkMode ? "#2A2A2A" : "#FFFFFF",
          }}
          className={`overflow-hidden w-full min-h-[1500px] md:min-h-[1300px] ${isDarkMode ? 'jotform-dark' : ''}`}
        ></iframe>
      </div>
    </div>
  );
}

export default Career;
