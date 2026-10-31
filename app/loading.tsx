import HeroSection from "../src/components/HeroSection";
import { AboutSkeleton } from "../src/components/PageSkeletons";

export default function Loading() {
  return (
    <div className="space-y-[34px]">
      <HeroSection activeTab="about" />
      <AboutSkeleton />
    </div>
  );
}
