"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./page.module.css";

type ParagraphProps = {
  children: string;
};

export default function Paragraph({ children }: ParagraphProps) {
  const wordRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (wordRef.current) {
      const characterSpans = wordRef.current.querySelectorAll(`.${styles.character}`);

      gsap.fromTo(
        characterSpans,
        { opacity: 0},
        {
          opacity: 1,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: wordRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
            markers: false,
          },
        }
      );
    }
  }, []);

  const words = children.split(" ");

  return (
    <p ref={wordRef} className={styles.paragraph}>
      {words.map((word, index) => (
        <span className={styles.word} key={`${word}-${index}`}>
          <span className={styles.shadow}>{word}&nbsp;</span>
          <span className={styles.character}>{word}&nbsp;</span>
        </span>
      ))}
    </p>
  );
}
