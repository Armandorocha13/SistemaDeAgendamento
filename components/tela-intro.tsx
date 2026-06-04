"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";

// Tela de apresentação (splash) felina exibida antes do sistema.
// Tema: onça / felinos — olhos brilhando, rosetas de oncinha,
// trilha de patinhas douradas, retrato da profissional e o botão
// "Agendar agora".

// Rosetas de oncinha espalhadas como textura ambiente (faixas topo/base)
const ROSETAS = [
  { t: "8%", l: "10%", s: 60, d: 0.2 }, { t: "16%", l: "78%", s: 90, d: 0.5 },
  { t: "5%", l: "52%", s: 46, d: 0.8 }, { t: "26%", l: "30%", s: 52, d: 1.1 },
  { t: "12%", l: "90%", s: 38, d: 0.35 }, { t: "78%", l: "6%", s: 72, d: 0.6 },
  { t: "86%", l: "40%", s: 50, d: 0.9 }, { t: "70%", l: "84%", s: 64, d: 0.3 },
  { t: "90%", l: "68%", s: 42, d: 1.2 }, { t: "60%", l: "92%", s: 34, d: 1.0 },
  { t: "40%", l: "4%", s: 40, d: 0.7 }, { t: "50%", l: "95%", s: 30, d: 0.45 },
];

// Patinhas douradas em trilha diagonal
const PATINHAS = [
  { t: "64%", l: "12%", r: -28, d: 0.0 }, { t: "52%", l: "24%", r: 14, d: 0.12 },
  { t: "40%", l: "36%", r: -20, d: 0.24 }, { t: "30%", l: "50%", r: 18, d: 0.36 },
  { t: "22%", l: "64%", r: -16, d: 0.48 },
];

const ROSETA_BG =
  "radial-gradient(closest-side, transparent 46%, #1b1109ff 49% 74%, transparent 80%)," +
  "radial-gradient(closest-side at 62% 38%, #42321bff 0 30%, transparent 32%)";

const CHAVE_SESSAO = "intro-the-nails-vista";

interface TelaIntroProps {
  // Foto da profissional exibida no retrato central.
  retrato?: string;
}

const TelaIntro = ({ retrato = "/fotos/perfil1.jpeg" }: TelaIntroProps) => {
  // Inicia oculta para evitar flash na hidratação; decide no cliente.
  const [visivel, setVisivel] = useState(false);
  const [fase, setFase] = useState(0); // 0 olhos · 1 revelação · 2 conteúdo

  useEffect(() => {
    if (typeof window === "undefined") return;
    setVisivel(true); // Mostra sempre (ideal para testar)
  }, []);

  useEffect(() => {
    if (!visivel) return;
    const t1 = setTimeout(() => setFase(1), 2200);
    const t2 = setTimeout(() => setFase(2), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [visivel]);

  const entrar = () => {
    sessionStorage.setItem(CHAVE_SESSAO, "1");
    setVisivel(false);
  };

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          key="tela-intro"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, #220105ff 0%, #000000ff 45%, #000000ff 100%)",
          }}
        >
          {/* Campo ambiente de oncinha */}
          <div className="pointer-events-none absolute inset-0">
            {ROSETAS.map((r, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full"
                style={{
                  top: r.t,
                  left: r.l,
                  width: r.s,
                  height: r.s * 0.82,
                  background: ROSETA_BG,
                  filter: "drop-shadow(0 1px 1px rgba(0,0,0,.4))",
                }}
                initial={{ opacity: 0, scale: 0.4, rotate: -12 }}
                animate={{ opacity: 0.5, scale: 1, rotate: 0, y: [0, -8, 0] }}
                transition={{
                  opacity: { duration: 1.2, delay: r.d },
                  scale: { duration: 1.2, delay: r.d },
                  rotate: { duration: 1.2, delay: r.d },
                  y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: r.d },
                }}
              />
            ))}
          </div>

          {/* Trilha de patinhas douradas (fase >= 1) */}
          <AnimatePresence>
            {fase >= 1 && (
              <div className="pointer-events-none absolute inset-0">
                {PATINHAS.map((p, i) => (
                  <motion.span
                    key={i}
                    className="text-[#e8b54a] absolute"
                    style={{
                      top: p.t,
                      left: p.l,
                      rotate: `${p.r}deg`,
                      filter: "drop-shadow(0 0 8px rgba(37, 29, 5, 0.5))",
                    }}
                    initial={{ opacity: 0, scale: 0.5, y: 8 }}
                    animate={{ opacity: 0.85, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: p.d }}
                  >
                    <PawPrint className="size-7" fill="currentColor" strokeWidth={0} />
                  </motion.span>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Olhos felinos brilhando (fase 0) */}
          <AnimatePresence>
            {fase === 0 && (
              <motion.div
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-[38%] left-1/2 flex -translate-x-1/2"
              >
                <motion.img
                  src="/olhos-tigre.png"
                  alt="Olhos de Tigre"
                  className="w-[280px] max-w-[80vw] h-auto object-contain"
                  animate={{ scaleY: [1, 1, 0.05, 1, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.42, 0.45, 0.48, 1] }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Conteúdo principal (fase 2) */}
          <AnimatePresence>
            {fase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative z-[5] flex flex-col items-center px-7 text-center"
              >


                {/* Retrato com anéis girando */}
                <div className="relative mb-12 mt-2 size-[240px] sm:size-[280px]">
                  <motion.div
                    className="absolute -inset-2.5 rounded-full border-2 border-primary"
                    style={{ boxShadow: "0 0 40px -8px hsl(351 75% 49% / 0.55)" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -inset-5 rounded-full border border-dashed border-[#e8b54a] opacity-60"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative z-[2] size-full overflow-hidden rounded-full border-[3px] border-[#f4ece0]">
                    <Image src={retrato} alt="Julien, nail designer" fill className="object-cover" priority />
                  </div>
                </div>

                {/* Marca */}
                <div className="flex items-baseline justify-center gap-2 sm:gap-4 whitespace-nowrap">
                  <h1 className="font-safira text-[32px] sm:text-[42px] leading-[0.95] tracking-tight text-white">
                    The Nails
                  </h1>
                  <span className="font-signature text-primary text-[38px] sm:text-[46px] leading-[0.7] drop-shadow-sm">
                    By Julien
                  </span>
                </div>
                <p className="font-josefin text-muted-foreground mt-3.5 max-w-[280px] text-[11px] uppercase tracking-[0.18em]">
                  Alongamentos e Nail Art Artística de alta performance.
                </p>

                <Button
                  onClick={entrar}
                  size="lg"
                  className="mt-9 h-auto rounded-full px-8 py-4 text-[15px] font-bold"
                  style={{ boxShadow: "0 0 40px -8px hsl(351 75% 49% / 0.55)" }}
                >
                  Agendar agora
                </Button>
                <p className="text-muted-foreground mt-4 text-[11px] tracking-[0.04em]">
                  Agende seu horário · Nail Art · Alongamentos
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TelaIntro;
