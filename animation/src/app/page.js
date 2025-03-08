"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import imagesLoaded from "imagesloaded";

export default function HomePage() {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const loader = document.querySelector(".loader--text");

    const updateProgress = (instance) => {
      if (loader) {
        loader.textContent = `${Math.round(
          (instance.progressedCount * 100) / galleryImages.length
        )}%`;
      }
    };

    const showDemo = () => {
      document.body.style.overflow = "auto";
      document.scrollingElement.scrollTo(0, 0);
      gsap.to(document.querySelector(".loader"), { autoAlpha: 0 });

      gsap.utils.toArray("section").forEach((section, index) => {
        const wrapper = section.querySelector(".wrapper");
        if (!wrapper) return;

        const [x, xEnd] =
          index % 2
            ? ["100%", (wrapper.scrollWidth - section.offsetWidth) * -1]
            : [wrapper.scrollWidth * -1, 0];

        gsap.fromTo(
          wrapper,
          { x },
          {
            x: xEnd,
            scrollTrigger: {
              trigger: section,
              scrub: 0.5,
            },
          }
        );
      });
    };

    if (galleryImages.length > 0) {
      imagesLoaded(document.querySelectorAll("img"))
        .on("progress", updateProgress)
        .on("always", showDemo);
    }
  }, [galleryImages]); // ✅ Runs when images are set

  // ✅ Fix: Use placeholders first, then load real images
  useEffect(() => {
    const placeholders = Array.from(
      { length: 4 },
      () => Array.from({ length: 4 }, () => `/placeholder.jpg`) // ✅ Use a local placeholder first
    );
    setGalleryImages(placeholders);

    // 🔄 Load Unsplash images after a short delay
    setTimeout(() => {
      const picsumImages = Array.from({ length: 4 }, () =>
        Array.from(
          { length: 4 },
          () =>
            `https://picsum.photos/1240/874?random=${Math.floor(
              Math.random() * 200
            )}`
        )
      );
      setGalleryImages(picsumImages);
    }, 500);
    // ✅ Give time for state update
  }, []);

  return (
    <div className="demo-wrapper">
      <header className="df aic jcc">
        <div>
          <h1>ScrollScape</h1>
          <h2>Infinite Visuals, Endless Inspiration</h2>
        </div>
      </header>

      <section className="demo-text">
        <div className="wrapper text">
          A seamless journey through captivating visuals, where every scroll
          unveils a new story
        </div>
      </section>

      {galleryImages.map((row, i) => (
        <section key={i} className="demo-gallery">
          <ul className="wrapper">
            {row.map((imageUrl, j) => (
              <li key={j}>
                <img
                  src={imageUrl}
                  width="1240"
                  height="874"
                  alt="Random"
                  loading="lazy" // ✅ Improves performance
                  onError={(e) => (e.target.src = "/fallback.jpg")} // ✅ Handle broken images
                />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="demo-text">
        <div className="wrapper text">
          A seamless journey through captivating visuals, where every scroll
          unveils a new story
        </div>
      </section>

      <footer className="df aic jcc">
        <p>
          Images from{" "}
          <a href="https://picsum.photos/" target="_blank">
            Picsum
          </a>
        </p>
      </footer>
    </div>
  );
}
