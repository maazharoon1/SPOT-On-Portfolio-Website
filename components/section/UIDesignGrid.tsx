"use client";

/* eslint-disable @next/next/no-img-element -- Cloudinary supplies responsive optimized images while preserving each screenshot's intrinsic aspect ratio. */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { ProjectObject } from "@/libs/projectVariable";
import styles from "./UIDesignGrid.module.css";

const projects = ProjectObject.filter((project) => project.filter === "UI Design");
type Project = (typeof projects)[number];
const previews = projects.filter((project) => !project.liveUrl?.trim());
// These Shopex assets use the same cloud as the reference portfolio.
const imageUrl = (id: string, width: number) =>
  `https://res.cloudinary.com/fd9kyggd/image/upload/f_auto,q_auto,c_limit,w_${width}/${encodeURIComponent(id)}`;

function Card({ project, onPreview }: { project: Project; onPreview: () => void }) {
  const windowRef = useRef<HTMLSpanElement>(null);
  const [overflow, setOverflow] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const viewport = windowRef.current;
    const image = viewport?.querySelector("img");
    if (!viewport || !image) return;
    const measure = () => setOverflow(Math.max(0, image.offsetHeight - viewport.clientHeight));
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(image);
    image.addEventListener("load", measure);
    measure();
    return () => { observer.disconnect(); image.removeEventListener("load", measure); };
  }, []);

  const content = <span ref={windowRef} className={styles.window} style={{ "--preview-offset": `${-overflow}px` } as CSSProperties}>
    <img src={imageUrl(project.mainImage, 640)}
      srcSet={[320, 480, 640, 960, 1280].map((width) => `${imageUrl(project.mainImage, width)} ${width}w`).join(", ")}
      sizes="(min-width: 1400px) 316px, (min-width: 1280px) calc((100vw - 136px) / 4), (min-width: 640px) calc((100vw - 72px) / 2), calc(100vw - 32px)"
      alt={`${project.title} website preview`} loading="lazy" decoding="async"
      onError={() => setFailed(true)} className={styles.cover} />
    {failed && <span className={styles.error}>Preview unavailable</span>}
  </span>;

  return project.liveUrl?.trim()
    ? <a className={styles.card} href={project.liveUrl.trim()} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} website (opens in a new tab)`}>{content}</a>
    : <button className={styles.card} type="button" onClick={onPreview} aria-haspopup="dialog" aria-label={`Preview ${project.title}`}>{content}</button>;
}

function Lightbox({ selectedId, onClose }: { selectedId: string; onClose: () => void }) {
  const [index, setIndex] = useState(() => Math.max(0, previews.findIndex((project) => project.id === selectedId)));
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const project = previews[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, []);

  const resetScroll = () => viewportRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  const navigate = (direction: number) => {
    setIndex((current) => (current + direction + previews.length) % previews.length);
    setZoomed(false);
    resetScroll();
  };
  const toggleZoom = () => { setZoomed((current) => !current); resetScroll(); };

  return createPortal(<dialog ref={dialogRef} className={styles.dialog} aria-label={`${project.title} UI design preview`}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onKeyDown={(event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); navigate(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); navigate(1); }
    }}>
    <div className={styles.toolbar}>
      <button type="button" onClick={toggleZoom} aria-label={zoomed ? "Fit full image" : "Zoom image"}>{zoomed ? "−" : "+"}</button>
      <button type="button" onClick={onClose} aria-label="Close preview" autoFocus>×</button>
    </div>
    <div ref={viewportRef} className={`${styles.viewport} ${zoomed ? styles.zoomed : ""}`}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <PreviewImage key={project.id} project={project} zoomed={zoomed} onToggle={toggleZoom} />
    </div>
    {previews.length > 1 && <>
      <button type="button" className={`${styles.arrow} ${styles.previous}`} onClick={() => navigate(-1)} aria-label="Previous design">←</button>
      <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => navigate(1)} aria-label="Next design">→</button>
    </>}
    <span className={styles.counter} aria-live="polite">{index + 1} / {previews.length}</span>
  </dialog>, document.body);
}

function PreviewImage({ project, zoomed, onToggle }: { project: Project; zoomed: boolean; onToggle: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  if (failed) return <p role="alert">Preview unavailable</p>;
  return <>
    <button type="button" className={styles.imageButton} onClick={onToggle} aria-label={zoomed ? "Fit full image" : "Zoom image to read design"}>
      <img src={imageUrl(project.mainImage, 1920)} alt={`${project.title} full website design`}
        className={styles.fullImage} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
    </button>
    {!loaded && <span className={styles.loading} role="status">Loading preview…</span>}
  </>;
}

export default function UIDesignGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return <>
    <div className={styles.grid}>
      {projects.map((project) => <Card key={project.id} project={project} onPreview={() => setSelectedId(project.id)} />)}
    </div>
    {selectedId && <Lightbox selectedId={selectedId} onClose={() => setSelectedId(null)} />}
  </>;
}
