import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // React Router'dan useNavigate import edildi
import "./OnlineProcess.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function OnlineProcess() {
  const { t } = useTranslation();
  const navigate = useNavigate(); // useNavigate hook'u kullanılarak yönlendirme yapılacak

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
    navigate("/upload-model"); // UploadOrder sayfasına yönlendir
  };

  return (
    <section className="online-process">
      <h2>{t("onlineProcess.title")}</h2>
      <div className="process-steps">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div className="icon">
              <i className={step.icon}></i>
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="order-button">
        <button onClick={handleOrderClick} className="btn">
          {t("onlineProcess.orderButton")}
        </button>
      </div>
    </section>
  );
}

export default OnlineProcess;
