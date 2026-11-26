export const dynamic = "force-static";
import { origin, projects } from "@/data/profile";
export default function sitemap() {
  return [
    { url: origin },
    ...projects.map((p) => ({ url: origin + "/projects/" + p.slug + "/" })),
  ];
}
