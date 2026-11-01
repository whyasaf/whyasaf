import { Caveat, Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hand",
});

export const fontVariables = `${inter.variable} ${playfair.variable} ${caveat.variable}`;

// Anti-flash theme script
export const themeScript = `
  try {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (_) {}
`;
