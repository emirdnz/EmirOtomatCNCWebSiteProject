import HomeCarousel from "../components/HomeCarousel";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import OurWorksSection from "../components/OurWorksSection";
import IndustriesSection from "../components/IndustriesSection";
import Header from "../components/Header";
import OnlineProcess from "../components/OnlineProcess";
import OrderPopup from "../components/OrderPopup";

function HomepageContainer() {
  return (
    <div>
      {/* Carousel Section */}
      <HomeCarousel />
      {/* Industries Section */}
      <IndustriesSection />
      {/* About Section */}
      <AboutSection />
      {/* Production Process Section */}
      <OnlineProcess />
      {/* Experience Section */}
      <ExperienceSection />
      {/* OurWorks Section */}
      <OurWorksSection />
      {/* Order Popup
      <OrderPopup /> */}
    </div>
  );
}

export default HomepageContainer;
