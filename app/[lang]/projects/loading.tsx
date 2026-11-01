import HeroSection from "../../../src/components/HeroSection";
import { ProjectsSkeleton } from "../../../src/components/PageSkeletons";

export default function Loading() {
  return (
    <div className="space-y-[34px]">
      <HeroSection activeTab="projects" />
      <ProjectsSkeleton />
    </div>
  );
}
