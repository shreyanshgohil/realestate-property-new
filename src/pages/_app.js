import "@/styles/globals.scss";
import { Figtree } from "next/font/google";

export const figtree = Figtree({
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
export default function App({ Component, pageProps }) {
  return (
    <div>
      <style jsx global>{`
        html {
          font-family: ${figtree.style.fontFamily}, ui-sans-serif, system-ui,
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, "Noto Sans", sans-serif,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
            "Noto Color Emoji";
        }
      `}</style>

      <Component {...pageProps} />
    </div>
  );
}
