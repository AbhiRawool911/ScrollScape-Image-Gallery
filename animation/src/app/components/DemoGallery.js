"use client"; // Ensure it's a Client Component

import { useState, useEffect } from "react";

export default function DemoGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Check if JavaScript is running correctly
    console.log("Fetching images...");

    // Use Picsum Photos alternative or a static set of images
    const newImages = Array.from(
      { length: 10 },
      (_, i) => `https://picsum.photos/1240/874?random=${i + 1}`
    );

    setImages(newImages);
    console.log("Images Loaded:", newImages); // Debugging output
  }, []);

  return (
    <div className="demo-gallery">
      <ul className="wrapper">
        {images.length > 0 ? (
          images.map((src, index) => (
            <li key={index}>
              <img
                src={src}
                width="1240"
                height="874"
                alt={`Random ${index}`}
                onError={(e) =>
                  console.error("Image failed to load:", e.target.src)
                }
              />
            </li>
          ))
        ) : (
          <p>Loading images...</p> // Fallback message if images don't load
        )}
      </ul>
    </div>
  );
}
