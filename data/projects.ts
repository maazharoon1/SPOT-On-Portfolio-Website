export type ProjectCategory =
  | "Logo Design"
  | "Book Cover"
  | "Social Media Post"
  | "Packaging"
  | "Flyers & Brochures"
  | "Brand Guidelines"
  | "Motion Graphics";

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
  "Flyers & Brochures",
  "Brand Guidelines",
  "Motion Graphics",
];

export const projects: Project[] = [];
