import { Inter } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/NavBar";
import Footer from "./_components/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/helper/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Attendance System",
  description:
    "WebApp for creating and managing attendance for teachers and students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased `}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-[600px]">
          {children}
          </main>
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#1E40AF",
                color: "#fff",
                borderRadius: "12px",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
