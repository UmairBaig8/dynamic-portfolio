import "./globals.css";

export const metadata = {
  title: "Portfolio",
  description: "Projects and writing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
