import { shopexProjectData } from "./shopexProjects";
import { warsalProjectData } from "./warsalProjects";
import { prepareProject } from "./projectMedia";

export const WarsalProjects = warsalProjectData.map((project) => prepareProject(project, "warsal"));
const warsalIds = new Set(WarsalProjects.map((project) => project.id.toLowerCase()));

export const ShopexProjects = shopexProjectData.map((project) => prepareProject({
  ...project,
  // Video routes compare IDs without case; keep both brands independently accessible.
  id: warsalIds.has(project.id.toLowerCase()) ? `shopex-${project.id}` : project.id,
}, "shopex"));

export const ProjectObject = [...WarsalProjects, ...ShopexProjects];
