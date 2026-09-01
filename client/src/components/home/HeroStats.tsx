import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import CountUp from "react-countup";
import type { LucideIcon } from "lucide-react";
import {
  Pill,
  MapPin,
  Users,
  Package,
} from "lucide-react";

interface StatCard {
  icon: LucideIcon;
  value: number;
  label: string;
  color: string; // accent color for each card
  description?: string;
}

interface Props {
  medicines: number;
  pharmacies: number;
  users: number;
  inventory: number;
  // Optional customization
  cardColors?: Partial<Record<keyof Omit<Props, "cardColors">, string>>;
  duration?: number;
  delay?: number;
}

const defaultColors = {
  medicines: "from-blue-500 to-cyan-400",
  pharmacies: "from-emerald-500 to-teal-400",
  users: "from-purple-500 to-pink-400",
  inventory: "from-orange-500 to-amber-400",
};

export default function HeroStats({
  medicines,
  pharmacies,
  users,
  inventory,
  cardColors = {},
  duration = 2,
  delay = 0.2,
}: Props) {
  const cards: StatCard[] = [
    {
      icon: Pill,
      value: medicines,
      label: "Medicines",
      color: cardColors.medicines || defaultColors.medicines,
      description: "Total available drug entries",
    },
    {
      icon: MapPin,
      value: pharmacies,
      label: "Pharmacies",
      color: cardColors.pharmacies || defaultColors.pharmacies,
      description: "Partner locations",
    },
    {
      icon: Users,
      value: users,
      label: "Users",
      color: cardColors.users || defaultColors.users,
      description: "Active accounts",
    },
    {
      icon: Package,
      value: inventory,
      label: "Inventory",
      color: cardColors.inventory || defaultColors.inventory,
      description: "Stock keeping units",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { type: "spring" as const, stiffness: 400, damping: 10 },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover="hover"
          className="
            relative
            bg-white/10
            backdrop-blur-xl
            rounded-2xl
            p-6
            border
            border-white/20
            shadow-[0_8px_32px_rgba(0,0,0,0.12)]
            overflow-hidden
            transition-shadow
            duration-300
            hover:shadow-[0_16px_48px_rgba(0,0,0,0.2)]
            group
          "
        >
          {/* Animated gradient accent strip */}
          <div
            className={`
              absolute inset-0
              bg-gradient-to-br ${card.color}
              opacity-0
              group-hover:opacity-20
              transition-opacity
              duration-500
              rounded-2xl
            `}
          />

          {/* Icon with subtle glow */}
          <div className="relative z-10">
            <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
              <card.icon
                size={28}
                className="text-white"
                strokeWidth={1.8}
              />
            </div>

            {/* Number with count-up */}
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              <CountUp
                start={0}
                end={card.value}
                duration={duration}
                delay={delay + index * 0.1}
                separator=","
                useEasing
              />
            </h2>

            {/* Label */}
            <p className="text-blue-100/90 text-sm md:text-base font-medium mt-1">
              {card.label}
            </p>

            {/* Optional description – appears on hover */}
            {card.description && (
              <p className="text-xs text-white/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {card.description}
              </p>
            )}
          </div>

          {/* Decorative micro-animation */}
          <div
            className="
              absolute -bottom-6 -right-6
              w-20 h-20
              rounded-full
              bg-white/5
              blur-2xl
              group-hover:bg-white/10
              transition
              duration-500
            "
          />
        </motion.div>
      ))}
    </motion.div>
  );
}