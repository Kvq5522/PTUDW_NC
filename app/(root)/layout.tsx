import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "@/Styles/globals.css";
import FooterLandingPage from "@/components/Footer/FooterLandingPage";
import HeaderLandingPage from "@/components/Header/HeaderLandingPage";
import { Children } from "react";

// import "@/Styles/home.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Learning",
  description: "E-Learning project for Web Dev Adv HCMUS",
};

export default function homePage({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <HeaderLandingPage />
        {children}
        <FooterLandingPage />
      </body>
    </html>

    // <div className="home">
    //   <div className="home__container">
    //     <img
    //       src="https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png"
    //       alt="Google Classroom Image"
    //       className="home__image"
    //     />
    //     <button className="home__login">
    //       <a href="/sign-in">Sign-in</a>
    //     </button>
    //     <button className="home__login">
    //       <a href="/sign-up">Sign-up</a>
    //     </button>
    //   </div>
    // </div>
  );
}

// export default function Home() {
//   return (

//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       Hello world

//       <a href='/sign-in'>Sign-in</a>

//       <a href='/sign-up'>Sign-up</a>
//     </main>
//   )
// }
