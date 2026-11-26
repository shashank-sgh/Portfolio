"use client";
import { useEffect, useRef } from "react";
export function Atmosphere() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    const clean: (() => void)[] = [];
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    void Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const scroll = new Lenis({ anchors: true, autoRaf: true });
      scroll.on("scroll", ScrollTrigger.update);
      const ctx = gsap.context(() => {
        gsap.from("h1, h1 + p", {
          y: 12,
          duration: 0.65,
          stagger: 0.07,
          clearProps: "transform",
        });
        gsap.utils
          .toArray<HTMLElement>(".sectionTop, .about img")
          .forEach((target) =>
            gsap.from(target, {
              y: 15,
              duration: 0.6,
              scrollTrigger: { trigger: target, start: "top 95%" },
            }),
          );
      });
      clean.push(() => {
        ctx.revert();
        scroll.destroy();
      });
    });
    if (innerWidth >= 780)
      void import("three").then((T) => {
        if (disposed) return;
        let r;
        try {
          r = new T.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          });
        } catch {
          return;
        }
        const renderer = r;
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        el.append(renderer.domElement);
        const scene = new T.Scene(),
          camera = new T.PerspectiveCamera(40, 1, 0.1, 30);
        camera.position.z = 4.2;
        const geo = new T.TorusGeometry(1.18, 0.19, 30, 112),
          mat = new T.ShaderMaterial({
            wireframe: true,
            transparent: true,
            vertexShader:
              "varying vec3 v; void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
            fragmentShader:
              "varying vec3 v;void main(){gl_FragColor=vec4(.62,.46,.98,.18+.12*v.y);}",
          });
        const ring = new T.Mesh(geo, mat);
        scene.add(ring);
        ring.rotation.set(0.43, 0.54, -0.32);
        const render = () => {
          const { width, height } = el.getBoundingClientRect();
          if (!height) return;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
        const resize = new ResizeObserver(render);
        resize.observe(el);
        const move = (e: PointerEvent) => {
          ring.rotation.y = 0.54 + (0.09 * e.clientX) / innerWidth;
          renderer.render(scene, camera);
        };
        window.addEventListener("pointermove", move);
        render();
        clean.push(() => {
          window.removeEventListener("pointermove", move);
          resize.disconnect();
          geo.dispose();
          mat.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        });
      });
    return () => {
      disposed = true;
      clean.forEach((fn) => fn());
    };
  }, []);
  return <div ref={host} style={{ position: "absolute", inset: 0 }} />;
}
