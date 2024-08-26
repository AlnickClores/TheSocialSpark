import React from "react";
import SocialSparkLogo from "../../assets/images/social-spark.png";
import SampleImage from "../../assets/images/sample-image.jpg";
import { icons } from "../../assets/icons/icons";

const WelcomePost = () => {
  return (
    <div className="my-2 py-3 px-1 bg-[#121212] rounded-xl border border-gray-600">
      <div className="flex items-center">
        <img
          src={SampleImage}
          className="h-8 w-10 text-[#bb86fc] fill-current rounded-full"
          alt="profile image"
        />

        <div className="flex items-center gap-3 ml-2">
          <h1 className="font-bold text-md">AlnickDev</h1>
        </div>
      </div>
      <p className="my-2 mx-1 text-slate-300 text-sm">Valenzuela, PH</p>
      <div className="p-1">
        <img className="rounded-lg" src={SocialSparkLogo} alt="post image" />
      </div>

      <span className="font-center text-sm">
        Hey there! this is Alnick the creator of The SocialSpark. I would like
        to welcome you to The SocialSpark community! 🎉 I'm excited to have you
        here. This is your space to connect, share, with like-minded people.
        Start by exploring posts, connecting with friends, and creating your
        first spark! Let’s ignite something amazing together. 🔥 #Welcome
        #TheSocialSpark
      </span>
      <div className="flex justify-between mt-3 px-2">
        <div className="flex items-center justify-center gap-1">
          {icons.star}
          <p className="text-sm">0</p>
        </div>
        {icons.save}
      </div>
    </div>
  );
};

export default WelcomePost;
