import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Word from "./Paragraph";

export default function Index() {
  const [projectSelected, setProject] = useState(0);
  const imageProject = useRef(null);
  const lastProjectEl = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    const mm = gsap.matchMedia();
  
    mm.add("(min-width: 769px)", () => {
      ScrollTrigger.create({
        trigger: imageProject.current,
        start: "-300px",
        endTrigger: lastProjectEl.current,
        end: "bottom center+=320px",
        pin: true,
        markers: false,
      });
    });
  
    // Optional: small screen logic (do nothing)
    mm.add("(max-width: 768px)", () => {
    });
  
    return () => mm.revert();
  
  }, []);
  

  const place = [
    {
      title: "Wat Arun, Bangkok",
      src: "project_1.jpg",
    },
    {
      title: "Phra nang Cave Beach, Krabi",
      src: "krabi.jpg",
    },
    {
      title: "Monjam Chiang mai",
      src: "chiengmai.jpg",
    },
    {
      title: "Laem Sing Beach Lagoons, Phuket",
      src: "Phuket_beach.jpg",
    },
  ];

  const wordCol1 = "📍 Wat Arun, Bangkok, Thailand As the sun dips below the horizon, the Temple of Dawn stands proudly along the Chao Phraya River. A moment of stillness captured in vibrant hues.";
  const wordCol2 = "Come visit Thailand! Enjoy amazing temples, tasty food, friendly people, and beautiful places. Whether you love cities or nature, Thailand has something for everyone.";

  return (
    <div className={styles.project}>
      <div className={styles.projectDescription}>
        <div className={styles.column}>
          <div className={styles.imageContainer}>
            <Image ref={imageProject} src={`/images/${place[projectSelected].src}`} alt="project_1" fill={true} sizes="1000px" priority={true}></Image>
          </div>
        </div>
        <div className={styles.column}>
          <Word>{wordCol1}</Word>
        </div>
        <div className={styles.column}>
          <Word>{wordCol2}</Word>
        </div>
      </div>
      <div className={styles.projectList}>
        {place.map((project, index) => {
          const isLast = index === place.length - 1;
          return (
            <div ref={isLast ? lastProjectEl : null} onMouseOver={() => setProject(index)} className={styles.projectEl} key={`p_${index}`}>
              <p>{project.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
