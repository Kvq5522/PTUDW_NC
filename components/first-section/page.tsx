import Link from "next/link";
const FirstSection = () => {
  return (
    <section className="md:py-20 py-10 bg-gradient-to-r from gray-00 to-gray-200 spacey-10">
      <div className="container mx-auto text-center">
        <div className="text-6xl flex justify-center font-bold md:px-20 pb-10 text-graydient bg-gradient-to-r from-yellow-500 to-green-300 bg-clip-text text-transparent">
          This is Google Clone
        </div>
        <p className="text-lg md:text-xl md:10 bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent font-bold ">
          This is a Google classroom clone by Ha Huynh Duc Huy and Quach Vinh
          Khang from HCMUS
        </p>
        <div className="flex gap-4 justify-center pt-10">
          <button className="bg-green-500 text-white px-10 py-4 rounded-md text-lg font-bold">
            <Link href="/sign-in">Sign In</Link>
          </button>
          <button className="bg-gray-500 text-white px-10 py-4 rounded-md text-lg font-bold">
            <Link href="/sign-up">Get Started</Link>
          </button>
        </div>
        <div className="pt-10">
          <video className="rounded-xl" autoPlay muted loop>
            <source src="/content/hero-1.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
