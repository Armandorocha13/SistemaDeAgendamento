"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/fotos/perfil1.jpeg",
  "/fotos/perfil2.jpeg",
  "/fotos/perfil3.jpeg",
  "/fotos/perfil4.jpeg",
  "/fotos/perfil5.jpeg",
];

const BannerCarrossel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[550px] md:h-[700px] overflow-hidden rounded-[2rem] bg-black shadow-2xl border border-white/5">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Fundo ambiental dinâmico */}
          <div className="absolute inset-0 scale-110 blur-[80px] opacity-40">
            <Image
              src={images[currentImage]}
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* Camada Principal com Efeito Ken Burns reverso (zoom out suave) */}
          <motion.div 
            initial={{ scale: 1.3 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 6, ease: "linear" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-[90%] max-h-[85%] overflow-hidden rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              <Image
                src={images[currentImage]}
                alt="The Nails By Julien Portfolio"
                fill
                className="object-cover object-center"
                priority
              />
              {/* Overlay interno para profundidade */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay Geral de Vinheta */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Interface de Informação Simplificada e Profissional */}
      <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col gap-0"
        >
          <span className="text-primary font-medium tracking-[0.4em] uppercase text-[9px] mb-2">
            Expert Nail Design
          </span>
          <h2 className="text-white font-sour text-3xl md:text-5xl font-bold leading-none drop-shadow-md">
            The Nails <span className="text-white/80 font-light italic ml-2">By Julien</span>
          </h2>
          <p className="text-white/60 text-[11px] md:text-xs font-light tracking-wide mt-3 max-w-sm">
            Alongamentos e Nail Art Artística de alta performance.
          </p>
        </motion.div>

        {/* Indicadores Minimalistas e Profissionais */}
        <div className="flex gap-2 mb-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className="group relative h-[2px] focus:outline-none transition-all duration-300"
              style={{ width: index === currentImage ? "40px" : "15px" }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full overflow-hidden">
                {index === currentImage && (
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="h-full bg-primary"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Badge de Qualidade */}
      <div className="absolute top-8 right-8 z-10">
        <div className="backdrop-blur-sm bg-black/20 border border-white/10 px-4 py-2 rounded-full">
          <span className="text-white/80 text-[9px] uppercase tracking-[0.2em] font-medium">
            Atendimento Exclusivo
          </span>
        </div>
      </div>
    </div>
  );
};

export default BannerCarrossel;
