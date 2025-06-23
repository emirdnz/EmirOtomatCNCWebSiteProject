import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const OrderPopup = () => {
  const [visible, setVisible] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const { t } = useTranslation("orderPopup"); // namespace'i doğrudan burada belirtiyoruz

  if (!visible) return null;

  const steps = [
    {
      number: "1",
      title: t("steps.1.title"),
      emoji: "📐",
      description: t("steps.1.description"),
      tips: t("steps.1.tips", { returnObjects: true }),
    },
    {
      number: "2",
      title: t("steps.2.title"),
      emoji: "🔧",
      description: t("steps.2.description"),
      tips: t("steps.2.tips", { returnObjects: true }),
    },
    {
      number: "3",
      title: t("steps.3.title"),
      emoji: "✨",
      description: t("steps.3.description"),
      tips: t("steps.3.tips", { returnObjects: true }),
    },
  ];

  const renderDetails = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {steps.map((step, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: 16,
            background: "#f8fafc",
            padding: "20px",
            borderRadius: 16,
            transition: "transform 0.2s",
            cursor: "default",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <div
            style={{
              minWidth: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {step.emoji}
          </div>
          <div>
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: 18,
                color: "#1e293b",
                fontWeight: 600,
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: 14,
                color: "#4b5563",
              }}
            >
              {step.description}
            </p>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {step.tips.map((tip, tipIndex) => (
                <li
                  key={tipIndex}
                  style={{
                    fontSize: 13,
                    color: "#64748b",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ color: "#2563eb" }}>✓</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <a
        href="/upload-model"
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          color: "#fff",
          padding: "16px 32px",
          borderRadius: 12,
          textDecoration: "none",
          fontWeight: 500,
          fontSize: 16,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginTop: 8,
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
      >
        {t("buttons.order")}
      </a>
    </div>
  );

  const renderSummary = () => (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 24,
          color: "#4b5563",
          fontSize: 15,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#2563eb" }}>📐</span> {t("summarySteps.1")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#2563eb" }}>🔧</span> {t("summarySteps.2")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#2563eb" }}>✨</span> {t("summarySteps.3")}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={() => setShowDetails(true)}
          style={{
            background: "#f3f4f6",
            border: "none",
            color: "#1e3a8a",
            padding: "12px 20px",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 15,
            fontWeight: 500,
            flex: 1,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#e5e7eb";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#f3f4f6";
            e.target.style.transform = "translateY(0)";
          }}
        >
          {t("buttons.details")}
        </button>
        
        <a
          href="/upload-model"
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 10,
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 15,
            flex: 1,
            textAlign: "center",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.transform = "translateY(-1px)"}
          onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
        >
          {t("buttons.order")}
        </a>
      </div>
    </>
  );

  return (
    <div
      id="order-popup"
      style={{
        position: "fixed",
        bottom: 40,
        right: 40,
        zIndex: 9999,
        background: "#fff",
        borderRadius: 24,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        padding: showDetails ? "40px" : "32px",
        width: showDetails ? "480px" : "420px",
        maxWidth: "90vw",
        maxHeight: "90vh",
        overflow: "auto",
        fontFamily: "system-ui, -apple-system, sans-serif",
        border: "1px solid #eee",
        animation: "slideIn 0.5s ease-out",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ position: "absolute", top: "16px", right: "16px" }}>
        <button
          onClick={() => setVisible(false)}
          style={{
            background: "transparent",
            border: "none",
            color: "#ef4444",
            fontSize: 20,
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.color = "#dc2626";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.color = "#ef4444";
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginBottom: showDetails ? 32 : 24 }}>
        <h2
          style={{
            margin: "0 0 8px 0",
            fontSize: showDetails ? 26 : 24,
            color: "#1e3a8a",
            fontWeight: 600,
          }}
        >
          {t("title")}
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            color: "#4b5563",
            lineHeight: 1.5,
          }}
        >
          {showDetails ? t("detailsText") : t("introText")}
        </p>
      </div>

      {showDetails ? renderDetails() : renderSummary()}

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          #order-popup::-webkit-scrollbar {
            width: 8px;
          }

          #order-popup::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }

          #order-popup::-webkit-scrollbar-thumb {
            background: #c5c5c5;
            border-radius: 4px;
          }

          #order-popup::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
        `}
      </style>
    </div>
  );
};

export default OrderPopup;
