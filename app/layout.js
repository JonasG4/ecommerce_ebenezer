import "@/styles/globals.css";
import localFont from "next/font/local";
import { Barlow } from "next/font/google";
import Provider from "@/context/AuthContext";

const inter = localFont({
  src: [
    {
      path: "/../public/fonts/Inter-Black.ttf",
      weight: "900",
    },
    {
      path: "/../public/fonts/Inter-ExtraBold.ttf",
      weight: "800",
    },
    {
      path: "/../public/fonts/Inter-Bold.ttf",
      weight: "700",
    },
    {
      path: "/../public/fonts/Inter-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "/../public/fonts/Inter-Medium.ttf",
      weight: "500",
    },
    {
      path: "/../public/fonts/Inter-Regular.ttf",
      weight: "400",
    },
    {
      path: "/../public/fonts/Inter-Light.ttf",
      weight: "300",
    },
    {
      path: "/../public/fonts/Inter-ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "/../public/fonts/Inter-Thin.ttf",
      weight: "100",
    },
  ],
  display: "swap",
});

const barlow = Barlow({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  styles: ["normal", "italic"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className={`${inter.className} w-full min-h-screen flex `}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}