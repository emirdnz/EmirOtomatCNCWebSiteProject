import { useState } from "react";
import TitleComponent from "@/components/common/TitleComponent";
import WorkCard from "@/components/WorkCard";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

function OurWorksContainer({ data, cover }) {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    "all",
    "automotive", "medical", "lighting", "hvac", "electronics", 
    "industrial_automation", "energy", "home_appliances", "micromobility", 
    "agriculture", "maritime", "food_packaging", "railway", 
    "petrochemical", "textile", "audio_stage", "smart_furniture", "modular_shelving"
  ];

  const filteredData = activeCategory === "all" 
    ? data 
    : data.filter(item => item.category === activeCategory);

  return (
    <>
      <TitleComponent title={t("ourWorksContainer.title")} cover={cover} />
      
      {/* Category Filter */}
      <div className="container mx-auto px-4 mt-12 mb-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-primary-blue text-white shadow-md scale-105" 
                  : "bg-surface-muted text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat === "all" 
                ? (i18n.language === "tr" ? "Tümü" : "All") 
                : t(`industries.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      <section className="w-full max-w-screen-xl mx-auto px-4 mb-16 transition-colors duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredData.length > 0 ? (
              <WorkCard data={filteredData} />
            ) : (
              <div className="w-full text-center py-20 text-gray-500">
                {i18n.language === "tr" ? "Bu kategoride henüz parça bulunmamaktadır." : "No items in this category yet."}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}

OurWorksContainer.propTypes = {
  data: PropTypes.array.isRequired,
  cover: PropTypes.string.isRequired,
};

export default OurWorksContainer;
