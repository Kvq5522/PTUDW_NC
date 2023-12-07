import { Outfit } from "next/font/google";
import type { Metadata } from "next";
import "@/Styles/globals.css";

import { Toaster } from "@/components/ui/toaster";

import ReduxProvider from "@/redux/provider";

const font = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Learning",
  description: "E-Learning project for Web Dev Adv HCMUS",
};

export default function homePage({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={font.className}>
        <ReduxProvider>
          <Toaster />
          <div id="root">{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
