"use client";
import { useEffect, useRef, useState } from "react";
type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
};
export function Repositories() {
  const target = useRef<HTMLDivElement>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  useEffect(() => {
    const el = target.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const controller = new AbortController();
    const watcher = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      watcher.disconnect();
      fetch(
        "https://api.github.com/users/shashank-sgh/repos?sort=updated&per_page=10",
        { signal: controller.signal },
      )
        .then(async (response) => {
          if (!response.ok) return;
          const items = await response.json();
          if (Array.isArray(items))
            setRepos(
              items
                .filter(
                  (r: Repo) =>
                    !r.fork &&
                    r.html_url.startsWith("https://github.com/shashank-sgh/"),
                )
                .slice(0, 3),
            );
        })
        .catch(() => {});
    });
    watcher.observe(el);
    return () => {
      watcher.disconnect();
      controller.abort();
    };
  }, []);
  return (
    <div ref={target}>
      {repos.length > 0 && (
        <>
          <h3 className="repoHeading">Recent GitHub repositories</h3>
          <div className="cards">
            {repos.map((r) => (
              <article key={r.name}>
                <a href={r.html_url}>{r.name}</a>
                {r.description && <p>{r.description}</p>}
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
