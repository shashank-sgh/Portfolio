export const dynamic = "force-static";
import { origin } from "@/data/profile";
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: origin + "/sitemap.xml",
  };
}
