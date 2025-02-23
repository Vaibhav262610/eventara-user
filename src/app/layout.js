import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Discover | Eventara",
  description: "Eventara is a next-generation AI-powered event management platform designed to streamline hackathons, coding contests, and university events. It provides a seamless experience for both organizers and participants by integrating automated registrations, QR-based check-ins, live leaderboards, real-time notifications, and one-click certificate distribution—all in one place!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.cdnfonts.com/css/brigends-expanded" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
