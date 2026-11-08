import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "UGBScreener | NSE Market Intelligence",
  description: "A Vercel-native stock screener, strategy lab and historical backtest workspace.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
