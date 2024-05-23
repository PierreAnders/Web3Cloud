"use client";
import { client } from "@/app/client";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import { ConnectButton } from "thirdweb/react";
 
export function HeroSection() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="mx-auto max-w-4xl px-4 text-center text-2xl font-bold leading-relaxed text-white md:text-4xl lg:text-5xl lg:leading-snug "
      >
        Welcome to the world of <br />

        <Highlight className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          web 3
        </Highlight>

      <div className="mt-16 flex justify-center">
        <ConnectButton
            client={client}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
          />
      </div>
      </motion.h1>
    </HeroHighlight>
  );
}
