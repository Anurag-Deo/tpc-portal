import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const LottieComponent = ({ animationPath }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    path: animationPath,
  };

  return (
    <div onClick={() => null}>
      <Player
        autoplay={true}
        loop={true}
        controls={false}
        src={animationPath}
      ></Player>
    </div>
  );
};

export default LottieComponent;
