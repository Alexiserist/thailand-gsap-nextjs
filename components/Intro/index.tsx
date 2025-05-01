import React, { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Index() {
  const descriptionPhrases = [
    "Where tradition and modern life move together in vibrant harmony.",
    "Temples whisper tales of ancient kingdoms.",
    "Bustling streets filled with flavors, colors, and smiles.",
    "The Land of Smiles welcomes every soul with warmth.",
    "Thailand — a journey for the heart and spirit."
  ];

  const background = useRef(null);
  const backgroundIntro = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: background.current,
        start: "top",
        end: "+=500px",
        scrub: true,
        markers: false,
      }
    })
    timeline.from(background.current, { clipPath: 'inset(15%)'})
    .to(backgroundIntro.current, {height: '250px'})
  },[])

  return (
    <div className={styles.homeTitle}>
      <div className={styles.backgroundImage}>
        <Image ref={background} src={"/images/background.jpg"} alt="backgroundImage" fill={true} priority={true}></Image>
      </div>
      <div className={styles.description}>
        {
          descriptionPhrases.map((phrases,index) => {
            return <AnimatedText key={index}>{phrases}</AnimatedText>
          })
        }
      </div>
      <div className={styles.homeIntro}>
        <div ref={backgroundIntro} className={styles.backgroundIntro}>
          <Image src={"/images/background_intro.jpg"} alt="background_intro" fill={true} priority={true}></Image>
        </div>
        <h1  data-scroll data-scroll-speed="0.7">Thailand dan smile</h1>
      </div>
    </div>
  );
}


function AnimatedText({ children }: any) {
  const text = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (text.current) {
      gsap.from(text.current, {
        scrollTrigger: {
          trigger: text.current,
          start: "0px bottom-=100px",
          end: "bottom bottom-=100px",
          scrub: true,
          markers: false
        },
        left: "-200px",
        opacity: 0
      });
    }
  }, []);

  return (
    <p ref={text}>{children}</p>
  )
}