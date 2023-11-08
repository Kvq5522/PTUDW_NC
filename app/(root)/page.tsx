"use client";
import "@/Screen/home.css";

export default function homePage() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png"
          alt="Google Classroom Image"
          className="home__image"
        />
        <button className="home__login">
          <a href="/sign-in">Sign-in</a>
        </button>
        <button className="home__login">
          <a href="/sign-up">Sign-up</a>
        </button>
      </div>
    </div>
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
