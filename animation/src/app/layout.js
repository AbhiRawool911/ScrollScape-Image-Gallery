import "./styles/globals.css";

export const metadata = {
  title: "ScrollTrigger Demo",
  description: "GSAP ScrollTrigger animations in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
