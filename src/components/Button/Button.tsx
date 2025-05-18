import React from "react";
import { Heart, HeartOff } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

export interface ButtonProps {
  isFavorite: boolean;
  label: string;
  onClick?: () => void;
}

export const Button = ({ isFavorite, label, onClick }: ButtonProps) => {
  const baseStyles =
    "flex items-center gap-2 px-4 py-2 rounded text-white font-bold w-max transition-colors text-[18px] rounded-[20px]";

  const dynamicStyles = isFavorite
    ? "bg-[#DA0D5B]/70  hover:bg-[#c20b51]/70 "
    : "bg-[#FAA4BD]/60  hover:bg-[#FAA4BD]/60 ";

  const controls = useAnimation();

  const handleClick = async () => {
    await controls.start({
      y: [0, -200, 0],
      rotate: [0, 360, 0],
      transition: {
        y: { duration: 0.6, ease: "easeOut" },
        rotate: { duration: 1.2, ease: "linear" },
      },
    });

    if (onClick) onClick();
  };

  return (
    <button onClick={handleClick} className={`${baseStyles} ${dynamicStyles}`}>
      <motion.div animate={controls}>
        {isFavorite ? (
          <HeartOff size={25} />
        ) : (
          <Heart size={25} fill="currentColor" className="text-red-600" />
        )}
      </motion.div>
      {label}
    </button>
  );
};
