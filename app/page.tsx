"use client";

import { useEffect } from 'react';
import Intro from '../components/Intro'
import Projects from '../components/Projects'

export default function Home() {

  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        new LocomotiveScroll();
      }
    )()
  }, [])

  return (
    <main >
      <Intro />
      <Projects/>
    </main>
  );
}
