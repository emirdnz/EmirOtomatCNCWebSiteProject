import HomeCarousel from "@/components/HomeCarousel";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import OurWorksSection from "@/components/OurWorksSection";
import Goals from "@/components/Goals";
import VisionMission from "@/components/VisionMission";
import IndustriesSection from "@/components/IndustriesSection";

function HomepageContainer() {
  return (
    <div>
      {/* Carousel Section */}
      <HomeCarousel />
      {/* Industries Section */}
      <IndustriesSection />
      {/* About Section */}
      <AboutSection />
      {/* Experience Section */}
      <ExperienceSection />
      {/* Goals Section */}
      <Goals />
      {/* Vision & Mission Section */}
      <VisionMission />
      {/* OurWorks Section */}
      <OurWorksSection />
    </div>
  );
}

export default HomepageContainer;

