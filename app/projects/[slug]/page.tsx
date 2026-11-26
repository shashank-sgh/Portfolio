import { projects } from "@/data/profile";
import { Header } from "@/components/Header";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return {
    title: p?.name,
    description: p?.summary,
    alternates: { canonical: "/projects/" + slug + "/" },
  };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <Header />
      <main className="case wrap" id="main">
        <a href="/#work">Back to selected work</a>
        <small>{p.status.toUpperCase()}</small>
        <h1>
          {p.name}
          <em>.</em>
        </h1>
        <p>{p.summary}</p>
        <img
          src={p.image}
          alt="Workora desktop prototype homepage"
          width="1440"
          height="1000"
        />
        <div className="caseGrid">
          {p.sections.map(([h, d]) => (
            <article key={h}>
              <h2>{h}</h2>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <a className="button" href="/#contact">
          Discuss this project
        </a>
      </main>
    </>
  );
}
