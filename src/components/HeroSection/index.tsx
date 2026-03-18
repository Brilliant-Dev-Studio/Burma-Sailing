export const HeroSection = () => {
  return (
    <div>
      {/* Hero Video */}
      <div className="h-[84svh] relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onError={() => {
            // eslint-disable-next-line no-console
            console.error(
              "Hero video failed to load. Expected at /videos/hero.mp4",
            );
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute bottom-[50px] left-2 text-white ">
          <p className="text-sm  mb-3">Burma Sailing</p>
          <p className="text-2xl">
            Your Trusted Passage to the Mergui Archupelag and Yacht Agent
            Expedition Specialist In the Mergui Archipelago
          </p>

          <button className="bg-white text-black px-8 py-3 rounded-full font-semibold text-md mt-8">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
