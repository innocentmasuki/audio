"use client";
import Equalizer from "r3f-equalizer";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";


const AUDIO_SRC = "/audio/sample.mp3"

const Visualizer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const visualiserConfig = {
    amplitude: 3,
    gridCols: 60,
    gridRows: 60,
    cubeSideLength: 0.2,
    cubeSpacing: 15,
    cameraPosition: [20, 20, 20],
  } as any;


  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("ended", handleEnded);

      return () => {
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
        audioElement.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className={"h-full w-full relative"}>
      <div className={"w-full absolute h-full flex flex-col justify-center items-center"}>
        <button className={" border-[1px] duration-75 bg-transparent hover:bg-white text-2xl hover:text-black text-white border-white z-20 absolute rounded-full backdrop-blur p-6"}
                onClick={togglePlayPause}>{isPlaying ? <FaPause /> :
          <FaPlay  />}
        </button>
      </div>
      <div className={"text-white w-full text-center z-20 py-2 backdrop-blur absolute bottom-0 mx-auto"}>Music by <a target={"_blank"} href="https://pixabay.com/users/alisiabeats-39461785/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=170190">Alisia</a> from <a target={"_blank"} href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=170190">Pixabay</a></div>
      <audio loop ref={audioRef} src={AUDIO_SRC} hidden crossOrigin="anonymous" autoPlay />
      <Equalizer audio={audioRef} {...visualiserConfig}/>
    </div>
  );

};

export default Visualizer;
