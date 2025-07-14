import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./OnlineProcess.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function OnlineProcess() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);
  
  // Bakım mesajı üzerindeki vurgulamayı yönetme
  const handleMaintenanceHover = (isHovered) => {
    setShowMaintenance(isHovered);
    
    // Bakım kutusu animasyonu
    const maintenanceBox = document.getElementById('maintenance-box');
    const emailBox = document.querySelector('#maintenance-box > div:last-child');
    
    if (maintenanceBox) {
      if (isHovered) {
        maintenanceBox.classList.add('highlight-box');
        maintenanceBox.style.transform = 'translateY(-3px)';
        if (emailBox) {
          emailBox.style.transform = 'translateY(-2px)';
          emailBox.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.3)';
        }
      } else {
        maintenanceBox.classList.remove('highlight-box');
        maintenanceBox.style.transform = 'translateY(0)';
        if (emailBox) {
          emailBox.style.transform = 'translateY(0)';
          emailBox.style.boxShadow = 'none';
        }
      }
    }
  };

  const steps = [
    {
      icon: "fas fa-upload",
      title: t("onlineProcess.step1.title"),
      desc: t("onlineProcess.step1.desc"),
    },
    {
      icon: "fas fa-tasks",
      title: t("onlineProcess.step2.title"),
      desc: t("onlineProcess.step2.desc"),
    },
    {
      icon: "fas fa-check-circle",
      title: t("onlineProcess.step3.title"),
      desc: t("onlineProcess.step3.desc"),
    },
    {
      icon: "fas fa-box",
      title: t("onlineProcess.step4.title"),
      desc: t("onlineProcess.step4.desc"),
    },
  ];

  const handleOrderClick = () => {
    // navigate("/upload-model"); // Bakım modu - geçici olarak devre dışı
  };

  return (
    <section className="online-process">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary-blue dark:text-gray-200 mb-4">
          {t("onlineProcess.title")}
        </h2>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto">
          {t("onlineProcess.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="step bg-white dark:bg-[#333333] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="icon-wrapper mb-4 dark:bg-[#444444]">
                <i className={`${step.icon} text-4xl text-primary-blue dark:text-primary-blue`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-gray-200">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="order-button text-center mt-12">
          <div 
            className="relative inline-block"
            onMouseEnter={() => handleMaintenanceHover(true)}
            onMouseLeave={() => handleMaintenanceHover(false)}
          >
            <button 
              onClick={handleOrderClick}
              disabled={true}
              className="inline-flex items-center px-8 py-4 bg-blue-500/50 text-white font-semibold text-lg rounded-lg cursor-help opacity-85 shadow-lg dark:bg-blue-700/60 dark:text-gray-100 border border-blue-300/50 dark:border-blue-500/30 transition-all duration-300"
            >
              {t("onlineProcess.orderButton")}
              <i className="fas fa-tools ml-2 text-blue-300 dark:text-blue-300"></i>
            </button>
          
          </div>
          
          {/* 
            // This will be the active button after maintenance is complete:
            <button 
              onClick={handleOrderClick}
              className="inline-flex items-center px-8 py-4 bg-primary-blue text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 dark:bg-primary-blue dark:hover:bg-blue-600"
            >
              {t("onlineProcess.orderButton")}
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          */}
          
          {/* Bakım mesajı */}
          <div id="maintenance-box" className="maintenance-message mt-8 p-5 bg-blue-50/50 dark:bg-blue-900/20 border-2 border-blue-300/70 dark:border-blue-700/50 rounded-lg shadow-lg transition-all duration-500">
            <div className="flex items-center justify-center mb-3">
              <i className="fas fa-exclamation-triangle text-primary-blue dark:text-primary-blue mr-2 text-xl"></i>
              <span className="text-blue-800 dark:text-blue-200 font-medium text-lg">
                {t("onlineProcess.maintenanceMessage")}
              </span>
            </div>
            
            {/* Email alternatifi */}
            <div className="bg-blue-50/70 dark:bg-blue-900/30 border border-blue-300/70 dark:border-blue-700/50 rounded-md p-4 mt-3 transition-all duration-300">
              <div className="flex items-center justify-center">
                <i className="fas fa-envelope text-primary-blue dark:text-primary-blue mr-2 text-lg"></i>
                <span className="text-blue-800 dark:text-blue-200 font-medium text-md">
                  <Trans i18nKey="onlineProcess.alternativeContact" />
                </span>
              </div>
              <div className="text-center mt-2">
                <a 
                  href="mailto:siparis@emirotomatcnc.com" 
                  className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-800/30 rounded-md text-primary-blue dark:text-primary-blue hover:bg-blue-200 dark:hover:bg-blue-800/50 font-semibold text-sm transition-all duration-200"
                >
                  <i className="fas fa-paper-plane mr-1 text-primary-blue dark:text-primary-blue"></i>
                  <span className="text-primary-blue dark:text-primary-blue">siparis@emirotomatcnc.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{t("onlineProcess.modal.title")}</h3>
            <p>{t("onlineProcess.modal.desc")}</p>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              {t("onlineProcess.modal.closeButton")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default OnlineProcess;
