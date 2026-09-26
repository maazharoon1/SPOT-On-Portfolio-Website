export type ProjectCategory =
  | "Logo Design"
  | "Editorials"
  | "Social Media Post"
  | "Packaging"
  | "Stationery"
  | "Banners"
  | "Menu"
  | "Flyers & Brochures"
  | "Brand Guide & Identity"
  | "3D Animations"
  | "2D Animations"
  |  "UI/UX Design"
  | "Merchandise"
  | "Pitch Deck"
  | "Mobile App"
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
  "Editorials",
  "Social Media Post",
  "Packaging",
  "Stationery",
   "Banners",
  "Menu",
  "Flyers & Brochures",
  "Brand Guide & Identity",
  "3D Animations",
  "2D Animations",
  "UI/UX Design",
  "Merchandise",
  "Pitch Deck",
  "Mobile App",
  "Emotes",
  "Overlay"

];

export const projects: Project[] = [];
