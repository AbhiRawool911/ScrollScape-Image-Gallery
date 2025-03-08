import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import imagesLoaded from "imagesloaded";

gsap.registerPlugin(ScrollTrigger);

export function animateScroll() {
  const images = gsap.utils.toArray("img");
  const loader = document.querySelector(".loader--text");

  const updateProgress = (instance) => {
    loader.textContent = `${Math.round(
      (instance.progressedCount * 100) / images.length
    )}%`;
  };

  const showDemo = () => {
    document.body.style.overflow = "auto";
    document.scrollingElement.scrollTo(0, 0);
    gsap.to(document.querySelector(".loader"), { autoAlpha: 0 });

    gsap.utils.toArray("section").forEach((section, index) => {
      const wrapper = section.querySelector(".wrapper");
      if (wrapper) {
        const [x, xEnd] =
          index % 2
            ? ["100%", (wrapper.scrollWidth - section.offsetWidth) * -1]
            : [wrapper.scrollWidth * -1, 0];
        gsap.fromTo(
          wrapper,
          { x },
          { x: xEnd, scrollTrigger: { trigger: section, scrub: 0.5 } }
        );
      }
    });
  };

  imagesLoaded(images).on("progress", updateProgress).on("always", showDemo);
}
