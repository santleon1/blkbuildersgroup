"use client";
import { useRef, useState } from "react";

/* One Carousel component. Caption is outside the swipe track,
   so it stays fixed while images/videos slide. */
function Carousel({ slides, title, details }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const goTo = (i) => {
    if (!trackRef.current) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    setIndex(clamped);
    const slideWidth = trackRef.current.clientWidth + 24; // width + gap
    trackRef.current.scrollTo({ left: clamped * slideWidth, behavior: "smooth" });
  };

  return (
    <section className="project-group" style={{ marginTop: 32 }}>
      <div className="carousel" aria-label={`${title} slideshow`}>
        <button className="nav prev" aria-label="Previous" onClick={() => goTo(index - 1)}>‹</button>
        <button className="nav next" aria-label="Next" onClick={() => goTo(index + 1)}>›</button>

        {/* Swipeable track (media only) */}
        <div className="slides" ref={trackRef}>
          {slides.map((s, i) => (
            <article className="slide" key={`${title}-${i}`}>
              {s.type === "video" ? (
                <video
                  className="media"
                  src={s.src}
                  controls
                  playsInline
                  preload="metadata"
                  poster={s.poster || undefined}
                />
              ) : (
                <img className="media" src={s.src} alt={s.alt || title} />
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Fixed caption below the slideshow */}
      <div className="project-card" style={{ marginTop: 12 }}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        <p style={{ marginBottom: 0 }}>{details}</p>
      </div>
    </section>
  );
}

export default function Projects() {
  const onsiteSlides = [
    { type: "img", src: "/blk-onsite2.png", alt: "On-site assembly" },
    { type: "img", src: "/blk-onsitebuilding.PNG", alt: "On-site assembly 2" },
  ];

  const factorySlides = [
    { type: "img", src: "/blk-factorymodular2.jpg", alt: "Factory modular module" },
    { type: "img", src: "/blk-factoryModular.png", alt: "Factory modular unit 2" },
  ];

  const tinySlides = [
    { type: "img", src: "/blk-tinyhouse2.png", alt: "Tiny house exterior" },
    { type: "img", src: "/blk-tinyhouse.png", alt: "Tiny house exterior 2" },
    { type: "video", src: "/blk-tinyhousevideo.mp4", alt: "Tiny house walkthrough video" },
  ];

  return (
    <main>
      <h1>Projects & Systems</h1>
      <p>
        BLK offers two core products—On-Site Construction and Factory Modular—plus specialized
        shelter and tiny-house designs, all focused on wind resistance, durability, and energy savings.
      </p>

      <Carousel
        slides={onsiteSlides}
        title="On-Site Construction"
        details="Fast assembly with pre-engineered panels; mortar projected on site for a rigid, compact shell. Minimal waste, safer shoring, quicker schedules."
      />

      <Carousel
        slides={factorySlides}
        title="Factory Modular Units"
        details="Transportable, progressive modules with thermal insulation and wind-resistant anchoring to piles; 1–3 stories with multiple style/finish options."
      />

      <Carousel
        slides={tinySlides}
        title="Tiny House"
        details="Attached or stand-alone tiny house to use as a second home, rental property, shelter, or visitor's house. Compact, efficient homes built on site; designs adapt to client needs and local styles."
      />
    </main>
  );
}


