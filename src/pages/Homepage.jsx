import Navbar from "../components/Navbar";
import HeaderImage from "../assets/images/bg-image.jpg";

const Homepage = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div
        className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HeaderImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="relative z-10 flex flex-col items-center justify-center px-5 max-w-[630px] w-full text-center text-white">
          <h1 className="text-4xl font-extrabold">
            Indulge in Great Food and Robust Coffee
          </h1>
          <p className="text-lg mt-5">
            Begin your morning with a taste that lives up to its aroma.
          </p>
          <button className="bg-[#ff8418] text-black px-10 py-2 rounded-full text-lg font-bold my-10">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
