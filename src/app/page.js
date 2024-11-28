import HeroSection from "@/components/HeroSection";
import TeacherSection from "@/components/TeacherSection";

export default function Home() {
  
  return (
    <div className="mx-auto w-[1300px]">
      <HeroSection />
      <TeacherSection isHome={true} />
    </div>
  );
}
