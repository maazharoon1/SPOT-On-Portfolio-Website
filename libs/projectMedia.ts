export type ProjectBrand = "shopex" | "warsal";

export interface ProjectInput {
  filter: string;
  id: string;
  title: string;
  type: string;
  mainImage: string;
  coverImages?: string[];
  description?: string;
  color?: string;
  tags?: string[];
  client?: string;
  video?: string;
  videoUrl?: string;
  liveUrl?: string;
}

export interface Project extends ProjectInput {
  brand: ProjectBrand;
  coverImages: string[];
  pdfUrl?: string;
}

export const mediaSources = {
  shopex: { cloudName: "fd9kyggd", imageVersion: "v1789063355", videoVersion: "v1789154082" },
  warsal: { cloudName: "hcn0f9nu", imageVersion: "v1786737878", videoVersion: "v1786745203" },
} as const;

const categoryNames: Record<string, string> = {
  "Brand Identity & Guide": "Brand Guide & Identity",
  "Brand Guidelines": "Brand Guide & Identity",
  "stationery Design": "Stationery",
  stationery: "Stationery",
  socialmediapost: "Social Media Post",
  "Packaging Design": "Packaging",
  "Book Cover": "Editorials",
  Animations: "2D Animations",
};

export function resolveProjectMedia(value: string, brand: ProjectBrand, type: "image" | "video" | "pdf" = "image") {
  if (/^https?:\/\//i.test(value)) return value;
  const source = mediaSources[brand];
  const resource = type === "video" ? "video" : "image";
  const version = type === "video" ? source.videoVersion : source.imageVersion;
  const extension = type === "video" ? ".mp4" : type === "pdf" ? ".pdf" : "";
  return `https://res.cloudinary.com/${source.cloudName}/${resource}/upload/${version}/${value}${extension && !value.endsWith(extension) ? extension : ""}`;
}

export function prepareProject(project: ProjectInput, brand: ProjectBrand): Project {
  return {
    ...project,
    brand,
    filter: categoryNames[project.filter] ?? project.filter,
    mainImage: resolveProjectMedia(project.mainImage, brand),
    coverImages: (project.coverImages ?? []).map((image) => resolveProjectMedia(image, brand)),
    videoUrl: project.videoUrl || (project.video ? resolveProjectMedia(project.video, brand, "video") : undefined),
    pdfUrl: project.type === "pdf" ? resolveProjectMedia(project.mainImage, brand, "pdf") : undefined,
  };
}
