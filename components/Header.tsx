"use client";
import { useState, useEffect } from "react";
const nav = [
  ["Home", "home"],
  ["Work", "work"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];
export function Header() {
  const [light, setLight] = useState(false),
    [menu, setMenu] = useState(false);
  useEffect(() => {
    try {
      setLight(localStorage.getItem("appearance") === "light");
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = light ? "light" : "dark";
  }, [light]);
  return (
    <header>
      <a href="/#contact" className="availability">
        <i />
        Open to work
      </a>
      <nav aria-label="Main" className={menu ? "expanded" : ""} id="main-nav">
        {nav.map(([name, id]) => (
          <a key={id} onClick={() => setMenu(false)} href={"/#" + id}>
            {name}
          </a>
        ))}
      </nav>
      <div className="navtools">
        <button
          className="theme"
          aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
          onClick={() => {
            setLight(!light);
            try {
              localStorage.setItem("appearance", light ? "dark" : "light");
            } catch {}
          }}
        >
          {light ? "☾" : "☼"}
        </button>
        <a className="resume" href="/resume.pdf" download>
          Resume
        </a>
        <button
          aria-controls="main-nav"
          aria-expanded={menu}
          className="menu"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
