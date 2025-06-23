import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./OnlineProcess.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function OnlineProcess() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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
    navigate("/upload-model");
  };

  return (
    <section className="online-process">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary-blue mb-4">
          {t("onlineProcess.title")}
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-4xl mx-auto">
          {t("onlineProcess.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="step bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="icon-wrapper mb-4">
                <i className={`${step.icon} text-4xl text-primary-blue`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="order-button text-center mt-12">
          <button 
            onClick={handleOrderClick}
            className="inline-flex items-center px-8 py-4 bg-primary-blue text-white font-semibold text-lg rounded-lg transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue shadow-lg hover:shadow-xl"
          >
            {t("onlineProcess.orderButton")}
            <i className="fas fa-bolt ml-2"></i>
          </button>
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
