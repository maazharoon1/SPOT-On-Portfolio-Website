import ImagePopup from "@/components/ui/ImagePopup";
import { ProjectObject } from "@/libs/projectVariable";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Video = async ({ params }: PageProps) => {
  const { slug } = await params;

  const project = ProjectObject.find(
    (item) => item.id.toLowerCase() === slug.toLowerCase()
  );

  if (!project) {
    return <div>Video not found</div>;
  }

  return (
    <div className="relative min-h-screen">
      <Link
        href="/"
        className="
          absolute
          left-5
          top-5
          z-100!
          rounded-full
          border
          border-white/10
          bg-black/40
          px-4
          py-2
          text-sm
          text-white
          backdrop-blur-xl
          transition
          hover:bg-white/10
        "
      >
        ← Back
      </Link>

      <ImagePopup id={project.id} />
    </div>
  );
};

export default Video;