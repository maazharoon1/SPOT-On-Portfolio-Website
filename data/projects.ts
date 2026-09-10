export type ProjectCategory =
  | "Logo Design"
  | "Book Cover"
  | "Social Media Post"
  | "Packaging"
  | "Stationary"
  | "Flyers & Brochures"
  | "Brand Guide & Identity"
  | "Motion Graphics"
  |  "UI/UX Design"
  | "Emotes"
  | "Overlay"
  ;

export interface Project {
  id: string;
  title: string;
  filter: ProjectCategory;
  type: "image" | "video";
  description: string;
  mainImage: string;
  coverImages: string[];
  color?: string;
}

export const projectCategories: ProjectCategory[] = [
  "Logo Design",
  "Book Cover",
  "Social Media Post",
  "Packaging",
  "Stationary",
  "Flyers & Brochures",
  "Brand Guide & Identity",
  "Motion Graphics",
  "UI/UX Design",
  "Emotes",
  "Overlay"

];

export const projects: Project[] = [];
