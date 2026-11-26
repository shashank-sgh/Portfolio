"use client";
import { Repositories } from "./Repositories";
import { useState } from "react";
import { projects } from "@/data/profile";
export function Work() {
  const [filter, setFilter] = useState("All");
  return (
    <section id="work">
      <div className="sectionTop">
        <div>
          <small>SELECTED PROJECTS</small>
          <h2>
            Featured work<span>.</span>
          </h2>
        </div>
        <div className="filters" aria-label="Filter projects">
          {["All", "Web development", "Hackathon"].map((f) => (
            <button
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
              key={f}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      {projects
        .filter((p) => filter === "All" || p.categories.includes(filter))
        .map((p) => (
          <article className="project" key={p.slug}>
            <a
              className="projectImage"
              href={"/projects/" + p.slug + "/"}
              aria-label={"Explore " + p.name}
            >
              <img
                src={p.image}
                width="1440"
                height="1000"
                loading="lazy"
                alt="Workora prototype showing the homepage and local job search"
              />
            </a>
            <div className="projectCopy">
              <small>HYPERLOCAL EMPLOYMENT</small>
              <h3>{p.name}</h3>
              <p>{p.summary}</p>
              <p className="muted">{p.status}</p>
              <div className="chips">
                {p.stack.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
              <a className="button" href={"/projects/" + p.slug + "/"}>
                Read case study
              </a>
            </div>
          </article>
        ))}
      <Repositories />
    </section>
  );
}
